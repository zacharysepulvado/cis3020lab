const bookingForm = document.getElementById("booking-form");
const formStatus = document.getElementById("form-status");

if (bookingForm && formStatus) {
  bookingForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(bookingForm);

    formStatus.textContent = "Sending your booking inquiry...";
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
        formStatus.textContent =
          "Thank you! Your booking inquiry has been sent. I will follow up to confirm availability, location details, and deposit information.";
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
    }
  });
}