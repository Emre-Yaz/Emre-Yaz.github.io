document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(contactForm);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Send form data to backend
    try {
      const response = await fetch("/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        contactForm.reset(); // Optionally reset the form after successful submission
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message. Please try again later.");
    }
  });
});
