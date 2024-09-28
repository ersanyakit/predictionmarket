import { MarketCreationForm } from "@/components/market/create";
import { MarketList } from "@/components/market/list";
import { Resolve } from "@/components/market/resolve";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React from "react";
export default function Home() {
  return (
    <>
 
 <Tabs  aria-label="Options">
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
              <MarketCreationForm/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="resolve" title="Resolve">
        <Card>
        <CardBody>
              <Resolve/>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </>
  );
}
