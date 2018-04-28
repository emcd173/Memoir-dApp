# Memoir: A Trustless Digital Time Capsule

<b>Memoir</b> is a web3 dApp and boilerplate that enables content creators to timelock their creations for any predetermined period of time.

## How it works

On the front-end, the user uploads a file (this can be any form of content, see below for examples) and inputs a set time period for which they'd like their file to be encrypted.  The user may also input an optional string up to 240 charecters as a message, description, etc.

The web3 uploader encrypts the uploaded file with [#encryption used] and uploads the encrypted file onto the Interplanetary File System.  The decryption key, a One-time Pad (OTP) is passed to the Amsterdam.sol smart-contract as a private, time-locked variable along with the IPFS address.  In addition, web3 ingests the description string inputted by the user at the time of upload into Amsterdam.sol

The complete list of parameters taken by the Amsterdam.sol smart-contract is as follows:

//Parameters

A visual diagram outling the process may be seen below

![Memoir Diagram](https://github.com/emcd173/EminenceAlignment/blob/master/MemoirDiagram.PNG)

## Scenario

We envsion a wide array of use cases for Memoir, for example:
1. Personal Writings - An individual may wish to conceal their writing (such as a novel, diary, personal letter) from political threats, estranged lovers, etc - while still proving that they wrote it during a given period in time.  For example, a political refugee deprived of free speech (like the late Anne Frank, of whom our Smart-Contract, Amsterdam is dedicated) may wish to detail their wartime experience while deflecting risk associated speaking out against an authority.  
2. Music - An musician, at the peak of their notereiety, might wish to lock up a song for a 100 years - so that it is not released to the public unti after their death.  Imagine if a song from Beethoven, the Beatles, or Biggie was timelocked through history and released today.
3. Cryptowills - An individual may wish to timelock a private key connected to a bitcoin wallet for a given period of time, so that the funds are not released to the public until a given point in the future.
4. Messages to future self - Memoir provides a secure and trustless way for indviduals to send messages to their future selves.  A college freshman, for example, may wish to send a digital message to his self upon graduation.  this protocol ensures that the message will not be lost, destroyed, etc.
