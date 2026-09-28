// Israeli market figures used by tools and lessons. Never inline these in
// lesson text. Re-check on the cadence noted; bump lastVerified when you do.
export const IL = {
  lastVerified: '2026-09-10',
  boiRate: 0.0325,               // Bank of Israel, decision of 01/09/2026 (8 decisions a year)
  prime: 0.0475,                 // BoI + 1.5%
  mortgageFixedUnlinked: 0.049,  // BoI stats, July 2026, terms over 20y
  mortgageLinked: 0.034,
  capitalGainsRate: 0.25,        // real gains; מס יסף above ~721,560 ₪/yr
  pensionAvgDepositFee: 0.0164,  // 2026 market average
  pensionAvgBalanceFee: 0.0016,
  pensionDefaultDepositFee: 0.01, // default funds, 2024-2028 tender
  pensionDefaultBalanceFee: 0.0022,
  illustrationReturn: 0.06       // NOT a market figure: labelled as illustration in UI
}
