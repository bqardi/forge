(function () {
  const formUpload = document.querySelector("[data-upload-form]");
  if (!formUpload) return;

  const fileUpload = document.querySelector("#file-upload");
  if (!fileUpload) return;

  fileUpload.addEventListener("change", async (e) => {
    formUpload.submit();
  });
})();
