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
