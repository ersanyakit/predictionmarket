# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
npx hardhat ignition deploy ./ignition/modules/Arena.ts

```

I have added the Optimistic Oracle library and interfaces, but they are not currently being used anywhere. Once integrated into the Chiliz blockchain, they will be utilized, and the DIAMOND contract will be updated accordingly.