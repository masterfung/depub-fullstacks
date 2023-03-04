export const WALLET_PROVIDER_KEY = "freePub_address";

export function SaveProviderToLocalStorage(provider: string) {
  localStorage.setItem(WALLET_PROVIDER_KEY, JSON.stringify(provider));
}

export function RemoveProviderFromLocalStorage() {
  localStorage.removeItem(WALLET_PROVIDER_KEY);
}

export function GetProviderFromLocalStorage() {
  return localStorage.getItem(WALLET_PROVIDER_KEY);
}