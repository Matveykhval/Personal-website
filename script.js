// Fly each divider's plane once it's scrolled to roughly the middle of
// the screen, and let it replay every time you cross that zone again.
const flybys = document.querySelectorAll(".flyby");
if (flybys.length) {
  const flybyState = new Map();
  flybys.forEach((el) => flybyState.set(el, { flown: false }));

  function checkFlybys() {
    const vh = window.innerHeight;
    flybys.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const state = flybyState.get(el);

      const inTriggerZone = center > vh * 0.35 && center < vh * 0.65;
      const inResetZone = center < vh * 0.05 || center > vh * 0.95;

      if (inTriggerZone && !state.flown) {
        state.flown = true;
        const plane = el.querySelector(".flyby-plane");
        el.classList.remove("in-view");
        if (plane) void plane.offsetWidth; // restart the animation
        el.classList.add("in-view");
      } else if (inResetZone) {
        state.flown = false;
      }
    });
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkFlybys();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", checkFlybys);
}

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