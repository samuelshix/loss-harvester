use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{self};
mod contexts;
use contexts::*;

declare_id!("3HbRiF7A9vBNwLgkFyafidxPBrTH4W7PUwz8iHPkntsH");

#[program]
pub mod loss_harvester {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.loss_harvester.payer_key = ctx.accounts.payer.key();
        // msg!("Some variable: {:?}", ctx.accounts.loss_harvester.payer_key);
        // ctx.accounts.loss_harvester.nft_account = ctx.accounts.nft_account.to_account_info().key();
        // let (nft_account_authority, _nft_account_bump) =
        //     Pubkey::find_program_address(&[b"nft_account".as_ref()], &id());

        // let (_, harvester_bump) =
        //     Pubkey::find_program_address(&[b"loss_harvester".as_ref()], &id());
        // let harvester_authority_seeds = [&b"loss_harvester"[..], &[harvester_bump]];

        // let _ = token::set_authority(
        //     ctx.accounts.into_set_authority_context(),
        //     AuthorityType::AccountOwner,
        //     Some(nft_account_authority),
        // );

        token::transfer_checked(ctx.accounts.into_transfer_to_pda_context(), 1, 0)?;
        // system_program::create_account(
        //     ctx.accounts.into_create_sol_account(),
        //     1e7 as u64,
        //     0,
        //     &ctx.accounts.loss_harvester.sol_account,
        // )?;
        // transfer sol from harvester account to payer account
        // system_program::transfer(
        //     ctx.accounts
        //         .into_system_transfer_to_payer_context()
        //         .with_signer(&[&harvester_authority_seeds[..]]),
        //     10000000,
        // )?;

        // transfer sol from harvester account to payer account
        let loss_harvester = ctx.accounts.loss_harvester.to_account_info();
        let payer = ctx.accounts.payer.to_account_info();
        **loss_harvester.try_borrow_mut_lamports()? -= 10000000;
        **payer.try_borrow_mut_lamports()? += 10000000;
        // let seeds = &[
        //     &self.loss_harvester.to_account_info().key.to_bytes(),
        //     &[bump_seed][..],
        // ];
        // let loss_harvester = &mut self.loss_harvester;
        // loss_harvester.trader = ctx.accounts.payer.key;

        Ok(())
    }

    pub fn trade(ctx: Context<Trade>) -> Result<()> {
        let (_loss_harvester, harvester_bump) =
            Pubkey::find_program_address(&[b"loss_harvester".as_ref()], &id());
        // let (_nft_account_authority, nft_account_bump) =
        //     Pubkey::find_program_address(&[b"nft_account".as_ref()], &id());

        let harvester_authority_seeds = [&b"loss_harvester"[..], &[harvester_bump]];
        // let nft_account_authority_seeds = [&b"nft_account"[..], &[nft_account_bump]];
        require_keys_eq!(
            ctx.accounts.loss_harvester.payer_key,
            ctx.accounts.payer.key()
        );

        token::transfer_checked(
            ctx.accounts
                .into_transfer_to_payer_context()
                .with_signer(&[&harvester_authority_seeds[..]]),
            1,
            0,
        )?;

        let loss_harvester = ctx.accounts.loss_harvester.to_account_info();
        let payer = ctx.accounts.payer.to_account_info();
        // **loss_harvester.try_borrow_mut_lamports()? += 10000000;
        // **payer.try_borrow_mut_lamports()? -= 10000000;
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
