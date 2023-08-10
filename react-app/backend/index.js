require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const { Web3 } = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { INFURA_API_KEY, MNEMONIC } = process.env;
const abi = require("./abi/abi");

const app = express();
const port = process.env.PORT || 5000;
const url =
  "mongodb+srv://joshbaum101:460Tlz9w@cluster0.s3f1r.mongodb.net/?retryWrites=true&w=majority";
const dbName = "cryptoRaiser";
const mnemonic = MNEMONIC;
const infuraKey = INFURA_API_KEY;
const fundraiserByteCode =
  "0x608060405234801562000010575f80fd5b506040516200112638038062001126833981810160405281019062000036919062000266565b335f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600190816200008691906200052b565b5081600290816200009891906200052b565b50806003819055505050506200060f565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6200010a82620000c2565b810181811067ffffffffffffffff821117156200012c576200012b620000d2565b5b80604052505050565b5f62000140620000a9565b90506200014e8282620000ff565b919050565b5f67ffffffffffffffff82111562000170576200016f620000d2565b5b6200017b82620000c2565b9050602081019050919050565b5f5b83811015620001a75780820151818401526020810190506200018a565b5f8484015250505050565b5f620001c8620001c28462000153565b62000135565b905082815260208101848484011115620001e757620001e6620000be565b5b620001f484828562000188565b509392505050565b5f82601f830112620002135762000212620000ba565b5b815162000225848260208601620001b2565b91505092915050565b5f819050919050565b62000242816200022e565b81146200024d575f80fd5b50565b5f81519050620002608162000237565b92915050565b5f805f6060848603121562000280576200027f620000b2565b5b5f84015167ffffffffffffffff811115620002a0576200029f620000b6565b5b620002ae86828701620001fc565b935050602084015167ffffffffffffffff811115620002d257620002d1620000b6565b5b620002e086828701620001fc565b9250506040620002f38682870162000250565b9150509250925092565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806200034c57607f821691505b60208210810362000362576200036162000307565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620003c67fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000389565b620003d2868362000389565b95508019841693508086168417925050509392505050565b5f819050919050565b5f620004136200040d62000407846200022e565b620003ea565b6200022e565b9050919050565b5f819050919050565b6200042e83620003f3565b620004466200043d826200041a565b84845462000395565b825550505050565b5f90565b6200045c6200044e565b6200046981848462000423565b505050565b5b818110156200049057620004845f8262000452565b6001810190506200046f565b5050565b601f821115620004df57620004a98162000368565b620004b4846200037a565b81016020851015620004c4578190505b620004dc620004d3856200037a565b8301826200046e565b50505b505050565b5f82821c905092915050565b5f620005015f1984600802620004e4565b1980831691505092915050565b5f6200051b8383620004f0565b9150826002028217905092915050565b6200053682620002fd565b67ffffffffffffffff811115620005525762000551620000d2565b5b6200055e825462000334565b6200056b82828562000494565b5f60209050601f831160018114620005a1575f84156200058c578287015190505b6200059885826200050e565b86555062000607565b601f198416620005b18662000368565b5f5b82811015620005da57848901518255600182019150602085019450602081019050620005b3565b86831015620005fa5784890151620005f6601f891682620004f0565b8355505b6001600288020188555050505b505050505050565b610b09806200061d5f395ff3fe6080604052600436106100a6575f3560e01c80638e75e482116100635780638e75e482146101a6578063b97a7d24146101d0578063c59ee1dc146101fa578063d7bb99ba14610224578063e924796b1461022e578063ff3c1a8f14610244576100a6565b80631a092541146100aa57806340193883146100d45780634a79d50c146100fe5780637284e41614610128578063893d20e8146101525780638da5cb5b1461017c575b5f80fd5b3480156100b5575f80fd5b506100be61026e565b6040516100cb9190610781565b60405180910390f35b3480156100df575f80fd5b506100e86102fe565b6040516100f591906107b9565b60405180910390f35b348015610109575f80fd5b50610112610304565b60405161011f9190610781565b60405180910390f35b348015610133575f80fd5b5061013c610390565b6040516101499190610781565b60405180910390f35b34801561015d575f80fd5b5061016661041c565b6040516101739190610811565b60405180910390f35b348015610187575f80fd5b50610190610443565b60405161019d9190610811565b60405180910390f35b3480156101b1575f80fd5b506101ba610466565b6040516101c791906107b9565b60405180910390f35b3480156101db575f80fd5b506101e461046f565b6040516101f191906107b9565b60405180910390f35b348015610205575f80fd5b5061020e610478565b60405161021b91906107b9565b60405180910390f35b61022c61047e565b005b348015610239575f80fd5b5061024261052c565b005b34801561024f575f80fd5b50610258610667565b6040516102659190610781565b60405180910390f35b60606002805461027d90610857565b80601f01602080910402602001604051908101604052809291908181526020018280546102a990610857565b80156102f45780601f106102cb576101008083540402835291602001916102f4565b820191905f5260205f20905b8154815290600101906020018083116102d757829003601f168201915b5050505050905090565b60035481565b6001805461031190610857565b80601f016020809104026020016040519081016040528092919081815260200182805461033d90610857565b80156103885780601f1061035f57610100808354040283529160200191610388565b820191905f5260205f20905b81548152906001019060200180831161036b57829003601f168201915b505050505081565b6002805461039d90610857565b80601f01602080910402602001604051908101604052809291908181526020018280546103c990610857565b80156104145780601f106103eb57610100808354040283529160200191610414565b820191905f5260205f20905b8154815290600101906020018083116103f757829003601f168201915b505050505081565b5f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f600454905090565b5f600354905090565b60045481565b5f34116104c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b7906108f7565b60405180910390fd5b600354346004546104d19190610942565b1115610512576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610509906109bf565b60405180910390fd5b3460045f8282546105239190610942565b92505081905550565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b090610a4d565b60405180910390fd5b6003546004541015610600576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f790610ab5565b60405180910390fd5b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60045490811502906040515f60405180830381858888f19350505050158015610664573d5f803e3d5ffd5b50565b60606001805461067690610857565b80601f01602080910402602001604051908101604052809291908181526020018280546106a290610857565b80156106ed5780601f106106c4576101008083540402835291602001916106ed565b820191905f5260205f20905b8154815290600101906020018083116106d057829003601f168201915b5050505050905090565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561072e578082015181840152602081019050610713565b5f8484015250505050565b5f601f19601f8301169050919050565b5f610753826106f7565b61075d8185610701565b935061076d818560208601610711565b61077681610739565b840191505092915050565b5f6020820190508181035f8301526107998184610749565b905092915050565b5f819050919050565b6107b3816107a1565b82525050565b5f6020820190506107cc5f8301846107aa565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6107fb826107d2565b9050919050565b61080b816107f1565b82525050565b5f6020820190506108245f830184610802565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061086e57607f821691505b6020821081036108815761088061082a565b5b50919050565b7f436f6e747269627574696f6e20616d6f756e74206d75737420626520677265615f8201527f746572207468616e203000000000000000000000000000000000000000000000602082015250565b5f6108e1602a83610701565b91506108ec82610887565b604082019050919050565b5f6020820190508181035f83015261090e816108d5565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61094c826107a1565b9150610957836107a1565b925082820190508082111561096f5761096e610915565b5b92915050565b7f476f616c20686173206265656e207265616368656400000000000000000000005f82015250565b5f6109a9601583610701565b91506109b482610975565b602082019050919050565b5f6020820190508181035f8301526109d68161099d565b9050919050565b7f4f6e6c7920746865206f776e65722063616e2063616c6c20746869732066756e5f8201527f6374696f6e000000000000000000000000000000000000000000000000000000602082015250565b5f610a37602583610701565b9150610a42826109dd565b604082019050919050565b5f6020820190508181035f830152610a6481610a2b565b9050919050565b7f476f616c20686173206e6f74206265656e2072656163686564000000000000005f82015250565b5f610a9f601983610701565b9150610aaa82610a6b565b602082019050919050565b5f6020820190508181035f830152610acc81610a93565b905091905056fea2646970667358221220c8f2642431238f2b474ac83f8964b92ae70dd7c05b5939aeda1884e6ad8ba6e664736f6c63430008140033";
