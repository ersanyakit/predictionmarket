import { ethers } from "hardhat";
const {DiamondFacetList} = require("../libs/facets.js")
const {getSelectors, FacetCutAction} = require("../libs/diamond.js")

async function main() {
    ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);
    const [deployer, otherAccount] = await ethers.getSigners();
    // deploy DiamondCutFacet

    console.log(deployer.address)

    const ARENA_DIAMOND_ADDRESS = "0xB97c8C8C10938a9fC13d64E2722b86A5dF2E1E5b"
    const ARENAFactory = await ethers.getContractFactory('ARENADIAMOND')
    const ARENADIAMOND = await ARENAFactory.attach(ARENA_DIAMOND_ADDRESS)
    await ARENADIAMOND.deployed()
    console.log('ARENADIAMOND deployed:', ARENADIAMOND.address)


    const cut = []
    const facetList = ['Factory'];
    for (const FacetName of facetList) {
        const Facet = await ethers.getContractFactory(FacetName);
        // @ts-ignore
        const facet = await Facet.deploy()
        await facet.deployed()
        console.log(`${FacetName} deployed: ${facet.address}`)
        cut.push({
            target: facet.address,
            action: FacetCutAction.Replace,
            selectors: getSelectors(facet)
        })
    }
    const tx = await ARENADIAMOND.diamondCut(cut, ethers.constants.AddressZero, '0x');
    await tx.wait(2);
    console.log("Updated");








}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});