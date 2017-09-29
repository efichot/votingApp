pragma solidity ^0.4.11;

contract Voting {
  mapping (bytes32 ==> uint8) votesReceived; // hash array of candidate in key and number of voting in value

  bytes32[] public candidateList; // candidate list

  function Voting(bytes32[] candidateNames) { // constructor we fill the candateList
    candidateList = candidatesNames;
  }

  function totalVotesFor(bytes32 candidate) return (uint8) { // function return the number of vote of one candidate
    return votesReceived[candidate];
  }

}