import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { parseEther, parseUnits } from "ethers/lib/utils";

import {ethers} from "hardhat";
import moment from "moment";
import { Factory } from "../typechain";
const {DiamondFacetList} = require("../libs/facets.js")
const {getSelectors, FacetCutAction} = require("../libs/diamond.js")

describe("ARENA", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployArenaDiamond() {
   

    // Contracts are deployed using the first signer/account by default
    const [deployer, user1,user2,user3,user4,user5,user6] = await ethers.getSigners();

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
    const setProtocolFeeTx = await SettingsFacet.setProtocolFee(ethers.utils.parseEther("0.02"));
    await setProtocolFeeTx.wait();
    console.log("DONE:setProtocolFee")
    
    console.log("BEGIN:setFeeReceiver")
    const setFeeReceiverTx = await SettingsFacet.setFeeReceiver(FeeReceiverContract.address);
    await setFeeReceiverTx.wait();
    console.log("DONE:setFeeReceiverTx")


    console.log("BEGIN:setOperators")
    const setOperatorTx = await SettingsFacet.setOperators([deployer.address,user1.address,user2.address,user3.address],true);
    await setOperatorTx.wait();
    console.log("DONE:setOperators")

    

    return { deployer,user1,user2,user3,user4,user5, Arena,SettingsFacet,FactoryFacet,LeaderboardFacet};
  }

  describe("Deployment", function () {
    it("Tests", async function () {
      const { deployer,user1,user2,user3,user4,user5, Arena,SettingsFacet,FactoryFacet,LeaderboardFacet } = await loadFixture(deployArenaDiamond);

      let startedAt = moment().unix()
      let expiredAt = moment(startedAt * 1000).add(7, 'days').unix(); 
      let vestingPeriod = moment(startedAt * 1000).add(10, 'days').unix(); 

      const FanTokenFactory = await ethers.getContractFactory("FanToken")
      const JUVToken = await FanTokenFactory.deploy("JUV","JUV",0,deployer.address);
      const BARToken = await FanTokenFactory.deploy("BAR","BAR",0,deployer.address);
      const ATMToken = await FanTokenFactory.deploy("ATM","ATM",0,deployer.address);
      const SPURSToken = await FanTokenFactory.deploy("SPURS","SPURS",0,deployer.address);

      let  marketCreationParams = {
         startedAt:startedAt,
         expiredAt:expiredAt,
         vestingPeriod:vestingPeriod,
         title:"Who wins in this league?",
         description:"In this league, the victor is determined by skill, strategy, and teamwork. Teams compete in various challenges, and success hinges on players’ ability to adapt and collaborate effectively. The ultimate winner emerges as the best performer across multiple events, showcasing their prowess and commitment to excellence.",
         logo:"https://s3.ap-northeast-2.amazonaws.com/kayen-launchpad/uploads/kayenoffside44094463551702016779297676.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4BNZLBYJ3IZGKL2W%2F20240925%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240925T110422Z&X-Amz-Expires=3600&X-Amz-Signature=ab5fba59370df8886c3cb442225094017a17f0e721ecc6f9ff34587529b252b1&X-Amz-SignedHeaders=host&x-id=GetObject",
         choices:[
           {
             name:"JUV",
             tokenAddress:JUVToken.address
          },
          {
            name:"BAR",
            tokenAddress:BARToken.address
          },
          {
            name:"ATM",
            tokenAddress:ATMToken.address
          },
          {
            name:"SPURS",
            tokenAddress:SPURSToken.address
          },
         ]
    }

    const createTx = await FactoryFacet.create(marketCreationParams);
    await createTx.wait();

    const approveTx = await JUVToken.approve(FactoryFacet.address,ethers.constants.MaxUint256)
    await approveTx.wait()

    const testBetTx = await FactoryFacet.bet(0,0,parseEther("1"),parseUnits("1",0))
    await testBetTx.wait();


    const predictionMarkets = await FactoryFacet.fetch();
    console.log(predictionMarkets[0].choices)

    const resolveTx = await FactoryFacet.resolve(0,0, parseEther("1"))
    await resolveTx.wait();

    const claimTx = await FactoryFacet.claim(0);
    await claimTx.wait()



     
    

    });
 
 

 
  });


});
