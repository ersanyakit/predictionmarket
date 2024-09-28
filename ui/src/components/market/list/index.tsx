import { formatData, unixToDateTime } from "@/utils/helpers";
import { FETCH_MARKET_DATA } from "@/utils/web3";
import { Button, Card, CardBody, CardFooter, CardHeader, User } from "@nextui-org/react";
import { formatEther } from "ethers/utils";
import { FC, useEffect, useState } from "react";


export const MarketList: FC<any> = ({ color, className, ...rest }) => {
    const [markets, setMarkets] = useState<any[]>([]);

    const MarketItem = (props: { market: any }) => {

        const ChoiceItem = (props:{choice:any}) => {
            return(
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
                    <CardFooter>
                        <Button fullWidth size="lg" color="danger">Vote</Button>
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
                    <CardBody className="grid grid-cols-4 gap-2 p-2">

                        {
                              props.market.choices.map((choice : any, index : number) => (
                                <ChoiceItem key={index} choice={choice} />
                            ))
                        }


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