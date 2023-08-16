# Getting Started with CryptoRaiser
CryptoRaiser is a fundraising dApp. Users can register/login to gain access to the ability to create fundraisers, donate to other's fundraisers, and finish and withdrawal the total raised.
To get started, be sure to npm i in the root directory, the smartCon folder, and the backend folder to download all dependencies.

## Available Scripts

In the root directory, you can run:

### `npm start`

This will start up our frontend application running on localhost:3000.

In the backend you can run:

### `node .\index.js`

This will start up the back end that handles interacting with the smart contracts. 
Occasionally may stall out, re run `node .\index.js` as necessary.

### Advanced Configuration

Users will have to create a .env file in both the backend and the smartCon directories. Both require the same information, the infuria api key and your wallet's mnemonic. Here is th format:

INFURA_API_KEY = "https://sepolia.infura.io/v3/8d1ed8221f0449018a64126cbdeec29d"
MNEMONIC = "Your Phrase Here"
