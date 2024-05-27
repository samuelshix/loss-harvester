use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{self};
mod contexts;
use contexts::*;

declare_id!("2MsxpVjLVPfGmVnh4RDeahbRv65uqvMLJrgTdHxyE8CN");

#[program]
pub mod loss_harvester {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.loss_harvester.payer_key = ctx.accounts.payer.key();

        // transfer nft from payer account to loss harvester account
        token::transfer_checked(ctx.accounts.into_transfer_to_pda_context(), 1, 0)?;

        // transfer sol from harvester account to payer account
        let loss_harvester = ctx.accounts.loss_harvester.to_account_info();
        let payer = ctx.accounts.payer.to_account_info();
        **loss_harvester.try_borrow_mut_lamports()? -= 10000000;
        **payer.try_borrow_mut_lamports()? += 10000000;

        Ok(())
    }

    pub fn trade(ctx: Context<Trade>) -> Result<()> {
        let (_loss_harvester, harvester_bump) =
            Pubkey::find_program_address(&[b"loss_harvester".as_ref()], &id());

        let harvester_authority_seeds = [&b"loss_harvester"[..], &[harvester_bump]];
        // let nft_account_authority_seeds = [&b"nft_account"[..], &[nft_account_bump]];
        require_keys_eq!(
            ctx.accounts.loss_harvester.payer_key,
            ctx.accounts.payer.key()
        );

        // transfer nft from loss harvester to payer
        token::transfer_checked(
            ctx.accounts
                .into_transfer_to_payer_context()
                .with_signer(&[&harvester_authority_seeds[..]]),
            1,
            0,
        )?;

        // let loss_harvester = ctx.accounts.loss_harvester.to_account_info();
        // let payer = ctx.accounts.payer.to_account_info();
        // **loss_harvester.try_borrow_mut_lamports()? += 10000000;
        // **payer.try_borrow_mut_lamports()? -= 10000000;

        // transfer sol from payer to harvester
        system_program::transfer(ctx.accounts.into_transfer_to_harvester_context(), 10000000)?;
        token::close_account(
            ctx.accounts
                .into_close_context()
                .with_signer(&[&harvester_authority_seeds[..]]),
        )?;

        Ok(())
    }
}

#[account]
// #[derive(Default)]
pub struct LossHarvester {
    pub payer_key: Pubkey,
    // pub sol_account: Pubkey,
    // pub seed: u64
    // pub nft_account: Pubkey,
}
