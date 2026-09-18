export const scrollToId = (id) => {
  const el = document.querySelector(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export const WHATSAPP_URL =
  "https://wa.me/918858271765?text=Hi%20Tech%20Yugantar!%20I%27d%20like%20to%20discuss%20a%20project.%20Can%20we%20connect%3F";
