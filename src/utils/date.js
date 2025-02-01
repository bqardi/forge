export function formatDate(date, options = {}) {
  const { locale, ...rest } = options;
  const defaultValues = {
    locale: "en-US",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
  };
  return new Intl.DateTimeFormat(locale, {
    ...defaultValues,
    ...rest,
  }).format(date);
}
