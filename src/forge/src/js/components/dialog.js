import { broadcaster } from "./broadcaster.js";

(function () {
  const dialogTriggers = document.querySelectorAll("[data-dialog-trigger]");
  dialogTriggers.forEach((trigger) => {
    trigger.addEventListener("click", openDialog);
  });

  const dialogCloseButtons = document.querySelectorAll("[data-modal-close]");
  dialogCloseButtons.forEach((button) => {
    button.addEventListener("click", closeDialog);
  });
})();

function openDialog(e) {
  e.preventDefault();
  const dialog = document.querySelector(
    `[data-dialog=${e.currentTarget.dataset.dialogTrigger}]`
  );
  if (!dialog) return;
  dialog.showModal();
  broadcaster.emit("dialog-open", {
    trigger: e.currentTarget,
    dialog,
  });
}

function closeDialog(e) {
  e.preventDefault();
  const dialog = e.currentTarget.closest("dialog");
  if (!dialog) return;
  dialog.close();
}
