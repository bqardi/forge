import { broadcaster } from "./broadcaster.js";

(function () {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;

  broadcaster.subscribe("notify", (payload) =>
    showNotification(payload, toast)
  );
})();

function showNotification(payload, toast) {
  const { title, message, type } = payload;

  const template = toast.querySelector("template");
  const clone = template.content.cloneNode(true);
  const notification = clone.querySelector("div[role='alert']");
  notification.querySelector("[data-title]").textContent = title;
  notification.querySelector("[data-message]").textContent = message;

  notification.classList.add(type);

  const closeButton = notification.querySelector("[data-close]");
  closeButton.addEventListener("click", () => {
    notification.remove();
  });

  toast.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}
