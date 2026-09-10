(function(){
  "use strict";
  document.documentElement.classList.add('has-js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     DATES DU CALENDRIER — septembre 2026 (du 1er à la fin du mois)
     ========================================================= */
  var CAL_YEAR = 2026;
  var CAL_MONTH = 8; /* 0-indexé : 8 = septembre */
  var DAYS_IN_MONTH = new Date(CAL_YEAR, CAL_MONTH + 1, 0).getDate();

  /* ÉDITABLE : remplace ces 30 phrases par tes propres textes.
     Le tableau est indexé à partir de 0 (index 0 = jour 1). */
  var DAY_TEXTS = [
    "Ne doute jamais de l'impact incroyable que tu as sur les gens qui t'entourent. Ta sensibilité et ton cœur font de toi une personne hors du commun. Je suis tellement reconnaissant d'avoir une amie comme toi dans ma vie.",
    "Si un jour la journée te semble lourde, rappelle-toi que tu n'as pas à tout porter toute seule. Je serai toujours là pour t'écouter, te soutenir ou juste te faire changer les idées. On forme une équipe, quoi qu'il arrive.",
    "Tu as cette capacité unique d'illuminer une pièce et de rendre les choses plus simples sans même t'en rendre compte. Même dans tes moments de fatigue, ta présence fait du bien autour de toi. Merci d'être ce rayon de soleil au quotidien.",
    "Je vois tous les efforts que tu fais et la façon dont tu te bat à chaque étape de ta vie. Tu peux être tellement fière du chemin que tu as parcouru jusqu'ici. Sache que moi, je suis extrêmement fier de toi chaque jour.",
    "Avec toi, je peux être moi-même sans poser de filtre ni porter de masque. Merci d'offrir cette zone de sécurité et cette confiance absolue que l'on trouve si rarement. Tu es un vrai refuge, et cette amitié n'a pas de prix.",
    "Pense à t'accorder la même douceur et la même gentillesse que tu donnes aux autres sans compter. Tu mérites de prendre du temps pour toi et de te chouchouter aujourd'hui. N'oublie pas que ton bien-être passe avant tout le reste.",
    "Les meilleures conversations et les souvenirs les plus chers de ma vie, c'est avec toi que je les construis. Rien ne pourra jamais remplacer la complicité et les fous rires qu'on partage. C'est une chance immense de t'avoir à mes côtés.",
    "Peu importe les tempêtes ou les changements, sache que ma place restera toujours près de toi. Mon soutien pour toi ne dépend ni du temps qui passe, ni des kilomètres. Ma porte et mes bras te seront toujours ouverts.",
    "Tu as surmonté tellement d'épreuves avec une dignité et une force qui m'impressionnent toujours autant. Quand le doute s'installe, regarde en arrière et vois tout ce que tu as déjà vaincu. Tu es invincible, et encore plus quand on est deux.",
    "Merci d'exister et d'être exactement la personne formidable que tu es au quotidien. Tu rends la vie plus douce, plus drôle et tellement plus belle. Ne change pour rien au monde, tu es parfaite comme ça.",
    "Il y a des gens qui traversent la vie sans marquer les autres, et puis il y a toi. Ta gentillesse, ta loyauté et ta façon d'être font de toi quelqu'un d'absolument unique. Ne laisse jamais personne altérer la belle personne que tu es.",
    "Même quand le monde autour va trop vite ou devient trop lourd, j'espère que ce petit coin de site te rappellera qu'il y a toujours un endroit où tu es en sécurité. Tu n'es jamais seule avec tes pensées. Je suis là, aujourd'hui comme demain.",
    "Pouvoir t'appeler ma meilleure amie est l'une des plus belles choses qui m'arrivent au quotidien. Je suis tellement fier de faire ce bout de chemin avec toi et de te voir évoluer. Rien ni personne ne pourra remplacer la place que tu as dans ma vie.",
    "J'espère que cette journée t'apportera au moins une fraction de la joie et du réconfort que tu donnes aux autres. Prends une grande inspiration et accorde-toi une pause bien méritée. Tu fais déjà de ton mieux, et c'est amplement suffisant.",
    "On a chacun nos hauts et nos bas, mais notre force c'est d'être deux pour tout traverser. Quand tes épaules fatiguent, rappelle-toi que tu peux t'appuyer sur moi sans hésiter. Ensemble, il n'y a absolument rien qu'on ne puisse pas surmonter.",
    "Merci pour chaque fou rire, chaque discussion tardive et chaque moment de silence qu'on partage si naturellement. Ce sont tous ces petits détails qui rendent notre amitié si précieuse et si vraie. Tu es un pilier irremplaçable dans mon quotidien.",
    "Tu as cette capacité rare de comprendre les gens et de prendre soin d'eux avec une sincérité déconcertante. C'est une qualité inestimable qui montre toute la grandeur de ton cœur. N'oublie jamais à quel point c'est beau et précieux.",
    "Je ne sais pas de quoi demain sera fait, mais je sais une chose : je serai toujours là pour fêter tes victoires et t'aider à relever les défis. Notre amitié est ancrée pour de bon. Le meilleur reste encore à venir pour toi.",
    "C'est normal d'avoir des moments d'hésitation ou de se sentir perdue par instants. Ne sois pas trop dure avec toi-même et laisse le temps faire son œuvre. Je crois en toi, même quand toi tu oublies de le faire.",
    "Pas besoin de grandes phrases aujourd'hui, juste un rappel direct et sincère. Merci d'être dans ma vie et de l'embellir à ce point. Tu es aimée, estimée, et tu comptes énormément pour moi.",
    "Ta simple présence a le don de remettre les idées en place et d'apaiser ce qui va mal. Tu apportes une sérénité et un réconfort que peu de personnes savent offrir. C'est un cadeau immense d'avoir quelqu'un comme toi sur qui compter.",
    "Dans un monde où beaucoup jouent un rôle, toi tu restes vraie, entière et authentique. C'est cette sincérité sans filtre qui fait toute ta beauté et ta valeur. Ne change jamais ta façon d'être pour plaire à qui que ce soit.",
    "Si aujourd'hui est un jour un peu plus sombre, n'oublie pas que les nuages finissent toujours par passer. Tu as déjà traversé des tempêtes et tu en es ressortie plus forte à chaque fois. Je suis juste là, dans l'ombre, prêt à te tendre la main.",
    "Quand je regarde en arrière, les meilleurs moments de ces dernières années sont tous liés à toi. Tu transformes la moindre petite journée ordinaire en un souvenir marquant. Merci de rendre ma vie tellement plus riche en moments précieux.",
    "Tu possèdes en toi tout ce qu'il faut pour accomplir tes rêves et te construire une vie magnifique. Ne laisse jamais la peur ou le doute te faire ralentir. Je serai toujours ton premier supporter, peu importe la route que tu choisis.",
    "Merci d'être cette oreille attentive qui n'émet jamais de jugement et qui sait toujours trouver les bons mots. Trouver une personne à qui tout confier les yeux fermés est une chance inestimable. Tu es mon repère et ma zone de confiance.",
    "Tu as une capacité d'adaptation et une résilience qui m'impressionneront toujours. Même quand le sort s'acharne, tu trouves encore la force de sourire et d'avancer. Tu es un modèle de courage pour moi au quotidien.",
    "Aujourd'hui, mets de côté les tracas, les obligations et le stress pour penser uniquement à toi. Tu donnes tellement aux autres qu'il est temps de te recharger un peu. Tu mérites toute la douceur du monde en cette journée.",
    "Les années peuvent passer et les choses autour de nous changer, notre complicité reste intacte. C'est le genre de lien rare qu'aucun obstacle ne peut briser. Je suis tellement fier et heureux qu'on avance main dans la main.",
    "Ces 30 mots touchent à leur fin, mais pas une seule seconde ce que je pense de toi ne s'arrête ici. Tu es ma meilleure amie, un pilier irremplaçable et une personne profondément gravée dans mon cœur. Merci d'être toi, aujourd'hui et pour toujours."
  ];

  /* ÉDITABLE : les lettres. Change trigger / word / sub comme tu veux,
     ou ajoute/retire des objets dans ce tableau — tout s'adapte automatiquement. */
  var LETTERS = [
    { trigger: "À ouvrir quand... tu paniques",       word: "RESPIRE",   sub: "Pose tout ce que tu fais, ferme les yeux et prends trois grandes inspirations. Rien n'est aussi grave ou définitif qu'il n'y paraît sur le moment. Je suis là, et on va régler ça ensemble, pas à pas." },
    { trigger: "À ouvrir quand... ils te manquent",  word: "ÉTOILES",     sub: "Lève les yeux vers le ciel, que ce soit sous la chaleur du Soleil ou la douceur de la Lune. Leur amour ne s'est pas envolé : il vit encore à travers ta force, ton sourire et la personne formidable que tu es. Tu n'es pas seule." },
    { trigger: "À ouvrir quand... tu doutes de toi",           word: "FORCE",   sub: "Si tu n'arrives pas à croire en toi aujourd'hui, appuie-toi sur la confiance que j'ai en toi. Tu as surmonté des épreuves bien plus lourdes que ce qui se dresse devant toi. Tu es capable de tout, n'en doute jamais." },
    { trigger: "À ouvrir quand... tu as eu une sale journée",              word: "PAUSE",     sub: "Change-toi les idées, mets ta tenue la plus confortable et oublie le reste du monde pour ce soir. Cette journée est terminée, elle ne définit en rien la suite. Demain est une page vierge." },
    { trigger: "À ouvrir quand... tu n'arrives pas à dormir",          word: "CALME",   sub: "Éteins ton écran, pose ton téléphone et laisse tes pensées filer sans les retenir. Tu n'as rien à résoudre cette nuit. Accorde à ton esprit le repos qu'il mérite." },
    { trigger: "À ouvrir quand... tu te sens seule",      word: "PRÉSENCE",    sub: "Même si des kilomètres ou du silence nous séparent en ce moment, mon amitié pour toi ne bouge pas. Tu as un ancrage solide ici, et tu pourras toujours compter sur moi, peu importe l'heure." },
    { trigger: "À ouvrir quand... tu as réussi un truc",   word: "FIERTÉ",       sub: "Je le savais ! Tu as travaillé dur pour ça et tu mérites amplement cette victoire. Savoure ce moment à 100 %, je suis tellement fier de toi !" },
    { trigger: "À ouvrir quand... tu as besoin de rigoler",   word: "DÉLIRE",    sub: "Rappelle-toi juste de nos pires moments de honte et de nos vocal à rallonge pour 0 raison. On est complètement folles/fous, mais c'est pour ça que notre duo est imbattable." },
    { trigger: "À ouvrir quand... tu te sens nostalgique",          word: "SOUVENIRS",  sub: "Regarde tout le chemin qu'on a parcouru depuis le début. On a créé des moments incroyables, et le plus beau dans tout ça, c'est qu'on a encore toute la vie pour en fabriquer d'autres." }
  ];

  var todayReal = new Date();
  var todayMid = new Date(todayReal.getFullYear(), todayReal.getMonth(), todayReal.getDate());

  function dateForDay(d){ return new Date(CAL_YEAR, CAL_MONTH, d); }
  function isUnlocked(d){ return dateForDay(d).getTime() <= todayMid.getTime(); }
  function isToday(d){ return dateForDay(d).getTime() === todayMid.getTime(); }
  function frDate(d){
    return dateForDay(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  }

  /* ---- petit stockage local : quelles cases ont déjà été ouvertes (confort visuel seulement) ---- */
  function getOpened(){
    try{
      var raw = window.localStorage.getItem('sarah-cal-opened');
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  }
  function markOpened(d){
    try{
      var list = getOpened();
      if(list.indexOf(d) === -1){ list.push(d); window.localStorage.setItem('sarah-cal-opened', JSON.stringify(list)); }
    }catch(e){}
  }

  /* =========================================================
     NAVIGATION ENTRE ÉCRANS
     ========================================================= */
  var screens = {
    home: document.getElementById('screen-home'),
    calendar: document.getElementById('screen-calendar'),
    day: document.getElementById('screen-day'),
    letters: document.getElementById('screen-letters'),
    letter: document.getElementById('screen-letter'),
    window: document.getElementById('screen-window'),
    sky: document.getElementById('screen-sky'),
    secret: document.getElementById('screen-secret')
  };
  var navLinks = document.querySelectorAll('[data-nav]');

  function showScreen(name){
    Object.keys(screens).forEach(function(key){
      var el = screens[key];
      el.classList.remove('enter');
      if(key === name){ el.classList.add('active'); }
      else { el.classList.remove('active'); }
    });
    // force reflow puis relance l'anim d'entrée
    void screens[name].offsetWidth;
    screens[name].classList.add('enter');

    navLinks.forEach(function(btn){
      if(btn.tagName === 'BUTTON' && btn.classList.contains('nav-link')){
        btn.setAttribute('aria-current', btn.getAttribute('data-nav') === name ? 'true' : 'false');
      }
    });

    if(name === 'sky'){ startSkyLoop(); } else { stopSkyLoop(); }

    window.scrollTo(0,0);
  }

  function route(){
    var hash = window.location.hash.replace('#','');
    if(hash.indexOf('jour-') === 0){
      var d = parseInt(hash.replace('jour-',''), 10);
      if(d >= 1 && d <= DAYS_IN_MONTH && isUnlocked(d)){
        openDay(d, false);
        return;
      }
      window.location.hash = 'calendar';
      return;
    }
    if(hash.indexOf('lettre-') === 0){
      var li = parseInt(hash.replace('lettre-',''), 10);
      if(li >= 1 && li <= LETTERS.length){
        openLetter(li - 1);
        return;
      }
      window.location.hash = 'letters';
      return;
    }
    if(hash.indexOf('etoile-') === 0){
      var ei = parseInt(hash.replace('etoile-',''), 10);
      if(ei >= 1 && ei <= CONSTELLATIONS.length){
        showScreen('sky');
        openConstellation(ei - 1, false);
        return;
      }
      window.location.hash = 'sky';
      return;
    }
    if(hash === 'calendar'){ renderCalendar(); showScreen('calendar'); return; }
    if(hash === 'letters'){ showScreen('letters'); return; }
    if(hash === 'window'){ showScreen('window'); return; }
    if(hash === 'sky'){ closeConstellation(); showScreen('sky'); return; }
    if(hash === 'secret'){ showScreen('secret'); return; }
    showScreen('home');
  }

  navLinks.forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = btn.getAttribute('data-nav');
      window.location.hash = target === 'home' ? '' : target;
      closeOrbit();
    });
  });

  window.addEventListener('hashchange', route);

  /* =========================================================
     LE CADRAN D'ÉTOILES (navigation)
     ========================================================= */
  var orbitContainer = document.getElementById('nav-orbit');
  var orbitHub = document.getElementById('orbit-hub');
  var orbitNodes = document.querySelectorAll('.orbit-node');

  function openOrbit(){
    orbitContainer.classList.add('open');
    orbitHub.setAttribute('aria-expanded','true');
    orbitHub.setAttribute('aria-label','Fermer la navigation');
    orbitNodes.forEach(function(n){ n.removeAttribute('tabindex'); });
  }
  function closeOrbit(){
    orbitContainer.classList.remove('open');
    orbitHub.setAttribute('aria-expanded','false');
    orbitHub.setAttribute('aria-label','Ouvrir la navigation');
    orbitNodes.forEach(function(n){ n.setAttribute('tabindex','-1'); });
  }
  orbitHub.addEventListener('click', function(){
    if(orbitContainer.classList.contains('open')){ closeOrbit(); } else { openOrbit(); }
  });
  document.addEventListener('click', function(e){
    if(!orbitContainer.classList.contains('open')) return;
    if(!orbitContainer.contains(e.target)){ closeOrbit(); }
  });

  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape') return;
    if(orbitContainer.classList.contains('open')){ closeOrbit(); orbitHub.focus(); return; }
    if(screens.day.classList.contains('active')){ window.location.hash = 'calendar'; }
    else if(screens.calendar.classList.contains('active')){ window.location.hash = ''; }
    else if(screens.letter.classList.contains('active')){ window.location.hash = 'letters'; }
    else if(screens.letters.classList.contains('active')){ window.location.hash = ''; }
    else if(screens.sky.classList.contains('active')){
      if(constellationOpenIndex !== null){ window.location.hash = 'sky'; }
      else { window.location.hash = 'window'; }
    }
    else if(screens.window.classList.contains('active')){ window.location.hash = ''; }
    else if(screens.secret.classList.contains('active')){ window.location.hash = ''; }
  });

  /* =========================================================
     CALENDRIER : rendu de la grille
     ========================================================= */
  var calGrid = document.getElementById('cal-grid');
  var calStatus = document.getElementById('cal-status');

  function renderCalendar(){
    var firstWeekday = (dateForDay(1).getDay() + 6) % 7; /* 0 = lundi */
    var totalCells = Math.ceil((firstWeekday + DAYS_IN_MONTH) / 7) * 7;
    var opened = getOpened();
    calGrid.innerHTML = '';

    for(var i = 0; i < totalCells; i++){
      var dayNum = i - firstWeekday + 1;
      if(dayNum < 1 || dayNum > DAYS_IN_MONTH){
        var empty = document.createElement('div');
        empty.className = 'day-box is-empty';
        empty.setAttribute('aria-hidden','true');
        calGrid.appendChild(empty);
        continue;
      }
      (function(d){
        var unlocked = isUnlocked(d);
        var box = document.createElement('button');
        box.type = 'button';
        box.className = 'day-box' + (unlocked ? '' : ' is-locked') + (isToday(d) ? ' is-today' : '');

        var numEl = document.createElement('span');
        numEl.className = 'num';
        numEl.textContent = d;
        box.appendChild(numEl);

        var markEl = document.createElement('span');
        markEl.className = 'mark';
        if(unlocked){
          markEl.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-spark"/></svg>';
          box.setAttribute('aria-label', 'Jour ' + d + (opened.indexOf(d) !== -1 ? ' — déjà ouvert' : ' — à ouvrir'));
        } else {
          markEl.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-lock"/></svg>';
          box.setAttribute('aria-label', 'Jour ' + d + ' — verrouillé jusqu\'au ' + frDate(d));
        }
        box.appendChild(markEl);

        if(opened.indexOf(d) !== -1 && unlocked){ box.style.opacity = '0.72'; }

        box.addEventListener('click', function(){
          if(!unlocked){
            if(!reduceMotion){
              box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
            }
            return;
          }
          if(reduceMotion){
            window.location.hash = 'jour-' + d;
            return;
          }
          box.classList.add('popping');
          window.setTimeout(function(){ window.location.hash = 'jour-' + d; }, 320);
        });

        calGrid.appendChild(box);
      })(dayNum);
    }

    if(todayMid.getTime() < dateForDay(1).getTime()){
      calStatus.textContent = 'Le calendrier s\'ouvre le 1er septembre 2026 — reviens à ce moment-là !';
    } else if(todayMid.getTime() > dateForDay(DAYS_IN_MONTH).getTime()){
      calStatus.textContent = 'Le mois est terminé : tu peux tout rouvrir autant que tu veux.';
    } else {
      calStatus.textContent = 'On est le ' + todayMid.toLocaleDateString('fr-FR', { day:'numeric', month:'long' }) + ' : les cases jusqu\'à aujourd\'hui sont ouvertes.';
    }
  }

  /* =========================================================
     ÉCRAN JOUR OUVERT
     ========================================================= */
  var dayLabel = document.getElementById('day-label');
  var dayTextEl = document.getElementById('day-text');
  var dayPrev = document.getElementById('day-prev');
  var dayNext = document.getElementById('day-next');
  var currentDay = null;

  function buildWords(text){
    var words = text.split(' ');
    return words.map(function(w, idx){
      var delay = (idx * 0.07).toFixed(2) + 's';
      return '<span class="word" style="animation-delay:' + delay + '">' + w + (idx < words.length - 1 ? '&nbsp;' : '') + '</span>';
    }).join('');
  }

  function openDay(d, animate){
    currentDay = d;
    var text = DAY_TEXTS[d - 1] || 'Encore une pensée pour toi.';
    dayLabel.textContent = 'JOUR ' + String(d).padStart(2,'0') + ' · SEPTEMBRE';
    dayTextEl.className = 'day-text ' + (text.length <= 25 ? 'len-s' : text.length <= 42 ? 'len-m' : 'len-l');
    dayTextEl.innerHTML = buildWords(text);
    markOpened(d);

    dayPrev.disabled = !(d > 1 && isUnlocked(d - 1));
    dayNext.disabled = !(d < DAYS_IN_MONTH && isUnlocked(d + 1));

    showScreen('day');
    window.setTimeout(function(){ dayTextEl.focus(); }, 50);

    if(!reduceMotion){
      window.setTimeout(function(){ burstFromCenterScreen(); }, 150);
    }
  }

  dayPrev.addEventListener('click', function(){
    if(currentDay > 1 && isUnlocked(currentDay - 1)){ window.location.hash = 'jour-' + (currentDay - 1); }
  });
  dayNext.addEventListener('click', function(){
    if(currentDay < DAYS_IN_MONTH && isUnlocked(currentDay + 1)){ window.location.hash = 'jour-' + (currentDay + 1); }
  });

  /* =========================================================
     LETTRES
     ========================================================= */
  var lettersGrid = document.getElementById('letters-grid');
  var letterTriggerEl = document.getElementById('letter-trigger');
  var letterWordEl = document.getElementById('letter-word');
  var letterSubEl = document.getElementById('letter-sub');
  var letterPrev = document.getElementById('letter-prev');
  var letterNext = document.getElementById('letter-next');
  var currentLetter = null;

  function renderLetters(){
    lettersGrid.innerHTML = '';
    LETTERS.forEach(function(item, i){
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'letter-card';
      card.setAttribute('aria-label', item.trigger);

      var flap = document.createElement('span');
      flap.className = 'envelope-flap';
      flap.setAttribute('aria-hidden','true');
      card.appendChild(flap);

      var seal = document.createElement('span');
      seal.className = 'envelope-seal';
      seal.setAttribute('aria-hidden','true');
      seal.innerHTML = '<svg viewBox="0 0 24 24"><use href="#icon-spark"/></svg>';
      card.appendChild(seal);

      var text = document.createElement('span');
      text.className = 'envelope-text';
      text.textContent = item.trigger;
      card.appendChild(text);

      card.addEventListener('click', function(){
        if(reduceMotion){
          window.location.hash = 'lettre-' + (i + 1);
          return;
        }
        card.classList.add('popping');
        window.setTimeout(function(){ window.location.hash = 'lettre-' + (i + 1); }, 320);
      });

      lettersGrid.appendChild(card);
    });
  }

  function openLetter(i){
    currentLetter = i;
    var item = LETTERS[i];
    letterTriggerEl.textContent = '« ' + item.trigger + ' »';
    letterWordEl.className = 'day-text ' + (item.word.length <= 8 ? 'len-s' : 'len-m');
    letterWordEl.innerHTML = buildWords(item.word);
    letterSubEl.textContent = item.sub;

    showScreen('letter');
    window.setTimeout(function(){ letterWordEl.focus(); }, 50);

    if(!reduceMotion){
      window.setTimeout(function(){ burstFromCenterScreen(); }, 150);
    }
  }

  letterPrev.addEventListener('click', function(){
    if(currentLetter === null) return;
    var i = (currentLetter - 1 + LETTERS.length) % LETTERS.length;
    window.location.hash = 'lettre-' + (i + 1);
  });
  letterNext.addEventListener('click', function(){
    if(currentLetter === null) return;
    var i = (currentLetter + 1) % LETTERS.length;
    window.location.hash = 'lettre-' + (i + 1);
  });

  /* =========================================================
     FENÊTRE : petit aperçu du ciel, toujours discret
     ========================================================= */
  (function(){
    var wCanvas = document.getElementById('window-stars-canvas');
    if(!wCanvas) return;
    var wctx = wCanvas.getContext('2d');
    var wStars = [];
    var wDpr = Math.min(window.devicePixelRatio || 1, 2);

    function sizeWindowCanvas(){
      var w = wCanvas.clientWidth || 200, h = wCanvas.clientHeight || 260;
      wCanvas.width = w * wDpr; wCanvas.height = h * wDpr;
      wctx.setTransform(wDpr,0,0,wDpr,0,0);
      wStars = [];
      var count = Math.round((w*h)/1400);
      for(var i=0;i<count;i++){
        wStars.push({ x: Math.random()*w, y: Math.random()*h*0.85, r: Math.random()*1.3+0.4, phase: Math.random()*Math.PI*2, speed: 0.4+Math.random()*0.8 });
      }
    }
    sizeWindowCanvas();
    window.addEventListener('resize', sizeWindowCanvas);

    function drawWindow(t){
      var w = wCanvas.clientWidth || 200, h = wCanvas.clientHeight || 260;
      wctx.clearRect(0,0,w,h);
      for(var i=0;i<wStars.length;i++){
        var s = wStars[i];
        var tw = reduceMotion ? 0.7 : (0.5 + 0.5*Math.sin(s.phase + t*0.0006*s.speed));
        wctx.globalAlpha = 0.25 + tw*0.6;
        wctx.fillStyle = '#F5F0FF';
        wctx.beginPath();
        wctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        wctx.fill();
      }
      wctx.globalAlpha = 1;
      requestAnimationFrame(drawWindow);
    }
    requestAnimationFrame(drawWindow);

    /* ---- petit parallax de la chambre au mouvement de la souris ---- */
    var roomScene = document.getElementById('room-scene');
    if(roomScene && !reduceMotion){
      roomScene.addEventListener('mousemove', function(e){
        var r = roomScene.getBoundingClientRect();
        var mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        var my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        roomScene.style.setProperty('--mx', mx.toFixed(3));
        roomScene.style.setProperty('--my', my.toFixed(3));
      });
    }

    /* ---- traversée de la fenêtre : zoom sur la vitre + effet vitesse-étoiles plein écran ---- */
    var warpOverlay = document.getElementById('warp-overlay');
    var warpCanvas = document.getElementById('warp-canvas');
    var warpCtx = warpCanvas ? warpCanvas.getContext('2d') : null;
    var warpParticles = [];
    var warpRunning = false;
    var warpRafId = null;
    var warpDpr = Math.min(window.devicePixelRatio || 1, 2);
    var windowFrame = document.getElementById('window-frame');

    function sizeWarpCanvas(){
      if(!warpCanvas) return;
      var w = window.innerWidth, h = window.innerHeight;
      warpCanvas.width = w * warpDpr; warpCanvas.height = h * warpDpr;
      warpCtx.setTransform(warpDpr, 0, 0, warpDpr, 0, 0);
    }
    function initWarpParticles(){
      warpParticles = [];
      for(var i=0; i<140; i++){
        warpParticles.push({
          angle: Math.random() * Math.PI * 2,
          dist: Math.random() * 60,
          speed: 4 + Math.random() * 6
        });
      }
    }
    function drawWarp(){
      if(!warpRunning) return;
      var w = window.innerWidth, h = window.innerHeight;
      var cx = w/2, cy = h/2;
      warpCtx.fillStyle = 'rgba(7,4,15,0.32)';
      warpCtx.fillRect(0, 0, w, h);
      for(var i=0; i<warpParticles.length; i++){
        var p = warpParticles[i];
        var x1 = cx + Math.cos(p.angle) * p.dist;
        var y1 = cy + Math.sin(p.angle) * p.dist;
        p.dist += p.speed;
        p.speed *= 1.05; /* accélération façon "vitesse lumière" */
        var x2 = cx + Math.cos(p.angle) * p.dist;
        var y2 = cy + Math.sin(p.angle) * p.dist;
        var alpha = Math.min(1, p.dist / 260);
        warpCtx.globalAlpha = alpha;
        warpCtx.strokeStyle = '#F5F0FF';
        warpCtx.lineWidth = 1 + alpha * 1.6;
        warpCtx.beginPath();
        warpCtx.moveTo(x1, y1);
        warpCtx.lineTo(x2, y2);
        warpCtx.stroke();
      }
      warpCtx.globalAlpha = 1;
      warpRafId = requestAnimationFrame(drawWarp);
    }

    /* joue la transition puis exécute callback() au moment où l'écran est
       entièrement masqué par l'effet (c'est là qu'on peut changer de hash
       sans que la coupure ne se voie) */
    function playWindowWarp(callback){
      if(reduceMotion || !warpOverlay || !warpCtx){ callback(); return; }
      if(windowFrame){ windowFrame.classList.add('zooming'); }
      sizeWarpCanvas();
      initWarpParticles();
      warpOverlay.classList.add('active');
      warpRunning = true;
      warpRafId = requestAnimationFrame(drawWarp);
      window.setTimeout(callback, 550);
      window.setTimeout(function(){
        warpRunning = false;
        if(warpRafId){ cancelAnimationFrame(warpRafId); warpRafId = null; }
        warpOverlay.classList.remove('active');
        if(windowFrame){ windowFrame.classList.remove('zooming'); }
        if(warpCtx){ warpCtx.clearRect(0, 0, warpCanvas.width, warpCanvas.height); }
      }, 950);
    }

    var windowGlass = document.getElementById('window-glass');
    if(windowGlass){
      windowGlass.addEventListener('click', function(){
        playWindowWarp(function(){ window.location.hash = 'sky'; });
      });
    }
  })();

  /* =========================================================
     CIEL : ciel explorable + constellations
     ========================================================= */
  var CONSTELLATIONS = [
    {
      name: "Le jour où on s'est rencontrées",
      date: "Été 2015",
      text: "Je me souviens exactement d'où on était. Je ne savais pas encore que tu allais devenir aussi importante.",
      x: 320, y: 260,
      path: [ {dx:0,dy:0}, {dx:-70,dy:-55}, {dx:30,dy:-95}, {dx:95,dy:-60} ]
    },
    {
      name: "Le road trip improvisé",
      date: "Juillet 2019",
      text: "On avait dit « juste pour la journée ». On est rentrées trois jours plus tard, sans regret.",
      x: 980, y: 210,
      path: [ {dx:0,dy:0}, {dx:60,dy:-50}, {dx:130,dy:-30}, {dx:170,dy:30} ]
    },
    {
      name: "La nuit avant le grand jour",
      date: "Juin 2020",
      text: "Tu doutais de toi jusqu'à 2h du matin. Je savais que tu allais y arriver.",
      x: 1560, y: 430,
      path: [ {dx:0,dy:0}, {dx:-55,dy:60}, {dx:-40,dy:140}, {dx:30,dy:180} ]
    },
    {
      name: "Le déménagement",
      date: "Mars 2022",
      text: "On a porté ce canapé à deux dans quatre étages. On en rit encore.",
      x: 760, y: 880,
      path: [ {dx:0,dy:0}, {dx:80,dy:-40}, {dx:160,dy:-55}, {dx:210,dy:-10} ]
    },
    {
      name: "Aujourd'hui",
      date: "Ce soir, en ouvrant cette page",
      text: "Une raison de plus pour la liste : merci d'être exactement qui tu es.",
      x: 1850, y: 940,
      path: [ {dx:0,dy:0}, {dx:-70,dy:-45}, {dx:-140,dy:-20}, {dx:-190,dy:35} ]
    }
  ];

  var WORLD_W = 2200, WORLD_H = 1300;
  var skyCanvas = document.getElementById('sky-canvas');
  var skyCtx = skyCanvas ? skyCanvas.getContext('2d') : null;
  var skyHint = document.getElementById('sky-hint');
  var cardEl = document.getElementById('constellation-card');
  var cardTitle = document.getElementById('card-title');
  var cardDate = document.getElementById('card-date');
  var cardText = document.getElementById('card-text');
  var cardClose = document.getElementById('card-close');

  var skyStars = [];
  var skyDpr = Math.min(window.devicePixelRatio || 1, 2);
  var viewW = 0, viewH = 0;
  var camCenter = { x: WORLD_W/2, y: WORLD_H/2 };
  var camTarget = null;
  var isPointerDown = false;
  var dragStart = null, camAtDragStart = null, pointerMoved = 0;
  var lastPointerX = 0, lastPointerY = 0;
  var skyRunning = false, skyRafId = null;
  var constellationOpenIndex = null;
  var constellationAnimStart = null;
  var skyPings = []; /* petits anneaux "ping" affichés brièvement au clic sur une étoile */
  var skyDim = document.getElementById('sky-dim');

  function addSkyPing(x, y){
    if(reduceMotion) return;
    skyPings.push({ x: x, y: y, start: performance.now() });
  }

  CONSTELLATIONS.forEach(function(c){
    c.points = c.path.map(function(p){ return { x: c.x + p.dx, y: c.y + p.dy }; });
  });

  function initSkyStars(){
    skyStars = [];
    for(var i=0;i<260;i++){
      skyStars.push({
        x: Math.random()*WORLD_W, y: Math.random()*WORLD_H,
        r: Math.random()*1.4+0.4, phase: Math.random()*Math.PI*2, speed: 0.4+Math.random()*0.8
      });
    }
    CONSTELLATIONS.forEach(function(c){
      c.points.slice(1).forEach(function(p){
        skyStars.push({ x:p.x, y:p.y, r: Math.random()*1.1+0.6, phase: Math.random()*Math.PI*2, speed: 0.4+Math.random()*0.8 });
      });
    });
  }
  initSkyStars();

  function clampCam(c){
    var halfW = viewW/2, halfH = viewH/2;
    var minX = Math.min(halfW, WORLD_W-halfW), maxX = Math.max(halfW, WORLD_W-halfW);
    var minY = Math.min(halfH, WORLD_H-halfH), maxY = Math.max(halfH, WORLD_H-halfH);
    c.x = Math.max(minX, Math.min(maxX, c.x));
    c.y = Math.max(minY, Math.min(maxY, c.y));
    return c;
  }

  function sizeSkyCanvas(){
    if(!skyCanvas) return;
    viewW = skyCanvas.clientWidth; viewH = skyCanvas.clientHeight;
    skyCanvas.width = viewW*skyDpr; skyCanvas.height = viewH*skyDpr;
    skyCtx.setTransform(skyDpr,0,0,skyDpr,0,0);
    clampCam(camCenter);
  }
  window.addEventListener('resize', function(){ if(skyRunning) sizeSkyCanvas(); });

  function worldToScreen(p){ return { x: p.x - camCenter.x + viewW/2, y: p.y - camCenter.y + viewH/2 }; }

  function drawSky(t){
    if(!skyRunning) return;
    if(isPointerDown){
      camCenter.x = camAtDragStart.x - (lastPointerX - dragStart.x);
      camCenter.y = camAtDragStart.y - (lastPointerY - dragStart.y);
      clampCam(camCenter);
    } else if(camTarget && !reduceMotion){
      camCenter.x += (camTarget.x - camCenter.x) * 0.06;
      camCenter.y += (camTarget.y - camCenter.y) * 0.06;
      clampCam(camCenter);
    }

    skyCtx.clearRect(0,0,viewW,viewH);

    for(var i=0;i<skyStars.length;i++){
      var s = skyStars[i];
      var sp = worldToScreen(s);
      if(sp.x < -10 || sp.x > viewW+10 || sp.y < -10 || sp.y > viewH+10) continue;
      var tw = reduceMotion ? 0.7 : (0.5 + 0.5*Math.sin(s.phase + t*0.0006*s.speed));
      skyCtx.globalAlpha = 0.2 + tw*0.6;
      skyCtx.fillStyle = '#F5F0FF';
      skyCtx.beginPath();
      skyCtx.arc(sp.x, sp.y, s.r, 0, Math.PI*2);
      skyCtx.fill();
    }
    skyCtx.globalAlpha = 1;

    if(constellationOpenIndex !== null){
      var c = CONSTELLATIONS[constellationOpenIndex];
      var segCount = c.points.length - 1;
      var progress = reduceMotion ? 1 : Math.min(1, (t - constellationAnimStart) / 700);
      var overallT = progress * segCount;

      skyCtx.strokeStyle = 'rgba(245,240,255,0.85)';
      skyCtx.lineWidth = 1.5;
      for(var seg=0; seg<segCount; seg++){
        var segProgress = Math.max(0, Math.min(1, overallT - seg));
        if(segProgress <= 0) continue;
        var p1 = worldToScreen(c.points[seg]);
        var p2 = worldToScreen(c.points[seg+1]);
        var ex = p1.x + (p2.x - p1.x) * segProgress;
        var ey = p1.y + (p2.y - p1.y) * segProgress;
        skyCtx.beginPath();
        skyCtx.moveTo(p1.x, p1.y);
        skyCtx.lineTo(ex, ey);
        skyCtx.stroke();

        /* petite comète lumineuse qui voyage à la pointe du trait en cours de tracé */
        if(segProgress > 0 && segProgress < 1 && !reduceMotion){
          var cometGrad = skyCtx.createRadialGradient(ex, ey, 0, ex, ey, 11);
          cometGrad.addColorStop(0, 'rgba(245,240,255,0.95)');
          cometGrad.addColorStop(1, 'rgba(245,240,255,0)');
          skyCtx.fillStyle = cometGrad;
          skyCtx.beginPath();
          skyCtx.arc(ex, ey, 11, 0, Math.PI*2);
          skyCtx.fill();
          skyCtx.fillStyle = '#F5F0FF';
          skyCtx.beginPath();
          skyCtx.arc(ex, ey, 2.4, 0, Math.PI*2);
          skyCtx.fill();
        }
      }
      for(var pi=0; pi<c.points.length; pi++){
        var reveal = Math.max(0, Math.min(1, overallT - (pi-1)));
        if(pi === 0) reveal = 1;
        if(reveal <= 0) continue;
        var pp = worldToScreen(c.points[pi]);
        /* petit halo au moment où le point apparaît */
        if(reveal < 1){
          var popGrad = skyCtx.createRadialGradient(pp.x, pp.y, 0, pp.x, pp.y, 20);
          popGrad.addColorStop(0, 'rgba(199,241,59,' + (0.55*(1-reveal)) + ')');
          popGrad.addColorStop(1, 'rgba(199,241,59,0)');
          skyCtx.fillStyle = popGrad;
          skyCtx.beginPath();
          skyCtx.arc(pp.x, pp.y, 20, 0, Math.PI*2);
          skyCtx.fill();
        }
        skyCtx.globalAlpha = reveal;
        skyCtx.fillStyle = '#C7F13B';
        skyCtx.beginPath();
        skyCtx.arc(pp.x, pp.y, pi===0?4:3, 0, Math.PI*2);
        skyCtx.fill();
        skyCtx.globalAlpha = 1;
      }
    }

    /* anneaux "ping" au clic sur une étoile */
    for(var pgi = skyPings.length - 1; pgi >= 0; pgi--){
      var pg = skyPings[pgi];
      var pgAge = t - pg.start;
      var pgDur = 650;
      if(pgAge > pgDur){ skyPings.splice(pgi, 1); continue; }
      var pgProg = pgAge / pgDur;
      var pgScreen = worldToScreen(pg);
      var pgR = 6 + pgProg * 46;
      skyCtx.globalAlpha = (1 - pgProg) * 0.8;
      skyCtx.strokeStyle = '#C7F13B';
      skyCtx.lineWidth = 2;
      skyCtx.beginPath();
      skyCtx.arc(pgScreen.x, pgScreen.y, pgR, 0, Math.PI*2);
      skyCtx.stroke();
      skyCtx.globalAlpha = 1;
    }

    for(var ci=0; ci<CONSTELLATIONS.length; ci++){
      var anchor = CONSTELLATIONS[ci].points[0];
      var ap = worldToScreen(anchor);
      if(ap.x < -20 || ap.x > viewW+20 || ap.y < -20 || ap.y > viewH+20) continue;
      var isOpen = (ci === constellationOpenIndex);
      var pulse = reduceMotion ? 1 : (1 + Math.sin(t*0.0022 + ci) * 0.18);
      var baseR = (isOpen ? 5.5 : 4.5) * pulse;

      var grad = skyCtx.createRadialGradient(ap.x, ap.y, 0, ap.x, ap.y, baseR*4.5);
      grad.addColorStop(0, isOpen ? 'rgba(199,241,59,0.55)' : 'rgba(199,241,59,0.32)');
      grad.addColorStop(1, 'rgba(199,241,59,0)');
      skyCtx.fillStyle = grad;
      skyCtx.beginPath();
      skyCtx.arc(ap.x, ap.y, baseR*4.5, 0, Math.PI*2);
      skyCtx.fill();

      skyCtx.fillStyle = '#C7F13B';
      skyCtx.beginPath();
      skyCtx.arc(ap.x, ap.y, baseR, 0, Math.PI*2);
      skyCtx.fill();
    }

    skyRafId = requestAnimationFrame(drawSky);
  }

  function hitTestAnchor(clientX, clientY){
    if(!skyCanvas) return null;
    var rect = skyCanvas.getBoundingClientRect();
    var localX = clientX - rect.left, localY = clientY - rect.top;
    var worldX = localX + camCenter.x - viewW/2;
    var worldY = localY + camCenter.y - viewH/2;
    var best = null, bestDist = 26;
    for(var i=0;i<CONSTELLATIONS.length;i++){
      var a = CONSTELLATIONS[i].points[0];
      var d = Math.sqrt(Math.pow(worldX-a.x,2) + Math.pow(worldY-a.y,2));
      if(d < bestDist){ bestDist = d; best = i; }
    }
    return best;
  }

  function openConstellation(i){
    constellationOpenIndex = i;
    constellationAnimStart = performance.now();
    var c = CONSTELLATIONS[i];
    cardTitle.textContent = c.name;
    cardDate.textContent = c.date;
    cardText.textContent = c.text;
    cardEl.classList.remove('open');
    if(skyDim){ skyDim.classList.add('active'); }

    /* la caméra glisse en douceur pour recentrer la constellation cliquée */
    var cx = 0, cy = 0;
    c.points.forEach(function(p){ cx += p.x; cy += p.y; });
    camTarget = { x: cx / c.points.length, y: cy / c.points.length };

    var lineDuration = reduceMotion ? 0 : 700;
    window.setTimeout(function(){
      cardEl.classList.add('open');
      window.setTimeout(function(){ cardTitle.focus(); }, 50);
      if(!reduceMotion){ burstFromCenterScreen(); }
    }, lineDuration + 150);
  }
  function closeConstellation(){
    constellationOpenIndex = null;
    cardEl.classList.remove('open');
    if(skyDim){ skyDim.classList.remove('active'); }
  }
  if(cardClose){ cardClose.addEventListener('click', function(){ window.location.hash = 'sky'; }); }

  if(skyCanvas){
    skyCanvas.addEventListener('pointerdown', function(e){
      isPointerDown = true; pointerMoved = 0;
      dragStart = { x: e.clientX, y: e.clientY };
      camAtDragStart = { x: camCenter.x, y: camCenter.y };
      lastPointerX = e.clientX; lastPointerY = e.clientY;
      skyCanvas.classList.add('dragging');
      if(skyCanvas.setPointerCapture){ try{ skyCanvas.setPointerCapture(e.pointerId); }catch(err){} }
    });
    skyCanvas.addEventListener('pointermove', function(e){
      if(isPointerDown){
        pointerMoved += Math.abs(e.movementX||0) + Math.abs(e.movementY||0);
        lastPointerX = e.clientX; lastPointerY = e.clientY;
      } else if(!reduceMotion){
        var rect = skyCanvas.getBoundingClientRect();
        var localX = e.clientX-rect.left, localY = e.clientY-rect.top;
        var nx = (localX/viewW) - 0.5, ny = (localY/viewH) - 0.5;
        var panRangeX = Math.max(0,(WORLD_W-viewW)/2), panRangeY = Math.max(0,(WORLD_H-viewH)/2);
        camTarget = { x: WORLD_W/2 + nx*2*panRangeX, y: WORLD_H/2 + ny*2*panRangeY };
      }
      if(skyHint && !skyHint.classList.contains('faded')){ skyHint.classList.add('faded'); }
    });
    window.addEventListener('pointerup', function(e){
      if(!isPointerDown) return;
      isPointerDown = false;
      skyCanvas.classList.remove('dragging');
      if(pointerMoved < 6){
        var idx = hitTestAnchor(e.clientX, e.clientY);
        if(idx !== null){
          var anchorPt = CONSTELLATIONS[idx].points[0];
          addSkyPing(anchorPt.x, anchorPt.y);
          window.location.hash = 'etoile-' + (idx+1);
        }
      }
    });
    skyCanvas.addEventListener('pointercancel', function(){ isPointerDown = false; skyCanvas.classList.remove('dragging'); });
  }

  function startSkyLoop(){
    if(skyRunning || !skyCanvas) return;
    skyRunning = true;
    sizeSkyCanvas();
    if(skyHint){ skyHint.classList.remove('faded'); }
    window.setTimeout(function(){ if(skyHint) skyHint.classList.add('faded'); }, 4500);
    skyRafId = requestAnimationFrame(drawSky);
  }
  function stopSkyLoop(){
    skyRunning = false;
    if(skyRafId){ cancelAnimationFrame(skyRafId); skyRafId = null; }
  }

  /* =========================================================
     DATE / COORD.
     ========================================================= */
  try{
    var footerDate = document.getElementById('footer-date');
    if(footerDate){
      footerDate.textContent = 'le ' + todayReal.toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' });
    }
  }catch(e){}

  /* =========================================================
     RÉVÉLATION AU SCROLL (accueil)
     ========================================================= */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  /* =========================================================
     CHAMP D'ÉTOILES SCINTILLANTES
     ========================================================= */
  var starsCanvas = document.getElementById('stars-canvas');
  if(starsCanvas){
    var sctx = starsCanvas.getContext('2d');
    var stars = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function sizeStars(){
      var w = window.innerWidth, h = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      starsCanvas.width = w * dpr;
      starsCanvas.height = h * dpr;
      starsCanvas.style.width = w + 'px';
      starsCanvas.style.height = h + 'px';
      sctx.setTransform(dpr,0,0,dpr,0,0);
      var count = Math.round((w * h) / 9000);
      stars = [];
      for(var i=0;i<count;i++){
        stars.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.4 + 0.4, phase: Math.random()*Math.PI*2, speed: 0.4 + Math.random()*0.8 });
      }
    }
    sizeStars();
    window.addEventListener('resize', sizeStars);

    function drawStars(t){
      sctx.clearRect(0,0,starsCanvas.width,starsCanvas.height);
      for(var i=0;i<stars.length;i++){
        var s = stars[i];
        var tw = reduceMotion ? 0.7 : (0.5 + 0.5*Math.sin(s.phase + t*0.0006*s.speed));
        sctx.globalAlpha = 0.15 + tw*0.55;
        sctx.fillStyle = '#3E1470';
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        sctx.fill();
      }
      sctx.globalAlpha = 1;
      if(!reduceMotion){ requestAnimationFrame(drawStars); }
    }
    requestAnimationFrame(drawStars);
  }

  /* =========================================================
     CONFETTIS / ÉCLATS
     ========================================================= */
  var confettiCanvas = document.getElementById('confetti-canvas');
  var cctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  var particles = [];
  var confettiRunning = false;
  var colors = ['#FF3C8E','#FF8A3D','#6C2BD9','#C7F13B','#1C1030'];

  function sizeConfetti(){
    if(!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  sizeConfetti();
  window.addEventListener('resize', sizeConfetti);

  function burst(originX, originY){
    if(!cctx) return;
    var n = reduceMotion ? 0 : 90;
    for(var i=0;i<n;i++){
      var angle = Math.random()*Math.PI*2;
      var speed = 2 + Math.random()*6;
      particles.push({
        x: originX, y: originY,
        vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed - 2,
        size: 4 + Math.random()*6,
        color: colors[Math.floor(Math.random()*colors.length)],
        life: 0, maxLife: 70 + Math.random()*40,
        spin: Math.random()*Math.PI*2, spinSpeed: (Math.random()-0.5)*0.4,
        shape: Math.random() > 0.5 ? 'rect' : 'spark'
      });
    }
    if(!confettiRunning){ confettiRunning = true; requestAnimationFrame(tickConfetti); }
  }

  function tickConfetti(){
    cctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
    var alive = [];
    for(var i=0;i<particles.length;i++){
      var p = particles[i];
      p.life++; p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.vx *= 0.99; p.spin += p.spinSpeed;
      var lifeRatio = p.life / p.maxLife;
      if(lifeRatio < 1){
        cctx.save();
        cctx.globalAlpha = 1 - lifeRatio;
        cctx.translate(p.x, p.y);
        cctx.rotate(p.spin);
        cctx.fillStyle = p.color;
        if(p.shape === 'rect'){ cctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6); }
        else { cctx.beginPath(); cctx.arc(0,0,p.size/2,0,Math.PI*2); cctx.fill(); }
        cctx.restore();
        alive.push(p);
      }
    }
    particles = alive;
    if(particles.length){ requestAnimationFrame(tickConfetti); }
    else { confettiRunning = false; cctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height); }
  }

  function burstFromCenterTop(){ burst(window.innerWidth/2, window.innerHeight*0.35); }
  function burstFromCenterScreen(){ burst(window.innerWidth/2, window.innerHeight*0.42); }
  function burstFromElement(el){
    var r = el.getBoundingClientRect();
    burst(r.left + r.width/2, r.top + r.height/2);
  }

  var wishBtn = document.getElementById('wish-btn');
  var replayBtn = document.getElementById('replay-btn');
  if(wishBtn){ wishBtn.addEventListener('click', function(){ burstFromElement(wishBtn); }); }
  if(replayBtn){ replayBtn.addEventListener('click', function(){ burstFromElement(replayBtn); }); }

  if(!reduceMotion){ window.setTimeout(burstFromCenterTop, 900); }

  /* =========================================================
     SECRET : accès sécurisé à 3 niveaux (digicode → énigme → terminal)
     ========================================================= */

  /* ————— ÉDITABLE : modifie ces constantes pour personnaliser le jeu ————— */
  var SECRET_CODE = "1855";        /* ÉDITABLE : code du digicode, 4 chiffres */
  var RIDDLE_QUESTION = "Je grandis chaque année sans jamais vieillir vraiment, et on me fête à chaque automne. Qui suis-je ?"; /* ÉDITABLE */
  var RIDDLE_ANSWER = "anniversaire"; /* ÉDITABLE — comparaison insensible à la casse et aux espaces */
  var SECRET_PHRASE = "MEILLEURE AMIE POUR LA VIE"; /* ÉDITABLE — lettres A-Z et espaces uniquement, devinable lettre par lettre OU d'un coup en tapant la phrase entière */
  /* ———————————————————————————————————————————————————————————————————
     ÉDITABLE : contenu de l'écran final "Bestie Wrapped" + Mode Hacker.
     Change librement les valeurs ci-dessous pour personnaliser le rendu. */
  var WRAPPED_FRIENDSHIP_START = "2018-06-01"; /* ÉDITABLE — date de départ du compteur "jours de complicité" (AAAA-MM-JJ) */
  var WRAPPED_STATS = [
    /* type "days" : compteur calculé automatiquement depuis WRAPPED_FRIENDSHIP_START ci-dessus */
    { type: "days", label: "jours de complicité" },
    { type: "number", value: 47, label: "nombre de fois où t'as eu raison (Top 1 officiel)" }, /* ÉDITABLE */
    { type: "number", value: 100, suffix: "%", label: "taux de second degré entre nous" } /* ÉDITABLE */
  ];
  var WRAPPED_HIGHLIGHT_TITLE = "Le vrai déclic"; /* ÉDITABLE */
  var WRAPPED_HIGHLIGHT_TEXT = "Ce jour où tout a basculé et où on a su qu'on se garderait pour la vie — celui-là, je le garde précieusement."; /* ÉDITABLE */
  /* ÉDITABLE : les répliques et expressions cultes du duo — ajoute, retire ou modifie librement */
  var WRAPPED_QUOTES = [
    "« On n'est pas perdues, on explore. »",
    "« Je te jure c'est la dernière fois que je fais confiance à ton GPS. »",
    "« Attends, raconte encore une fois, j'ai trop ri la première fois. »"
  ];
  var WRAPPED_BADGE_TEXT = "DUO LÉGENDAIRE"; /* ÉDITABLE */
  var WRAPPED_BADGE_SUB = "— et ce n'est que le début de l'histoire."; /* ÉDITABLE */
  /* ÉDITABLE : dictionnaire de commandes du terminal en Mode Hacker (clé en minuscules).
     "hack"/"hacker" sont spéciales : elles ne renvoient pas une ligne fixe mais
     déclenchent une vraie petite séquence de piratage animée (voir playHackSequence). */
  var HACKER_COMMANDS = {
    "aide": "Commandes disponibles : aide, hack, secret, sarah, love, matrix, clear",
    "help": "Commandes disponibles : aide, hack, secret, sarah, love, matrix, clear",
    "secret": "Message caché déverrouillé : tu es la meilleure amie qu'on puisse espérer avoir. 💛",
    "sarah": "Chargement du profil… accès autorisé : légende vivante, confirmée.",
    "love": "Niveau d'affection détecté : illimité. Aucune erreur système possible ici.",
    "matrix": "Tu veux voir jusqu'où va le terrier du lapin ? Essaie plutôt le bouton « Matrix Rain » juste au-dessus.",
    "clear": "__CLEAR__"
  };
  /* ÉDITABLE : banque de fausses lignes de code/logs piochées au hasard pour la
     séquence "hack" — volontairement n'importe quoi et un peu absurde/drôle */
  var HACK_SEQUENCE_LINES = [
    "sudo rm -rf /doutes_sur_notre_amitié",
    "injection de paillettes.dll ... OK",
    "contournement du pare-feu émotionnel ... OK",
    "décryptage de souvenirs_2019.zip [██████████] 100%",
    "compilation de blagues_nulles.exe ... 4028 erreurs (aucune importance)",
    "0x1F4A9 0xC0FFEE 0xDEAD 0xBEEF 0xB00B5",
    "brute-force mot de passe : '1234' … 'sarah123' … 'motdepasse' … ÉCHEC",
    "scan réseau voisin : 3 routeurs nommés « FBI Surveillance Van » détectés",
    "chargement du module ami.exe [██████████] 100%",
    "récupération des fous rires archivés ... 9 842 trouvés",
    "calibration du niveau de second degré ... 100% (déjà au max)",
    "connexion au satellite Cosmic Queen ... établie",
    "génération d'un alibi random ... « j'étais avec Sarah »",
    "vérification : est-elle irremplaçable ? ... TRUE (aucun doute possible)"
  ];
  /* ——————————————————————————————————————————————————————————————————— */
  /* ÉDITABLE : lignes défilant discrètement en bas de l'écran, pur habillage */
  var SECRET_LOG_LINES = [
    "connexion sécurisée établie…",
    "chiffrement AES-256 actif",
    "aucune intrusion détectée",
    "vérification de l'intégrité…",
    "canal chiffré stable",
    "surveillance du périmètre : ok"
  ];
  /* ——————————————————————————————————————————————————————————————————— */

  var secretEls = {
    levels: {
      1: document.getElementById('level-1'),
      2: document.getElementById('level-2'),
      3: document.getElementById('level-3'),
      final: document.getElementById('level-final')
    },
    digicodeCard: document.getElementById('digicode-card'),
    digicodeDots: document.getElementById('digicode-dots'),
    digicodePad: document.getElementById('digicode-pad'),
    digicodeError: document.getElementById('digicode-error'),
    riddleCard: document.getElementById('riddle-card'),
    riddleQuestion: document.getElementById('riddle-question'),
    riddleForm: document.getElementById('riddle-form'),
    riddleInput: document.getElementById('riddle-input'),
    riddleError: document.getElementById('riddle-error'),
    terminalPhrase: document.getElementById('terminal-phrase'),
    terminalScan: document.getElementById('terminal-scan'),
    terminalInput: document.getElementById('terminal-input'),
    terminalMsg: document.getElementById('terminal-msg'),
    virtualKeyboard: document.getElementById('virtual-keyboard'),
    vaultScene: document.getElementById('vault-scene'),
    secretScreen: document.getElementById('secret-screen'),
    /* ---- écran final : Bestie Wrapped + Mode Hacker ---- */
    wrappedApp: document.getElementById('wrapped-app'),
    modeToggle: document.getElementById('mode-toggle'),
    modeToggleLabel: document.getElementById('mode-toggle-label'),
    wipeBeam: document.getElementById('wipe-beam'),
    wrappedAmbientCanvas: document.getElementById('wrapped-ambient-canvas'),
    wrappedView: document.getElementById('wrapped-view'),
    hackerView: document.getElementById('hacker-view'),
    wrappedProgress: document.querySelectorAll('#wrapped-progress .wrapped-bar'),
    tapzoneLeft: document.getElementById('tapzone-left'),
    tapzoneRight: document.getElementById('tapzone-right'),
    wrappedSlides: document.querySelectorAll('.wrapped-slide'),
    wrappedStats: document.getElementById('wrapped-stats'),
    wrappedHighlightTitle: document.getElementById('wrapped-highlight-title'),
    wrappedHighlightText: document.getElementById('wrapped-highlight-text'),
    wrappedQuotes: document.getElementById('wrapped-quotes'),
    wrappedBadgeText: document.getElementById('wrapped-badge-text'),
    wrappedBadgeSub: document.getElementById('wrapped-badge-sub'),
    wrappedPrev: document.getElementById('wrapped-prev'),
    wrappedNext: document.getElementById('wrapped-next'),
    hackerRainCanvas: document.getElementById('hacker-rain-canvas'),
    btnMatrixRain: document.getElementById('btn-matrix-rain'),
    btnSystemGlitch: document.getElementById('btn-system-glitch'),
    btnOverclock: document.getElementById('btn-overclock'),
    hackerCommandInput: document.getElementById('hacker-command-input'),
    hackerOutput: document.getElementById('hacker-output'),
    hackerOutputWrap: document.getElementById('hacker-output-wrap'),
    scanOverlay: document.getElementById('scan-overlay'),
    scanOverlayText: document.getElementById('scan-overlay-text'),
    lockIcon: document.getElementById('lock-icon'),
    sparkBurst: document.getElementById('riddle-spark-burst'),
    terminal: document.querySelector('#level-3 .terminal'),
    progressSteps: document.querySelectorAll('#secret-progress .prog-step'),
    consoleLog: document.getElementById('secret-console-log')
  };

  /* ---- décor ambiant : pluie de caractères façon "matrix", discrète ---- */
  (function(){
    var rainCanvas = document.getElementById('secret-rain-canvas');
    if(!rainCanvas || reduceMotion) return;
    var rctx = rainCanvas.getContext('2d');
    var rDpr = Math.min(window.devicePixelRatio || 1, 2);
    var glyphs = "01アイウエオカキク+×#$".split('');
    var columns = [];

    function sizeRain(){
      var w = rainCanvas.clientWidth, h = rainCanvas.clientHeight;
      rainCanvas.width = w * rDpr; rainCanvas.height = h * rDpr;
      rctx.setTransform(rDpr, 0, 0, rDpr, 0, 0);
      var colCount = Math.max(6, Math.round(w / 26));
      columns = [];
      for(var i=0; i<colCount; i++){
        columns.push({ x: i * (w / colCount) + 10, y: Math.random() * -h, speed: 0.6 + Math.random() * 1.1 });
      }
    }
    sizeRain();
    window.addEventListener('resize', sizeRain);

    function drawRain(){
      var w = rainCanvas.clientWidth, h = rainCanvas.clientHeight;
      rctx.clearRect(0, 0, w, h);
      rctx.font = '13px ' + "'JetBrains Mono', monospace";
      for(var i=0; i<columns.length; i++){
        var col = columns[i];
        col.y += col.speed;
        if(col.y > h + 20){ col.y = -20; }
        var glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        rctx.fillStyle = 'rgba(76,255,160,0.5)';
        rctx.fillText(glyph, col.x, col.y);
      }
      requestAnimationFrame(drawRain);
    }
    requestAnimationFrame(drawRain);
  })();

  /* ---- décor ambiant du "Bestie Wrapped" : étincelles/confettis qui flottent
     doucement vers le haut, pour une ambiance festive, jamais vide. Ne tourne
     que pendant que le Mode Wrapped est affiché (coupé en Mode Hacker pour
     économiser des cycles derrière le "wipe" de bascule). ---- */
  (function(){
    var canvas = secretEls.wrappedAmbientCanvas;
    if(!canvas || reduceMotion) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var palette = ['rgba(255,138,61,0.8)', 'rgba(255,60,142,0.8)', 'rgba(199,241,59,0.85)', 'rgba(255,255,255,0.9)'];

    function sizeCanvas(){
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if(!w || !h) return;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(18, Math.round((w * h) / 26000));
      particles = [];
      for(var i=0; i<count; i++){ particles.push(makeParticle(w, h, true)); }
    }
    function makeParticle(w, h, anywhere){
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 20,
        r: 1.5 + Math.random() * 2.6,
        speed: 0.25 + Math.random() * 0.55,
        drift: (Math.random() - 0.5) * 0.4,
        color: palette[Math.floor(Math.random() * palette.length)],
        twinkle: Math.random() * Math.PI * 2
      };
    }
    window.addEventListener('resize', sizeCanvas);
    sizeCanvas();

    function isWrappedVisible(){
      /* on économise le CPU : pas la peine de dessiner derrière le losange
         de "wipe" quand on est en Mode Hacker */
      return secretEls.wrappedApp && secretEls.wrappedApp.getAttribute('data-mode') !== 'hacker';
    }

    function draw(){
      requestAnimationFrame(draw);
      if(!isWrappedVisible()) return;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for(var i=0; i<particles.length; i++){
        var p = particles[i];
        p.y -= p.speed;
        p.x += p.drift;
        p.twinkle += 0.05;
        if(p.y < -10){ particles[i] = makeParticle(w, h, false); continue; }
        var alpha = 0.5 + Math.sin(p.twinkle) * 0.4;
        ctx.beginPath();
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(draw);
  })();

  /* ---- décor ambiant : petit journal système qui défile en bas de l'écran ---- */
  (function(){
    if(!secretEls.consoleLog || !SECRET_LOG_LINES.length) return;
    var idx = 0;
    function showLine(){
      secretEls.consoleLog.style.opacity = '0';
      window.setTimeout(function(){
        secretEls.consoleLog.textContent = '> ' + SECRET_LOG_LINES[idx % SECRET_LOG_LINES.length];
        secretEls.consoleLog.style.opacity = '1';
        idx++;
      }, reduceMotion ? 0 : 350);
    }
    showLine();
    if(!reduceMotion){ window.setInterval(showLine, 3200); }
  })();

  /* ---- décor : petit indicateur de progression (Code → Énigme → Terminal → Accès) ---- */
  function updateSecretProgress(currentLevel){
    var order = ['1', '2', '3', 'final'];
    var currentIdx = order.indexOf(String(currentLevel));
    secretEls.progressSteps.forEach(function(step){
      var stepIdx = order.indexOf(step.getAttribute('data-step'));
      step.classList.toggle('done', stepIdx < currentIdx);
      step.classList.toggle('current', stepIdx === currentIdx);
    });
  }

  /* petites étincelles qui s'envolent au-dessus d'un élément (utilisé au niveau 2) */
  function spawnSparks(container){
    if(!container || reduceMotion) return;
    for(var i=0; i<10; i++){
      var s = document.createElement('span');
      s.className = 'spark';
      var dx = (Math.random() - 0.5) * 90;
      var dy = -(50 + Math.random() * 60);
      s.style.setProperty('--sx', dx.toFixed(1) + 'px');
      s.style.setProperty('--sy', dy.toFixed(1) + 'px');
      s.style.left = (48 + Math.random() * 4) + '%';
      container.appendChild(s);
      (function(el){ window.setTimeout(function(){ el.remove(); }, 750); })(s);
    }
  }

  function showSecretLevel(name){
    updateSecretProgress(name);
    Object.keys(secretEls.levels).forEach(function(key){
      var el = secretEls.levels[key];
      el.classList.remove('enter');
      if(String(key) === String(name)){ el.classList.add('active'); }
      else { el.classList.remove('active'); }
    });
    void secretEls.levels[name].offsetWidth;
    secretEls.levels[name].classList.add('enter');
  }

  /* ---- overlay "Analyse en cours..." rejoué entre chaque niveau ---- */
  function playScanTransition(nextLevel, label){
    secretEls.scanOverlayText.textContent = label || "Analyse en cours…";
    secretEls.scanOverlay.classList.add('active');
    var delay = reduceMotion ? 150 : 1100;
    window.setTimeout(function(){
      showSecretLevel(nextLevel);
      secretEls.scanOverlay.classList.remove('active');
      if(nextLevel === 2){ secretEls.riddleInput.focus(); }
      if(nextLevel === 3){ secretEls.terminalInput.focus(); }
      if(nextLevel === 'final'){
        /* la porte du coffre s'ouvre juste après l'arrivée sur l'écran final,
           puis le Bestie Wrapped démarre depuis la première slide */
        window.setTimeout(function(){
          secretEls.vaultScene.classList.add('opened');
          if(secretEls.secretScreen){ secretEls.secretScreen.classList.add('vault-fullscreen'); }
          startWrapped();
          if(secretEls.wrappedApp){ secretEls.wrappedApp.focus(); }
        }, reduceMotion ? 50 : 300);
      }
    }, delay);
  }

  /* ---- NIVEAU 1 : digicode ---- */
  var digicodeValue = "";
  var digicodeSolved = false;

  function renderDigicodeDots(){
    var dots = secretEls.digicodeDots.querySelectorAll('.dot');
    dots.forEach(function(dot, i){ dot.classList.toggle('filled', i < digicodeValue.length); });
  }

  function digicodeShakeError(msg){
    secretEls.digicodeError.textContent = msg;
    secretEls.digicodeCard.classList.remove('shake');
    void secretEls.digicodeCard.offsetWidth;
    secretEls.digicodeCard.classList.add('shake');
    digicodeValue = "";
    renderDigicodeDots();
  }

  function submitDigicode(){
    if(digicodeSolved) return; /* évite de rejouer la célébration si on reclique pendant la transition */
    if(digicodeValue.length !== 4){ digicodeShakeError("Entre les 4 chiffres avant de valider."); return; }
    if(digicodeValue === SECRET_CODE){
      digicodeSolved = true;
      secretEls.digicodeError.textContent = "";
      /* petite célébration : le cadenas se déverrouille, les points s'illuminent en vague —
         on laisse le temps de la voir avant de lancer l'écran de transition */
      if(secretEls.lockIcon){ secretEls.lockIcon.classList.add('unlocking'); }
      secretEls.digicodeDots.classList.add('success');
      secretEls.digicodeCard.classList.add('success-pulse');
      window.setTimeout(function(){
        playScanTransition(2, "Analyse en cours…");
      }, reduceMotion ? 150 : 900);
    } else {
      digicodeShakeError("Code incorrect. Réessaie.");
    }
  }

  secretEls.digicodePad.addEventListener('click', function(e){
    var btn = e.target.closest ? e.target.closest('button[data-key]') : null;
    if(!btn) return;
    var key = btn.getAttribute('data-key');
    btn.classList.add('pressed');
    window.setTimeout(function(){ btn.classList.remove('pressed'); }, 120);

    if(key === 'clear'){ digicodeValue = ""; renderDigicodeDots(); secretEls.digicodeError.textContent = ""; return; }
    if(key === 'submit'){ submitDigicode(); return; }
    if(digicodeValue.length < 4){ digicodeValue += key; renderDigicodeDots(); }
  });

  secretEls.levels[1].addEventListener('keydown', function(e){
    if(e.key >= '0' && e.key <= '9'){ if(digicodeValue.length < 4){ digicodeValue += e.key; renderDigicodeDots(); } }
    else if(e.key === 'Backspace'){ digicodeValue = digicodeValue.slice(0,-1); renderDigicodeDots(); }
    else if(e.key === 'Enter'){ submitDigicode(); }
  });

  /* ---- NIVEAU 2 : énigme ---- */
  function normalizeAnswer(str){ return str.toLowerCase().trim().replace(/\s+/g,' '); }

  secretEls.riddleQuestion.textContent = RIDDLE_QUESTION;
  var riddleSolved = false;

  secretEls.riddleForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(riddleSolved) return; /* évite de rejouer la célébration si on revalide pendant la transition */
    var given = normalizeAnswer(secretEls.riddleInput.value);
    if(given.length && given === normalizeAnswer(RIDDLE_ANSWER)){
      riddleSolved = true;
      secretEls.riddleError.textContent = "";
      /* petite célébration : étincelles qui s'envolent + halo sur la carte —
         on laisse le temps de la voir avant de lancer l'écran de transition */
      spawnSparks(secretEls.sparkBurst);
      secretEls.riddleCard.classList.add('success-pulse');
      window.setTimeout(function(){
        playScanTransition(3, "Analyse en cours…");
      }, reduceMotion ? 150 : 900);
    } else {
      secretEls.riddleError.textContent = "Ce n'est pas ça… essaie encore.";
      secretEls.riddleCard.classList.remove('shake');
      void secretEls.riddleCard.offsetWidth;
      secretEls.riddleCard.classList.add('shake');
    }
  });

  /* ---- NIVEAU 3 : terminal façon pendu ---- */
  var phraseLetters = SECRET_PHRASE.toUpperCase().split('');
  var guessedLetters = [];
  var terminalBusy = false;

  function renderPhrase(){
    /* chaque lettre (revelee ou "_") est separee par un espace simple ;
       chaque espace du mot d'origine devient un triple espace, ce qui cree
       une vraie coupure visuelle entre les mots. Ca ne marche que parce que
       .terminal-phrase a "white-space: pre-wrap" (les espaces multiples
       sont donc bien conserves au lieu d'etre fusionnes en un seul). */
    var cells = phraseLetters.map(function(ch){
      if(ch === ' ') return '   ';
      return guessedLetters.indexOf(ch) !== -1 ? ch : '_';
    });
    secretEls.terminalPhrase.textContent = cells.join(' ');
  }

  function isPhraseComplete(){
    return phraseLetters.every(function(ch){ return ch === ' ' || guessedLetters.indexOf(ch) !== -1; });
  }

  function buildVirtualKeyboard(){
    var letters = "AZERTYUIOPQSDFGHJKLMWXCVBN".split(''); /* ordre clavier FR, purement esthétique */
    secretEls.virtualKeyboard.innerHTML = '';
    letters.forEach(function(letter){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = letter;
      btn.setAttribute('data-letter', letter);
      btn.addEventListener('click', function(){ guessLetter(letter); });
      secretEls.virtualKeyboard.appendChild(btn);
    });
  }

  function setKeyState(letter, state){
    var btn = secretEls.virtualKeyboard.querySelector('[data-letter="' + letter + '"]');
    if(btn){ btn.classList.add(state); btn.disabled = true; }
  }

  /* petite animation "lignes de code qui défilent" jouée avant chaque résultat (~0.5s) */
  function playHackScan(callback){
    if(terminalBusy) return;
    terminalBusy = true;
    if(reduceMotion){ terminalBusy = false; callback(); return; }
    var chars = "01<>/#{}[]ABCDEF$%&";
    var frame = 0;
    var totalFrames = 8;
    var timer = window.setInterval(function(){
      var line = "";
      for(var i=0;i<28;i++){ line += chars[Math.floor(Math.random()*chars.length)]; }
      secretEls.terminalScan.textContent = line;
      frame++;
      if(frame >= totalFrames){
        window.clearInterval(timer);
        secretEls.terminalScan.textContent = "";
        terminalBusy = false;
        callback();
      }
    }, 500 / totalFrames);
  }

  /* déclenchée une fois que toutes les lettres de la phrase sont trouvées,
     que ce soit lettre par lettre ou en tapant la phrase entière d'un coup */
  var terminalSolved = false;
  function finishTerminal(){
    if(terminalSolved) return; /* évite de rejouer la célébration si un niveau appelle deux fois */
    terminalSolved = true;
    secretEls.terminalMsg.textContent = "Décryptage terminé.";
    secretEls.terminalMsg.className = 'terminal-msg is-ok';
    /* petite célébration : glitch de l'écran façon "piratage réussi" — on laisse le
       temps de la voir en entier avant de lancer l'écran de transition */
    if(secretEls.terminal){ secretEls.terminal.classList.add('glitching'); }
    window.setTimeout(function(){
      playScanTransition('final', "Ouverture du coffre…");
      if(!reduceMotion){ window.setTimeout(burstFromCenterScreen, 1300); }
    }, reduceMotion ? 150 : 1050);
  }

  function guessLetter(letter){
    if(terminalBusy) return;
    letter = (letter || '').toUpperCase();
    if(!/^[A-Z]$/.test(letter)) return;
    if(guessedLetters.indexOf(letter) !== -1) return;

    playHackScan(function(){
      guessedLetters.push(letter);
      if(phraseLetters.indexOf(letter) !== -1){
        setKeyState(letter, 'correct');
        secretEls.terminalMsg.textContent = "Lettre correcte : " + letter;
        secretEls.terminalMsg.className = 'terminal-msg is-ok';
      } else {
        setKeyState(letter, 'incorrect');
        secretEls.terminalMsg.textContent = "Accès refusé pour ce caractère : " + letter;
        secretEls.terminalMsg.className = 'terminal-msg is-err';
      }
      renderPhrase();
      if(isPhraseComplete()){ finishTerminal(); }
    });
  }

  /* tentative d'une phrase entière tapée directement dans le terminal */
  function guessWholePhrase(value){
    playHackScan(function(){
      if(normalizeAnswer(value) === normalizeAnswer(SECRET_PHRASE)){
        var uniqueLetters = phraseLetters.filter(function(ch){ return ch !== ' '; });
        uniqueLetters.forEach(function(letter){
          if(guessedLetters.indexOf(letter) === -1){ guessedLetters.push(letter); }
          setKeyState(letter, 'correct');
        });
        renderPhrase();
        secretEls.terminalMsg.textContent = "Phrase reconnue.";
        secretEls.terminalMsg.className = 'terminal-msg is-ok';
        if(isPhraseComplete()){ finishTerminal(); }
      } else {
        secretEls.terminalMsg.textContent = "Accès refusé : combinaison invalide.";
        secretEls.terminalMsg.className = 'terminal-msg is-err';
      }
    });
  }

  /* Entrée valide ce qui a été tapé : une seule lettre → devinette lettre par
     lettre ; plusieurs caractères → tentative de la phrase entière. */
  function submitTerminalGuess(){
    if(terminalBusy) return;
    var value = secretEls.terminalInput.value.trim();
    if(!value) return;
    secretEls.terminalInput.value = "";
    if(value.length === 1){ guessLetter(value); }
    else { guessWholePhrase(value); }
  }

  secretEls.terminalInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){ e.preventDefault(); submitTerminalGuess(); }
  });

  /* =========================================================
     ÉCRAN FINAL : "Bestie Wrapped" (façon Spotify Wrapped)
     + "Mode Hacker" (panneau de contrôle God Mode), reliés par
     un unique bouton bascule. Tout le contenu texte vient des
     constantes WRAPPED_… / HACKER_COMMANDS éditables tout en haut
     du script secret.
     ========================================================= */

  /* ---- calcule le nombre de jours écoulés depuis WRAPPED_FRIENDSHIP_START ---- */
  function computeFriendshipDays(){
    var start = new Date(WRAPPED_FRIENDSHIP_START + "T00:00:00");
    if(isNaN(start.getTime())) return 0;
    var diffMs = Date.now() - start.getTime();
    return Math.max(0, Math.round(diffMs / 86400000));
  }

  /* ---- compteur animé façon "odomètre" : compte de 0 jusqu'à la valeur cible ---- */
  function animateCounter(numEl, target, suffix){
    suffix = suffix || '';
    if(reduceMotion){ numEl.textContent = target.toLocaleString('fr-FR') + suffix; return; }
    var duration = 1100;
    var start = null;
    function tick(ts){
      if(start === null){ start = ts; }
      var progress = Math.min(1, (ts - start) / duration);
      /* easing "ease-out" pour un compteur qui ralentit joliment en fin de course */
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      numEl.textContent = current.toLocaleString('fr-FR') + suffix;
      if(progress < 1){ requestAnimationFrame(tick); }
    }
    requestAnimationFrame(tick);
  }

  /* ---- Slide 1 : construit les compteurs géants à partir de WRAPPED_STATS ---- */
  function renderWrappedStats(){
    if(!secretEls.wrappedStats) return;
    secretEls.wrappedStats.innerHTML = '';
    WRAPPED_STATS.forEach(function(stat){
      var wrap = document.createElement('div');
      wrap.className = 'wstat';
      var num = document.createElement('p');
      num.className = 'wstat-num';
      num.textContent = '0';
      var label = document.createElement('p');
      label.className = 'wstat-label';
      label.textContent = stat.label;
      wrap.appendChild(num); wrap.appendChild(label);
      secretEls.wrappedStats.appendChild(wrap);
      var target = stat.type === 'days' ? computeFriendshipDays() : stat.value;
      wrap.setAttribute('data-target', target);
      wrap.setAttribute('data-suffix', stat.suffix || '');
    });
  }

  /* (re)joue les compteurs de la slide 1 — appelé à chaque fois qu'on y revient */
  function playWrappedCounters(){
    if(!secretEls.wrappedStats) return;
    secretEls.wrappedStats.querySelectorAll('.wstat').forEach(function(wrap){
      var numEl = wrap.querySelector('.wstat-num');
      var target = parseInt(wrap.getAttribute('data-target'), 10) || 0;
      var suffix = wrap.getAttribute('data-suffix') || '';
      animateCounter(numEl, target, suffix);
    });
  }

  /* ---- rendu statique (une seule fois) du contenu des slides 2, 3 et 4 ---- */
  function renderWrappedContent(){
    renderWrappedStats();
    if(secretEls.wrappedHighlightTitle){ secretEls.wrappedHighlightTitle.textContent = WRAPPED_HIGHLIGHT_TITLE; }
    if(secretEls.wrappedHighlightText){ secretEls.wrappedHighlightText.textContent = WRAPPED_HIGHLIGHT_TEXT; }
    if(secretEls.wrappedQuotes){
      secretEls.wrappedQuotes.innerHTML = '';
      WRAPPED_QUOTES.forEach(function(quote){
        var p = document.createElement('p');
        p.className = 'wquote';
        p.textContent = quote;
        secretEls.wrappedQuotes.appendChild(p);
      });
    }
    if(secretEls.wrappedBadgeText){ secretEls.wrappedBadgeText.textContent = WRAPPED_BADGE_TEXT; }
    if(secretEls.wrappedBadgeSub){ secretEls.wrappedBadgeSub.textContent = WRAPPED_BADGE_SUB; }
  }

  /* ---- navigation entre les 4 slides façon "Stories" ---- */
  var wrappedIndex = 1;
  var wrappedTotal = 4;
  var wrappedAutoTimer = null;

  function clearWrappedAutoAdvance(){
    if(wrappedAutoTimer){ window.clearTimeout(wrappedAutoTimer); wrappedAutoTimer = null; }
  }

  function scheduleWrappedAutoAdvance(){
    clearWrappedAutoAdvance();
    /* pas d'avancée automatique en dernière slide, ni en mode hacker, ni si on réduit les animations */
    if(reduceMotion || wrappedIndex >= wrappedTotal) return;
    if(secretEls.wrappedApp && secretEls.wrappedApp.getAttribute('data-mode') === 'hacker') return;
    wrappedAutoTimer = window.setTimeout(function(){ goToWrappedSlide(wrappedIndex + 1); }, 6000);
  }

  function goToWrappedSlide(n){
    n = Math.max(1, Math.min(wrappedTotal, n));
    var goingForward = n >= wrappedIndex;
    wrappedIndex = n;

    secretEls.wrappedSlides.forEach(function(slide){
      var slideN = parseInt(slide.getAttribute('data-slide'), 10);
      slide.classList.toggle('active', slideN === n);
      slide.classList.toggle('leaving-back', !goingForward && slideN !== n);
    });

    secretEls.wrappedProgress.forEach(function(bar, i){
      var stepN = i + 1;
      bar.classList.toggle('done', stepN < n);
      bar.classList.toggle('filling', stepN === n);
      if(stepN > n){ bar.classList.remove('done', 'filling'); }
    });

    if(secretEls.wrappedPrev){ secretEls.wrappedPrev.disabled = (n === 1); }
    if(secretEls.wrappedNext){ secretEls.wrappedNext.disabled = (n === wrappedTotal); }

    if(n === 1){ playWrappedCounters(); }

    scheduleWrappedAutoAdvance();
  }

  /* relance le Bestie Wrapped depuis le tout début (première ouverture du coffre,
     ou retour depuis le Mode Hacker) */
  function startWrapped(){
    wrappedIndex = 1;
    goToWrappedSlide(1);
  }

  if(secretEls.wrappedNext){ secretEls.wrappedNext.addEventListener('click', function(){ goToWrappedSlide(wrappedIndex + 1); }); }
  if(secretEls.wrappedPrev){ secretEls.wrappedPrev.addEventListener('click', function(){ goToWrappedSlide(wrappedIndex - 1); }); }
  if(secretEls.tapzoneRight){ secretEls.tapzoneRight.addEventListener('click', function(){ goToWrappedSlide(wrappedIndex + 1); }); }
  if(secretEls.tapzoneLeft){ secretEls.tapzoneLeft.addEventListener('click', function(){ goToWrappedSlide(wrappedIndex - 1); }); }

  /* flèches du clavier pour naviguer, uniquement quand on est en Mode Wrapped */
  if(secretEls.wrappedApp){
    secretEls.wrappedApp.addEventListener('keydown', function(e){
      if(secretEls.wrappedApp.getAttribute('data-mode') !== 'wrapped') return;
      if(e.key === 'ArrowRight'){ goToWrappedSlide(wrappedIndex + 1); }
      else if(e.key === 'ArrowLeft'){ goToWrappedSlide(wrappedIndex - 1); }
    });
  }

  /* =========================================================
     MODE HACKER (God Mode) : pluie de code, glitch, overclock,
     ligne de commande à secrets.
     ========================================================= */

  /* ---- pluie de code façon "Matrix", activable/désactivable via le bouton dédié ---- */
  var hackerRainOn = false;
  (function(){
    var canvas = secretEls.hackerRainCanvas;
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var glyphs = "01アイウエオカキク+×#$".split('');
    var columns = [];

    function sizeCanvas(){
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if(!w || !h) return;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var colCount = Math.max(6, Math.round(w / 22));
      columns = [];
      for(var i=0; i<colCount; i++){
        columns.push({ x: i * (w / colCount) + 8, y: Math.random() * -h, speed: 1 + Math.random() * 1.6 });
      }
    }
    window.addEventListener('resize', function(){ if(hackerRainOn){ sizeCanvas(); } });

    function draw(){
      if(!hackerRainOn) return; /* la boucle s'arrête d'elle-même dès que l'effet est coupé */
      var w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.font = '15px ' + "'JetBrains Mono', monospace";
      for(var i=0; i<columns.length; i++){
        var col = columns[i];
        col.y += col.speed;
        if(col.y > h + 20){ col.y = -20; }
        var glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillStyle = 'rgba(76,255,160,0.75)';
        ctx.fillText(glyph, col.x, col.y);
      }
      requestAnimationFrame(draw);
    }

    if(secretEls.btnMatrixRain){
      secretEls.btnMatrixRain.addEventListener('click', function(){
        hackerRainOn = !hackerRainOn;
        secretEls.btnMatrixRain.classList.toggle('is-on', hackerRainOn);
        canvas.classList.toggle('active', hackerRainOn);
        if(hackerRainOn){ sizeCanvas(); requestAnimationFrame(draw); }
      });
    }
  })();

  /* ---- "System Glitch" : secousse RVB + freeze très bref de l'écran ---- */
  if(secretEls.btnSystemGlitch){
    secretEls.btnSystemGlitch.addEventListener('click', function(){
      if(reduceMotion) return;
      secretEls.hackerView.classList.remove('glitching');
      void secretEls.hackerView.offsetWidth;
      secretEls.hackerView.classList.add('glitching');
      window.setTimeout(function(){ secretEls.hackerView.classList.remove('glitching'); }, 850);
    });
  }

  /* ---- "Overclock" : accélère toutes les animations du panneau à ~300% ---- */
  if(secretEls.btnOverclock){
    secretEls.btnOverclock.addEventListener('click', function(){
      var on = secretEls.hackerView.classList.toggle('overclocked');
      secretEls.btnOverclock.classList.toggle('is-on', on);
    });
  }

  /* ---- ligne de commande à secrets ---- */

  /* ajoute une ligne à la sortie du terminal et fait défiler vers le bas,
     comme un vrai terminal dont le scrollback grandit */
  function appendHackerLine(line){
    if(!secretEls.hackerOutput) return;
    secretEls.hackerOutput.textContent += (secretEls.hackerOutput.textContent ? '\n' : '') + line;
    if(secretEls.hackerOutputWrap){ secretEls.hackerOutputWrap.scrollTop = secretEls.hackerOutputWrap.scrollHeight; }
  }

  var hackSequenceRunning = false;
  /* la commande "hack"/"hacker" : une vraie petite mise en scène façon film de
     piratage — plein de lignes de code/logs qui défilent vite, en piochant au
     hasard dans HACK_SEQUENCE_LINES, puis un message final rigolo. */
  function playHackSequence(){
    if(hackSequenceRunning) return;
    hackSequenceRunning = true;
    appendHackerLine('> hack');
    appendHackerLine('Lancement de la séquence de piratage...');

    /* pioche ~14 lignes au hasard (avec répétitions possibles, comme un vrai
       flot de logs) parmi la banque éditable */
    var total = reduceMotion ? HACK_SEQUENCE_LINES.length : 22;
    var lines = [];
    for(var i=0; i<total; i++){
      lines.push(HACK_SEQUENCE_LINES[Math.floor(Math.random() * HACK_SEQUENCE_LINES.length)]);
    }

    if(reduceMotion){
      lines.forEach(function(l){ appendHackerLine(l); });
      appendHackerLine('');
      appendHackerLine('ACCÈS ROOT OBTENU. Sarah is officially the best. 🏆😎');
      hackSequenceRunning = false;
      return;
    }

    var idx = 0;
    var timer = window.setInterval(function(){
      appendHackerLine(lines[idx]);
      idx++;
      if(idx >= lines.length){
        window.clearInterval(timer);
        window.setTimeout(function(){
          appendHackerLine('');
          appendHackerLine('ACCÈS ROOT OBTENU. Sarah is officially the best. 🏆😎');
          hackSequenceRunning = false;
        }, 200);
      }
    }, 90);
  }

  if(secretEls.hackerCommandInput && secretEls.hackerOutput){
    secretEls.hackerCommandInput.addEventListener('keydown', function(e){
      if(e.key !== 'Enter') return;
      var raw = secretEls.hackerCommandInput.value.trim();
      if(!raw) return;
      secretEls.hackerCommandInput.value = '';
      var key = raw.toLowerCase();

      if(key === 'hack' || key === 'hacker'){ playHackSequence(); return; }

      var response = HACKER_COMMANDS[key];
      if(response === '__CLEAR__'){ secretEls.hackerOutput.textContent = ''; return; }
      appendHackerLine('> ' + raw);
      appendHackerLine(response || ("Commande inconnue : « " + raw + " ». Tape « aide » pour la liste."));
    });
  }

  /* =========================================================
     BOUTON BASCULE : Mode Wrapped ⇄ Mode Hacker
     ========================================================= */
  if(secretEls.modeToggle){
    secretEls.modeToggle.addEventListener('click', function(){
      var goingHacker = secretEls.wrappedApp.getAttribute('data-mode') !== 'hacker';
      secretEls.wrappedApp.setAttribute('data-mode', goingHacker ? 'hacker' : 'wrapped');
      secretEls.modeToggleLabel.textContent = goingHacker ? '🎵 Mode Wrapped' : '💻 Mode Hacker';

      /* balayage diagonal (bas-gauche → haut-droite) qui révèle l'autre univers ;
         on rejoue le même balayage à l'envers (haut-droite → bas-gauche) quand
         on revient au Wrapped, via .reverse qui inverse l'animation CSS */
      if(!reduceMotion && secretEls.wipeBeam){
        secretEls.wipeBeam.classList.remove('sweeping', 'reverse');
        void secretEls.wipeBeam.offsetWidth;
        if(!goingHacker){ secretEls.wipeBeam.classList.add('reverse'); }
        secretEls.wipeBeam.classList.add('sweeping');
        window.setTimeout(function(){ secretEls.wipeBeam.classList.remove('sweeping', 'reverse'); }, 950);
      }

      /* petit glitch RVB en plus, pour le peps */
      if(!reduceMotion){
        secretEls.wrappedApp.classList.remove('mode-switching');
        void secretEls.wrappedApp.offsetWidth;
        secretEls.wrappedApp.classList.add('mode-switching');
        window.setTimeout(function(){ secretEls.wrappedApp.classList.remove('mode-switching'); }, 550);
      }

      if(goingHacker){
        /* on quitte le Wrapped : on coupe l'avancée automatique des slides */
        clearWrappedAutoAdvance();
      } else {
        /* retour au Wrapped : "reprend le Wrapped au début" comme demandé,
           et on coupe la pluie de code pour ne pas la laisser tourner dans le vide */
        if(hackerRainOn && secretEls.btnMatrixRain){ secretEls.btnMatrixRain.click(); }
        secretEls.hackerView.classList.remove('overclocked');
        if(secretEls.btnOverclock){ secretEls.btnOverclock.classList.remove('is-on'); }
        startWrapped();
      }
    });
  }

  function initSecret(){
    renderDigicodeDots();
    buildVirtualKeyboard();
    renderPhrase();
    renderWrappedContent();
    showSecretLevel(1);
  }

  /* =========================================================
     DÉMARRAGE
     ========================================================= */
  renderCalendar();
  renderLetters();
  initSecret();
  route();
})();