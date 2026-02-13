export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length !== 10) return phone;

  return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
}
