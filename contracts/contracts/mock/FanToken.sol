// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Test is ERC20, Ownable {
    uint256 private _decimals;

    constructor(string memory name_, string memory symbol_,uint256 decimals_,address initialOwner) ERC20(name_, symbol_) Ownable(initialOwner){
        _decimals = decimals_;
    }

    function decimals() public view virtual override returns (uint8) {
        return uint8(_decimals);
    }


    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}