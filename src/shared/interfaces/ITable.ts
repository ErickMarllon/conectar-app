export interface ITableHead {
  label: string;
  value: string;
  className?: string;
}
export interface ITableHeadGroup {
  columns: ITableHead[];
}
