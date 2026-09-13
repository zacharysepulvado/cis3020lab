const bookingForm = document.getElementById("booking-form");
const formStatus = document.getElementById("form-status");

if (bookingForm && formStatus) {
  const inquiryType = document.getElementById("inquiry-type");
  const sessionType = document.getElementById("session-type");
  const submitButton = bookingForm.querySelector('button[type="submit"]');

  function updateInquiryType() {
    for (const option of sessionType.options) {
      option.disabled = inquiryType.value === "event"
        ? option.value !== "Event Photography"
        : inquiryType.value === "rush" && option.value === "Event Photography";
    }
    if (inquiryType.value === "event") {
      sessionType.value = "Event Photography";
    } else if (sessionType.selectedOptions[0]?.disabled) {
      sessionType.value = "";
    }
  }

  inquiryType.addEventListener("change", updateInquiryType);
  document.querySelectorAll("[data-inquiry]").forEach((link) => {
    link.addEventListener("click", () => {
      inquiryType.value = link.dataset.inquiry;
      updateInquiryType();
    });
  });
  updateInquiryType();

  bookingForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (submitButton.disabled) return;

    const formData = new FormData(bookingForm);
    submitButton.disabled = true;

    formStatus.textContent = "Sending your inquiry...";
    formStatus.className = "form-status";

    try {
      const response = await fetch(bookingForm.action, {
        method: bookingForm.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json();

      if (response.ok) {
        bookingForm.reset();
        updateInquiryType();
        formStatus.textContent =
          "Thank you! Your inquiry has been sent. I will follow up to discuss availability, details, and pricing. Your appointment is not yet confirmed, and no date has been reserved. Please allow 24–48 hours for a response.";
        formStatus.className = "form-status success";
      } else {
        console.log(result);

        formStatus.textContent =
          result.errors?.[0]?.message ||
          "Something went wrong. Please check your information and try again.";

        formStatus.className = "form-status error";
      }
    } catch (error) {
      console.log(error);

      formStatus.textContent =
        "Something went wrong. Please try again later or contact me directly.";
      formStatus.className = "form-status error";
    } finally {
      submitButton.disabled = false;
    }
  });
}
