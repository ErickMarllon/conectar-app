import type { IAddress } from '@/shared/interfaces/IAddress';

export const getUserAddressDefault = (addresses?: IAddress[]): IAddress | undefined =>
  addresses?.find((a) => a.is_default);
