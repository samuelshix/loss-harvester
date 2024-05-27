import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, LossHarvester } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const programId = new PublicKey("2MsxpVjLVPfGmVnh4RDeahbRv65uqvMLJrgTdHxyE8CN");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<LossHarvester>(IDL, programId, {
    connection,
});

// To derive a PDA, we need:
// - the seeds - think of this like an ID or key (in a key-value store)
// - the program address of the program the PDA belongs to

// This gives us the mintPDA that we'll reference when minting stuff
export const [harvesterPDA, harvesterBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("loss_harvester")],
    program.programId,
);

// export type CounterData = IdlAccounts<LossHarvester>["loss_harvester"];