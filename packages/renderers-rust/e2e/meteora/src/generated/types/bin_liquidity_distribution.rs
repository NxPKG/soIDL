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
pub struct BinLiquidityDistribution {
    /// Define the bin ID wish to deposit to.
    pub bin_id: i32,
    /// DistributionX (or distributionY) is the percentages of amountX (or amountY) you want to add to each bin.
    pub distribution_x: u16,
    /// DistributionX (or distributionY) is the percentages of amountX (or amountY) you want to add to each bin.
    pub distribution_y: u16,
}
