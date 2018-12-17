const http = require('http');
const abi = require('./abi.json');
const Web3 = require('web3');
const express = require("express");
const Tx = require('ethereumjs-tx');

const address_array = new Array();
var app = express();
app.listen(3000);

process.on('unhandledRejection', console.dir);

var web3 = new Web3(new Web3.providers.HttpProvider(
	'https://ropsten.infura.io/[infura_api_key_here]'
));

app.get("/", (request, response) => {
	testContract();
	response.status(200).send("Complete");
});

function testContract() {
	setContractAddr();
	//startRental(address_array[0]);
	getMetamask();
}

function getMetamask(){
	//var web3 = new Web3('http://localhost:3000');
	if (typeof web3 !== 'undefined'){
		console.log('MetaMask is installed')
	 } 
	else{
		console.log('MetaMask is not installed')
	}

	web3.eth.getAccounts(function(err, accounts){
		if (err != null) {
		   console.log(err)
		}
		else if (accounts.length === 0) {
		   console.log('MetaMask is locked')
		}
		else {
		   console.log('MetaMask is unlocked')
		}
	 });
}

function setContractAddr(){
	address_array.push("0x151b27e2c1ea5b8cb649b4d59221271248f8014c");
	address_array.push("0x151b27e2c1ea5b8cb649b4d59221271248f8014c");
	address_array.push("0x151b27e2c1ea5b8cb649b4d59221271248f8014c");
	address_array.push("0x151b27e2c1ea5b8cb649b4d59221271248f8014c");
	address_array.push("0x151b27e2c1ea5b8cb649b4d59221271248f8014c");
}

function startRental(contract_addr){
	//コントラクトの取得
	var contract = new web3.eth.Contract(abi, contract_addr);

	/**
	var response = contract.methods.getBalance().call((err, result) => {
		if (err) {
			// handle error here
		}
		else {
			// use result here, console.log it to see the structure
			console.log(result);
		}
	}); */

	var dataTx = contract.methods.rentCycle().encodeABI();
	var rawTx = {
		nonce: '0x',
		gasPrice: '0x09184e72a000', 
		gasLimit: '0x2710',
		to: '0x4B5178a88D0c3F527a14d0953B652faA84676922', 
		data:dataTx 
	  }
	  
	  var tx = new Tx(rawTx);
	  tx.sign(Buffer.from('62A77A6A917E480499119209257B0D09EFF87977853A2A95851E825A34BEF182', 'hex'));
	  
	  var serializedTx = tx.serialize();
	  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
	  .on('receipt', console.log);
}