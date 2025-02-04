import { broadcaster } from "./broadcaster.js";

(function () {
  const input = document.querySelector("#sessionMessage");
  if (!input) return;

  const message = input.value;
  const type = input.dataset.type;

  const mapping = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    information: "Information",
  };

  if (message) {
    broadcaster.emit("notify", {
      title: mapping[type],
      message,
      type,
    });
  }
})();
