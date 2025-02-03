(function () {
  const formUpload = document.querySelector("[data-form-upload]");
  if (!formUpload) return;

  const fileUpload = document.querySelector("#file-upload");
  if (!fileUpload) return;

  fileUpload.addEventListener("change", async (e) => {
    formUpload.submit();
  });
})();
