export interface IAddress {
  id: string;
  zip_code: string;
  neighborhood: string;
  street: string;
  street_number: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}
