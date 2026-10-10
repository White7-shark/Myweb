// The mobile menu, and the highlight that follows the pointer across glass.
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }),
);
if (matchMedia("(hover: hover)").matches) {
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest?.(".glass");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
  });
}
