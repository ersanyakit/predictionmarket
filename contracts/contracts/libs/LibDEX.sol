// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "../interfaces/IChilizWrapperFactory.sol";
import "../interfaces/IERC20.sol";
import "./LibSettings.sol";
library LibDEX{
    error IdenticalAddresses();
    error ZeroAddress();
    error InsufficientAmount();
    error InsufficientInputAmount();
    error InsufficientOutputAmount();
    error InsufficientLiquidity();
    error InvalidPath();

    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        if (tokenA == tokenB) revert IdenticalAddresses();
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        if (token0 == address(0)) revert ZeroAddress();
    }

    function getAmountOut(uint256 amountIn,uint256 reserveIn, uint256 reserveOut) internal pure returns (uint256 amountOut) {
        if (amountIn == 0) revert InsufficientInputAmount();
        if (reserveIn == 0 || reserveOut == 0) revert InsufficientLiquidity();
        uint256 amountInWithFee = amountIn * 997;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;
        uint256 numerator = amountInWithFee * reserveOut;
        amountOut = numerator / denominator;
    }

    function getAmountIn(uint256 amountOut,uint256 reserveIn,uint256 reserveOut) internal pure returns (uint256 amountIn) {
        if (amountOut == 0) revert InsufficientOutputAmount();
        if (reserveIn == 0 || reserveOut == 0) revert InsufficientLiquidity();
        uint256 numerator = reserveIn * amountOut * 1000;
        uint256 denominator = (reserveOut - amountOut) * 997;
        amountIn = (numerator / denominator) + 1;
    }


    function _approveAndWrap(address token, uint256 amount) private returns (address wrappedToken) {
        LibSettings.Layout storage settings = LibSettings.layout();
        IERC20(token).approve(settings.KAYEN_WRAPPER, amount); // no need for check return value, bc addliquidity will revert if approve was declined.
        wrappedToken = IChilizWrapperFactory(settings.KAYEN_WRAPPER).wrap(address(this), token, amount);
    }

}
