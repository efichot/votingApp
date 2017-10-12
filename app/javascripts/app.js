// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css';

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
// Import our contract artifacts and turn them into usable abstractions.
import voting_artifacts from '../../build/contracts/Voting.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Voting = contract(voting_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let candidateNames;
const candidates = {
    "Jose": "voteCandidate-1",
    "Etienne": "voteCandidate-2",
    "Nick": "voteCandidate-3",
};

window.App = {
    start: () => {
        Voting.setProvider(web3.currentProvider);
        console.log(code);
        Voting.new(['jose','Etienne', 'Nick'], {from: web3.eth.accounts[0], gas: 420000}).then((voting) => {
            console.log(voting.address);
            candidateNames = Object.keys(candidates);
            console.log(candidateNames);
            for (let i = 0; i < candidateNames.length; i++) {
                let name = candidateNames[i];
                console.log(name);
                let val = voting.totalVotesFor.call(name).toString();
                $('#' + candidates[candidateNames[i]]).html(val);
            }

            $('button').on('click', (e) => {
                let name = $('#candidate').val();
                console.log(name);
                voting.voteForCandidate.call(name);
                let val = voting.totalVotesFor.call(name).toString();
                console.log(val);
                console.log(candidates[name]);
                $('#' + candidates[name]).html('val');
            })
        });
    },
}

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});

// import Web3 from 'web3';
// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// let abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
// let VotingContract = web3.eth.contract(abi);
// // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
// let contractInstance = VotingContract.at('0xce151642dd2ba55e5cc847cd39476e74de9ac813');
// let candidates = {"Jose": "voteCandidate-1", "Etienne": "voteCandidate-2", "Nick": "voteCandidate-3"}

// $('button').on('click', () => {
//     let candidateName = $("#candidate").val();
//     contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
//       let div_id = candidates[candidateName];
//       console.log(contractInstance.totalVotesFor.call(candidateName).toString());
//       $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
//     });
// })

// $(document).ready(function() {
//   let candidateNames = Object.keys(candidates);
//   for (var i = 0; i < candidateNames.length; i++) {
//     let name = candidateNames[i];
//     let val = contractInstance.totalVotesFor.call(name).toString();
//     console.log(val);
//     $("#" + candidates[name]).html(val);
//   }
// });