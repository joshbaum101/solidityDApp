// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fundraiser {
    address public owner;
    string public title;
    string public description;
    uint256 public goal;
    uint256 public raisedAmount;

    constructor(
        string memory _title,
        string memory _description,
        uint256 _goal
    ) {
        owner = msg.sender;
        title = _title;
        description = _description;
        goal = _goal;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function contribute() external payable {
        require(msg.value > 0, "Contribution amount must be greater than 0");
        require(raisedAmount + msg.value <= goal, "Goal has been reached");

        raisedAmount += msg.value;
    }

    function completeFundraiser() external onlyOwner {
        require(raisedAmount >= goal, "Goal has not been reached");
        payable(owner).transfer(raisedAmount);
    }
}
