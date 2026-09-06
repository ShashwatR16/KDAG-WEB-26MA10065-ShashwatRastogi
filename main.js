// Mobile nav toggle (shared across pages)
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '\u2715' : '\u2630';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.textContent = '\u2630';
      });
    });
  }

  // Decorative hero scatter plot with a fitted trend line — built once, in JS,
  // so the "data points" are randomised per load rather than a static asset.
  var mount = document.getElementById('heroScatter');
  if (mount) {
    var w = 420, h = 460;
    var n = 42;
    var pts = [];
    for (var i = 0; i < n; i++) {
      var x = 20 + Math.random() * (w - 40);
      var trendY = h - 40 - (x / w) * (h - 120);
      var y = trendY + (Math.random() - 0.5) * 140;
      y = Math.max(20, Math.min(h - 20, y));
      pts.push([x, y]);
    }
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('aria-hidden', 'true');

    var line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', 20);
    line.setAttribute('y1', h - 60);
    line.setAttribute('x2', w - 20);
    line.setAttribute('y2', 60);
    line.setAttribute('stroke', '#F2760A');
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-dasharray', '4 6');
    line.setAttribute('opacity', '0.6');
    svg.appendChild(line);

    pts.forEach(function (p) {
      var c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', p[0]);
      c.setAttribute('cy', p[1]);
      c.setAttribute('r', 3 + Math.random() * 3);
      c.setAttribute('fill', Math.random() > 0.75 ? '#4FE3C1' : '#3A4A6B');
      c.setAttribute('opacity', 0.55 + Math.random() * 0.4);
      svg.appendChild(c);
    });

    mount.appendChild(svg);
  }
});
