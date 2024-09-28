import { IContract } from "@/types";
import { ARENA_DIAMOND_CONTRACT, ERC20_CONTRACT } from "@/utils/constants";
import { formatData, unixToDateTime } from "@/utils/helpers";
import { FETCH_MARKET_DATA, GetContractAt, GetSigner, selectedClient } from "@/utils/web3";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Tab, Tabs, User } from "@nextui-org/react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { formatEther, parseEther } from "ethers/utils";
import { FC, useEffect, useState } from "react";
import ERC20_ABI from "@/contracts/abi/ERC20.json";
import { ethers } from "ethers";
import { getContract, parseUnits } from "viem";


export const MarketList: FC<any> = ({ color, className, ...rest }) => {
    const [markets, setMarkets] = useState<any[]>([]);
    const { walletProvider } = useWeb3ModalProvider();

    const MarketItem = (props: { market: any }) => {

        const ChoiceItem = (props: { marketId: any, choice: any, choiceId: any }) => {
            const [price, setPrice] = useState("0")
            const [amount, setAmount] = useState("0")
            const [isLoading, setLoaded] = useState(false)

            const handleVote = async (marketId: any, choiceId: any, tokenAddress: any) => {
                try {
                    setLoaded(true)


                    const signer = await GetSigner(walletProvider);
                    const diamondContract = GetContractAt(ARENA_DIAMOND_CONTRACT);
      
                    const erc20Contract =  GetContractAt(ERC20_CONTRACT(tokenAddress));
                


                    const maxAmount = ethers.MaxUint256

                    const allowanceAmount = await erc20Contract.allowance(signer.address,ARENA_DIAMOND_CONTRACT.address);

                    if(allowanceAmount < maxAmount){
                        //@ts-ignore
                        const approveTx = erc20Contract.connect(signer).approve(ARENA_DIAMOND_CONTRACT.address,maxAmount)
                        await approveTx.wait();
    
                    }
                    console.log("allowanceAmount",allowanceAmount,tokenAddress)

                    let depositOverrides = {
                        value: 0,
                    };

                    // bet(uint256 marketId, uint256 choiceId, uint256 price,  uint256 amount) external  whenNotPaused nonReentrant payable{



                    console.log("market",marketId)
                    console.log("choiceId",choiceId)
                    console.log("price",parseEther(price))
                    console.log("amount",parseUnits(amount,0))

                    const tx = await diamondContract
                        .connect(signer)
                        // @ts-ignore
                        .bet(marketId, choiceId, parseEther(price), parseUnits(amount,0), depositOverrides);

                    await tx.wait();
                    setLoaded(false)

                } catch (error) {
                    console.log(error)
                    setLoaded(false)
                }
            }

            return (
                <Card className="w-full flex flex-col gap-2">
                    <CardHeader>
                        {props.choice.name}
                    </CardHeader>
                    <CardBody>
                        <span>Name : {props.choice.name}</span>
                        <span>Token : {props.choice.tokenAddress}</span>
                        <span>userCount : {Number(props.choice.userCount)}</span>
                        <span>minBet : {formatData(props.choice.minBet)}</span>
                        <span>maxBet : {formatData(props.choice.maxBet)}</span>
                        <span>minPrice : {formatData(props.choice.minPrice)} CHZ</span>
                        <span>maxPrice : {formatData(props.choice.maxPrice)} CHZ</span>

                    </CardBody>
                    <CardFooter className="flex flex-col gap-2 p-2">
                        <Input type="text" label="Price" value={price}
                            onValueChange={setPrice} />
                        <Input type="text" label="Amount" value={amount}
                            onValueChange={setAmount} />
                        <Button isLoading={isLoading} fullWidth size="lg" color="danger" onClick={() => {
                            handleVote(props.marketId, props.choiceId, props.choice.tokenAddress)
                        }}>Vote</Button>
                    </CardFooter>
                </Card>
            )
        }

        const BetItem = (props: { bet: any, marketId: any }) => {

            return (
                <Card>
                    <div className="w-full flex flex-col gap-2 p-2">
                        <span>Valid : {props.bet.valid ? "YES" : "NO"}</span>
                        <span>BetId : {Number(props.bet.betId)}</span>
                        <span>choiceId : {Number(props.bet.choiceId)}</span>
                        <span>price : {formatEther(props.bet.price)}</span>
                        <span>Amount : {formatEther(props.bet.amount)}</span>
                        <span>Created At : {unixToDateTime(props.bet.createdAt)}</span>
                        <span>Address : {props.bet.bettor}</span>
                    </div>
                </Card>
            )

        }
        return (
            <>


                <Card>
                    <CardHeader>
                        <div className="w-full flex flex-row gap-2 justify-start items-center">
                            <User
                                name={props.market.title}
                                description={props.market.description}
                                avatarProps={{
                                    src: props.market.logo
                                }}
                            />

                        </div>

                    </CardHeader>
                    <CardBody >
                        <Tabs aria-label="Options">
                            <Tab key="choice" title="Choice">
                                <Card>
                                    <CardBody className="grid grid-cols-4 gap-2 p-2">
                                        {
                                            props.market.choices.map((choice: any, index: number) => (
                                                <ChoiceItem key={index} choice={choice} choiceId={index} marketId={props.market.id} />
                                            ))
                                        }

                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="voters" title="Voters">
                                <Card>
                                    <CardBody>
                                        {
                                            props.market.bets.map((bet: any, index: number) => (
                                                <BetItem key={index} bet={bet} marketId={props.market.id} />
                                            ))
                                        }

                                    </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>



                    </CardBody>
                    <CardFooter>
                        <div className="w-full flex flex-col gap-2 p-2">
                            <span className="text-sm">Created Date : {unixToDateTime(props.market.createdAt)}</span>
                            <span className="text-sm">Started Date : {unixToDateTime(props.market.createdAt)}</span>
                            <span className="text-sm">Expire Date : {unixToDateTime(props.market.expiredAt)}</span>
                        </div>

                    </CardFooter>
                </Card>
            </>
        )
    }

    const loadMarketItems = async () => {
        const { data, error } = await FETCH_MARKET_DATA();

        if (error) {
            console.log("ERROR", error)
            return;
        } else {
            setMarkets(data)
            console.log("DATA", data)
        }

    }


    useEffect(() => {
        loadMarketItems()
    }, [])


    return (<>
        <div className="w-full flex flex-col gap-2">
            {markets.map((item, index) => (
                <MarketItem key={index} market={item} />
            ))}
        </div>

    </>)
}