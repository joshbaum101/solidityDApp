// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundraiserRegistry {
    address public owner;
    address[] public fundraisers;

    constructor() {
        owner = msg.sender;
    }

    function registerFundraiser(address fundraiserAddress) external {
        fundraisers.push(fundraiserAddress);
    }

    function getFundraisers() external view returns (address[] memory) {
        return fundraisers;
    }

    function removeFundraiser(address fundraiserAddress) external {
        for (uint256 i = 0; i < fundraisers.length; i++) {
            if (fundraisers[i] == fundraiserAddress) {
                if (i < fundraisers.length - 1) {
                    fundraisers[i] = fundraisers[fundraisers.length - 1];
                }
                fundraisers.pop();
                break;
            }
        }
    }
}
