(function () {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.demo-card');
  const navLinks = document.querySelectorAll('[data-filter-nav]');
  const searchInput = document.getElementById('demo-search');
  const emptyState = document.getElementById('filter-empty');

  if (!cards.length) return;

  let activeFilter = 'all';

  function cardMatchesFilter(card, filter) {
    const status = card.dataset.status;
    const category = card.dataset.category;
    const tags = (card.dataset.tags || '').split(',');
    const usesAi = card.dataset.usesAi === 'true';

    switch (filter) {
      case 'all':
        return true;
      case 'active':
        return status === 'active';
      case 'coming-soon':
        return status === 'coming-soon';
      case 'rule-based':
        return usesAi === false;
      case 'cert-rotation':
      case 'disk-utilization':
      case 'incident-remediation':
        return category === filter;
      default:
        if (tags.indexOf('AI Agent') >= 0 && filter === 'ai-agent') return true;
        if (tags.indexOf('Switch') >= 0 && filter === 'switch') return true;
        return tags.some(function (t) {
          const normalized = t.trim().toLowerCase().replace(/\s+/g, '-');
          return normalized === filter || t.trim().toLowerCase() === filter.replace(/-/g, ' ');
        });
    }
  }

  function cardMatchesSearch(card, query) {
    if (!query) return true;
    const haystack = (card.dataset.search || '').toLowerCase();
    return haystack.indexOf(query) >= 0;
  }

  function applyFilters() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    cards.forEach(function (card) {
      const show = cardMatchesFilter(card, activeFilter) && cardMatchesSearch(card, query);
      card.classList.toggle('hidden', !show);
      if (show) visibleCount += 1;
    });

    document.querySelectorAll('.section').forEach(function (section) {
      const visible = section.querySelectorAll('.demo-card:not(.hidden)').length;
      section.style.display = visible > 0 ? '' : 'none';
    });

    if (emptyState) {
      emptyState.classList.toggle('hidden', visibleCount > 0);
    }
  }

  if (pills.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        activeFilter = pill.dataset.filter;
        pills.forEach(function (p) {
          p.classList.toggle('active', p.dataset.filter === activeFilter);
        });
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const filter = link.dataset.filterNav;
      if (filter && pills.length) {
        e.preventDefault();
        activeFilter = filter;
        pills.forEach(function (p) {
          p.classList.toggle('active', p.dataset.filter === activeFilter);
        });
        applyFilters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  var hash = window.location.hash.replace('#', '');
  if (hash && ['active', 'coming-soon', 'cert-rotation', 'disk-utilization', 'incident-remediation', 'rule-based'].indexOf(hash) >= 0) {
    activeFilter = hash;
    pills.forEach(function (p) {
      p.classList.toggle('active', p.dataset.filter === activeFilter);
    });
  }

  applyFilters();
})();
