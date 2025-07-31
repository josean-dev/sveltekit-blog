export function isDataChanged(
  formData: { [key: string]: any },
  initialData: { [key: string]: any }
) {
  return JSON.stringify(formData) !== JSON.stringify(initialData);
}
