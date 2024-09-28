// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;


library LibSettings {

    struct Layout {
        bool isPaused;
        uint256 protocolFee;

        address ETHER;
        address WETH9;
        address CHILIZ_WRAPPER;
        address FEE_RECEIVER;
        address KAYEN_ROUTER;
        address OPTIMISTIC_ORACLE;
        
        mapping (address => bool) whiteList;
        mapping(address => bool) operators;
    
    }

    bytes32 internal constant STORAGE_SLOT = keccak256('com.prediction.market.settings');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}