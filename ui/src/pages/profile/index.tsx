import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getCharacters } from "@/utils/web3";
import classNames from "classnames";

const Profile = () => {
  const [characters, setCharacters] = useState<any>();
  const [isLoaded, setLoaded] = useState<boolean>(false);


  return (
    <>
 
      <div className="flex h-full justify-center items-center w-full py-5">
        <div className="flex flex-col w-[90%] border border-black rounded-xl p-5">
          <div className="overflow-x-auto w-full">
            <div className="min-w-max">
              <div className="grid grid-cols-10 gap-5 min-w-max bg-[#0A1C30] p-2 rounded-t-md">
         aadasdad
              </div>
            
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
