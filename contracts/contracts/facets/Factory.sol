// SPDX-License-Identifier: MIT

pragma solidity 0.8.27;
import "../shared/Modifiers.sol";
import "../libs/LibMarket.sol";
import "../libs/LibSettings.sol";
import "../shared/Structs.sol";
import "../shared/Enums.sol";
import "../shared/TransferHelper.sol";
import "../interfaces/IERC20.sol";

contract Factory is Modifiers {

error InvalidChoice();
error InvalidAmount();
error InvalidMarket();
error MarketHasNotStartedYet();
error MarketHasAlreadyExpired();
error MarketHasAlreadyResolved();
error MarketHasCancelled();
error MarketIsNotCancelled();
error MarketIsCancelled();
error MarketIsNotResolved();

error InvalidBet();
error InvalidPrice();
error AlreadyClaimed();
error AlreadyRefunded();

event MarketCreated(uint256 indexed marketId, address indexed creator, string title);
event BetPlaced(uint256 indexed marketId, uint256 indexed choiceId, uint256 betId, address indexed bettor, uint256 amount, uint256 price);
event Resolved(uint256 indexed marketId, uint256 indexed choiceId, uint256 completedAt);
event MarketCancelled(uint256 indexed marketId, uint256 cancelledAt);
event Claimed(address indexed user,uint256 indexed marketId,uint256 indexed choiceId,uint256 amount,uint256 protocolFee,uint256 claimedAt);
event Refunded(address indexed user, uint256 indexed marketId, uint256 indexed choiceId, uint256 amount, uint256 refundedAt);
event MarketVerified(uint256 indexed marketId, bool status);

function create(MarketCreationParams calldata param) external{
    LibSettings.Layout storage settingsLib = LibSettings.layout();
    LibMarket.Layout storage marketLib = LibMarket.layout();

    uint256 id = marketLib.markets.length;

    Market storage newMarket = marketLib.markets.push();
    newMarket.valid = true;
    newMarket.resolved = false;
    newMarket.resolvedId=type(uint256).max;
    newMarket.verified=settingsLib.whiteList[msg.sender];
    newMarket.feePercent=settingsLib.protocolFee;
    newMarket.createdAt=block.timestamp;
    newMarket.startedAt=param.startedAt < block.timestamp ? block.timestamp : param.startedAt;
    newMarket.expiredAt=param.expiredAt;
    newMarket.id=id;
    newMarket.title=param.title;
    newMarket.description=param.description;
    newMarket.logo=param.logo;
    newMarket.creator=msg.sender;
    newMarket.status=Status.LIVE;
    newMarket.requestId = bytes32(0);//reserved for optimistic oracle

    uint256 choicesLen = param.choices.length;
    for(uint256 i=0;i<choicesLen;){
        MarketChoiceParam calldata choiceParam = param.choices[i];
        MarketChoice storage choice = newMarket.choices.push();
        choice.totalDeposit = 0;
        choice.userCount=0;
        choice.name = choiceParam.name;
        choice.tokenAddress = choiceParam.tokenAddress;
        choice.maxBet = 0;
        choice.minBet = type(uint256).max;
        choice.minPrice = type(uint256).max;
        choice.maxPrice = 0;
        unchecked{
            i++;
        }
    }
    emit MarketCreated(id, msg.sender, param.title);
}

function bet(uint256 marketId, uint256 choiceId, uint256 price,  uint256 amount) external  whenNotPaused nonReentrant payable{
    LibSettings.Layout storage settingsLib = LibSettings.layout();
    LibMarket.Layout storage marketLib = LibMarket.layout();

    require(marketId < marketLib.markets.length, InvalidMarket());
    Market storage market = marketLib.markets[marketId];
    require(market.valid,InvalidMarket());
    //require(block.timestamp > market.startedAt,MarketHasNotStartedYet());
    //require(block.timestamp < market.expiredAt,MarketHasAlreadyExpired());
    require(!market.resolved,MarketHasAlreadyResolved());
    require(!market.cancelled,MarketHasCancelled());
    require(amount > 0,InvalidAmount());
    require(price > 0,InvalidPrice());


    MarketChoice storage choice = market.choices[choiceId];
    choice.userCount += 1;
    if(choice.tokenAddress == settingsLib.ETHER){
        require(msg.value == amount,InvalidAmount());
    }else{
        TransferHelper.safeTransferFrom(choice.tokenAddress,msg.sender,address(this),amount);
    }

    if(amount < choice.minBet){
        choice.minBet = amount;
    }

    if(amount > choice.maxBet){
       choice.maxBet = amount;
    }

    if(price < choice.minPrice){
        choice.minPrice = price;
    }

    if(price > choice.maxPrice){
        choice.maxPrice = price;
    }
   
    uint256 betId = market.bets.length;
    market.bets.push(Bet({
        valid:true,
        betId:betId,
        choiceId:choiceId,
        price:price,
        amount:amount,
        createdAt:block.timestamp,
        bettor:msg.sender
    }));


    BetInfo storage betInfo =  marketLib.betInfo[msg.sender][marketId][choiceId];
    betInfo.valid = true;
    betInfo.depositAmount += amount;
    betInfo.bettor = msg.sender;
    betInfo.claimed = false;
    betInfo.tokenAddress = choice.tokenAddress;

 
    emit BetPlaced(marketId, choiceId,  betId, msg.sender, amount, price);

}

function resolve(uint256 marketId,uint256 choiceId,uint256 value) external onlyOperators(msg.sender){
    LibMarket.Layout storage marketLib = LibMarket.layout();
    Market storage market = marketLib.markets[marketId];
    market.cancelled = false;
    market.cancelledAt = 0;
    market.completed = true;
    market.completedAt = block.timestamp;
    market.resolved = true;
    market.resolvedId = choiceId;
    market.resolvedValue = value;
    market.status = Status.COMPLETED;
    emit Resolved(marketId, choiceId, block.timestamp);
}

function cancel(uint256 marketId) external onlyOperators(msg.sender){
    LibMarket.Layout storage marketLib = LibMarket.layout();
    Market storage market = marketLib.markets[marketId];
    market.cancelled = true;
    market.cancelledAt = block.timestamp;
    market.status = Status.CANCELLED;
    emit MarketCancelled(marketId, block.timestamp);
}

function calculate(uint256 amount, uint256 percent) internal pure returns (uint256){
    return percent > 0 ? (amount * percent) / 1e18 : 0;
}

function claim(uint256 marketId) external whenNotPaused nonReentrant{
    LibMarket.Layout storage marketLib = LibMarket.layout();
    LibSettings.Layout storage settingsLib = LibSettings.layout();
    Market storage market = marketLib.markets[marketId];
    require(market.valid,InvalidMarket());
    require(!market.cancelled,MarketIsCancelled());
    require(market.resolved,MarketIsNotResolved());

    //userbetInfo
    BetInfo storage betInfo = marketLib.betInfo[msg.sender][marketId][market.resolvedId];
    require(!betInfo.claimed,AlreadyClaimed());
    require(betInfo.depositAmount > 0,InvalidAmount());

    betInfo.claimed = true;
    betInfo.claimedAt = block.timestamp;

    MarketChoice memory winner = market.choices[market.resolvedId];

    if(winner.tokenAddress == settingsLib.ETHER){
        TransferHelper.safeTransferETH(betInfo.bettor,betInfo.depositAmount);
    }else{
        TransferHelper.safeTransfer(winner.tokenAddress,betInfo.bettor,betInfo.depositAmount);
    }

    uint256 choicesLength = market.choices.length;


    for(uint256 choiceIndex; choiceIndex < choicesLength;){
        if(choiceIndex == market.resolvedId){
            choiceIndex++;
            continue;   
        }
        MarketChoice memory loser = market.choices[choiceIndex];

        if(loser.totalDeposit == 0){
             choiceIndex++;
            continue;
        }

        uint256 totalWinnings = (betInfo.depositAmount * loser.totalDeposit) / winner.totalDeposit;
        
        if(totalWinnings > 0){
            uint256 protocolFee = calculate(totalWinnings,settingsLib.protocolFee);

            betInfo.rewards.push(Rewards({
                valid:true,
                fee:protocolFee,
                choiceId:choiceIndex,
                amount:totalWinnings,
                tokenAddress:loser.tokenAddress
            }));

            if(loser.tokenAddress ==  settingsLib.ETHER){
                // native Currency
                TransferHelper.safeTransferETH(betInfo.bettor,(totalWinnings-protocolFee));
                TransferHelper.safeTransferETH(settingsLib.FEE_RECEIVER,protocolFee);
            }else{
                //token
                TransferHelper.safeTransfer(loser.tokenAddress,betInfo.bettor,(totalWinnings-protocolFee));
                TransferHelper.safeTransfer(loser.tokenAddress,settingsLib.FEE_RECEIVER,protocolFee);
            }
            emit Claimed(msg.sender, marketId, choiceIndex, totalWinnings, protocolFee, block.timestamp);

        }
        
        unchecked{
            choiceIndex++;
        }
    }


}

function refund(uint256 marketId, uint256 choiceId) external whenNotPaused nonReentrant {
    LibMarket.Layout storage marketLib = LibMarket.layout();
    LibSettings.Layout storage settingsLib = LibSettings.layout();
    Market storage market = marketLib.markets[marketId];
    require(market.valid,InvalidMarket());
    require(market.cancelled,MarketIsNotCancelled());

    BetInfo storage betInfo = marketLib.betInfo[msg.sender][marketId][choiceId];
    require(!betInfo.refunded,AlreadyRefunded());
    require(!betInfo.valid,InvalidBet());
    require(betInfo.depositAmount > 0,InvalidAmount());

    betInfo.refunded = true;
    betInfo.refundAmount = betInfo.depositAmount;

    if(betInfo.tokenAddress == settingsLib.ETHER){
        // native Currency
        TransferHelper.safeTransferETH(betInfo.bettor,betInfo.refundAmount);
    }else{
        //token
        TransferHelper.safeTransfer(betInfo.tokenAddress,betInfo.bettor,betInfo.refundAmount);
    }
    emit Refunded(msg.sender, marketId, choiceId, betInfo.refundAmount, block.timestamp);
}

function fetch() external view returns(Market[] memory){
    return LibMarket.layout().markets;
}

function fetchMarketById(uint256 marketId) external view returns(Market memory market){
    market = LibMarket.layout().markets[marketId];
    if(market.cancelled){
        market.status = Status.CANCELLED;
        return market;
    }  
    
    if(market.completed){
        market.status = Status.COMPLETED;
        return market;
    }

    if(market.startedAt < block.timestamp){
        market.status = Status.PENDING;
        return market;
    }

    if(market.expiredAt < block.timestamp && !market.resolved ){
        market.status = Status.PROCESSING_RESULTS;
        return market;
    }

    if(market.startedAt < block.timestamp && market.expiredAt > block.timestamp ){
        market.status = Status.LIVE;
        return market;
    }

   if(market.expiredAt < block.timestamp ){
        market.status = Status.EXPIRED;
        return market;
    }

    return market;
}

function allMarketsLength() external view returns(uint256){
    return LibMarket.layout().markets.length;
}

function verify(uint256 marketId, bool status) external onlyOperators(msg.sender) {
    LibMarket.Layout storage marketLib = LibMarket.layout();
    Market storage market = marketLib.markets[marketId];
    require(market.id > 0, InvalidMarket());
    market.verified = status;
    market.verifiedAt = block.timestamp;
    emit MarketVerified(marketId, status); // Emit the event after updating the status
}
}
