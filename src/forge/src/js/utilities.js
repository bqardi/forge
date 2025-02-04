import { broadcaster } from "./components/broadcaster.js";

export async function responseNotifier(response) {
  const { message } = await response.json();

  if (response.ok) {
    broadcaster.emit("notify", {
      type: "success",
      title: `Success ${response.status} - ${response.statusText}`,
      message,
    });
  } else {
    broadcaster.emit("notify", {
      type: "error",
      title: `Error ${response.status} - ${response.statusText}`,
      message,
    });
  }

  return response.ok;
}

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

export function getTemplateContent(name) {
  const template = document.querySelector(`[data-template="${name}"]`);
  return template.content.cloneNode(true);
}

export function calculateFileSize(size) {
  const units = ["bytes", "kilobytes", "megabytes", "gigabytes", "terabytes"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const decimalCount = unitIndex === 0 ? 0 : 2;

  return `${size.toFixed(decimalCount)} ${units[unitIndex]}`;
}
