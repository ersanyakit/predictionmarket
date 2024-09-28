// SPDX-License-Identifier: MIT

pragma solidity 0.8.27;
import "../shared/Modifiers.sol";
import "../libs/LibSettings.sol";
contract Settings is Modifiers {

event WhitelistStatusUpdated(address indexed user, bool isWhitelisted);
event FeeReceiverUpdated(address indexed previousReceiver, address indexed newReceiver);
event PauseStatusUpdated(bool isPaused);
event ProtocolFeeUpdated(uint256 newFee);
event WETH9Updated(address indexed previousWETH9, address indexed newWETH9);
event KayenRouterUpdated(address indexed previousKayenRouter, address indexed newKayenRouter);
event KayenWrapperUpdated(address indexed previousKayenWrapper, address indexed newKayenWrapper);
event NativeCurrencyUpdated(address indexed previousCurrency, address indexed newCurrency);
event OptimisticOracleUpdated(address indexed previousOracle, address indexed newOracle);
event OperatorStatusUpdated(address indexed user, bool isWhitelisted);

function setPause(bool status) external onlyOwner{
    LibSettings.layout().isPaused = status;
    emit PauseStatusUpdated(status);
}

function setOptimisticOracle(address oracle) external onlyOwner{
    LibSettings.Layout storage settings = LibSettings.layout();
    address optimisticOracle = settings.OPTIMISTIC_ORACLE;
    settings.OPTIMISTIC_ORACLE = optimisticOracle;
    emit OptimisticOracleUpdated(optimisticOracle, oracle);
}

function setNativeCurrency(address nativeCurrency) external onlyOwner {
    LibSettings.Layout storage settings = LibSettings.layout();
    address previousCurrency = settings.ETHER;
    settings.ETHER = nativeCurrency;
    emit NativeCurrencyUpdated(previousCurrency, nativeCurrency);
}

function setWETH9(address weth9) external onlyOwner {
    LibSettings.Layout storage settings = LibSettings.layout();
    address previousWETH9 = settings.WETH9;
    settings.WETH9 = weth9;
    emit WETH9Updated(previousWETH9, weth9);
}

function setKayenRouter(address kayen) external onlyOwner {
    LibSettings.Layout storage settings = LibSettings.layout();
    address previousKayenRouter = settings.KAYEN_ROUTER;
    settings.KAYEN_ROUTER = kayen;
    emit KayenRouterUpdated(previousKayenRouter, kayen);
}

function setKayenWrapper(address wrapper) external onlyOwner {
    LibSettings.Layout storage settings = LibSettings.layout();
    address previousKayenWrapper = settings.KAYEN_WRAPPER;
    settings.KAYEN_WRAPPER = wrapper;
    emit KayenWrapperUpdated(previousKayenWrapper, wrapper);
}
function setProtocolFee(uint256 feePercent) external onlyOwner{
    LibSettings.layout().protocolFee = feePercent;
    emit ProtocolFeeUpdated(feePercent);
}

function setFeeReceiver(address feeReceiver) external onlyOwner{
    LibSettings.Layout storage settings = LibSettings.layout();
    address oldReceiver = settings.FEE_RECEIVER;
    LibSettings.layout().FEE_RECEIVER = feeReceiver;
    emit FeeReceiverUpdated(oldReceiver,feeReceiver);
}

function setWhiteList(address[] calldata creators,bool enabled) external onlyOwner{
    LibSettings.Layout storage settings = LibSettings.layout();
    uint256 length = creators.length;
    for(uint256 i; i<length;){
        address creator = creators[i];
        settings.whiteList[creator] = enabled;
        emit WhitelistStatusUpdated(creator,enabled);
        unchecked {
            i++;
        }
    }
}


function setOperators(address[] calldata operators,bool enabled) external onlyOwner{
    LibSettings.Layout storage settings = LibSettings.layout();
    uint256 length = operators.length;
    for(uint256 i; i<length;){
        address operator = operators[i];
        settings.operators[operator] = enabled;
        emit OperatorStatusUpdated(operator,enabled);
        unchecked {
            i++;
        }
    }
}
}
