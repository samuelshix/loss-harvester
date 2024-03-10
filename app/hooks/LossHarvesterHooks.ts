import { NFT } from '@/components/ChooseNFT';
import * as anchor from '@coral-xyz/anchor';
import { useConnection, useAnchorWallet, AnchorWallet } from "@solana/wallet-adapter-react";
import { IDL, LossHarvester } from '../../target/types/loss_harvester';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token';

const { connection } = useConnection();
const wallet = useAnchorWallet();
const provider = new anchor.AnchorProvider(
    connection,
    wallet as unknown as AnchorWallet,
    {}
);
const PROGRAM_ID = new PublicKey("3HbRiF7A9vBNwLgkFyafidxPBrTH4W7PUwz8iHPkntsH");
const program = new anchor.Program<LossHarvester>(IDL, PROGRAM_ID, provider);

export const initialize = async (nft: NFT) => {
    const nftMint = new PublicKey(nft.mintAddress);
    const [lossHarvester, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("loss_harvester")],
        program.programId
    );
    const trader = wallet;
    const traderNftAccount = getAssociatedTokenAddressSync(nftMint, trader?.publicKey!);
    const programNftAccount = getAssociatedTokenAddressSync(nftMint, lossHarvester, true);

    const tx = await program.methods
        .initialize()
        .accounts({
            payer: trader?.publicKey!,
            payerNftMint: nftMint,
            payerNftAccount: traderNftAccount,
            nftAccount: programNftAccount,
            lossHarvester: lossHarvester,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .transaction();

    trader?.signTransaction(tx)
        .then(res => confirm(res.signature?.toString()!))
        .then(log);
};


const confirm = async (signature: string): Promise<string> => {
    const block = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        signature,
        ...block,
    });
    return signature;
};

const log = async (signature: string): Promise<string> => {
    console.log(
        `Your transaction signature: https://solana.fm/tx/${signature}`
    );
    return signature;
};