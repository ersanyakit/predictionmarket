import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getCharacters } from "@/utils/web3";
import classNames from "classnames";

const Stats = () => {
  const [characters, setCharacters] = useState<any>();
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const fetchCharacters = async () => {
    setLoaded(false);
    const _characters = await getCharacters();
    setCharacters(_characters);
    setLoaded(true);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const TITLES = [
    "Name",
    "Body",
    "Chest",
    "Head",
    "Backpack",
    "Right Hand",
    "Left Hand",
    "Face",
    "Total HP",
    "Total Supply",
  ];

  return (
    <>
      <Head>
        <title>Maggoo | Statistics</title>
      </Head>
      <div className="flex h-full justify-center items-center w-full py-5">
        <div className="flex flex-col w-[90%] border border-black rounded-xl p-5">
          {/* Kaydırılabilir kapsayıcı */}
          <div className="overflow-x-auto w-full">
            {/* Başlık ve İçerik Bölümünü Aynı Kapsayıcı İçine Al */}
            <div className="min-w-max">
              {/* Başlık Bölümü */}
              <div className="grid grid-cols-10 gap-5 min-w-max bg-[#0A1C30] p-2 rounded-t-md">
                {TITLES.map((item: string, index: number) => (
                  <div
                    key={"titles_keys_key_" + index.toString()}
                    className={classNames(
                      "flex w-full",
                      item === "Name" ? "justify-start" : "justify-center"
                    )}
                  >
                    <p className="">{item}</p>
                  </div>
                ))}
              </div>
              {/* İçerik Bölümü */}
              <div className="grid grid-cols-10 gap-5 min-w-max bg-[#122638] p-2 rounded-b-md">
                {isLoaded === true && characters && (
                  <>
                    {characters.map((item: any, index: number) => (
                      <React.Fragment key={item.name + index.toString()}>
                        <div className="flex w-full justify-start whitespace-nowrap">
                          <span className="text-[#f9843f]">{item.Name}</span>
                        </div>
                        <div className="flex w-full justify-center gap-2 whitespace-nowrap">
                          <span>{item.BodyMint.toString()}</span>
                          <span className="text-success">
                            +{item.Body.toString()} HP
                          </span>
                        </div>
                        <div className="flex w-full justify-center gap-2 whitespace-nowrap">
                          <span>{item.ChestArmorMint.toString()}</span>
                          <span className="text-success">
                            +{item.ChestArmor.toString()} HP
                          </span>
                        </div>
                        <div className="flex w-full justify-center gap-2 whitespace-nowrap">
                          <span>{item.HeadgearMint.toString()}</span>
                          <span className="text-success">
                            +{item.Headgear.toString()} HP
                          </span>
                        </div>
                        <div className="flex w-full justify-center gap-2 whitespace-nowrap">
                          <span>{item.BackpackMint.toString()}</span>
                          <span className="text-success">
                            +{item.Backpack.toString()} HP
                          </span>
                        </div>
                        <div className="flex w-full justify-center gap-2 whitespace-nowrap">
                          <span>{item.RightHandMint.toString()}</span>
                          <span className="text-success">
                            +{item.RightHand.toString()} HP
                          </span>
                        </div>
                        <div className="flex w-full justify-center gap-2 whitespace-nowrap">
                          <span>{item.LeftHandMint.toString()}</span>
                          <span className="text-success">
                            +{item.LeftHand.toString()} HP
                          </span>
                        </div>
                        <div className="flex w-full justify-center gap-2 whitespace-nowrap">
                          <span>{item.FaceMint.toString()}</span>
                          <span className="text-success">
                            +{item.Face.toString()} HP
                          </span>
                        </div>
                        <div className="flex w-full justify-center whitespace-nowrap">
                          <span>{item.TotalHP.toString()}</span>
                        </div>
                        <div className="flex w-full justify-center whitespace-nowrap">
                          <span>{item.TotalSupply.toString()}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
