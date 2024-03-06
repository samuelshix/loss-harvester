use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, CloseAccount, Mint, TokenAccount, TransferChecked};

use crate::LossHarvester;

#[derive(Accounts)]
pub struct Trade<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        mut,
        associated_token::mint = payer_nft_mint,
        associated_token::authority = loss_harvester,
    )]
    pub nft_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        associated_token::mint = payer_nft_mint,
        associated_token::authority = payer
    )]
    pub payer_nft_account: Account<'info, TokenAccount>,
    pub payer_nft_mint: Account<'info, Mint>,
    #[account(mut)]
    pub loss_harvester: Account<'info, LossHarvester>,
    pub token_program: Program<'info, token::Token>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
impl<'info> Trade<'info> {
    pub fn into_transfer_to_harvester_context(
        &self,
    ) -> CpiContext<'_, '_, '_, 'info, system_program::Transfer<'info>> {
        let cpi_accounts = system_program::Transfer {
            from: self.payer.to_account_info().clone(),
            to: self.loss_harvester.to_account_info().clone(),
        };
        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }

    pub fn into_transfer_to_payer_context(
        &self,
    ) -> CpiContext<'_, '_, '_, 'info, TransferChecked<'info>> {
        let cpi_accounts = TransferChecked {
            from: self.nft_account.to_account_info().clone(),
            mint: self.payer_nft_mint.to_account_info().clone(),
            to: self.payer_nft_account.to_account_info().clone(),
            authority: self.loss_harvester.to_account_info().clone(),
        };
        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }

    pub fn into_close_context(&self) -> CpiContext<'_, '_, '_, 'info, CloseAccount<'info>> {
        let cpi_accounts = CloseAccount {
            account: self.nft_account.to_account_info().clone(),
            destination: self.payer.to_account_info().clone(),
            authority: self.loss_harvester.to_account_info().clone(),
        };
        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }
}
