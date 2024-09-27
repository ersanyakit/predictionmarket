import { CreateMarket } from "@/components/market/create";
import { MarketList } from "@/components/market/list";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React from "react";
export default function Home() {
  return (
    <>
 
 <Tabs aria-label="Options">
        <Tab key="markets" title="Markets">
          <Card>
            <CardBody>
              <MarketList/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="create" title="Create">
          <Card>
            <CardBody>
              <CreateMarket/>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </>
  );
}