const registryAddress = "0x475E8E316223b5C358921e9D3CCafFfCeB3E3b43";
const FundraiserABI = abi.FundraiserABI;
const FundraiserRegistryABI = abi.FundraiserRegistryABI;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Fundraising dApp backend!");
});

app.post("/register", async (req, res) => {
  const userData = req.body;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const existingUser = await db
      .collection("Users")
      .findOne({ userName: userData.userName });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const result = await db.collection("Users").insertOne(userData);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
    });

    client.close();
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Find the user in the 'users' collection based on the email
    const user = await db.collection("Users").findOne({ userName });
    console.log("user: " + user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the user's stored password
    // You should use a secure password hashing library here (e.g., bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return a success response to the client
    res.status(200).json({ message: "Login successful" });

    // Close the MongoDB connection
    client.close();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

app.get("/getID/:username", async (req, res) => {
  const userName = req.params.username;
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Find the user in the 'users' collection based on the email
    const user = await db.collection("Users").findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's unique ID to the client
    console.log(user._id);
    res.status(200).json({ userId: user._id });

    // Close the MongoDB connection
    client.close();
  } catch (error) {
    console.error("Error while fetching user ID:", error);
    res.status(500).json({ error: "An error occurred while fetching user ID" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ error: "An error occurred during logout" });
    }

    res.status(200).json({ message: "Logout successful" });
  });
});

