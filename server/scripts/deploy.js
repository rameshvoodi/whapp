const { ethers } = require("hardhat");

async function main() {

  const whiteListContract = await ethers.getContractFactory("white");

  const deployedWhiteListContract = await whiteListContract.deploy(10);

  await deployedWhiteListContract.deployed();

  console.log("deployed address: ", deployedWhiteListContract.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });