import { Input } from "@nextui-org/react";
import { FC } from "react";


export const CreateMarket: FC<any> = ({ color, className, ...rest }) => {

    return(<>
        <div className="w-full flex flex-col gap-2">
            <div className="w-full">

            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="text" label="Title" />
                <Input type="text" label="Description" />
                <Input type="text" label="LogoURI" />

            </div>
            </div>
            <div className="w-full">

            </div>
        </div>

    </>)
}