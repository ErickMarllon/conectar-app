import type { UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export type BaseQueryOptions<
  TQueryFnData,
  TQueryKey extends readonly unknown[],
  TData = TQueryFnData,
  TError = AxiosError,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
