import { ARENA_DIAMOND_CONTRACT, ERC20_CONTRACT } from "@/utils/constants";
import { formatData, unixToDateTime } from "@/utils/helpers";
import { FETCH_MARKET_DATA, GetContractAt, GetSigner } from "@/utils/web3";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner, Tab, Tabs, User } from "@nextui-org/react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { FC, useEffect, useState } from "react";
import { parseEther, parseUnits, formatUnits } from "viem";

export const Resolve: FC<any> = ({ color, className, ...rest }) => {
    const [markets, setMarkets] = useState<any[]>([]);
    const { walletProvider } = useWeb3ModalProvider();
    const [isLoading,setIsLoading] = useState(false)


  
    const loadMarketItems = async () => {
        setIsLoading(true)
        const { data, error } = await FETCH_MARKET_DATA();
        
        if (error) {
            console.log("ERROR", error)
            return;
        } else {
            setMarkets(data.slice().reverse())
            console.log("DATA", data)
        }
        setIsLoading(false)

    }

    const MarketItem = (props: { market: any }) => {

        const ChoiceItem = (props: { marketId: any, choice: any, choiceId: any }) => {
            const [isLoading, setLoaded] = useState(false)

            const handleResolve = async (marketId: any, choiceId: any) => {
                try {
                    setLoaded(true)


                    const signer = await GetSigner(walletProvider);
                    const diamondContract = GetContractAt(ARENA_DIAMOND_CONTRACT);
      


                    console.log("market",marketId)
                    console.log("choiceId",choiceId)
               

                    const tx = await diamondContract
                        .connect(signer)
                        // @ts-ignore
                        .resolve(marketId, choiceId,0);

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
                        <span>minBet : {formatData(props.choice.minBet,0)}</span>
                        <span>maxBet : {formatData(props.choice.maxBet,0)}</span>
                        <span>minPrice : {formatData(props.choice.minPrice,18)} CHZ</span>
                        <span>maxPrice : {formatData(props.choice.maxPrice,18)} CHZ</span>

                    </CardBody>
                    <CardFooter className="flex flex-col gap-2 p-2">
                 
                        <Button isLoading={isLoading} fullWidth size="lg" color="danger" onClick={() => {
                            handleResolve(props.marketId, props.choiceId)
                        }}>Resolve</Button>
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
                        <span>price : {formatUnits(props.bet.price,18)}</span>
                        <span>Amount : {formatUnits(props.bet.amount,0)}</span>
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
                                    <CardBody className="flex flex-col gap-2 p-2">
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


    useEffect(()=>{
        //
    },[markets.length,isLoading])

    useEffect(() => {
        loadMarketItems()
    }, [])

    const renderUnresolvedMarkets = () => {
        if (!markets || markets.length === 0) {
          return <p>No markets available.</p>;
        }
      
        const unresolvedMarkets = markets.filter(item => !item.resolved);
      
        if (unresolvedMarkets.length === 0) {
          return <p>All markets are resolved.</p>;  // Eğer tüm marketler resolved ise bu mesaj gösterilir
        }
      
        return unresolvedMarkets.map((item, index) => (
          <MarketItem key={index} market={item} />
        ));
      };
      

    return(
        <>
        <div className="w-full flex justify-center text-center items-center">
        {
                isLoading && <Spinner color="danger" size="lg" title="Loading..."  labelColor="danger"/>
            }

        </div>
        
        
    <div className="w-full flex flex-col gap-2">
         {!isLoading && renderUnresolvedMarkets()}
 
    </div>
        </>
    )
}