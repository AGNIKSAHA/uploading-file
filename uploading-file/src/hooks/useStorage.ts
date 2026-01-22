export interface StorageInfo {
  usedGB: number;
  totalGB: number;
}

export function useStorage(): StorageInfo {
  return {
    usedGB: 6.4,
    totalGB: 15,
  };
}
