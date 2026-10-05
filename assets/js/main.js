/* ESTO ARKIS · Versova — page behaviour (plain JavaScript, no framework) */
(function () {

  // Stand-in for the design tool's runtime: default props, setState and the location chips/list
  class DCLogic {
    constructor() {
      this.props = { accentColor: '#C0704A', introSequence: true, customCursor: true };
    }
    setState(patch) {
      Object.assign(this.state, patch);
      renderBindings(this);
      if (this.componentDidUpdate) this.componentDidUpdate();
    }
  }

  function renderBindings(c) {
    const v = c.renderVals();
    const tabs = document.querySelector('[data-loc-tabs]');
    if (tabs) {
      tabs.textContent = '';
      v.catChips.forEach((chip) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('data-cat', chip.key);
        b.style.cssText = 'background:' + chip.bg + ';border:1px solid ' + chip.bd + ';color:' + chip.fg + ';padding:11px 15px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:all .5s cubic-bezier(.16,1,.3,1);min-height:44px;';
        b.textContent = chip.label;
        tabs.appendChild(b);
      });
    }
    const title = document.querySelector('[data-loc-title]');
    if (title) title.textContent = v.catTitle;
    const list = document.querySelector('[data-loc-list]');
    if (list) {
      list.textContent = '';
      v.locRows.forEach((row) => {
        const li = document.createElement('li');
        li.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;gap:18px;padding:13px 0;border-bottom:1px solid rgba(245,242,234,.08);';
        const name = document.createElement('span');
        name.style.cssText = 'font-size:13px;letter-spacing:.06em;color:rgba(245,242,234,.86);line-height:1.4;';
        name.textContent = row.name;
        const dist = document.createElement('span');
        dist.style.cssText = 'white-space:nowrap;font-size:11px;letter-spacing:.14em;color:#C0704A;';
        dist.textContent = row.dist + ' ';
        const time = document.createElement('span');
        time.style.cssText = 'color:rgba(245,242,234,.45);';
        time.textContent = '/ ' + row.time;
        dist.appendChild(time);
        li.appendChild(name);
        li.appendChild(dist);
        list.appendChild(li);
      });
    }
  }

  const LOC = {
    schools: { title: 'Schools & Colleges', rows: [
      { name: "St. Mary's High School", dist: '0.4 Km', time: '2 Mins' },
      { name: 'Stellar International School', dist: '0.6 Km', time: '3 Mins' },
      { name: 'Gyan Kendra Secondary School & Jr. College', dist: '0.65 Km', time: '4 Mins' },
      { name: 'Jankidevi School', dist: '1.4 Kms', time: '7 Mins' },
      { name: 'Valia College of Arts, Commerce & Science', dist: '1.8 Kms', time: '8 Mins' },
      { name: 'Billabong International School', dist: '1.9 Kms', time: '10 Mins' },
      { name: 'Oriental College of Commerce & Management', dist: '2.2 Kms', time: '11 Mins' },
      { name: 'RIMS International School', dist: '2.7 Kms', time: '14 Mins' },
      { name: "Bhavan's College", dist: '2.9 Kms', time: '15 Mins' },
      { name: 'Orchid International', dist: '3.1 Kms', time: '18 Mins' } ] },
    hospitals: { title: 'Hospitals', rows: [
      { name: 'Aashna Nursing Home', dist: '0.4 Km', time: '2 Mins' },
      { name: 'EECP Heart Clinic', dist: '0.4 Km', time: '2 Mins' },
      { name: 'Kokilaben Dhirubhai Ambani Hospital', dist: '0.95 Km', time: '5 Mins' },
      { name: 'Purandare Hospital', dist: '1.3 Kms', time: '6 Mins' },
      { name: 'Gandhi Nursing Home', dist: '1.3 Kms', time: '5 Mins' },
      { name: 'Bellevue Multispeciality Hospital', dist: '1.4 Kms', time: '8 Mins' },
      { name: 'SBS Multispeciality Hospital', dist: '2 Kms', time: '8 Mins' } ] },
    malls: { title: 'Malls', rows: [
      { name: 'Kamdenu Shopping Centre', dist: '1.2 Kms', time: '6 Mins' },
      { name: 'City Mall', dist: '1.5 Kms', time: '6 Mins' },
      { name: 'Fun Republic Mall', dist: '1.5 Kms', time: '6 Mins' },
      { name: 'Infinity Mall', dist: '1.7 Kms', time: '7 Mins' },
      { name: 'Star Bazar', dist: '1.8 Kms', time: '9 Mins' },
      { name: 'Inorbit Mall', dist: '6.6 Kms', time: '22 Mins' },
      { name: 'Jio World Drive', dist: '13.4 Kms', time: '38 Mins' },
      { name: 'Jio World Plaza', dist: '13.8 Kms', time: '41 Mins' } ] },
    gardens: { title: 'Gardens', rows: [
      { name: 'SVP Garden', dist: '0.35 Km', time: '3 Mins' },
      { name: 'Dr Babasaheb Ambedkar Park', dist: '0.45 Km', time: '3 Mins' },
      { name: 'SangSangeetkar Anil Mohile Manoranjan Park', dist: '0.7 Km', time: '4 Mins' },
      { name: 'Chacha Nehru Garden', dist: '0.9 Km', time: '4 Mins' } ] },
    business: { title: 'Business Parks', rows: [
      { name: 'NESCO', dist: '5 Kms', time: '22 Mins' },
      { name: 'Nirlon Knowledge Park', dist: '6 Kms', time: '23 Mins' },
      { name: 'Mindspace Malad', dist: '7 Kms', time: '25 Mins' },
      { name: 'MIDC', dist: '7 Kms', time: '24 Mins' },
      { name: 'Seepz', dist: '7.9 Kms', time: '26 Mins' },
      { name: 'Oberoi Garden City', dist: '8.8 Kms', time: '29 Mins' },
      { name: 'BKC', dist: '14 Kms', time: '45 Mins' } ] },
    connectivity: { title: 'Connectivity', rows: [
      { name: 'Swatantrya Veer Savarkar Sea Link', dist: '4.0 Kms', time: '19 Mins' },
      { name: 'Andheri Railway Station', dist: '4.8 Kms', time: '21 Mins' },
      { name: 'Western Express Highway', dist: '6.0 Kms', time: '25 Mins' },
      { name: 'Chhatrapati Shivaji Maharaj International Airport', dist: '7.7 Kms', time: '30 Mins' },
      { name: 'Domestic Airport Terminal 1-A', dist: '8.2 Kms', time: '31 Mins' } ] },
    metro: { title: 'Metro', rows: [
      { name: 'D. N. Nagar (Versova–Andheri–Ghatkopar) — Line 1 Blue', dist: '1.5 Kms', time: '7 Mins' },
      { name: 'Versova (Versova–Andheri–Ghatkopar) — Line 1 Blue', dist: '1.5 Kms', time: '7 Mins' },
      { name: 'Andheri West Metro Station (to Dahisar East) — Line 2A Yellow', dist: '1.5 Kms', time: '7 Mins' },
      { name: 'Swami Samarth to Vikhroli — Upcoming Line 6 Pink', dist: '1.5 Kms', time: '7 Mins' },
      { name: 'Lower Oshiwara (to Dahisar East) — Line 2A Yellow', dist: '1.9 Kms', time: '8 Mins' } ] }
  };

  class Component extends DCLogic {
    state = { cat: 'schools', amenCat: 'all' };

    renderVals() {
      const cat = LOC[this.state.cat] || LOC.schools;
      const A = '#C0704A';
      const catChips = [['schools','Schools'],['hospitals','Hospitals'],['malls','Malls'],['gardens','Gardens'],['business','Business Parks'],['connectivity','Connectivity'],['metro','Metro']]
        .map(([key, label]) => {
          const on = this.state.cat === key;
          return { key, label, bg: on ? A : 'transparent', fg: on ? '#071923' : 'rgba(245,242,234,.7)', bd: on ? A : 'rgba(245,242,234,.18)' };
        });
      const amenChips = [['all','All'],['external','External'],['internal','Internal']].map(([key, label]) => {
        const on = this.state.amenCat === key;
        return { key, label, fg: on ? '#F5F2EA' : 'rgba(245,242,234,.55)', rule: on ? 'scaleX(1)' : 'scaleX(0)' };
      });
      return { locRows: cat.rows, catTitle: cat.title, catChips, amenChips };
    }

    get accent() { return this.props.accentColor || '#C0704A'; }
    get isDefaultAccent() { return this.accent.toUpperCase() === '#C0704A'; }

    setupMarquee() {
      const track = this.q('[data-gal-track]');
      if (!track) return;
      this.qa('[data-gal-arrow]').forEach((btn) => {
        if (btn.dataset.bound === '1') return;
        btn.dataset.bound = '1';
        const next = btn.getAttribute('data-gal-arrow') === 'next';
        const fill = btn.querySelector('[data-gal-fill]');
        const glyph = btn.querySelector('[data-gal-glyph]');
        const off = next ? '101%' : '-101%';
        const wipe = (on) => {
          btn.style.borderColor = on ? '#C0704A' : 'rgba(245,242,234,.22)';
          btn.style.transform = on ? 'translateX(' + (next ? '4px' : '-4px') + ')' : 'none';
          if (fill) fill.style.transform = on ? 'translateX(0)' : 'translateX(' + off + ')';
          if (glyph) glyph.style.color = on ? '#071923' : '#F5F2EA';
        };
        btn.addEventListener('mouseenter', () => wipe(true));
        btn.addEventListener('mouseleave', () => wipe(false));
        btn.addEventListener('focus', () => wipe(true));
        btn.addEventListener('blur', () => wipe(false));
        btn.addEventListener('click', (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          if (glyph) {
            glyph.style.transition = 'transform .22s cubic-bezier(.16,1,.3,1),color .45s cubic-bezier(.16,1,.3,1)';
            glyph.style.transform = 'translateX(' + (next ? '14px' : '-14px') + ')';
            setTimeout(() => {
              glyph.style.transition = 'none';
              glyph.style.transform = 'translateX(' + (next ? '-14px' : '14px') + ')';
              requestAnimationFrame(() => {
                glyph.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1),color .45s cubic-bezier(.16,1,.3,1)';
                glyph.style.transform = 'translateX(0)';
              });
            }, 220);
          }
          this.stepGallery(next ? 1 : -1);
        });
      });
      this.updateGalProgress();
      if (!this.galPoll) {
        this.galPoll = setInterval(() => {
          if (this.galFrozen) { clearInterval(this.galPoll); this.galPoll = null; return; }
          this.updateGalProgress();
        }, 240);
      }
      const vpEl = this.q('[data-gal-viewport]');
      if (vpEl && vpEl.dataset.progBound !== '1') {
        vpEl.dataset.progBound = '1';
        vpEl.addEventListener('scroll', () => {
          if (this.progRaf) return;
          this.progRaf = requestAnimationFrame(() => { this.progRaf = null; this.updateGalProgress(); });
        });
      }
      if (track.dataset.cloned === '1') return;
      Array.from(track.children).forEach((n) => {
        if (this.io3) this.io3.unobserve(n);
        n.style.opacity = '1';
        n.style.transform = 'translate(0,0)';
        const c = n.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.style.opacity = '1';
        c.style.transform = 'translate(0,0)';
        track.appendChild(c);
      });
      track.dataset.cloned = '1';
      if (this.reduced) { track.style.animation = 'none'; return; }
      const vp = this.q('[data-gal-viewport]');
      if (vp) {
        vp.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
        vp.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
      }
    }

    stepGallery(dir) {
      const vp = this.q('[data-gal-viewport]');
      const track = this.q('[data-gal-track]');
      if (!vp || !track) return;
      const fig = track.querySelector('[data-gal]');
      let justFroze = false;
      if (!this.galFrozen) {
        this.galFrozen = true;
        justFroze = true;
        // freeze the marquee where it stands, then hand control to the scroller
        const m = new DOMMatrixReadOnly(getComputedStyle(track).transform);
        track.style.animation = 'none';
        track.style.transform = 'none';
        vp.scrollLeft = -m.m41;
      }
      const run = () => {
        const step = fig ? fig.getBoundingClientRect().width + 20 : Math.round(vp.clientWidth * 0.6);
        const max = Math.max(1, track.scrollWidth - vp.clientWidth);
        const from = this.galTo != null ? this.galTo : vp.scrollLeft;
        let to = from + dir * step;
        if (to < 0) to = Math.max(0, max / 2 + to);
        if (to > max) to = to - max / 2;
        this.tweenGallery(vp, to);
      };
      if (justFroze) requestAnimationFrame(run); else run();
    }

    // keep every printed count honest when figures are added or removed
    syncGalLabels() {
      const figs = this.qa('[data-gal]:not([aria-hidden="true"])');
      const total = figs.length;
      if (!total) return;
      const tot = this.q('[data-gal-total]');
      if (tot) tot.textContent = '/ ' + total;
      figs.forEach((f, i) => {
        const n = f.querySelector('[data-gal-capnum]');
        if (n) n.textContent = String(i + 1).padStart(2, '0') + ' / ' + total;
      });
    }

    updateGalProgress() {
      const vp = this.q('[data-gal-viewport]');
      const track = this.q('[data-gal-track]');
      const fill = this.q('[data-gal-progfill]');
      const count = this.q('[data-gal-count]');
      if (!vp || !track) return;
      const fig = track.querySelector('[data-gal]');
      const step = fig ? fig.getBoundingClientRect().width + 20 : 1;
      const total = this.galData().length || 10;
      let pos = vp.scrollLeft;
      if (!this.galFrozen) {
        const m = new DOMMatrixReadOnly(getComputedStyle(track).transform);
        pos = -m.m41;
      }
      const idx = ((Math.round(pos / step) % total) + total) % total;
      if (fill) fill.style.width = Math.max(8, Math.round(((idx + 1) / total) * 100)) + '%';
      if (count) count.textContent = String(idx + 1).padStart(2, '0');
    }

    tweenGallery(vp, to) {
      this.galTo = to;
      if (this.galRaf) cancelAnimationFrame(this.galRaf);
      if (this.reduced) { vp.scrollLeft = to; this.galTo = null; return; }
      const from = vp.scrollLeft;
      const d = to - from;
      if (!d) { this.galTo = null; return; }
      const dur = 460;
      const t0 = performance.now();
      const ease = (p) => 1 - Math.pow(1 - p, 3);
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        vp.scrollLeft = from + d * ease(p);
        if (p < 1) this.galRaf = requestAnimationFrame(tick);
        else { this.galRaf = null; this.galTo = null; }
      };
      this.galRaf = requestAnimationFrame(tick);
      // rAF is paused in background tabs: guarantee the step lands either way
      clearTimeout(this.galSnap);
      this.galSnap = setTimeout(() => {
        if (this.galRaf) { cancelAnimationFrame(this.galRaf); this.galRaf = null; }
        if (Math.abs(vp.scrollLeft - to) > 1) vp.scrollLeft = to;
        this.galTo = null;
        this.updateGalProgress();
      }, dur + 140);
    }

    componentDidMount() {
      this.root = document.querySelector('[data-arkis-root]');
      if (!this.root) return;
      this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.q = (s) => (document.querySelector('[data-arkis-root]') || this.root).querySelector(s);
      this.qa = (s) => Array.from((document.querySelector('[data-arkis-root]') || this.root).querySelectorAll(s));
      this.applyAccent();
      this.bindEvents();
      this.setupReveals();
      this.setupResponsive();
      this.setupCursor();
      this.setActiveCat(this.state.cat);
      this.applyAmen();
      this.onScroll();
      this.setupMarquee();
      this.syncGalLabels();
      this.startFormTimer();
      this.runIntro();
      this.scrollHandler = () => { if (!this.ticking) { this.ticking = true; requestAnimationFrame(() => { this.ticking = false; this.onScroll(); }); } };
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      window.addEventListener('resize', this.resizeHandler = () => { this.applyResponsive(); this.onScroll(); });
      window.addEventListener('keydown', this.keyHandler = (e) => this.onKey(e));
      const settle = () => { this.applyResponsive(); this.onScroll(); };
      requestAnimationFrame(settle);
      setTimeout(settle, 120);
      setTimeout(settle, 600);
      window.addEventListener('load', settle);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
      const heroImg = this.q('[data-hero-img]');
      if (heroImg && !heroImg.complete) heroImg.addEventListener('load', settle, { once: true });
      if (window.ResizeObserver) {
        this.rootRO = new ResizeObserver(() => {
          if (this.rootROPending) return;
          this.rootROPending = true;
          requestAnimationFrame(() => { this.rootROPending = false; this.applyResponsive(); });
        });
        const bar = this.q('[data-fab-mobile]');
        const nav = this.q('[data-nav]');
        if (bar) this.rootRO.observe(bar);
        if (nav) this.rootRO.observe(nav);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.scrollHandler);
      window.removeEventListener('resize', this.resizeHandler);
      window.removeEventListener('keydown', this.keyHandler);
      if (this.io) this.io.disconnect();
      if (this.mouseHandler) window.removeEventListener('mousemove', this.mouseHandler);
    }

    componentDidUpdate() {
      this.root = document.querySelector('[data-arkis-root]') || this.root;
      if (!this.root) return;
      if (this.introDone) this.applyResponsive();
      this.applyAccent();
      this.postMapCat(this.state.cat);
      this.applyAmen();
    }

    applyAccent() {
      if (this.isDefaultAccent) return;
      const hex = this.accent.replace('#', '');
      const to = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ');
      const from = '192, 112, 74';
      this.qa('[style]').forEach((el) => {
        const s = el.getAttribute('style');
        if (s && s.indexOf(from) !== -1) el.setAttribute('style', s.split(from).join(to));
      });
    }

    bindEvents() {
      // Capture phase, so CTA buttons still work when the .enquireModal handler stops propagation
      this.root.addEventListener('click', (e) => {
        const t = (s) => e.target.closest(s);
        if (t('[data-close-popup]')) { this.closePopup(); return; }
        const anchor = t('a[href^="#"]');
        if (anchor) { e.preventDefault(); this.closeMenu(); this.scrollTo(anchor.getAttribute('href')); return; }
        const drawer = t('[data-open-drawer]');
        if (drawer) { this.openDrawer(drawer.getAttribute('data-open-drawer')); return; }
        if (t('[data-rera-toggle]')) { this.toggleRera(); return; }
        if (t('[data-rera-close]')) { this.toggleRera(false); return; }
        if (t('[data-close-drawer]')) { this.closeDrawer(); return; }
        if (t('[data-burger]')) { this.openMenu(); return; }
        if (t('[data-close-menu]')) { this.closeMenu(); return; }
        const af = t('[data-amenfilter]');
        if (af) { this.setState({ amenCat: af.getAttribute('data-amenfilter') }); return; }
        const cat = t('[data-cat]');
        if (cat) { this.setState({ cat: cat.getAttribute('data-cat') }); return; }
        const arrow = t('[data-gal-arrow]');
        if (arrow) { this.stepGallery(arrow.getAttribute('data-gal-arrow') === 'next' ? 1 : -1); return; }
        const gal = t('[data-gal]');
        if (gal) { this.openLightbox(parseInt(gal.getAttribute('data-idx'), 10)); return; }
        if (t('[data-lb-close]')) { this.closeLightbox(); return; }
        if (t('[data-lb-next]')) { this.stepLightbox(1); return; }
        if (t('[data-lb-prev]')) { this.stepLightbox(-1); return; }
        if (e.target.closest('[data-lightbox]') && !e.target.closest('figure')) { this.closeLightbox(); return; }
        if (e.target.closest('[data-drawer-scrim]')) { this.closeDrawer(); return; }
        const disc = t('[data-disclaimer-toggle]');
        if (disc) {
          const p = this.q('[data-disclaimer]');
          const open = p.style.display !== 'none';
          p.style.display = open ? 'none' : 'block';
          disc.textContent = open ? 'Disclaimer +' : 'Disclaimer −';
          return;
        }
      }, true);

      this.qa('[data-amen]').forEach((tile) => {
        const icon = tile.querySelector('[data-amen-icon]');
        const rule = tile.querySelector('[data-amen-rule]');
        const num = tile.querySelector('[data-amen-num]');
        const name = tile.querySelector('[data-amen-name]');
        tile.addEventListener('mouseenter', () => {
          if (this.isMobile) return;
          tile.style.background = 'rgba(18,55,80,.55)';
          if (icon) { icon.style.color = this.accent; icon.style.borderColor = this.accent; icon.style.transform = 'translateY(-4px)'; }
          if (num) num.style.color = this.accent;
          if (name) { name.style.color = '#F5F2EA'; name.style.transform = 'translateX(3px)'; }
          if (rule) rule.style.transform = 'scaleX(1)';
        });
        tile.addEventListener('mouseleave', () => {
          tile.style.background = 'transparent';
          if (icon) { icon.style.color = 'rgba(245,242,234,.8)'; icon.style.borderColor = 'rgba(245,242,234,.18)'; icon.style.transform = 'translateY(0)'; }
          if (num) num.style.color = 'rgba(245,242,234,.32)';
          if (name) { name.style.color = 'rgba(245,242,234,.86)'; name.style.transform = 'translateX(0)'; }
          if (rule) rule.style.transform = 'scaleX(0)';
        });
      });

      this.qa('[data-gal]').forEach((fig) => {
        const img = fig.querySelector('img');
        const cap = fig.querySelector('[data-galcap]');
        fig.addEventListener('mouseenter', () => { if (this.reduced) return; img.style.transform = 'scale(1.06)'; cap.style.opacity = '1'; });
        fig.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; cap.style.opacity = '0'; });
      });

      this.qa('[data-magnetic]').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          if (this.isMobile || this.reduced) return;
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.22;
          const y = (e.clientY - r.top - r.height / 2) * 0.3;
          btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        });
        btn.addEventListener('mouseleave', () => { btn.style.transition = 'transform .8s cubic-bezier(.16,1,.3,1)'; btn.style.transform = 'translate(0,0)'; });
        btn.addEventListener('mouseenter', () => { btn.style.transition = 'transform .2s cubic-bezier(.16,1,.3,1)'; });
      });
    }

    scrollTo(hash) {
      const el = hash === '#top' ? this.root : document.querySelector(hash);
      if (!el) return;
      const y = window.scrollY + el.getBoundingClientRect().top - 70;
      window.scrollTo({ top: hash === '#top' ? 0 : y, behavior: this.reduced ? 'auto' : 'smooth' });
    }

    runIntro() {
      if (document.hidden && !this.introWaiting) {
        this.introWaiting = true;
        const onVis = () => {
          if (document.hidden) return;
          document.removeEventListener('visibilitychange', onVis);
          this.introWaiting = false;
          this.runIntro();
        };
        document.addEventListener('visibilitychange', onVis);
        setTimeout(() => { if (this.introWaiting) this.revealHero(); }, 1200);
        const lo = this.q('[data-loader]');
        if (lo) { lo.style.transition = 'none'; lo.style.opacity = '0'; lo.style.visibility = 'hidden'; lo.style.display = 'none'; }
        return;
      }
      this.introWaiting = false;
      const loader = this.q('[data-loader]');
      const line = this.q('[data-loader-line]');
      const mark = this.q('[data-loader-mark]');
      const imgwrap = this.q('[data-hero-imgwrap]');
      const heroImg = this.q('[data-hero-img]');
      const show = (n, d) => setTimeout(() => {
        const el = this.q('[data-hero-el="' + n + '"]');
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0px)';
      }, d);
      const finish = () => {
        imgwrap.style.clipPath = 'inset(0 0 0% 0)';
        heroImg.style.transform = this.heroBase();
        [1, 2, 3, 4, 5, 7, 6].forEach((n, i) => show(n, 380 + i * 190));
        this.qa('[data-hero-sep]').forEach((s, i) => setTimeout(() => { s.style.opacity = '.68'; s.style.transform = 'scaleX(1)'; }, 470 + i * 300));
        setTimeout(() => { this.introDone = true; this.applyResponsive(); }, 380 + 7 * 190);
        [2400, 3600, 5200].forEach((t) => setTimeout(() => this.revealHero(), t));
      };
      if (this.reduced || this.props.introSequence === false) {
        loader.style.display = 'none';
        finish();
        return;
      }
      requestAnimationFrame(() => { line.style.width = '150px'; });
      setTimeout(() => { mark.style.opacity = '1'; mark.style.transform = 'translateY(0)'; }, 900);
      setTimeout(() => { loader.style.opacity = '0'; loader.style.visibility = 'hidden'; finish(); }, 2050);
      setTimeout(() => { loader.style.display = 'none'; }, 3200);
    }

    heroBase() {
      return window.innerWidth < 900 ? 'scale(1.04)' : 'scale(1.45) translateX(20%)';
    }

    revealHero() {
      const instant = document.hidden;
      this.qa('[data-hero-el]').forEach((el) => {
        if (instant) el.style.transition = 'none';
        el.style.opacity = '1';
        if (el.getAttribute('data-hero-el') !== '6') el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0px)';
      });
      this.qa('[data-hero-sep]').forEach((sp) => { if (instant) sp.style.transition = 'none'; sp.style.opacity = '.68'; sp.style.transform = 'scaleX(1)'; });
      const wrap = this.q('[data-hero-imgwrap]');
      const himg = this.q('[data-hero-img]');
      if (wrap) { if (instant) wrap.style.transition = 'none'; wrap.style.clipPath = 'inset(0 0 0% 0)'; }
      if (himg) { if (instant) himg.style.transition = 'none'; himg.style.transform = this.heroBase(); }
    }

    setupReveals() {
      const items = this.qa('[data-reveal]');
      this.io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const d = parseInt(en.target.getAttribute('data-delay') || '0', 10);
          setTimeout(() => { en.target.style.opacity = '1'; en.target.style.transform = 'translate(0,0)'; }, this.reduced ? 0 : d);
          this.io.unobserve(en.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      items.forEach((el) => this.io.observe(el));

      this.io2 = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.style.transform = 'scaleX(1)'; this.io2.unobserve(en.target); } });
      }, { threshold: 0.4 });
      this.qa('[data-rule]').forEach((el) => this.io2.observe(el));

      this.io3 = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const figs = this.qa('[data-gal]');
          const i = figs.indexOf(en.target);
          setTimeout(() => { en.target.style.opacity = '1'; en.target.style.transform = 'translate(0,0)'; }, this.reduced ? 0 : (i % 2) * 90);
          this.io3.unobserve(en.target);
        });
      }, { threshold: 0.12 });
      this.qa('[data-gal]').forEach((el) => this.io3.observe(el));
    }

    setupCursor() {
      const dot = this.q('[data-cursor-dot]');
      const label = this.q('[data-cursor-label]');
      if (!dot) return;
      if (window.matchMedia('(hover: none)').matches || this.props.customCursor === false) { dot.style.display = 'none'; return; }
      let x = -100, y = -100, cx = -100, cy = -100;
      this.mouseHandler = (e) => { x = e.clientX; y = e.clientY; };
      window.addEventListener('mousemove', this.mouseHandler, { passive: true });
      const loop = () => {
        cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
        dot.style.transform = 'translate(' + (cx - dot.offsetWidth / 2) + 'px,' + (cy - dot.offsetHeight / 2) + 'px)';
        this.raf = requestAnimationFrame(loop);
      };
      dot.style.transform = 'translate(-100px,-100px)';
      loop();
      this.qa('[data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          dot.style.width = '76px'; dot.style.height = '76px'; dot.style.background = this.accent; dot.style.borderColor = this.accent;
          label.textContent = el.getAttribute('data-cursor'); label.style.opacity = '1';
        });
        el.addEventListener('mouseleave', () => {
          dot.style.width = '10px'; dot.style.height = '10px'; dot.style.background = 'transparent';
          label.style.opacity = '0';
        });
      });
    }

    setupResponsive() { this.applyResponsive(); }

    fitHero() {
      if (!this.legacyFit) return;
      const layer = this.q('[data-hero-layer]');
      if (!layer || this.fitBusy) return;
      this.fitBusy = true;
      const nav = this.q('[data-nav]') || document.querySelector('header') || this.q('[data-nav-logo]');
      const bar = this.q('[data-fab-mobile]');
      const barH = window.innerWidth < 1100 ? this.measureBar() : 0;
      layer.style.zoom = 1;
      layer.style.minHeight = '0px';
      layer.style.maxHeight = '100%';
      layer.style.overflow = 'hidden';
      const kids = Array.from(layer.children).filter((c) => c.getAttribute('data-hero-el') !== '6');
      kids.forEach((k) => { k.style.flex = '0 0 auto'; });
      // group gaps: the separators own them, so they are the first thing we compress
      const seps = this.qa('[data-hero-sep]');
      const tagline = this.q('[data-hero-tagline]');
      const colEl = this.q('[data-hero-textcol]');
      seps.forEach((sp) => { sp.style.margin = '0px'; });
      const baseGap = colEl ? (parseFloat(colEl.dataset.baseGap) || 34) : 34;
      if (tagline && !tagline.dataset.baseM) tagline.dataset.baseM = String(Math.round(parseFloat(getComputedStyle(tagline).marginTop)) || 28);
      const navBottom = nav ? Math.round(nav.getBoundingClientRect().bottom) : 88;
      const heroSecEl = this.q('[data-hero]');
      const H = Math.min(heroSecEl ? heroSecEl.clientHeight : window.innerHeight, window.innerHeight);
      const measure = (pt) => {
        const top = layer.getBoundingClientRect().top + pt;
        const bottoms = kids.map((k) => {
          const r = k.getBoundingClientRect();
          const zk = parseFloat(getComputedStyle(k).zoom) || 1;
          return r.top + Math.max(r.height, k.scrollHeight * zk);
        });
        return Math.max(1, Math.max.apply(null, bottoms) - top);
      };
      // reclaim spacing BEFORE scaling: gaps -> top pad -> bottom reserve -> zoom (never below .8)
      let d = 1, pt = 0, reserve = 0, need = 1, avail = 1;
      for (let step = 0; step <= 8; step++) {
        d = 1 - step * 0.075;
        const gapTop = Math.round(28 * d) + navBottom;
        if (colEl) colEl.style.rowGap = Math.max(10, Math.round(baseGap * d)) + 'px';
        if (tagline) tagline.style.marginTop = Math.max(10, Math.round(parseFloat(tagline.dataset.baseM) * d)) + 'px';
        pt = Math.max(navBottom + 12, gapTop);
        reserve = Math.round(barH + Math.max(12, 34 * d));
        layer.style.paddingTop = pt + 'px';
        layer.style.paddingBottom = reserve + 'px';
        void layer.offsetHeight;
        need = measure(pt);
        avail = H - pt - reserve;
        if (need <= avail) break;
      }
      const z = Math.min(1, Math.max(0.8, avail / need));
      layer.style.zoom = z;
      layer.style.paddingTop = Math.round(pt / z) + 'px';
      layer.style.paddingBottom = Math.round(reserve / z) + 'px';
      // hairlines must survive the scale
      seps.forEach((sp) => { sp.style.height = Math.max(1, Math.round(1 / z)) + 'px'; });
      void layer.offsetHeight;
      const cue = this.q('[data-hero-el="6"]');
      if (cue) cue.style.bottom = Math.round((barH + 26) / z) + 'px';
      this.fitBusy = false;
      // the real bottom reserve is only known here — scale the column against it now
      void layer.offsetHeight;
      this.fitHeroCol();
      if (!this.heroFitBound) {
        this.heroFitBound = true;
        const refit = () => this.fitHero();
        const img = this.q('[data-hero-chatur]');
        if (img && !img.complete) img.addEventListener('load', refit, { once: true });
        if (window.ResizeObserver) {
          this.heroRO = new ResizeObserver(() => {
            if (this.heroFitPending) return;
            this.heroFitPending = true;
            requestAnimationFrame(() => { this.heroFitPending = false; this.fitHero(); });
          });
          kids.forEach((k) => this.heroRO.observe(k));
        }
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
      }
    }

    fitHeroCol() {
      const heroCol = this.q('[data-hero-textcol]');
      const heroLayer = this.q('[data-hero-layer]');
      if (!heroCol || !heroLayer || this.colBusy) return;
      this.colBusy = true;
      setTimeout(() => { this.colBusy = false; }, 0);
      heroCol.style.transform = 'none';
      heroCol.style.marginTop = '0px';
      heroCol.style.transformOrigin = 'top center';
      void heroCol.offsetHeight;
      const lcs = getComputedStyle(heroLayer);
      const box = heroLayer.clientHeight - parseFloat(lcs.paddingTop) - parseFloat(lcs.paddingBottom);
      const ch = Math.max(heroCol.scrollHeight, Math.round(heroCol.getBoundingClientRect().height));
      if (box > 0 && ch > 0) {
        const k = Math.min(1, Math.max(0.62, box / ch));
        heroCol.style.transform = k < 1 ? 'scale(' + k.toFixed(3) + ')' : 'none';
        heroCol.style.marginTop = Math.max(0, Math.round((box - ch * k) / 2)) + 'px';
      }
      if (!this.heroColBound) {
        this.heroColBound = true;
        const refit = () => this.fitHeroCol();
        window.addEventListener('load', refit);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
        [200, 700, 1600, 2600].forEach((d) => setTimeout(refit, d));
        const chat = this.q('[data-hero-chatur]');
        if (chat && !chat.complete) chat.addEventListener('load', refit, { once: true });
        if (window.ResizeObserver) {
          this.heroColRO = new ResizeObserver(() => {
            if (this.heroColPending) return;
            this.heroColPending = true;
            requestAnimationFrame(() => { this.heroColPending = false; this.fitHeroCol(); });
          });
          this.heroColRO.observe(heroCol);
          this.heroColRO.observe(heroLayer);
          const bar = this.q('[data-fab-mobile]');
          if (bar) this.heroColRO.observe(bar);
        }
      }
    }

    measureBar() {
      const bar = this.q('[data-fab-mobile]');
      if (!bar) return this.barHCache || 96;
      const prev = bar.style.display;
      if (prev === 'none') bar.style.display = 'block';
      const h = bar.offsetHeight;
      bar.style.display = prev;
      if (h) this.barHCache = h;
      return this.barHCache || 96;
    }

    applyResponsive() {
      const w = window.innerWidth;
      const mobile = w < 1200;
      const narrow = w < 1180;
      const phone = w < 700;
      this.isMobile = mobile;
      const set = (sel, prop, val) => { const el = this.q(sel); if (el) el.style[prop] = val; };
      set('[data-nav-links]', 'display', mobile ? 'none' : 'flex');
      set('[data-burger]', 'display', mobile ? 'flex' : 'none');
      set('[data-rail]', 'display', mobile ? 'none' : 'flex');
      set('[data-side1]', 'display', mobile ? 'none' : 'flex');
      set('[data-fab-mobile]', 'display', mobile ? 'block' : 'none');
      set('[data-hero-el="6"]', 'display', (w < 760 || window.innerHeight < 720) ? 'none' : 'flex');
      const col = this.q('[data-hero-textcol]');
      if (col) col.style.maxWidth = phone ? '100%' : 'min(66vw,700px)';

      const lede = this.q('[data-r-proj-lede]');
      if (lede) lede.style.maxWidth = 'none';
      const pfig = this.q('[data-r-proj-fig]');
      if (pfig) pfig.style.height = 'auto';
      set('[data-r-amen-head]', 'gridTemplateColumns', narrow ? '1fr' : '1fr 1.15fr');

      const ag = this.q('[data-amen-grid]');
      if (ag) ag.style.gridTemplateColumns = phone ? 'repeat(2,1fr)' : (w < 1100 ? 'repeat(auto-fill,minmax(150px,1fr))' : 'repeat(auto-fill,minmax(168px,1fr))');
      set('[data-r-loc-grid]', 'gridTemplateColumns', narrow ? '1fr' : '1.15fr .85fr');
      set('[data-r-res]', 'gridTemplateColumns', narrow ? '1fr' : '.85fr 1.15fr');
      set('[data-r-highlights]', 'gridTemplateColumns', '1fr');
      set('[data-highlight-list]', 'gridTemplateColumns', phone ? '1fr' : '1fr 1fr');
      set('[data-r-loc-top]', 'gridTemplateColumns', narrow ? '1fr' : '.85fr 1.15fr');
      // when the location grid collapses to one column the list is full-width:
      // flow it into two columns so each row's name and distance stay adjacent
      const locList = this.q('[data-loc-list]');
      if (locList) locList.style.gridTemplateColumns = (narrow && !phone) ? '1fr 1fr' : '1fr';
      set('[data-r-foot]', 'gridTemplateColumns', mobile ? '1fr' : (narrow ? '1fr 1fr' : '1.15fr 1fr 1fr .85fr'));

      const galItems = this.qa('[data-gal]');
      galItems.forEach((f) => {
        f.style.flex = phone ? '0 0 88vw' : (mobile ? '0 0 66vw' : '0 0 clamp(420px,45vw,720px)');
        f.style.height = phone ? '66vw' : 'clamp(330px,51vh,600px)';
        f.style.aspectRatio = 'auto';
      });
      const mapFrame = this.q('[data-map-frame]');
      if (mapFrame) mapFrame.style.aspectRatio = phone ? '1/1.05' : '4/3.1';
      this.qa('[data-mk] span:last-child').forEach((l) => { l.style.fontSize = phone ? '7px' : '8px'; l.style.letterSpacing = phone ? '.1em' : '.16em'; });
      const footBottom = this.q('[data-foot-bottom]');
      if (footBottom) footBottom.style.paddingBottom = mobile ? '78px' : '0px';
      const heroLock = this.q('[data-chatur-lock]');
      const heroImg = this.q('[data-hero-img]');
      const heroScrim = this.q('[data-hero-scrim]');
      const heroSec = this.q('[data-hero]');
      const heroLayer = this.q('[data-hero-layer]');
      const heroCol = this.q('[data-hero-textcol]');
      const stack = w < 900;
      const vshort = window.innerHeight < 620;
      const barH = mobile ? Math.max(this.measureBar(), 92) : 0;
      if (heroSec) { heroSec.style.height = '100svh'; heroSec.style.minHeight = '480px'; heroSec.style.maxHeight = 'none'; }
      if (heroImg) {
        heroImg.style.objectPosition = stack ? '56% 34%' : '100% 44%';
        if (this.introDone || this.introWaiting === false) heroImg.style.transform = this.heroBase();
      }
      const heroWrap = this.q('[data-hero-imgwrap]');
      if (heroWrap) {
        heroWrap.style.width = '100%';
        heroWrap.style.webkitMaskImage = 'none';
        heroWrap.style.maskImage = 'none';
      }
      if (heroScrim) heroScrim.style.background = stack
        ? 'linear-gradient(180deg,rgba(7,25,35,.46) 0%,rgba(7,25,35,.7) 40%,rgba(7,25,35,.94) 100%)'
        : 'linear-gradient(90deg,rgba(7,25,35,.92) 0%,rgba(7,25,35,.9) 22%,rgba(7,25,35,.78) 38%,rgba(7,25,35,.46) 56%,rgba(7,25,35,.16) 76%,rgba(7,25,35,0) 100%)';
      if (heroLayer) {
        heroLayer.style.alignItems = 'flex-start';
        heroLayer.style.justifyContent = stack ? 'center' : 'flex-start';
        heroLayer.style.paddingBottom = (barH + (vshort ? 34 : (window.innerHeight < 780 ? 54 : 96))) + 'px';
        heroLayer.style.paddingTop = (stack ? 104 : (window.innerHeight < 780 ? 92 : 118)) + 'px';
      }
      if (heroCol) {
        heroCol.style.width = stack ? '100%' : (w < 1400 ? 'min(50vw,500px)' : 'min(44vw,560px)');
        heroCol.style.maxWidth = stack ? 'min(100%,440px)' : '100%';
      }
      const shortH = window.innerHeight < 780;
      if (heroLock) heroLock.style.width = vshort ? '68%' : (shortH ? '84%' : '100%');
      const sep1 = this.q('[data-hero-sep="1"]');
      if (sep1) sep1.style.margin = '0px';
      const el6 = this.q('[data-hero-el="6"]');
      if (el6) el6.style.bottom = (barH + 22) + 'px';
      const el1 = this.q('[data-hero-el="1"]');
      if (el1) { el1.style.display = 'flex'; el1.style.gap = vshort ? '9px' : '14px'; el1.style.marginBottom = '0px'; }
      const el7 = this.q('[data-hero-el="7"]');
      if (el7) { el7.style.marginTop = vshort ? '12px' : (shortH ? '20px' : 'clamp(24px,3.4vh,42px)'); el7.style.gap = vshort ? '11px' : (shortH ? '14px' : 'clamp(14px,1.8vh,20px)'); }
      const colGapBase = vshort ? 15 : (shortH ? 24 : 34);
      const heroColEl = this.q('[data-hero-textcol]');
      if (heroColEl) { heroColEl.dataset.baseGap = String(colGapBase); heroColEl.style.rowGap = colGapBase + 'px'; }
      const el5 = this.q('[data-hero-el="5"]');
      if (el5) el5.style.gap = vshort ? '11px' : (shortH ? '13px' : 'clamp(15px,2vh,20px)');
      const box = this.q('[data-offer-box]');
      if (box) box.style.width = vshort ? 'min(100%,340px)' : (shortH ? 'min(100%,390px)' : 'min(100%,420px)');
      this.qa('[data-offer-box] > div').forEach((d) => { d.style.padding = (vshort ? '10px' : (shortH ? '13px' : 'clamp(15px,2.2vh,22px)')) + ' 10px'; });
      this.fitHeroCol();
      if (!this.heroColQueued) {
        this.heroColQueued = true;
        requestAnimationFrame(() => { this.heroColQueued = false; this.fitHeroCol(); });
      }
      const touch = window.matchMedia('(hover: none)').matches || mobile;
      this.qa('[data-galcap]').forEach((c) => { c.style.opacity = touch ? '1' : c.style.opacity; });
      const planTile = this.q('[data-plan-tile]');
      if (planTile) {
        planTile.style.aspectRatio = phone ? '4/3.4' : '16/11';
        if (planTile.dataset.hoverBound !== '1') {
          planTile.dataset.hoverBound = '1';
          const card = planTile.querySelector('[data-plan-card]');
          const rule = planTile.querySelector('[data-plan-rule]');
          const blur = planTile.querySelector('[data-plan-blur]');
          const on = (v) => {
            if (card) {
              card.style.background = v ? 'rgba(11,41,64,.97)' : 'rgba(11,41,64,.92)';
              card.style.borderColor = v ? 'rgba(192,112,74,.6)' : 'rgba(245,242,234,.1)';
              card.style.transform = v ? 'translateY(-4px)' : 'none';
            }
            if (rule) rule.style.width = v ? '64px' : '34px';
            if (blur) {
              blur.style.filter = v ? 'blur(9px) saturate(.5) brightness(.98)' : 'blur(15px) saturate(.42) brightness(.9)';
              blur.style.transform = v ? 'scale(1.05)' : 'scale(1.02)';
            }
          };
          planTile.addEventListener('mouseenter', () => on(true));
          planTile.addEventListener('mouseleave', () => on(false));
          planTile.addEventListener('focus', () => on(true));
          planTile.addEventListener('blur', () => on(false));
        }
      }
      if (this.introDone) {
        this.qa('[data-hero-el]').forEach((el) => {
          el.style.opacity = '1';
          if (el.getAttribute('data-hero-el') !== '6') el.style.transform = 'translateY(0) scale(1)';
          el.style.filter = 'blur(0px)';
        });
      }
      const drawer = this.q('[data-drawer]');
      if (drawer) drawer.style.width = phone ? '100vw' : 'min(460px,100vw)';
      const lbFig = this.q('[data-lightbox] figure img');
      if (lbFig) lbFig.style.maxHeight = phone ? '62vh' : '74vh';
    }

    postMapCat(v) {
      this.pendingCat = v;
      const f = this.q('[data-map-embed]');
      if (!f) return;
      if (!this.mapBound) {
        this.mapBound = true;
        f.addEventListener('load', () => { this.mapReady = true; this.postMapCat(this.pendingCat); });
      }
      if (!this.mapReady || !f.contentWindow) return;
      f.contentWindow.postMessage({ type: 'arkis-map-cat', cat: v }, '*');
    }

    setActiveCat(cat) {
      this.postMapCat(cat);
    }

    prog(el, offset) {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      if (total <= 0) return 0;
      return Math.min(1, Math.max(0, (-r.top + (offset || 0)) / total));
    }

    onScroll() {
      const y = window.scrollY;
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      const bar = this.q('[data-progress-bar]');
      if (bar) bar.style.width = ((y / Math.max(1, doc)) * 100) + '%';

      const nav = this.q('[data-nav]');
      if (nav) {
        const on = y > 60;
        nav.style.background = on ? 'rgba(11,41,64,.9)' : 'transparent';
        nav.style.backdropFilter = on ? 'blur(14px)' : 'blur(0px)';
        nav.style.borderBottomColor = on ? 'rgba(192,112,74,.28)' : 'rgba(245,242,234,0)';
        nav.style.padding = on ? '14px clamp(18px,4vw,56px)' : '26px clamp(18px,4vw,56px)';
        const li = this.q('[data-logo-img]');
        const lp = this.q('[data-logo-plate]');
        if (li) li.style.transform = on ? 'scale(.86)' : 'scale(1)';
        if (lp) lp.style.opacity = on ? '0' : '1';
      }

      if (!this.reduced) {
        const hero = this.q('[data-hero]');
        if (hero) {
          const hr = hero.getBoundingClientRect();
          if (hr.bottom > 0) {
            const p = Math.min(1, Math.max(0, -hr.top / Math.max(1, hr.height)));
            const img = this.q('[data-hero-img]');
            const layer = this.q('[data-hero-layer]');
            if (img && this.introDone !== false) img.style.transform = this.heroBase();
            if (layer) { layer.style.transform = 'translateY(' + (p * -8) + '%)'; layer.style.opacity = String(1 - p * 0.9); }
          }
        }

        const finalLogo = this.q('[data-final-logo]');
        if (finalLogo) {
          const r = finalLogo.parentElement.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
            finalLogo.style.transform = 'translate(-50%,' + (-50 + (p - 0.5) * 16) + '%)';
          }
        }

      }

      // scroll-driven ink fill: the copy lights up line by line as it crosses the viewport
      this.qa('[data-ink]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const span = r.height + window.innerHeight * 0.5;
        const p = Math.max(0, Math.min(1, (window.innerHeight * 0.82 - r.top) / span));
        const a = Math.round(p * 100);
        const b = Math.min(100, a + 14);
        el.style.backgroundImage = 'linear-gradient(180deg,#F5F2EA 0%,#F5F2EA ' + a + '%,rgba(245,242,234,.2) ' + b + '%,rgba(245,242,234,.2) 100%)';
      });

      const words = this.qa('[data-word]');
      words.forEach((w) => {
        const r = w.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - window.innerHeight * 0.5) / (window.innerHeight * 0.5);
        const on = d < 0.55;
        w.style.opacity = on ? '1' : '.16';
        w.style.transform = on ? 'translateX(0)' : 'translateX(-6px)';
      });

      let active = null;
      ['project', 'club', 'location', 'config'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.45 && r.bottom > window.innerHeight * 0.3) active = id;
      });
      if (active !== this.activeSection) {
        this.activeSection = active;
        this.qa('[data-navlink]').forEach((a) => {
          const on = a.getAttribute('data-navlink') === active;
          a.style.borderBottomColor = on ? this.accent : 'rgba(192,112,74,0)';
          a.style.opacity = on ? '1' : '.72';
        });
        this.qa('[data-railitem]').forEach((it) => {
          const on = it.getAttribute('data-railitem') === active;
          it.style.color = on ? '#F5F2EA' : 'rgba(245,242,234,.35)';
          const dash = it.querySelector('[data-raildash]');
          if (dash) { dash.style.width = on ? '34px' : '14px'; dash.style.background = on ? this.accent : 'rgba(245,242,234,.3)'; }
        });
      }
    }

    toggleRera(force) {
      const p = this.q('[data-rera-panel]');
      if (!p) return;
      const open = force === undefined ? p.dataset.open !== '1' : force;
      p.dataset.open = open ? '1' : '';
      p.style.transform = open ? 'translate(0,-50%)' : 'translate(102%,-50%)';
      p.style.opacity = open ? '1' : '0';
      p.style.pointerEvents = open ? 'auto' : 'none';
      this.qa('[data-rera-plus]').forEach((s) => { s.textContent = open ? '\u2212' : '+'; });
      this.qa('[data-rera-toggle]').forEach((s) => s.setAttribute('aria-expanded', open ? 'true' : 'false'));
    }

    applyAmen() {
      const cat = this.state.amenCat;
      const changed = this.paintedAmen !== cat;
      this.paintedAmen = cat;
      let n = 0;
      this.qa('[data-amen]').forEach((tile) => {
        const on = cat === 'all' || tile.getAttribute('data-amen') === cat;
        tile.style.display = on ? 'flex' : 'none';
        if (!on) return;
        n++;
        if (this.reduced || !changed) return;
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(10px)';
        tile.style.transition = 'opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1), background .8s cubic-bezier(.16,1,.3,1)';
        const d = Math.min(n * 26, 320);
        setTimeout(() => { tile.style.opacity = '1'; tile.style.transform = 'translateY(0)'; }, d);
      });
      const c = this.q('[data-amen-count]');
      if (c) c.textContent = n + (n === 1 ? ' Amenity' : ' Amenities');
    }

    openMenu() { const m = this.q('[data-mobile-menu]'); m.style.display = 'flex'; requestAnimationFrame(() => { m.style.opacity = '1'; }); document.body.style.overflow = 'hidden'; }
    closeMenu() { const m = this.q('[data-mobile-menu]'); if (!m || m.style.display === 'none') return; m.style.opacity = '0'; setTimeout(() => { m.style.display = 'none'; }, 400); document.body.style.overflow = ''; }

    startFormTimer() {
      if (this.formTimer) clearInterval(this.formTimer);
      this.formTimer = setInterval(() => {
        if (this.formSubmitted) { clearInterval(this.formTimer); return; }
        const s = this.q('[data-drawer-scrim]');
        const lb = this.q('[data-lightbox]');
        const menu = this.q('[data-mobile-menu]');
        const pop = this.q('[data-popup]');
        const busy = (s && s.style.display === 'block') || (lb && lb.style.display === 'flex') || (menu && menu.style.display === 'flex') || (pop && pop.style.display === 'flex');
        // don't interrupt a visitor who is typing into one of the page's forms
        const typing = document.activeElement && document.activeElement.closest && document.activeElement.closest('.lead-form');
        if (busy || typing || document.hidden) return;
        this.openPopup();
      }, 50000);
    }

    // Booking pop-up (side form) shown by the timer
    openPopup() {
      const p = this.q('[data-popup]');
      if (!p) return;
      p.style.display = 'flex';
      requestAnimationFrame(() => { p.style.opacity = '1'; });
      document.body.style.overflow = 'hidden';
    }

    closePopup() {
      const p = this.q('[data-popup]');
      if (!p || p.style.display !== 'flex') return;
      p.style.opacity = '0';
      setTimeout(() => { p.style.display = 'none'; }, 500);
      document.body.style.overflow = '';
    }

    openDrawer(kind, auto) {
      this.closeMenu();
      if (!auto) this.startFormTimer();
      const d = this.q('[data-drawer]');
      const s = this.q('[data-drawer-scrim]');
      const title = this.q('[data-drawer-title]');
      if (title) title.textContent = kind === 'plan' ? 'Request the Floor Plan' : (kind === 'enquire' ? 'Enquire Now' : 'Book a Site Visit');
      s.style.display = 'block';
      requestAnimationFrame(() => { s.style.opacity = '1'; d.style.transform = 'translateX(0)'; });
      document.body.style.overflow = 'hidden';
      if (!auto) setTimeout(() => { const f = d.querySelector('input[name="name"]'); if (f) f.focus(); }, 500);
    }

    closeDrawer() {
      const d = this.q('[data-drawer]');
      const s = this.q('[data-drawer-scrim]');
      d.style.transform = 'translateX(102%)';
      s.style.opacity = '0';
      setTimeout(() => { s.style.display = 'none'; }, 500);
      document.body.style.overflow = '';
    }

    galData() {
      return this.qa('[data-gal]:not([aria-hidden="true"])').map((f) => ({ src: f.getAttribute('data-src'), cap: f.getAttribute('data-caption') }));
    }

    openLightbox(i) {
      const data = this.galData();
      this.lbIndex = i;
      const lb = this.q('[data-lightbox]');
      this.q('[data-lb-img]').src = data[i].src;
      this.q('[data-lb-img]').alt = data[i].cap;
      this.q('[data-lb-caption]').textContent = data[i].cap;
      this.q('[data-lb-index]').textContent = String(i + 1).padStart(2, '0') + ' / ' + String(data.length).padStart(2, '0');
      lb.style.display = 'flex';
      requestAnimationFrame(() => { lb.style.opacity = '1'; });
      document.body.style.overflow = 'hidden';
      if (!this.lbSwipe) {
        this.lbSwipe = true;
        let sx = 0;
        lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', (e) => {
          const dx = e.changedTouches[0].clientX - sx;
          if (Math.abs(dx) > 50) this.stepLightbox(dx < 0 ? 1 : -1);
        }, { passive: true });
      }
    }

    stepLightbox(dir) {
      const data = this.galData();
      this.openLightbox((this.lbIndex + dir + data.length) % data.length);
    }

    closeLightbox() {
      const lb = this.q('[data-lightbox]');
      lb.style.opacity = '0';
      setTimeout(() => { lb.style.display = 'none'; }, 400);
      document.body.style.overflow = '';
    }

    onKey(e) {
      const lb = this.q('[data-lightbox]');
      const open = lb && lb.style.display === 'flex';
      if (e.key === 'Escape') { if (open) this.closeLightbox(); this.closeDrawer(); this.closePopup(); this.closeMenu(); this.toggleRera(false); }
      if (!open) return;
      if (e.key === 'ArrowRight') this.stepLightbox(1);
      if (e.key === 'ArrowLeft') this.stepLightbox(-1);
    }
  }

  function init() {
    const page = new Component();
    renderBindings(page);
    page.componentDidMount();
    window.arkisPage = page;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
