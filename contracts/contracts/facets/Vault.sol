// SPDX-License-Identifier: MIT

pragma solidity 0.8.27;
import "../shared/Modifiers.sol";
import "../interfaces/IERC20.sol";

contract Vault is Modifiers{

    //Emergency Methods
    function withdrawETH() external onlyOwner{
        uint256 amount =  address(this).balance;
        if(amount > 0){
            address to = msg.sender;
            (bool success, ) = to.call{value: amount}(new bytes(0));
            require(success);
        }
    }

    function withdrawCustomETHAmount(uint256 amount) external onlyOwner{
        if( (amount > 0)  && (amount <= address(this).balance)){
            address to = msg.sender;
            (bool success, ) = to.call{value: amount}(new bytes(0));
            require(success);
        }
    }

    function withdrawERC(address _tokenAddr) external onlyOwner{
        if(_tokenAddr != address(0)){
            uint256 amount = IERC20(_tokenAddr).balanceOf(address(this));
            if(amount > 0){
                IERC20(_tokenAddr).transfer(msg.sender, amount);
            }
        }
    }

    function withdrawERCCustomAmount(address _tokenAddr,uint256 _amount) external onlyOwner{
        if(_tokenAddr != address(0)){
            uint256 balance = IERC20(_tokenAddr).balanceOf(address(this));
            if(balance > _amount){
                IERC20(_tokenAddr).transfer(msg.sender, _amount);
            }
        }
    }

}