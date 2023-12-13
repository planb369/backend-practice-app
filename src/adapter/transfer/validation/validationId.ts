export function validationId(id: string): boolean {
  const idRegex = /^[A-Z0-9]{32}$/;
  return idRegex.test(id);
}
