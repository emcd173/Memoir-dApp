# Memoir: A Trustless Digital Time Capsule

<b>Memoir</b> is a web3 boilerplate that enables content creators to timelock their creations for any predetermined period of time.

##How it works

On the front-end, the user uploads a file (this can be any form of content, see below for examples) and inputs a set time period for which they'd like their file to be encrypted.  The user may also input an optional string up to 240 charecters as a message, description, etc.

The web3 uploader encrypts the uploaded file with [#encryption used] and uploads the encrypted file onto the Interplanetary File System.  The decryption key, a One-time Pad (OTP) is passed to the Amsterdam.sol smart-contract as a private, time-locked variable along with the IPFS address.  In addition, web3 ingests the description string inputted by the user at the time of upload into Amsterdam.sol

The complete list of parameters taken by the Amsterdam.sol smart-contract is as follows:

A visual diagram outling the process may be seen below

![Memoir Diagram](https://github.com/emcd173/EminenceAlignment/blob/master/MemoirDiagram.PNG)

##Scenario
