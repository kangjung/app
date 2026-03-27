const DATA_PATH = 'assets/data/appList.json';

async function loadProjects() {
  const response = await fetch(DATA_PATH);
  if (!response.ok) throw new Error('appList.json 로딩 실패');
  return response.json();
}

function renderFeatured(projects) {
  const container = document.querySelector('[data-render="featured"]');
  if (!container) return;

  container.innerHTML = projects.slice(0, 3).map((project) => `
    <article class="project-item">
      <strong>${project.title.ko}</strong>
      <p>${project.desc.ko}</p>
    </article>
  `).join('');
}

function renderTagFilter(projects, onFilter) {
  const filter = document.getElementById('tag-filter');
  if (!filter) return;

  const tags = ['All', ...new Set(projects.flatMap((p) => p.tags || []))];
  filter.innerHTML = tags.map((tag, idx) => `
    <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-tag="${tag}">${tag}</button>
  `).join('');

  filter.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      filter.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      onFilter(button.dataset.tag);
    });
  });
}

function renderProjects(projects, tag = 'All') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const visible = tag === 'All' ? projects : projects.filter((p) => (p.tags || []).includes(tag));

  grid.innerHTML = visible.map((project) => {
    const stores = (project.stores || []).map((store) => `
      <a href="${store.url}" target="_blank" rel="noreferrer">${store.name}</a>
    `).join('');

    const tags = (project.tags || []).map((t) => `<span class="tag">${t}</span>`).join('');

    return `
      <article class="card project-card">
        <img src="${project.img}" alt="${project.title.en}" loading="lazy" />
        <h2>${project.title.ko}</h2>
        <p>${project.desc.ko}</p>
        <div class="tags">${tags}</div>
        <div class="store-links">${stores || '<span>스토어 링크 준비 중</span>'}</div>
      </article>
    `;
  }).join('');
}

(async function init() {
  try {
    const projects = await loadProjects();
    renderFeatured(projects);
    renderProjects(projects);
    renderTagFilter(projects, (tag) => renderProjects(projects, tag));
  } catch (error) {
    console.error(error);
  }
})();
