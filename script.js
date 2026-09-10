/* ============================================================
   Eisdiele Mariotti bei Paniccia — Seitenlogik
   Die Eisdiele ist saisonal geöffnet. Der Hinweis oben sagt
   deshalb, ob gerade Saison ist — und stellt bewusst klar, dass
   die Angabe ungefähr ist, weil die Quellen es auch sind.
   ============================================================ */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  var now = new Date();
  var month = now.getMonth() + 1;          // 1 = Januar
  var dec = now.getHours() + now.getMinutes() / 60;

  // "Meist Frühjahr bis Herbst" — hier März bis Oktober, ausdrücklich als
  // Näherung gekennzeichnet, weil kein genaues Datum belegt ist.
  var inSeason = month >= 3 && month <= 10;
  var openNow = inSeason && dec >= 10 && dec < 22;

  var badge = document.getElementById('seasonBadge');
  var text = document.getElementById('seasonText');
  if (badge && text) {
    badge.hidden = false;
    if (openNow) {
      badge.classList.add('is-season');
      text.textContent = 'Saison läuft — heute bis etwa 22 Uhr';
    } else if (inSeason) {
      badge.classList.add('is-season');
      text.textContent = dec < 10
        ? 'Saison läuft — heute ab etwa 10 Uhr'
        : 'Saison läuft — morgen wieder ab etwa 10 Uhr';
    } else {
      badge.classList.add('is-off');
      text.textContent = 'Winterpause — im Frühjahr geht es wieder los';
    }
  }

  var headerStatus = document.getElementById('headerStatus');
  if (headerStatus) {
    headerStatus.hidden = false;
    headerStatus.textContent = openNow ? 'jetzt geöffnet' : inSeason ? 'Saison' : 'Winterpause';
    if (inSeason) headerStatus.classList.add('is-season');
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
