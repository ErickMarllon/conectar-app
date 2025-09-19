export function formatPhone(countryCode?: string, areaCode?: string, phone_number?: string) {
  if (!countryCode || !areaCode || !phone_number) return null;
  return `${countryCode} (${areaCode}) ${phone_number.replace(/(\d{5})(\d{4})/, '$1-$2')}`;
}

export const formatPhoneNumber = (value: string | undefined) => {
  if (!value) return '';

  let numbers = value.replace(/\D/g, '');
  numbers = numbers.slice(0, 11);

  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
  } else {
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  }
};
