const reviewForm = document.getElementById("review-form");
const reviewStatus = document.getElementById("form-status");

if (reviewForm && reviewStatus) {
  reviewForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(reviewForm);

    reviewStatus.textContent = "Sending your review...";
    reviewStatus.className = "form-status";

    try {
      const response = await fetch(reviewForm.action, {
        method: reviewForm.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        reviewForm.reset();
        reviewStatus.textContent =
          "Thank you! Your review has been submitted. I appreciate your feedback and support.";
        reviewStatus.className = "form-status success";
      } else {
        reviewStatus.textContent =
          "Something went wrong. Please check your information and try again.";
        reviewStatus.className = "form-status error";
      }
    } catch (error) {
      reviewStatus.textContent =
        "Something went wrong. Please try again later.";
      reviewStatus.className = "form-status error";
    }
  });
}