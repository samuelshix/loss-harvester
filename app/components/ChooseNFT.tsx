import { AnchorError, getProvider } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import Image from "next/image";
import { useEffect, useState } from 'react';
import NFTElement from "./NFTElement";

type NFT = {
    // content: {
    //     files: {
    //         uri: string;
    //     }[],
    //     metadata: {
    //         name: string;
    //     };
    // };
    price: number;
    mintAddress: string;
    collectionName: string;
    image: string;
};
export type { NFT };

export default function ChooseNFT({ onNFTSelected }: { onNFTSelected: (nft: NFT) => void }) {
    // const provider = getProvider();
    // const url = `https://${process.env.NEXT_PUBLIC_NETWORK}.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;
    // const url = `https://mainnet.helius-rpc.com/?api-key=fe747626-9a79-4cfe-a1d0-a32f83a6c3a7`;
    const { publicKey, sendTransaction } = useWallet();
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
    const [nftIndexSelected, setNftIndexSelected] = useState<number>(-1);

    useEffect(() => {
        if (selectedNFT) {
            onNFTSelected(selectedNFT);
        }
    }, [selectedNFT])

    const getAssetsByOwner = async () => {
        const response = await fetch(`/api/get-nfts/${publicKey}/tokens`);
        if (!response.ok) {
            console.log('Error status:', response.status);
            console.log('Error status text:', response.statusText);
        }
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            console.log('Invalid content type:', contentType);
        }


        // const response = await fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        // const response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         jsonrpc: '2.0',
        //         id: 'my-id',
        //         method: 'getAssetsByOwner',
        //         params: {
        //             ownerAddress: publicKey?.toBase58(),
        //             page: 1, // Starts at 1
        //             limit: 1000,
        //         },
        //     }),
        // });
        const result = await response.json();
        console.log(result);

        // console.log(result.items.filter((item: any) => !item.content.files || !item.content.files[0]))
        setNfts(result);
    };

    // useEffect(() => {
    //     getAssetsByOwner();
    // }, [])


    return (
        <>
            <button onClick={getAssetsByOwner} className="bg-lime-500 p-2 rounded-md text-black ease-in-out hover:bg-lime-400 transition-colors">
                View NFTs
            </button>
            <div className="grid grid-cols-5">
                {/* {nfts.map((nft, index) => {
                    console.log(nft)
                    if (nft.content.files && nft.content.files[0]) {
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <p className="text-xs font-light">{nft.content.metadata.name}</p>
                                <a href="">
                                    <img src={nft.content.files[0].uri} alt={nft.content.metadata.name} width={100} height={100} />
                                </a>
                            </div>
                        )
                    }
                })} */}
                {nfts ? nfts.map((nft, index) => {
                    return (
                        <div className="relative mt-3 mr-3" onClick={() => {
                            setSelectedNFT(nft);
                            setNftIndexSelected(index);
                        }}>
                            {nftIndexSelected == index && <div className="absolute flex bg-white/20 inset-0  rounded-lg flex justify-center items-center fill-white cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg></div>}

                            <NFTElement index={index} nft={nft} />
                        </div>
                    )

                }) : <p>No NFTs found</p>}
            </div>
        </>
    )
}