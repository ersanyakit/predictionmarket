// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

interface IExchange {
    function getPair(address tokenA, address tokenB) external view returns(address);
}