app.post("/create-fundraiser", async (req, res) => {
  try {
    console.log("start");
    const { title, description, goal } = req.body;

    const provider = new HDWalletProvider(mnemonic, infuraKey);
    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();

    const fundraiserContract = new web3.eth.Contract(FundraiserABI);
    const deployTransaction = fundraiserContract.deploy({
      data: fundraiserByteCode,
      arguments: [title, description, goal],
    });
    console.log("2");
    const gas = await deployTransaction.estimateGas({ from: accounts[0] });
    console.log(gas);
    const options = {
      from: accounts[0],
      gas,
    };

    const deployedContract = await deployTransaction.send({
      ...options,
      gasPrice: await web3.eth.getGasPrice(),
    });
    console.log("3");
    const registryContract = new web3.eth.Contract(
      FundraiserRegistryABI,
      registryAddress
    );
    const addContractTransaction = registryContract.methods.registerFundraiser(
      deployedContract.options.address
    );
    console.log("4");
    const addGas = await addContractTransaction.estimateGas({
      from: accounts[0],
    });

    const addOptions = {
      from: accounts[0],
      gas: addGas,
    };

    await addContractTransaction.send({
      ...addOptions,
      gasPrice: await web3.eth.getGasPrice(),
    });

    res.status(200).json({ contractAddress: deployedContract.options.address });
  } catch (error) {
    console.error("Error during contract creation:", error);
    res
      .status(500)
      .json({ error: "An error occurred during contract creation" });
  }
});

app.get("/get-fundraisers", async (req, res) => {
  try {
    const provider = new HDWalletProvider(mnemonic, infuraKey);
    const web3 = new Web3(provider);

    const registryContract = new web3.eth.Contract(
      FundraiserRegistryABI,
      registryAddress
    );
    const fundraiserAddresses = await registryContract.methods
      .getFundraisers()
      .call();

    const fundraisers = [];

    for (const fundraiserAddress of fundraiserAddresses) {
      const fundraiserContract = new web3.eth.Contract(
        FundraiserABI,
        fundraiserAddress
      );
      const title = await fundraiserContract.methods.getTitle().call();
      const description = await fundraiserContract.methods
        .getDescription()
        .call();
      const goal = (
        await fundraiserContract.methods.getGoal().call()
      ).toString();
      const raisedAmount = (
        await fundraiserContract.methods.getRaisedAmount().call()
      ).toString();
      const owner = await fundraiserContract.methods.getOwner().call();

      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      fundraisers.push({
        address: fundraiserAddress,
        title,
        description,
        goal,
        raisedAmount,
        owner,
        userAddress,
      });
    }

    res.status(200).json(fundraisers);
  } catch (error) {
    console.error("Error fetching fundraiser information:", error);
    res.status(500).json({
      error: "An error occurred while fetching fundraiser information",
    });
  }
});

app.get("/get-fundraiser/:address", async (req, res) => {
  try {
    const { address } = req.params;

    const provider = new HDWalletProvider(mnemonic, infuraKey);
    const web3 = new Web3(provider);

    const fundraiserContract = new web3.eth.Contract(FundraiserABI, address);
    const title = await fundraiserContract.methods.getTitle().call();
    const description = await fundraiserContract.methods
      .getDescription()
      .call();
    const goal = (await fundraiserContract.methods.getGoal().call()).toString();
    const raisedAmount = (
      await fundraiserContract.methods.getRaisedAmount().call()
    ).toString();
    const owner = await fundraiserContract.methods.getOwner().call();

    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    const fundraiser = {
      address,
      title,
      description,
      goal,
      raisedAmount,
      owner,
      userAddress,
    };

    res.status(200).json(fundraiser);
  } catch (error) {
    console.error("Error fetching fundraiser details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching fundraiser details" });
  }
});

app.post("/donate/:fundraiserAddress", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("amount: " + amount);
    const { fundraiserAddress } = req.params;
    // console.log("fundraiserAddress: " + fundraiserAddress);

    const provider = new HDWalletProvider(mnemonic, infuraKey); // Replace with your Ethereum node URL
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    const fundraiserContract = new web3.eth.Contract(
      FundraiserABI,
      fundraiserAddress
    );
    // console.log("fundraiser contract: ", fundraiserContract);

    // const etherAmount = web3.utils.toWei(amount.toString(), "ether");
    // console.log("etherAmount: ", etherAmount);
    const weiAmount = web3.utils.toWei(amount, "wei");

    const transaction = fundraiserContract.methods.contribute().send({
      from: accounts[0],
      value: weiAmount,
      gasPrice: await web3.eth.getGasPrice(),
      gas: await fundraiserContract.methods.contribute().estimateGas({
        from: accounts[0],
        value: weiAmount,
      }),
    });

    const result = await transaction;
    console.log("result: " + result.transactionHash);

    res.status(200).json({ transactionHash: result.transactionHash });
  } catch (error) {
    console.error("Error during donation:", error);
    res.status(500).json({ error: "An error occurred during donation" });
  }
});

