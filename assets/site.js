/* Toffolon : navigation, formulaire de devis en étapes, suivi des conversions */
(function () {
  // Adresse de réception des demandes. Laisser vide tant qu'aucun service d'envoi n'est branché :
  // le formulaire ouvre alors un e-mail prérempli vers CONTACT.
  // ponytail: Web3Forms (https://api.web3forms.com/submit + champ access_key) suffit, un backend maison seulement si le volume l'exige.
  var ENDPOINT = '';
  var ACCESS_KEY = '';
  var CONTACT = 'contact@toffolon-peinture-deco.fr';

  window.dataLayer = window.dataLayer || [];
  function track(event, params) { window.dataLayer.push(Object.assign({ event: event }, params || {})); }

  // Menu mobile et sous-menu Prestations
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  [].forEach.call(document.querySelectorAll('.nav-item > button'), function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentNode;
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    [].forEach.call(document.querySelectorAll('.nav-item.open'), function (i) { i.classList.remove('open'); });
  });

  // La barre mobile s'efface quand le formulaire est à l'écran
  var bar = document.querySelector('.mobile-bar');
  var box = document.getElementById('devis-form');
  if (bar && box && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.style.transform = entries[0].isIntersecting ? 'translateY(110%)' : '';
    }).observe(box);
  }

  // Clics téléphone et e-mail
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!a) return;
    track(a.getAttribute('href').indexOf('tel:') === 0 ? 'click_to_call' : 'click_email', { link_location: a.dataset.loc || 'page' });
  });

  // Formulaire de devis en étapes
  [].forEach.call(document.querySelectorAll('form.qf'), function (form) {
    var steps = [].slice.call(form.querySelectorAll('.qf-step'));
    var bars = [].slice.call(form.querySelectorAll('.qf-progress span'));
    var next = form.querySelector('.qf-next');
    var back = form.querySelector('.qf-back');
    var submit = form.querySelector('.qf-submit');
    var error = form.querySelector('.qf-error');
    var done = form.parentNode.querySelector('.qf-done');
    var current = 0;
    var started = false;

    var main = document.querySelector('main');
    var preset = form.dataset.preset || (main && main.dataset.preset);
    if (preset) {
      var p = form.querySelector('input[name="travaux"][value="' + preset + '"]');
      if (p) p.checked = true;
    }
    var page = form.querySelector('input[name="page"]');
    if (page) page.value = location.pathname;

    function show(i) {
      current = i;
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      bars.forEach(function (b, k) { b.classList.toggle('on', k <= i); });
      back.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      error.textContent = '';
    }

    function valid(step) {
      var groups = {};
      var ok = true;
      [].forEach.call(step.querySelectorAll('input, select, textarea'), function (el) {
        if (el.type === 'radio') {
          if (el.required) groups[el.name] = groups[el.name] || !!step.querySelector('input[name="' + el.name + '"]:checked');
        } else if (!el.checkValidity()) {
          ok = false;
        }
      });
      Object.keys(groups).forEach(function (k) { if (!groups[k]) ok = false; });
      if (!ok) {
        error.textContent = 'Merci de compléter ce qui manque pour continuer.';
        var bad = step.querySelector('input:invalid, select:invalid, textarea:invalid');
        if (bad) bad.reportValidity();
      }
      return ok;
    }

    form.addEventListener('change', function (e) {
      if (!started) { started = true; track('form_start', { form_page: location.pathname }); }
      // Une réponse à choix unique fait avancer d'elle-même
      if (e.target.type === 'radio' && e.target.closest('.qf-step').dataset.auto === 'true' && current < steps.length - 1) {
        setTimeout(function () { show(current + 1); track('form_step', { step: current + 1 }); }, 160);
      }
    });
    next.addEventListener('click', function () {
      if (!valid(steps[current])) return;
      show(current + 1);
      track('form_step', { step: current + 1 });
    });
    back.addEventListener('click', function () { show(Math.max(0, current - 1)); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!valid(steps[current])) return;
      if (form.querySelector('.hp input').value) return;
      var data = new FormData(form);
      var lines = [];
      data.forEach(function (v, k) { if (k !== 'access_key' && k !== 'botcheck' && v) lines.push(k + ' : ' + v); });
      function success(event) {
        form.hidden = true;
        if (done) { done.hidden = false; done.focus(); }
        track(event || 'generate_lead', { form_page: location.pathname, travaux: data.get('travaux') || '', budget: data.get('budget') || '' });
      }
      if (!ENDPOINT) {
        var msg = done && done.querySelector('.qf-done-msg');
        if (msg) msg.textContent = 'Votre messagerie s\'ouvre avec la demande préremplie : il ne reste qu\'à l\'envoyer. Si rien ne s\'ouvre, appelez le 01 48 50 24 55.';
        location.href = 'mailto:' + CONTACT + '?subject=' + encodeURIComponent('Demande de devis : ' + (data.get('travaux') || 'projet')) + '&body=' + encodeURIComponent(lines.join('\n'));
        success('lead_mailto'); // pas une conversion confirmée : le visiteur doit encore envoyer l'e-mail
        return;
      }
      if (ACCESS_KEY) data.append('access_key', ACCESS_KEY);
      data.append('subject', 'Demande de devis : ' + (data.get('travaux') || 'projet') + ' (' + (data.get('ville') || '') + ')');
      submit.disabled = true;
      submit.textContent = 'Envoi en cours...';
      fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); success(); })
        .catch(function () {
          submit.disabled = false;
          submit.textContent = 'Envoyer ma demande';
          error.innerHTML = 'L\'envoi n\'a pas abouti. Appelez-nous au <a href="tel:+33148502455">01 48 50 24 55</a> ou écrivez à <a href="mailto:' + CONTACT + '">' + CONTACT + '</a>.';
        });
    });

    show(0);
  });
})();
