const grid = document.getElementById("grid");
const tagBar = document.getElementById("tags");
const search = document.getElementById("search");
const empty = document.getElementById("empty");
let activeTag = "All";

document.getElementById("year").textContent = new Date().getFullYear();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderTags() {
  const tags = ["All", ...new Set(GAMES.flatMap(g => g.tags || []))];
  tagBar.innerHTML = tags
    .map(t => `<button class="tag${t === activeTag ? " active" : ""}" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`)
    .join("");
}

function renderGames() {
  const q = search.value.trim().toLowerCase();
  const list = GAMES.filter(g =>
    (activeTag === "All" || (g.tags || []).includes(activeTag)) &&
    (g.title + " " + (g.description || "")).toLowerCase().includes(q)
  );

  grid.innerHTML = list.map(g => {
    const live = Boolean(g.url);
    const thumb = g.image
      ? `<img src="${escapeHtml(g.image)}" alt="" loading="lazy">`
      : `<span class="initial">${escapeHtml(g.title[0])}</span>`;
    const inner = `
      <div class="thumb" style="--c:${escapeHtml(g.color || "#6366f1")}">${thumb}
        ${live ? "" : '<span class="badge">Coming soon</span>'}
      </div>
      <div class="info">
        <h2>${escapeHtml(g.title)}</h2>
        ${g.description ? `<p>${escapeHtml(g.description)}</p>` : ""}
        <div class="chips">${(g.tags || []).map(t => `<span>${escapeHtml(t)}</span>`).join("")}</div>
        ${live ? '<span class="play">Play &rarr;</span>' : ""}
      </div>`;
    return live
      ? `<a class="card" href="${escapeHtml(g.url)}">${inner}</a>`
      : `<div class="card disabled">${inner}</div>`;
  }).join("");

  empty.hidden = list.length > 0;
}

tagBar.addEventListener("click", e => {
  const btn = e.target.closest(".tag");
  if (!btn) return;
  activeTag = btn.dataset.tag;
  renderTags();
  renderGames();
});
search.addEventListener("input", renderGames);

renderTags();
renderGames();

document.getElementById("game-count").textContent = GAMES.length;

function showTab() {
  const tab = location.hash === "#games" ? "games" : "about";
  document.querySelectorAll(".page").forEach(p => (p.hidden = p.id !== tab));
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.toggle("active", a.dataset.tab === tab));
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", showTab);
showTab();
