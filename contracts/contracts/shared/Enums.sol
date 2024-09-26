// SPDX-License-Identifier: MIT

pragma solidity 0.8.27;

enum BetSide{
    YES,
    NO
}
enum Status {
    UPCOMING,
    PENDING,
    LIVE,
    CANCELLED,
    EXPIRED,
    PROCESSING_RESULTS,
    COMPLETED
}