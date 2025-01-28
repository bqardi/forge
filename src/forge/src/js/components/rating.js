(function () {
  const ratings = document.querySelectorAll("[data-rating]");
  if (!ratings) return;
  ratings.forEach((rating) => {
    rating.addEventListener("click", setRating);
  });
})();

function setRating(e) {
  if (!e.target.hasAttribute("data-value")) return;

  const rating = e.currentTarget;

  const hiddenInput = rating.querySelector('input[type="hidden"]');
  const stars = rating.querySelectorAll("[data-value]");

  const value = e.target.dataset.value;
  hiddenInput.value = value;

  stars.forEach((s) => {
    s.classList.remove("text-yellow-500");
    s.classList.add("text-gray-300");
  });

  for (let i = 1; i <= value; i++) {
    rating
      .querySelector(`button[data-value="${i}"]`)
      .classList.remove("text-gray-300");
    rating
      .querySelector(`button[data-value="${i}"]`)
      .classList.add("text-yellow-500");
  }
}
