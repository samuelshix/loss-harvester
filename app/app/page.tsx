"use client"
import ChooseNFT, { NFT } from "@/components/ChooseNFT";
import Image from "next/image";
import { useState } from "react";
import * as LossHarvester from "@/functions/LossHarvesterHooks";
import { program } from "@/anchor/setup";
import InitializeHarvest from "./functions/initialize";

export default function Home() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [harvestNftStatus, setHarvestNftStatus] = useState<string>('');
  const handleSelectedNFT = (selectedNFT: NFT) => {
    setSelectedNFT(selectedNFT);
  };


  const harvestNft = async () => { }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 pt-10">
      <div className="z-10 mb-24 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h2 className="text-2xl font-bold">
          Loss Harvester
        </h2>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
        </div>
      </div>

      <div className="absolute -top-40 flex place-items-center before:top-0 after:top-0 before:absolute before:h-[300px] before:w-full sm:before:w-[500px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[340px] after:bg-gradient-conic after:from-lime-200 after:via-green-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700 before:dark:opacity-10 after:dark:from-lime-900 after:dark:via-[#32CD32] after:dark:opacity-20 before:lg:h-[360px] z-[-1]">
      </div>
      <div className="grid text-center lg:max-w-5xl lg:w-full lg:text-left">
        <div className="rounded-lg h-full outline outline-lime-500/20 outline-1 p-5">
          <h2 className="mb-3 text-2xl font-semibold opacity-100 flex flex-row">
            Choose An NFT <p className="animate-float">&#8595;</p>
          </h2>
          <ChooseNFT onNFTSelected={handleSelectedNFT} />
        </div>
      </div>


      <div className="mb-32 rounded-lg h-full relative lg:max-w-5xl lg:w-full outline-lime-500/20">
        {selectedNFT ? (
          <>
            <InitializeHarvest selectedNFT={selectedNFT} />
          </>
        ) : (<div className="absolute -inset-5 bg-black/30"></div>)
        }
      </div>
      <div className="grid grid-cols-2 lg:max-w-5xl lg:w-full">
        {/* <div className="bg-black/10 backdrop-blur-lg ba z-30 h-screen w-full absolute">
        </div> */}
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:dark:bg-neutral-800/5 bg-lime-500"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Losses Harvested
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
            $1035.00
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-70`}>
            Amount of taxable losses to offset income for this year. Learn more <a className="font-bold">here</a>
          </p>
        </div>
        <Image alt="Image" src="/cyberharvester.jpeg" width={450} height={900} />
      </div>
    </div>
  );
}
