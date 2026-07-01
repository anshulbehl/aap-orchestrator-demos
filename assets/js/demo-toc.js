(function () {
  var toc = document.querySelector('.demo-toc');
  if (!toc) return;

  var links = toc.querySelectorAll('.demo-toc__link');
  var sections = [];

  links.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) sections.push({ id: id, el: section, link: link });
  });

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s.el); });
  }

  document.querySelectorAll('[data-download-json]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var url = btn.href;
      var filename = btn.dataset.filename || 'workflow.json';
      btn.classList.add('btn-download--loading');
      fetch(url)
        .then(function (res) {
          if (!res.ok) throw new Error('Download failed');
          return res.blob();
        })
        .then(function (blob) {
          var objectUrl = URL.createObjectURL(blob);
          var anchor = document.createElement('a');
          anchor.href = objectUrl;
          anchor.download = filename;
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          URL.revokeObjectURL(objectUrl);
        })
        .catch(function () {
          window.open(url, '_blank', 'noopener');
        })
        .finally(function () {
          btn.classList.remove('btn-download--loading');
        });
    });
  });
})();
