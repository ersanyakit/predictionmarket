// SPDX-License-Identifier: MIT
import "./Enums.sol";

struct MarketChoiceParam {
    string name;
    address tokenAddress;
}

struct MarketChoice {
    uint256 totalDeposit;
    uint256 userCount;
    uint256 minBet;
    uint256 maxBet;
    uint256 minPrice;
    uint256 maxPrice;
    string name;
    address tokenAddress;
}

struct Bet{
    bool valid;
    uint256 betId;
    uint256 choiceId;
    uint256 price;
    uint256 amount;
    uint256 createdAt;
    address bettor;
}

struct MarketCreationParams {
    uint256 startedAt;
    uint256 expiredAt;
    uint256 vestingPeriod;
    string title;
    string description;
    string logo;
    MarketChoiceParam[] choices;
}

struct Market {
    bool valid;
    bool cancelled;
    bool verified;
    bool resolved; // Kazanan belirlendi mi?
    bool completed;
    uint256 id;
    uint256 resolvedId; // Kazanan seçimin indeksini saklar
    uint256 feePercent;
    uint256 startedAt;
    uint256 createdAt;
    uint256 expiredAt;
    uint256 cancelledAt;
    uint256 completedAt;

    string title;
    string description;
    string logo;
    address creator;
    Status status;
    MarketChoice[] choices;
    Bet[] bets;
    bytes32 requestId; // reserved for optimistic oracle
}

struct Rewards{
    bool valid;
    uint256 choiceId;
    uint256 amount;
    uint256 fee;
    address tokenAddress;
}

struct BetInfo{
    bool valid;
    bool claimed;
    bool refunded;
    uint256 depositAmount;
    uint256 refundAmount;
    uint256 claimedAt;
    uint256 fee;
    Rewards[] rewards;
    address tokenAddress;// address(0) native currency
    address bettor;
}