export const COIN_IDS = {
  werx: 'WERX',
  btc: 'bitcoin',
};

export enum SearchableItem {
  Address = 'ADDRESS',
  Snapshot = 'SNAPSHOT',
  Transaction = 'TRANSACTION',
}

export enum IconType {
  Address = 'AddressShape',
  Snapshot = 'SnapshotShape',
  Transaction = 'TransactionShape',
  Block = 'BlockShape',
}

export type Network = 'testnet' | 'mainnet';
export type NetworkVersion = '2.0';
export const AVAILABLE_NETWORKS: Record<Network, string> = {
  testnet: 'Testnet',
  mainnet: 'Mainnet',
};
