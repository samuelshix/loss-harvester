
import * as anchor from '@coral-xyz/anchor';
import { LossHarvester } from '../target/types/loss_harvester';
import { PublicKey, SystemProgram, Transaction, Keypair, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, MINT_SIZE, TOKEN_PROGRAM_ID, createAssociatedTokenAccountIdempotentInstruction, createInitializeMint2Instruction, createMintToInstruction, getAssociatedTokenAddressSync, getMinimumBalanceForRentExemptMint } from "@solana/spl-token";

describe("loss-harvester", () => {

    anchor.setProvider(anchor.AnchorProvider.env());
    const provider = anchor.getProvider();
    const connection = provider.connection;
    const program = anchor.workspace.LossHarvester as anchor.Program<LossHarvester>;

    const [trader, nftMint] = Array.from({ length: 2 }, () => Keypair.generate());
    const traderNftAccount = getAssociatedTokenAddressSync(nftMint.publicKey, trader.publicKey);

    const [lossHarvester, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("loss_harvester")],
        program.programId
    );
    const programNftAccount = getAssociatedTokenAddressSync(nftMint.publicKey, lossHarvester, true);

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

    it("Airdrop and create mints", async () => {
        let lamports = await getMinimumBalanceForRentExemptMint(connection);
        let tx = new Transaction();
        tx.instructions = [
            SystemProgram.transfer({
                fromPubkey: provider.publicKey!,
                toPubkey: trader.publicKey,
                lamports: 0.02 * LAMPORTS_PER_SOL,
            }),
            SystemProgram.transfer({
                fromPubkey: provider.publicKey!,
                toPubkey: lossHarvester,
                lamports: 0.02 * LAMPORTS_PER_SOL,
            }),
            SystemProgram.createAccount({
                fromPubkey: provider.publicKey!,
                newAccountPubkey: nftMint.publicKey,
                lamports,
                space: MINT_SIZE,
                programId: TOKEN_PROGRAM_ID,
            }),
            ...[
                [nftMint.publicKey, trader.publicKey, traderNftAccount],
            ].flatMap((x) => [
                createInitializeMint2Instruction(x[0], 0, x[1], null),
                createAssociatedTokenAccountIdempotentInstruction(x[1], x[2], x[1], x[0]),
                createAssociatedTokenAccountIdempotentInstruction(provider.publicKey!, programNftAccount, lossHarvester, x[0]),
                createMintToInstruction(x[0], x[2], x[1], 1),
            ]),
        ];
        // console.log(tx.instructions)
        await provider.sendAndConfirm(tx, [nftMint, trader]).then(log);
    });

    // loss_harvester EpYvAXJ3k3DhfqS9oMRpqbeV7fpCs7s43S66QYSuqaFp
    it("Initialize", async () => {
        const instruction = await program.methods
            .initialize()
            .accounts({
                payer: trader.publicKey,
                payerNftMint: nftMint.publicKey,
                payerNftAccount: traderNftAccount,
                nftAccount: programNftAccount,
                lossHarvester: lossHarvester,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            })
            .signers([trader])
            .rpc()
            .then(confirm)
            .then(log);
    });
    it("Trade", async () => {
        const instruction = await program.methods
            .trade()
            .accounts({
                payer: trader.publicKey,
                payerNftMint: nftMint.publicKey,
                payerNftAccount: traderNftAccount,
                nftAccount: programNftAccount,
                lossHarvester: lossHarvester,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            })
            .signers([trader])
            .rpc()
            .then(confirm)
            .then(log);
    })


    const url = `https://devnet.helius-rpc.com/?api-key=`;

    const mintCompressedNft = async () => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'helius-test',
                method: 'mintCompressedNft',
                params: {
                    name: 'Exodia the Forbidden One',
                    symbol: 'ETFO',
                    owner: '2PUjV39pKizp1kUj9SXU2rPMtkTTtQM2xpz94dBu7wUd',
                    description:
                        'Exodia the Forbidden One is a powerful, legendary creature composed of five parts: ' +
                        'the Right Leg, Left Leg, Right Arm, Left Arm, and the Head. When all five parts are assembled, Exodia becomes an unstoppable force.',
                    attributes: [
                        {
                            trait_type: 'Type',
                            value: 'Legendary',
                        },
                        {
                            trait_type: 'Power',
                            value: 'Infinite',
                        },
                        {
                            trait_type: 'Element',
                            value: 'Dark',
                        },
                        {
                            trait_type: 'Rarity',
                            value: 'Mythical',
                        },
                    ],
                    imageUrl:
                        'https://cdna.artstation.com/p/assets/images/images/052/118/830/large/julie-almoneda-03.jpg?1658992401',
                    externalUrl: 'https://www.yugioh-card.com/en/',
                    sellerFeeBasisPoints: 6900,
                },
            }),
        });
        const { result } = await response.json();
        console.log('Minted asset: ', result.assetId);
    };
    mintCompressedNft();
});