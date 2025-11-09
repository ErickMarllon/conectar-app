import type { IPaginatedReq } from '@/shared/interfaces/IPaginate';
import type { IPlanParams } from '@/shared/interfaces/IPlan';

export type IList = IPaginatedReq<Partial<IPlanParams>>;
