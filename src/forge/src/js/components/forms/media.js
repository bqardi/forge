import { calculateFileSize, getTemplateContent } from "../../utilities.js";
import { broadcaster } from "../broadcaster.js";

(function () {
  const fileContainer = document.querySelector("[data-file-container]");
  if (!fileContainer) return;

  broadcaster.subscribe("dialog-open", async ({ trigger, dialog }) => {
    const filename = trigger.dataset.filename;
    if (!filename) return;

    const dialogContent = dialog.querySelector("[data-content]");
    const templateContent = getTemplateContent("dialog-content-file-details");

    dialogContent.innerHTML = "";
    dialogContent.appendChild(templateContent);

    const response = await fetch("/api/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename }),
    });
    const json = await response.json();

    dialogContent.querySelector("[data-preview]").src = json.url;
    dialogContent.querySelector(
      "[data-name]"
    ).textContent = `Filename: ${json.name}`;
    dialogContent.querySelector(
      "[data-type]"
    ).textContent = `MimeType: ${json.mimeType}`;
    dialogContent.querySelector(
      "[data-size]"
    ).textContent = `Size: ${calculateFileSize(json.size)}`;
    const fileLink = dialogContent.querySelector("[data-url]");
    fileLink.href = json.url;
    fileLink.textContent = json.url;
  });
})();
