// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract AbstractWallet {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function transfer(address payable _to, uint256 _amount) external {
        require(msg.sender == owner, "Not authorized");
        _to.transfer(_amount);
    }

    receive() external payable {}
}
