"use client"
import ChooseNFT, { NFT } from "@/components/ChooseNFT";
import Image from "next/image";
import { useState } from "react";
import * as LossHarvester from "@/hooks/LossHarvesterHooks";
export default function Home() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [harvestNftStatus, setHarvestNftStatus] = useState<string>('');
  const handleSelectedNFT = (selectedNFT: NFT) => {
    setSelectedNFT(selectedNFT);
  };

  const harvestNft = () => {
    setHarvestNftStatus('Harvesting...');
    LossHarvester.initialize(selectedNFT!).then((result) => {
      console.log(result);
    })
  }
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


      <div className="mb-32 rounded-lg h-full flex items-center justify-center relative lg:max-w-5xl lg:w-full outline-lime-500/20">
        {selectedNFT ? (
          <>
            <button className="w-full p-3 my-5 text-2xl font-semibold opacity-100 rounded-lg text-lime-500 outline outline-lime-500/20 rounded-lg outline-1 cursor-pointer hover:bg-lime-600 hover:text-white transition-colors" onClick={() => harvestNft()}>
              Harvest Losses
            </button>
            { }
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-900 animate-spin dark:text-gray-900 fill-lime-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
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