app.delete("/remove-fundraiser/:fundraiserAddress", async (req, res) => {
  try {
    const { fundraiserAddress } = req.params;

    const provider = new HDWalletProvider(mnemonic, infuraKey);
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    const registryContract = new web3.eth.Contract(
      FundraiserRegistryABI,
      registryAddress
    );

    const transaction =
      registryContract.methods.removeFundraiser(fundraiserAddress);
    console.log(transaction);

    const gas = await transaction.estimateGas({ from: accounts[0] });
    console.log(gas);
    const options = {
      from: accounts[0],
      gas,
    };

    const result = await transaction.send({
      ...options,
      gasPrice: await web3.eth.getGasPrice(),
    });

    res.status(200).json({ transactionHash: result.transactionHash });
  } catch (error) {
    console.error("Error during removal:", error);
    res.status(500).json({ error: "An error occurred during removal" });
  }
});

// app.post("/donate/:fundraiserAddress", async (req, res) => {
//   try {
//     const { amount } = req.body;
//     console.log("amount: " + amount);
//     const { fundraiserAddress } = req.params;
//     console.log("fundraiserAddress: " + fundraiserAddress);

//     const provider = new HDWalletProvider(mnemonic, infuraKey); // Replace with your Ethereum node URL
//     const web3 = new Web3(provider);
//     const accounts = await web3.eth.getAccounts();

//     const fundraiserContract = new web3.eth.Contract(
//       FundraiserABI,
//       fundraiserAddress
//     );
//     // console.log("fundraiser contract: ", fundraiserContract);

//     const etherAmount = web3.utils.toWei(amount.toString(), "ether");
//     console.log("etherAmount: ", etherAmount);

//     const transaction = await fundraiserContract.methods.contribute().send({
//       from: accounts[0],
//       value: etherAmount,
//       gasPrice: await web3.eth.getGasPrice(), // Get the current gas price
//       gas: await fundraiserContract.methods.contribute().estimateGas({
//         from: accounts[0],
//         value: etherAmount,
//       }),
//     });
//     console.log("transaction: " + JSON.stringify(transaction, null, 2));

//     const gas = await transaction.estimateGas({
//       from: accounts[0],
//     });
//     console.log("gas: " + gas);

//     const options = {
//       from: accounts[0],
//       gas,
//       value: etherAmount,
//     };

//     const result = await transaction.send({
//       ...options,
//       gasPrice: await web3.eth.getGasPrice(),
//     });
//     console.log("result: " + result.transactionHash);

//     res.status(200).json({ transactionHash: result.transactionHash });
//   } catch (error) {
//     console.error("Error during donation:", error);
//     res.status(500).json({ error: "An error occurred during donation" });
//   }
// });

// app.post("/donate/:fundraiserAddress", async (req, res) => {
//   try {
//     const { amount } = req.body;
//     console.log("amount " + amount);
//     const { fundraiserAddress } = req.params;
//     console.log(fundraiserAddress);

//     const provider = new HDWalletProvider(mnemonic, infuraKey); // Replace with your Ethereum node URL
//     const web3 = new Web3(provider);
//     const accounts = await web3.eth.getAccounts();

//     const fundraiserContract = new web3.eth.Contract(
//       FundraiserABI,
//       fundraiserAddress
//     );
//     console.log("fundraiser con: " + fundraiserContract);
//     const tempAmount = amount;
//     console.log("temp" + tempAmount);
//     const transaction = fundraiserContract.methods.contribute(tempAmount);
//     console.log("transaction: " + JSON.stringify(transaction, null, 2));
//     try {
//       // const gasLimit = 300000;
//       const gas = await transaction.estimateGas({
//         from: accounts[0],
//         // gas: gasLimit,
//       });
//       console.log("gas: " + gas);
//     } catch (gasError) {
//       console.error("Error estimating gas:", gasError);
//       res.status(500).json({ error: "Error estimating gas" });
//     }
//     const options = {
//       from: accounts[0],
//       // gas,
//     };
//     // Use the provider to send the transaction
//     const result = await transaction.send({
//       ...options,
//       gasPrice: await web3.eth.getGasPrice(),
//     });
//     console.log("result:" + result);
//     res.status(200).json({ transactionHash: result.transactionHash });
//   } catch (error) {
//     console.error("Error during donation:", error);
//     res.status(500).json({ error: "An error occurred during donation" });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
