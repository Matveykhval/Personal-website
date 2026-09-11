// Handle the Formspree contact form submission without leaving the page.
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending…";
    status.className = "form-status";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "Message sent. I'll get back to you soon.";
        status.className = "form-status ok";
        form.reset();
      } else {
        status.textContent = "Something went wrong — try again, or email me directly.";
        status.className = "form-status err";
      }
    } catch (err) {
      status.textContent = "Something went wrong — try again, or email me directly.";
      status.className = "form-status err";
    }
  });
}
