(function () {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.demo-card');
  const navLinks = document.querySelectorAll('[data-filter-nav]');

  if (!pills.length || !cards.length) return;

  function applyFilter(filter) {
    pills.forEach(function (pill) {
      pill.classList.toggle('active', pill.dataset.filter === filter);
    });

    cards.forEach(function (card) {
      const status = card.dataset.status;
      const category = card.dataset.category;
      const tags = (card.dataset.tags || '').split(',');
      let show = false;

      switch (filter) {
        case 'all':
          show = true;
          break;
        case 'active':
          show = status === 'active';
          break;
        case 'coming-soon':
          show = status === 'coming-soon';
          break;
        case 'cert-rotation':
        case 'disk-utilization':
        case 'incident-remediation':
          show = category === filter;
          break;
        default:
          show = tags.some(function (t) {
            return t.trim().toLowerCase().replace(/\s+/g, '-') === filter ||
              t.trim().toLowerCase() === filter.replace(/-/g, ' ');
          });
          if (!show) {
            show = tags.some(function (t) {
              return t.trim().toLowerCase().replace(/\s+/g, '-') === filter;
            });
          }
          if (!show && filter === 'ai-agent') {
            show = tags.indexOf('AI Agent') >= 0;
          }
          if (!show && filter === 'switch') {
            show = tags.indexOf('Switch') >= 0;
          }
          break;
      }

      card.classList.toggle('hidden', !show);
    });

    document.querySelectorAll('.section').forEach(function (section) {
      const visible = section.querySelectorAll('.demo-card:not(.hidden)').length;
      section.style.display = visible > 0 ? '' : 'none';
    });
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      applyFilter(pill.dataset.filter);
    });
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const filter = link.dataset.filterNav;
      if (filter && pills.length) {
        e.preventDefault();
        applyFilter(filter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  var hash = window.location.hash.replace('#', '');
  if (hash && ['active', 'coming-soon', 'cert-rotation', 'disk-utilization', 'incident-remediation'].indexOf(hash) >= 0) {
    applyFilter(hash);
  }
})();
