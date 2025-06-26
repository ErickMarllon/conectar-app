export interface IRecoveryPasswordData {
  step: number;
  email: string;
  uuid: string;
  token: string | null;
}
