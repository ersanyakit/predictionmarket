import { ethers } from "hardhat";
const {DiamondFacetList} = require("../libs/facets.js")
const {getSelectors, FacetCutAction} = require("../libs/diamond.js")
const hre = require("hardhat");

async function main() {

    const chainId = hre.network.config.chainId;

    const ETHER_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
    const WRAPPED_CHILIZ = "0x677F7e16C7Dd57be1D4C8aD1244883214953DC47"

    const ROUTER_KAYEN = "0xE2918AA38088878546c1A18F2F9b1BC83297fdD3"
    const ROUTER_KEWL = "0xA0BB8f9865f732C277d0C162249A4F6c157ae9D0"

    const [deployer] = await ethers.getSigners();
    
    console.log("Deployer",deployer.address)
    const ArenaFactory = await ethers.getContractFactory("Arena");
    const Arena = await ArenaFactory.deploy("ARENA PREDICTION MARKET","ARENA");
    await Arena.deployed()
    console.log("ARENA",Arena.address)

    const cut = []
    for (const FacetName of DiamondFacetList) {
        console.log("FACET NAME:", FacetName)
        const FacetFactory = await ethers.getContractFactory(FacetName);
        // @ts-ignore
        const facet = await FacetFactory.deploy()
        console.log(`${FacetName} deployed: ${facet.address}`)
        cut.push({target: facet.address, action: FacetCutAction.Add, selectors: getSelectors(facet)})
    }
    const tx = await Arena.diamondCut(cut, ethers.constants.AddressZero, '0x');
    await tx.wait(1);

    const SettingsFacet = await ethers.getContractAt("Settings",Arena.address)
    const FactoryFacet = await ethers.getContractAt("Factory",Arena.address)
    const LeaderboardFacet = await ethers.getContractAt("Leaderboard",Arena.address)

    console.log("BEGIN:FeeReceiverContract")
    const FeeReceiverFactory =  await ethers.getContractFactory("FeeReceiver");
    const FeeReceiverContract = await FeeReceiverFactory.deploy(deployer.address)
    await FeeReceiverContract.deployed()
    console.log("END:FeeReceiverContract")

    console.log("BEGIN:setProtocolFee")
    const setProtocolFeeTx = await SettingsFacet.setProtocolFee(ethers.utils.parseEther("0.03"));
    await setProtocolFeeTx.wait();
    console.log("DONE:setProtocolFee")
    
    console.log("BEGIN:setFeeReceiver")
    const setFeeReceiverTx = await SettingsFacet.setFeeReceiver(FeeReceiverContract.address);
    await setFeeReceiverTx.wait();
    console.log("DONE:setFeeReceiverTx")

    console.log("BEGIN:WCHZ")
    const setWCHZ = await SettingsFacet.setWETH9(WRAPPED_CHILIZ);
    await setWCHZ.wait();
    console.log("DONE:WCHZ")
    



    console.log("DONE.")

    



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});