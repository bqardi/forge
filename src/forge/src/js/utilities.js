export function registerDuplicateIDs() {
  // Do not check for duplicate IDs in production (they should be taken care of in development!).
  if (process.env.NODE_ENV === "production") return;

  const elements = document.querySelectorAll("[id]");
  const ids = Array.from(elements).map((element) => element.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    console.warn(
      "Duplicate IDs found:",
      [...elements]
        .filter((element) => duplicates.includes(element.id))
        .map((element) => ({
          id: element.id,
          element,
          tagName: element.tagName,
          textContent: element.textContent,
        }))
    );
  }
}

export function getViolator(violations) {
  const violator = [
    "badInput",
    "customError",
    "patternMismatch",
    "rangeOverflow",
    "rangeUnderflow",
    "stepMismatch",
    "tooLong",
    "tooShort",
    "typeMismatch",
    "valueMissing",
  ].find((key) => violations[key]);

  const attribute = {
    pattern: "patternMismatch",
    min: "rangeUnderflow",
    max: "rangeOverflow",
    required: "valueMissing",
    step: "stepMismatch",
    minLength: "tooShort",
    maxLength: "tooLong",
    patternMismatch: "pattern",
    rangeUnderflow: "min",
    rangeOverflow: "max",
    valueMissing: "required",
    stepMismatch: "step",
    tooShort: "minLength",
    tooLong: "maxLength",
  }[violator];

  return {
    violator,
    attribute,
  };
}
