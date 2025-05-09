//! This code was AUTOGENERATED using the soidl library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun soidl to update it.
//!
//! <https://github.com/soidl-idl/soidl>
//!

use borsh::BorshDeserialize;
use borsh::BorshSerialize;

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct Oracle {
    pub discriminator: [u8; 8],
    /// Index of latest observation
    pub idx: u64,
    /// Size of active sample. Active sample is initialized observation.
    pub active_size: u64,
    /// Number of observations
    pub length: u64,
}

impl Oracle {
    pub const LEN: usize = 32;

    #[inline(always)]
    pub fn from_bytes(data: &[u8]) -> Result<Self, std::io::Error> {
        let mut data = data;
        Self::deserialize(&mut data)
    }
}

impl<'a> TryFrom<&solana_program::account_info::AccountInfo<'a>> for Oracle {
    type Error = std::io::Error;

    fn try_from(
        account_info: &solana_program::account_info::AccountInfo<'a>,
    ) -> Result<Self, Self::Error> {
        let mut data: &[u8] = &(*account_info.data).borrow();
        Self::deserialize(&mut data)
    }
}

#[cfg(feature = "anchor")]
impl anchor_lang::AccountDeserialize for Oracle {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> anchor_lang::Result<Self> {
        Ok(Self::deserialize(buf)?)
    }
}

#[cfg(feature = "anchor")]
impl anchor_lang::AccountSerialize for Oracle {}

#[cfg(feature = "anchor")]
impl anchor_lang::Owner for Oracle {
    fn owner() -> Pubkey {
        crate::LB_CLMM_ID
    }
}

#[cfg(feature = "anchor-idl-build")]
impl anchor_lang::IdlBuild for Oracle {}

#[cfg(feature = "anchor-idl-build")]
impl anchor_lang::Discriminator for Oracle {
    const DISCRIMINATOR: [u8; 8] = [0; 8];
}
