use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, TokenAccount, TransferChecked},
};

use crate::LossHarvester;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    // #[account(mut)]
    // pub authority: AccountInfo<'info>,
    pub payer_nft_mint: Account<'info, Mint>,
    #[account(
        mut,
        associated_token::mint = payer_nft_mint,
        associated_token::authority = payer
    )]
    pub payer_nft_account: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = payer,
        space = 8 + 64,
        seeds=[b"loss_harvester".as_ref()],
        bump
    )]
    pub loss_harvester: Account<'info, LossHarvester>,
    // #[account(
    //     init,
    //     payer = payer,
    //     space = solana_program::system_program::ACCOUNT_LEN,
    //     seeds=[b"sol_account".as_ref()],
    //     bump
    // )]
    // pub sol_account: Account<'info, SystemAccount>,
    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = payer_nft_mint,
        associated_token::authority = loss_harvester,
        // bump
        // seeds = [b"loss_harvester".as_ref()],
        // bump = loss_harvester.bump
    )]
    pub nft_account: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl<'info> Initialize<'info> {
    pub fn into_transfer_to_pda_context(
        &self,
    ) -> CpiContext<'_, '_, '_, 'info, TransferChecked<'info>> {
        let cpi_accounts = TransferChecked {
            from: self.payer_nft_account.to_account_info().clone(),
            to: self.nft_account.to_account_info().clone(),
            mint: self.payer_nft_mint.to_account_info().clone(),
            authority: self.payer.to_account_info().clone(),
        };
        return CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts);
    }

    pub fn into_system_transfer_to_payer_context(
        &self,
    ) -> CpiContext<'_, '_, '_, 'info, system_program::Transfer<'info>> {
        let cpi_accounts = system_program::Transfer {
            from: self.loss_harvester.to_account_info().clone(),
            // mint: self.payer_nft_mint.to_account_info().clone(),
            to: self.payer.to_account_info().clone(),
            // authority: self.payer.to_account_info().clone(),
        };
        CpiContext::new(self.system_program.to_account_info().clone(), cpi_accounts)
    }
}
