// SPDX-License-Identifier: MIT

pragma solidity 0.8.27;

import "../shared/Structs.sol";
library LibMarket {

    struct Layout {
      Market[] markets;
      BetInfo[] allBetInfo;

      //marketId -> choiceId -> side:bool -> totalDeposit
      mapping(uint256 => mapping(uint256 => mapping(bool => uint256))) deposits;
    

    // user -> marketId -> choiceId -> side:bool -> BetInfo
    mapping(address => mapping(uint256 => mapping(uint256 => mapping(bool => BetInfo)))) betInfo;


    }

    bytes32 internal constant STORAGE_SLOT = keccak256('com.prediction.market');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}