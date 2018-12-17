pragma solidity ^0.5.1;
contract shareBycycle {
    
    address public sender;
    address payable public owner;
    uint depositAmount = 1;
    int256 position;
    uint startToRent;
    uint public fee;
    bool public canUse;
    
    constructor (uint _fee) public{
        owner = msg.sender;
        fee = _fee;
        canUse = true;
    }
    
    function rentCycle() public {
        require(owner != msg.sender);
        require(canUse == true);
        sender = msg.sender;
        startToRent = now;
        canUse = false;
    }
    
    function returnCycle(int256 _position) public payable {
        require(owner != msg.sender);
        require(sender == msg.sender);
        require(canUse == false);
        //require(getFee() == msg.value);
        position = _position;
        canUse = true;
    }
    
    function withdraw() public payable {
        owner.transfer(address(this).balance);
    }
    
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    
    function getFee() public view returns(uint, uint256){
        if (canUse){
            return (0,0);
        }
        uint duration = now - startToRent;
        return (duration, uint256(fee * 1000000000000000000 * duration / 3600.0));
    }
}