export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function prettifySlug(slug) {
  return slug.replace(/-/g, " ").replace(/\w\S*/g, (txt) => {
    return firstCharacterToUppercase(txt);
  });
}

export function firstCharacterToUppercase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
