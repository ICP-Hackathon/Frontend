export function txScanURL(txHash: string) {
  const baseUrl = "https://suiscan.xyz/testnet/tx/";
  return baseUrl + txHash;
}
