import { NFT } from "./ChooseNFT";
interface NFTElementProps {
    index: number;
    nft: NFT;
}
import { useState } from "react";

const NFTElement: React.FC<NFTElementProps> = ({ index, nft }) => {
    return (
        <>
            <div key={index} className="flex flex-col items-left p-5 bg-green-900/10 rounded-lg hover:opacity-80 ease-in-out transition cursor-pointer">
                <div className="grid grid-cols-2 grid-flow-row">
                    <p className="text-xs font-light">{nft.collectionName}</p>
                    <a href={`https://solana.fm/address/${nft.mintAddress}`} target="_blank" className="text-xs ml-auto">SolanaFM</a>
                </div>
                <img src={nft.image} alt={nft.collectionName} width="auto" height="auto" />
                <p>Floor: {Math.round(nft.price * 1000) / 1000} SOL</p>
            </div>
        </>
    )
}
export default NFTElement;