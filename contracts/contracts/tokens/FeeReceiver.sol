// SPDX-License-Identifier: MIT

pragma solidity 0.8.27;
import "@openzeppelin/contracts/access/Ownable.sol";
import {TransferHelper} from "../shared/TransferHelper.sol";
contract FeeReceiver is Ownable {
    string private _name;
    string private _symbol;
    constructor(address owner) Ownable(owner){
        _name = "ARENA VAULT";
        _symbol = "ARENA";
    }

    function name() public view  returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function claim(address receiver,uint256 amount) external onlyOwner{
        TransferHelper.safeTransferETH(receiver,amount);
    }

    function claimToken(address token, address receiver, uint256 amount) external onlyOwner{
        TransferHelper.safeTransfer(token, receiver,amount);
    }


}
