import { formatData, unixToDateTime } from "@/utils/helpers";
import { FETCH_MARKET_DATA } from "@/utils/web3";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Tab, Tabs, User } from "@nextui-org/react";
import { formatEther } from "ethers/utils";
import { FC, useEffect, useState } from "react";


export const MarketList: FC<any> = ({ color, className, ...rest }) => {
    const [markets, setMarkets] = useState<any[]>([]);

    const MarketItem = (props: { market: any }) => {
        const [isLoading, setLoaded] = useState(false)

        const ChoiceItem = (props: { marketId: any, choice: any, choiceId: any }) => {


            const handleVote = async (marketId: any, choiceId: any) => {

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
                        <Input type="text" label="Price" />
                        <Input type="text" label="Amount" />
                        <Button isLoading={isLoading} fullWidth size="lg" color="danger" onClick={() => {
                            handleVote(props.marketId, props.choiceId)
                        }}>Vote</Button>
                    </CardFooter>
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
                            <Tab key="bettors" title="Bettors">
                                <Card>
                                    <CardBody>
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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