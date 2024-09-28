import { FETCH_MARKET_DATA } from "@/utils/web3";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { FC, useEffect } from "react";


export const MarketList: FC<any> = ({ color, className, ...rest }) => {

    
    const MarketItem = (marketItem:any) => {


        return (
            <>
                <Card>
                    <CardHeader>

                    </CardHeader>
                    <CardBody>

                    </CardBody>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </>
        )
    }

    const loadMarketItems = async () => {
        const { data, error } = await FETCH_MARKET_DATA();    
    
        if(error){
            console.log("ERROR",error)
            return;
        }else{
            console.log("DATA",data)
        }
        
    }


    useEffect(()=>{
        loadMarketItems()
    },[])


    return(<>
        
    </>)
}