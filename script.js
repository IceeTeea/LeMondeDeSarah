(function(){
  "use strict";
  document.documentElement.classList.add('has-js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     DATES DU CALENDRIER — 30 jours à partir du 10 septembre 2026
     ========================================================= */
  var CAL_START = new Date(2026, 8, 10); /* 10 septembre 2026 : jour 1 du calendrier = aujourd'hui (peut déborder sur le mois suivant) */

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

  var DAYS_IN_CAL = DAY_TEXTS.length; /* 30 jours, à partir de CAL_START ci-dessus */

  /* ÉDITABLE : le calendrier de novembre 2026 (30 jours, du 1er au 30 novembre).
     Textes d'exemple : remplace-les par les tiens, comme pour septembre. */
  var NOV_TEXTS = [
    "Nouveau mois, nouvelle page blanche. J'espère qu'elle te ressemblera : douce, un peu folle, et pleine de petites victoires. Quoi qu'il arrive en novembre, je suis là.",
    "Novembre a parfois cette lumière grise qui fatigue. Si tu te sens un peu à plat aujourd'hui, c'est normal. Fais-toi un thé, mets une couverture sur tes épaules, et dis-toi que je pense à toi.",
    "Tu ne t'en rends probablement pas compte, mais tu as une manière de rassurer les gens rien qu'en étant là. Moi, ça m'a souvent fait un bien fou.",
    "Aujourd'hui, je voulais juste te dire merci. Pour les messages à des heures impossibles, pour les fous rires, pour tout ce qu'on n'a même pas besoin de se dire.",
    "Si tu avais une petite voix dans la tête qui te dit que tu n'en fais pas assez, dis-lui de se taire de ma part. Ce que tu fais compte, et ce que tu es compte encore plus.",
    "Prends dix minutes rien que pour toi aujourd'hui. Pas pour être productive, pas pour répondre à quelqu'un. Juste pour respirer. Tu l'as bien mérité.",
    "Il y a des amitiés qui s'usent avec le temps. La nôtre, elle, a pris de la profondeur. Je ne l'échangerais contre rien au monde.",
    "Les jours où tout paraît compliqué, rappelle-toi d'où tu viens. Regarde tout ce que tu as déjà traversé : tu es bien plus solide que tu ne le penses.",
    "Je sais que tu es du genre à t'occuper de tout le monde avant toi. Aujourd'hui, c'est moi qui m'occupe de toi, avec ce petit message. Il ne remplace pas un câlin, mais il y pense très fort.",
    "Quand je repense à nos souvenirs, ce n'est jamais les grands moments qui me viennent en premier. Ce sont les petits : un fou rire, une vanne, un silence tranquille. Merci pour ça.",
    "Tu as le droit de ne pas aller bien tout le temps. Tu as le droit de te reposer, de dire non, de changer d'avis. Je serai toujours de ton côté.",
    "Je suis fier de la personne que tu deviens, même quand tu n'es pas sûre de toi. Surtout quand tu n'es pas sûre de toi, en fait.",
    "Il paraît qu'on est la moyenne des gens qu'on fréquente. Si c'est vrai, alors j'ai beaucoup de chance de t'avoir dans ma vie.",
    "Aujourd'hui, je te souhaite un truc tout bête : un bon repas, une chanson qui te fait du bien, et quelqu'un qui te fait rire. Si c'est moi, c'est encore mieux.",
    "Ne laisse personne te faire croire que tu en demandes trop. Tu mérites des gens qui te respectent, t'écoutent et te tiennent la main quand il le faut.",
    "On a eu des hauts, des bas, des moments de doute, et on est toujours là l'un pour l'autre. Ça, c'est la plus belle preuve que cette amitié est solide.",
    "Si tu es en train de lire ça un soir où tout te semble lourd, ferme les yeux deux secondes. Tu n'es pas seule. Je ne suis jamais très loin, même quand les kilomètres s'en mêlent.",
    "Ce que j'aime chez toi, c'est que tu restes toi-même, sans calcul ni faux-semblant. C'est rare, et c'est précieux. Ne change jamais ça.",
    "Un petit rappel pour aujourd'hui : tu n'as pas besoin d'être parfaite pour être aimée. Tu l'es déjà, exactement comme tu es.",
    "J'espère que tu as pris le temps de rire aujourd'hui. Sinon, voilà ton rappel : repense à notre pire moment de honte, et laisse-le faire effet.",
    "Je ne te le dis peut-être pas assez, mais tes messages, tes vocaux et ta présence sont des petits morceaux de bonheur dans mes journées.",
    "Il y aura toujours des journées plus lourdes que d'autres. Mais il y aura toujours quelqu'un pour te dire que ça va aller. Aujourd'hui, c'est moi, et je le pense vraiment.",
    "Tu as plus de courage que tu ne le crois. Je l'ai vu plus d'une fois, et ça m'a toujours impressionné. Continue d'avancer à ton rythme.",
    "Merci d'être la personne à qui je peux tout dire sans avoir peur d'être jugé. C'est un luxe que peu de gens ont, et je le sais.",
    "Peu importe ce que décembre nous réserve, j'espère qu'on le traversera comme on traverse tout le reste : ensemble, avec nos blagues et nos vocaux interminables.",
    "Je te souhaite un week-end sans pression : un bon film, de la musique, et zéro culpabilité de ne rien faire. Tu as le droit de ralentir, tu sais.",
    "Si tu devais retenir une seule chose de ce mois : tu comptes. Pour moi, pour ceux qui t'aiment, et pour la vie qui a de la chance de t'avoir.",
    "Dans quelques jours, ce calendrier sera fini. Mais ce qu'il raconte, lui, ne s'arrête pas : tu es précieuse, tu es aimée, et tu mérites qu'on te le dise souvent.",
    "J'ai adoré écrire chacun de ces petits mots pour toi. Si l'un d'eux t'a fait sourire ou t'a fait du bien, alors ce mois n'aura pas été écrit pour rien.",
    "Dernier jour de novembre. Merci d'avoir ouvert chaque case, merci d'être là, merci d'être toi. Je n'ai pas fini de te le dire : tu es ma meilleure amie, et ça, rien ne le changera."
];

  /* Les calendriers disponibles : on peut passer de l'un à l'autre avec les onglets. */
  var SEPT_TEXTS = DAY_TEXTS;
  var CALENDARS = [
    { id: 'sept', label: 'Septembre · octobre', heading: 'Septembre · octobre', start: new Date(2026, 8, 10), texts: SEPT_TEXTS, prefix: 'jour-',  hash: 'calendar',     storeKey: 'sarah-cal-opened' },
    { id: 'nov',  label: 'Novembre',            heading: 'Novembre',            start: new Date(2026, 10, 1), texts: NOV_TEXTS,  prefix: 'nov-',   hash: 'calendar-nov', storeKey: 'sarah-cal-opened-nov' }
  ];
  var activeCal = CALENDARS[0];
  function setCalendar(i){
    activeCal = CALENDARS[i];
    CAL_START = activeCal.start;
    DAY_TEXTS = activeCal.texts;
    DAYS_IN_CAL = DAY_TEXTS.length;
  }

  /* ÉDITABLE : les lettres. Change trigger / word / sub comme tu veux,
     ou ajoute/retire des objets dans ce tableau — tout s'adapte automatiquement. */
  var LETTERS = [
    { trigger: "À ouvrir quand... ils te manquent",  word: "ÉTOILES",     sub: "Lève les yeux vers le ciel, que ce soit sous la chaleur du Soleil ou la douceur de la Lune. Leur amour ne s'est pas envolé : il vit encore à travers ta force, ton sourire et la personne formidable que tu es. Tu n'es pas seule." },
    { trigger: "À ouvrir quand... tu veux juste un câlin", word: "CÂLIN", sub: "Voilà un énorme câlin virtuel, serré comme il faut, avec tout ce qu'il faut de chaleur. En attendant le vrai, ferme les yeux et imagine-moi juste à côté de toi." },
    { trigger: "À ouvrir quand... tu doutes de toi",           word: "FORCE",   sub: "Si tu n'arrives pas à croire en toi aujourd'hui, appuie-toi sur la confiance que j'ai en toi. Tu as surmonté des épreuves bien plus lourdes que ce qui se dresse devant toi. Tu es capable de tout, n'en doute jamais." },
    { trigger: "À ouvrir quand... tu es fatiguée de tout", word: "REPOS", sub: "Pas besoin d'être forte aujourd'hui. Pose tout, même les choses importantes, et accorde-toi un vrai repos. Le monde peut attendre un peu, et moi je suis là si tu veux juste qu'on ne dise rien ensemble." },
    { trigger: "À ouvrir quand... c'est ton anniversaire", word: "JOYEUX ANNIV", sub: "Une année de plus, et toujours la même lumière en toi. Merci d'exister, merci d'être dans ma vie. Je te souhaite une journée remplie de rires, de gâteau et de gens qui t'aiment. Tu le mérites tellement." },
    { trigger: "À ouvrir quand... tu paniques",       word: "RESPIRE",   sub: "Pose tout ce que tu fais, ferme les yeux et prends trois grandes inspirations. Rien n'est aussi grave ou définitif qu'il n'y paraît sur le moment. Je suis là, et on va régler ça ensemble, pas à pas." },
    { trigger: "À ouvrir quand... tu te compares aux autres", word: "UNIQUE", sub: "Chacun avance sur son propre chemin, et tu n'as pas à suivre celui des autres. Ce que tu es, personne d'autre ne peut l'être. C'est ça, ta force, et c'est pour ça que je tiens autant à toi." },
    { trigger: "À ouvrir quand... tu as réussi un truc",   word: "FIERTÉ",       sub: "Je le savais ! Tu as travaillé dur pour ça et tu mérites amplement cette victoire. Savoure ce moment à 100 %, je suis tellement fier de toi !" },
    { trigger: "À ouvrir quand... tu n'arrives pas à dormir",          word: "CALME",   sub: "Éteins ton écran, pose ton téléphone et laisse tes pensées filer sans les retenir. Tu n'as rien à résoudre cette nuit. Accorde à ton esprit le repos qu'il mérite." },
    { trigger: "À ouvrir quand... tu t'ennuies", word: "AVENTURE", sub: "Alors on invente quelque chose : un film nul à regarder ensemble, un défi absurde, une chanson à deviner. Écris-moi, et on transforme cet ennui en souvenir." },
    { trigger: "À ouvrir quand... on s'est disputés", word: "PAIX", sub: "Une dispute ne change rien à ce que tu représentes pour moi. On est deux têtes pas toujours d'accord, mais on tient trop l'un à l'autre pour laisser ça durer. Respire, et reviens me parler quand tu veux." },
    { trigger: "À ouvrir quand... tu te sens seule",      word: "PRÉSENCE",    sub: "Même si des kilomètres ou du silence nous séparent en ce moment, mon amitié pour toi ne bouge pas. Tu as un ancrage solide ici, et tu pourras toujours compter sur moi, peu importe l'heure." },
    { trigger: "À ouvrir quand... tu veux te souvenir de nous", word: "NOUS", sub: "Ferme les yeux et repense à un de nos fous rires. Tu l'as ? Garde-le. On en aura encore des centaines, et ils seront tous aussi précieux." },
    { trigger: "À ouvrir quand... tu as peur de demain", word: "CONFIANCE", sub: "Demain, tu n'as pas besoin de tout savoir à l'avance. Avance pas à pas, à ton rythme : tu t'es toujours débrouillée, et ça ne va pas changer. Et si ça devient trop lourd, tu sais où me trouver." },
    { trigger: "À ouvrir quand... tu as envie de tout lâcher", word: "TIENS BON", sub: "Je sais que certains jours donnent envie de tout arrêter. Ce n'est pas de la faiblesse, c'est de la fatigue. Repose-toi d'abord, on reparlera du reste ensuite. Je suis là, et je ne te lâche pas." }
  ];

  var todayReal = new Date();
  var todayMid = new Date(todayReal.getFullYear(), todayReal.getMonth(), todayReal.getDate());

  function dateForDay(d){ return new Date(CAL_START.getFullYear(), CAL_START.getMonth(), CAL_START.getDate() + (d - 1)); }
  function isUnlocked(d){ return dateForDay(d).getTime() <= todayMid.getTime(); }
  function isToday(d){ return dateForDay(d).getTime() === todayMid.getTime(); }
  function frDate(d){
    return dateForDay(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  }

  /* ---- petit stockage local : quelles cases ont déjà été ouvertes (confort visuel seulement) ---- */
  function getOpened(){
    try{
      var raw = window.localStorage.getItem(activeCal.storeKey);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  }
  function markOpened(d){
    try{
      var list = getOpened();
      if(list.indexOf(d) === -1){ list.push(d); window.localStorage.setItem(activeCal.storeKey, JSON.stringify(list)); }
    }catch(e){}
  }

  /* =========================================================
     NAVIGATION ENTRE ÉCRANS
     ========================================================= */
  var screens = {
    map: document.getElementById('screen-map'),
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

    applyTheme(name);
    if(name === 'map'){ window.setTimeout(drawMapLines, 30); }
    if(name === 'secret'){ if(trialEls.steps && !vaultOpened){ startTrial(trialCur); } }
    if(name === 'sky'){ startSkyLoop(); } else { stopSkyLoop(); }

    window.scrollTo(0,0);
  }

  function route(){
    var hash = window.location.hash.replace('#','');
    if(hash.indexOf('jour-') === 0 || hash.indexOf('nov-') === 0){
      setCalendar(hash.indexOf('nov-') === 0 ? 1 : 0);
      var d = parseInt(hash.replace(activeCal.prefix,''), 10);
      if(d >= 1 && d <= DAYS_IN_CAL && isUnlocked(d)){
        openDay(d, false);
        return;
      }
      window.location.hash = activeCal.hash;
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
    if(hash === 'calendar' || hash === 'calendar-nov'){ setCalendar(hash === 'calendar-nov' ? 1 : 0); renderCalendar(); showScreen('calendar'); return; }
    if(hash === 'letters'){ renderLetters(); showScreen('letters'); return; }
    if(hash === 'window'){ showScreen('window'); return; }
    if(hash === 'sky'){ closeConstellation(); showScreen('sky'); return; }
    if(hash === 'secret'){ showScreen('secret'); return; }
    if(hash === 'home'){ showScreen('home'); return; }
    showScreen('map');
  }

  navLinks.forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = btn.getAttribute('data-nav');
      window.location.hash = target === 'map' ? '' : target;
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
    if(screens.day.classList.contains('active')){ window.location.hash = activeCal.hash; }
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
    var opened = getOpened();
    var calHeading = document.getElementById('cal-heading');
    if(calHeading){ calHeading.textContent = activeCal.heading; }
    document.querySelectorAll('.cal-tab').forEach(function(t){
      var on = t.getAttribute('data-cal') === activeCal.hash;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var COLS = 5, ROW_H = 116, TOP = 56;
    var rows = Math.ceil(DAYS_IN_CAL / COLS);
    var H = TOP * 2 + (rows - 1) * ROW_H;
    var pts = [];
    for(var i = 0; i < DAYS_IN_CAL; i++){
      var r = Math.floor(i / COLS), c = i % COLS;
      if(r % 2 === 1){ c = COLS - 1 - c; }
      pts.push({ x: 10 + c * 20 + Math.sin(i * 1.7) * 2.2, y: TOP + r * ROW_H + Math.sin(i * 1.3) * 16 });
    }
    calGrid.innerHTML = '';
    calGrid.style.height = H + 'px';

    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'cal-path-lines');
    svg.setAttribute('viewBox', '0 0 100 ' + H);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    for(var k = 0; k < pts.length - 1; k++){
      var p0 = pts[k], p1 = pts[k + 1];
      var path = document.createElementNS(NS, 'path');
      var midY = (p0.y + p1.y) / 2;
      var horizontal = Math.floor(k / COLS) === Math.floor((k + 1) / COLS);
      var dstr = horizontal
        ? 'M' + p0.x + ' ' + p0.y + ' C ' + ((p0.x + p1.x) / 2) + ' ' + (p0.y - 10) + ', ' + ((p0.x + p1.x) / 2) + ' ' + (p1.y + 10) + ', ' + p1.x + ' ' + p1.y
        : 'M' + p0.x + ' ' + p0.y + ' C ' + (p0.x + (p0.x > 50 ? 9 : -9)) + ' ' + (p0.y + 40) + ', ' + (p1.x + (p1.x > 50 ? 9 : -9)) + ' ' + (p1.y - 40) + ', ' + p1.x + ' ' + p1.y;
      path.setAttribute('d', dstr);
      path.setAttribute('class', isUnlocked(k + 2) ? 'lit' : '');
      svg.appendChild(path);
    }
    calGrid.appendChild(svg);

    for(var n = 0; n < DAYS_IN_CAL; n++){
      (function(d, pt){
        var unlocked = isUnlocked(d);
        var wasOpened = opened.indexOf(d) !== -1;
        var box = document.createElement('button');
        box.type = 'button';
        box.className = 'day-star' + (unlocked ? '' : ' is-locked') + (isToday(d) ? ' is-today' : '') + (wasOpened && unlocked ? ' is-opened' : '');
        box.style.left = pt.x + '%';
        box.style.top = pt.y + 'px';

        box.innerHTML = '<svg class="ds-shape" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-spark"/></svg>' +
          '<span class="ds-num">' + d + '</span>' +
          (unlocked ? '' : '<svg class="ds-lock" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-lock"/></svg>');
        box.setAttribute('aria-label', unlocked
          ? 'Jour ' + d + (wasOpened ? ' — déjà ouvert' : ' — à ouvrir')
          : 'Jour ' + d + ' — verrouillé jusqu\'au ' + frDate(d));

        box.addEventListener('click', function(){
          if(!unlocked){
            if(!reduceMotion){
              box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
            }
            return;
          }
          if(reduceMotion){
            window.location.hash = activeCal.prefix + d;
            return;
          }
          box.classList.add('popping');
          window.setTimeout(function(){ window.location.hash = activeCal.prefix + d; }, 320);
        });

        calGrid.appendChild(box);
      })(n + 1, pts[n]);
    }

    if(todayMid.getTime() < dateForDay(1).getTime()){
      calStatus.textContent = 'Le calendrier s\'ouvre le ' + dateForDay(1).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) + ' — reviens à ce moment-là !';
    } else if(todayMid.getTime() > dateForDay(DAYS_IN_CAL).getTime()){
      calStatus.textContent = 'Les 30 jours sont terminés : tu peux tout rouvrir autant que tu veux.';
    } else {
      calStatus.textContent = 'On est le ' + todayMid.toLocaleDateString('fr-FR', { day:'numeric', month:'long' }) + ' : les cases jusqu\'à aujourd\'hui sont ouvertes.';
    }
  }

  document.querySelectorAll('.cal-tab').forEach(function(t){
    t.addEventListener('click', function(){ window.location.hash = t.getAttribute('data-cal'); });
  });

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
    dayLabel.textContent = 'JOUR ' + String(d).padStart(2,'0') + ' · ' + dateForDay(d).toLocaleDateString('fr-FR', { month: 'long' }).toUpperCase();
    dayTextEl.className = 'day-text ' + (text.length <= 25 ? 'len-s' : text.length <= 42 ? 'len-m' : 'len-l');
    dayTextEl.innerHTML = buildWords(text);
    markOpened(d);

    dayPrev.disabled = !(d > 1 && isUnlocked(d - 1));
    dayNext.disabled = !(d < DAYS_IN_CAL && isUnlocked(d + 1));

    var backBtn = document.querySelector('#screen-day .day-nav [data-nav]');
    if(backBtn){ backBtn.setAttribute('data-nav', activeCal.hash); }
    showScreen('day');
    window.setTimeout(function(){ dayTextEl.focus(); }, 50);

    if(!reduceMotion){
      window.setTimeout(function(){ burstFromCenterScreen(); }, 150);
    }
  }

  dayPrev.addEventListener('click', function(){
    if(currentDay > 1 && isUnlocked(currentDay - 1)){ window.location.hash = activeCal.prefix + (currentDay - 1); }
  });
  dayNext.addEventListener('click', function(){
    if(currentDay < DAYS_IN_CAL && isUnlocked(currentDay + 1)){ window.location.hash = activeCal.prefix + (currentDay + 1); }
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

  /* lettres déjà ouvertes : mémorisées pour qu'elles restent "ouvertes" après un refresh */
  function getOpenedLetters(){
    try{ var raw = window.localStorage.getItem('sarah-letters-opened-v2'); return raw ? JSON.parse(raw) : []; }catch(e){ return []; }
  }
  function markLetterOpened(i){
    try{
      var list = getOpenedLetters();
      if(list.indexOf(i) === -1){ list.push(i); window.localStorage.setItem('sarah-letters-opened-v2', JSON.stringify(list)); }
    }catch(e){}
  }

  function renderLetters(){
    var openedLetters = getOpenedLetters();
    lettersGrid.innerHTML = '';
    LETTERS.forEach(function(item, i){
      var card = document.createElement('button');
      card.type = 'button';
      var wasRead = openedLetters.indexOf(item.word) !== -1;
      card.className = 'letter-card' + (wasRead ? ' is-opened' : '');
      card.setAttribute('aria-label', item.trigger + (wasRead ? ' — déjà ouverte' : ''));

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
    markLetterOpened(item.word);
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

  /* ---- ciel de jour / de nuit (suit le bouton soleil/lune) ---- */
  function isDayTheme(){ return document.documentElement.getAttribute('data-theme') === 'day'; }
  function makeClouds(count, w, h){
    var list = [];
    for(var i = 0; i < count; i++){
      var puffs = [];
      var np = 4 + Math.floor(Math.random() * 3);
      for(var k = 0; k < np; k++){ puffs.push({ dx: (k - np / 2) * (0.55 + Math.random() * 0.2), dy: (Math.random() - 0.5) * 0.35, r: 0.55 + Math.random() * 0.35 }); }
      list.push({ x: Math.random() * w, y: Math.random() * h, s: 38 + Math.random() * 50, v: 4 + Math.random() * 9, puffs: puffs });
    }
    return list;
  }
  function paintClouds(ctx, clouds, offX, offY, W, H, t){
    ctx.fillStyle = 'rgba(255,255,255,0.93)';
    for(var i = 0; i < clouds.length; i++){
      var c = clouds[i];
      var x = (((c.x + (reduceMotion ? 0 : t * 0.001 * c.v) - offX) % (W + 400)) + (W + 400)) % (W + 400) - 200;
      var y = c.y - offY;
      for(var k = 0; k < c.puffs.length; k++){
        var p = c.puffs[k];
        ctx.beginPath();
        ctx.arc(x + p.dx * c.s, y + p.dy * c.s, p.r * c.s * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /* =========================================================
     FENÊTRE : petit aperçu du ciel, toujours discret
     ========================================================= */
  (function(){
    var wCanvas = document.getElementById('window-stars-canvas');
    if(!wCanvas) return;
    var wctx = wCanvas.getContext('2d');
    var wStars = [];
    var wClouds = [];
    var wDpr = Math.min(window.devicePixelRatio || 1, 2);

    function sizeWindowCanvas(){
      var w = wCanvas.clientWidth || 200, h = wCanvas.clientHeight || 260;
      wCanvas.width = w * wDpr; wCanvas.height = h * wDpr;
      wctx.setTransform(wDpr,0,0,wDpr,0,0);
      wStars = [];
      wClouds = makeClouds(4, w, h * 0.7);
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
      if(isDayTheme()){
        var dg = wctx.createLinearGradient(0,0,0,h);
        dg.addColorStop(0,'#5db6ee'); dg.addColorStop(0.7,'#b6e2fa'); dg.addColorStop(1,'#e8f6ff');
        wctx.fillStyle = dg; wctx.fillRect(0,0,w,h);
        var sg = wctx.createRadialGradient(w*0.78, h*0.2, 0, w*0.78, h*0.2, w*0.45);
        sg.addColorStop(0,'rgba(255,244,190,0.95)'); sg.addColorStop(0.25,'rgba(255,230,140,0.55)'); sg.addColorStop(1,'rgba(255,230,140,0)');
        wctx.fillStyle = sg; wctx.fillRect(0,0,w,h);
        wctx.fillStyle = '#fff6c4'; wctx.beginPath(); wctx.arc(w*0.78, h*0.2, w*0.07, 0, Math.PI*2); wctx.fill();
        paintClouds(wctx, wClouds, 0, 0, w, h, t);
        requestAnimationFrame(drawWindow);
        return;
      }
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
  /* ÉDITABLE : les 5 constellations. name / date / text s'affichent sur la fiche ;
     ajoute photo: "mon-image.jpg" pour afficher une photo (sinon aucun cadre photo n'apparaît). */
  var CONSTELLATIONS = [
    {
      name: "La rencontre",
      date: "Là où tout a commencé",
      text: "Personne ne sait comment ça arrive, mais un jour deux personnes se croisent et plus rien n'est comme avant. Ce jour-là, sans le savoir, on a allumé la première étoile.",
      x: 320, y: 260,
      path: [ {dx:0,dy:0}, {dx:-70,dy:-55}, {dx:30,dy:-95}, {dx:95,dy:-60} ]
    },
    {
      name: "Le premier fou rire",
      date: "Impossible de se souvenir de pourquoi",
      text: "On ne sait déjà plus de quoi on riait, mais on se souvient très bien de ce que ça faisait : le ventre qui fait mal, les larmes, et l'impression que rien d'autre n'existait.",
      x: 980, y: 210,
      path: [ {dx:0,dy:0}, {dx:60,dy:-50}, {dx:130,dy:-30}, {dx:170,dy:30} ]
    },
    {
      name: "La nuit des confidences",
      date: "Tard, très tard",
      text: "Il y a des nuits où on se dit tout, sans filtre, sans peur d'être jugé. Celles-là, je les garde précieusement : c'est là qu'on a compris qu'on pouvait compter l'un sur l'autre.",
      x: 1560, y: 430,
      path: [ {dx:0,dy:0}, {dx:-55,dy:60}, {dx:-40,dy:140}, {dx:30,dy:180} ]
    },
    {
      name: "Les jours où on a tenu bon",
      date: "Ensemble, même de loin",
      text: "Pas besoin d'être au même endroit pour être là. Chaque message, chaque appel, chaque « ça va aller » a compté, et on est toujours debout, plus soudés qu'avant.",
      x: 760, y: 880,
      path: [ {dx:0,dy:0}, {dx:80,dy:-40}, {dx:160,dy:-55}, {dx:210,dy:-10} ]
    },
    {
      name: "Aujourd'hui",
      date: "Ce soir, en ouvrant cette page",
      text: "Une raison de plus pour la liste : merci d'être exactement qui tu es.",
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
  var skyClouds = makeClouds(16, 2200, 900);
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
  var skyProgressEl = document.getElementById('sky-progress');
  var cardImg = document.getElementById('card-img');
  var skyFound = []; try{ skyFound = JSON.parse(window.localStorage.getItem('sarah:sky-found') || '[]'); }catch(e){ skyFound = []; }
  function renderSkyProgress(){
    if(!skyProgressEl) return;
    var total = CONSTELLATIONS.length;
    skyProgressEl.textContent = skyFound.length >= total
      ? 'Tout le ciel est allumé ✦ (' + total + '/' + total + ')'
      : 'Constellations allumées : ' + skyFound.length + '/' + total;
    skyProgressEl.classList.toggle('is-complete', skyFound.length >= total);
  }

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
    var day = isDayTheme();
    var LIME_RGB = day ? '255,196,40' : '199,241,59';
    var LIME_HEX = day ? '#ffc428' : LIME_HEX;
    if(day){
      var skg = skyCtx.createRadialGradient(viewW*0.82, viewH*0.16, 0, viewW*0.82, viewH*0.16, viewW*0.5);
      skg.addColorStop(0,'rgba(255,246,196,0.95)'); skg.addColorStop(0.18,'rgba(255,236,150,0.55)'); skg.addColorStop(1,'rgba(255,236,150,0)');
      skyCtx.fillStyle = skg; skyCtx.fillRect(0,0,viewW,viewH);
      skyCtx.fillStyle = '#fff6c8'; skyCtx.beginPath(); skyCtx.arc(viewW*0.82, viewH*0.16, 34, 0, Math.PI*2); skyCtx.fill();
      paintClouds(skyCtx, skyClouds, camCenter.x * 0.6 - viewW/2, camCenter.y * 0.6 - viewH/2, viewW, viewH, t);
    }

    for(var i=0;i<skyStars.length;i++){
      if(day) break;
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

      skyCtx.strokeStyle = day ? 'rgba(255,255,255,0.95)' : 'rgba(245,240,255,0.85)';
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
          popGrad.addColorStop(0, 'rgba(' + LIME_RGB + ',' + (0.55*(1-reveal)) + ')');
          popGrad.addColorStop(1, 'rgba(' + LIME_RGB + ',0)');
          skyCtx.fillStyle = popGrad;
          skyCtx.beginPath();
          skyCtx.arc(pp.x, pp.y, 20, 0, Math.PI*2);
          skyCtx.fill();
        }
        skyCtx.globalAlpha = reveal;
        skyCtx.fillStyle = LIME_HEX;
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
      skyCtx.strokeStyle = LIME_HEX;
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
      grad.addColorStop(0, isOpen ? 'rgba(' + LIME_RGB + ',0.55)' : 'rgba(' + LIME_RGB + ',0.32)');
      grad.addColorStop(1, 'rgba(' + LIME_RGB + ',0)');
      skyCtx.fillStyle = grad;
      skyCtx.beginPath();
      skyCtx.arc(ap.x, ap.y, baseR*4.5, 0, Math.PI*2);
      skyCtx.fill();

      skyCtx.fillStyle = LIME_HEX;
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
    if(cardImg){
      if(c.photo){ cardImg.src = c.photo; cardImg.alt = c.name; cardImg.hidden = false; } else { cardImg.hidden = true; cardImg.removeAttribute('src'); }
    }
    if(skyFound.indexOf(i) === -1){
      skyFound.push(i);
      try{ window.localStorage.setItem('sarah:sky-found', JSON.stringify(skyFound)); }catch(e){}
      renderSkyProgress();
      if(skyFound.length >= CONSTELLATIONS.length && !reduceMotion){ window.setTimeout(burstFromCenterScreen, 1500); }
    }
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
    renderSkyProgress();
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
     THÈME JOUR / NUIT
     Automatique : clair sur les messages et les lettres, puis de plus en
     plus "nuit" à mesure qu'on va vers la carte, le calendrier, la fenêtre
     et le secret. Le bouton force un des deux (et se souvient du choix).
     ========================================================= */
  var NIGHT_SCREENS = { map:1, calendar:1, day:1, window:1, sky:1, secret:1 };
  var themeToggle = document.getElementById('theme-toggle');
  var currentScreenName = 'map';
  function lsGet(k){ try{ return window.localStorage.getItem('sarah:' + k); }catch(e){ return null; } }
  function lsSet(k, v){ try{ if(v === null){ window.localStorage.removeItem('sarah:' + k); } else { window.localStorage.setItem('sarah:' + k, v); } }catch(e){} }
  function themeOverride(){ return lsGet('theme'); }
  function applyTheme(name){
    if(name){ currentScreenName = name; }
    var auto = NIGHT_SCREENS[currentScreenName] ? 'night' : 'day';
    var ov = themeOverride();
    var theme = (ov === 'day' || ov === 'night') ? ov : auto;
    document.documentElement.setAttribute('data-theme', theme);
    if(themeToggle){
      themeToggle.setAttribute('aria-pressed', theme === 'night' ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', theme === 'night' ? 'Passer en mode jour' : 'Passer en mode nuit');
    }
  }
  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      var now = document.documentElement.getAttribute('data-theme');
      var next = now === 'night' ? 'day' : 'night';
      var auto = NIGHT_SCREENS[currentScreenName] ? 'night' : 'day';
      lsSet('theme', next === auto ? null : next);
      applyTheme();
    });
  }

  /* =========================================================
     CARTE DE L'UNIVERS : fils pointillés entre les planètes
     ========================================================= */
  var mapStage = document.getElementById('map-stage');
  var mapLines = document.getElementById('map-lines');
  function drawMapLines(){
    if(!mapStage || !mapLines || !screens.map.classList.contains('active')) return;
    var box = mapStage.getBoundingClientRect();
    var orbs = mapStage.querySelectorAll('.planet .orb');
    var pts = [];
    orbs.forEach(function(o){
      var r = o.getBoundingClientRect();
      pts.push([r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top]);
    });
    var d = '';
    pts.forEach(function(pt, i){ d += (i ? ' L ' : 'M ') + pt[0].toFixed(1) + ' ' + pt[1].toFixed(1); });
    mapLines.setAttribute('viewBox', '0 0 ' + box.width.toFixed(0) + ' ' + box.height.toFixed(0));
    mapLines.innerHTML = '<path d="' + d + '"/>';
  }
  window.addEventListener('resize', drawMapLines);

  /* =========================================================
     LA FRATRIE : un lecteur à onglets (un message à la fois)
     ========================================================= */
  (function(){
    var reader = document.getElementById('fam-reader');
    var tabsEl = document.getElementById('fam-tabs');
    if(!reader || !tabsEl) return;
    var cards = reader.querySelectorAll('.fam-card');
    var tabs = [];
    function select(i, focus){
      cards.forEach(function(card, k){ card.classList.toggle('is-active', k === i); });
      tabs.forEach(function(tab, k){
        tab.setAttribute('aria-selected', k === i ? 'true' : 'false');
        tab.tabIndex = k === i ? 0 : -1;
        tab.classList.toggle('is-active', k === i);
      });
      if(focus){ tabs[i].focus(); }
    }
    cards.forEach(function(card, i){
      var who = (card.querySelector('.who') || {}).textContent || '';
      var role = (card.querySelector('.badge') || {}).textContent || '';
      card.id = 'fam-card-' + i;
      var tab = document.createElement('button');
      tab.type = 'button'; tab.className = 'fam-tab'; tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', card.id);
      tab.innerHTML = '<span class="fam-avatar" aria-hidden="true"></span><span class="fam-tab-text"><span class="fam-tab-name"></span><span class="fam-tab-role"></span></span>';
      tab.querySelector('.fam-avatar').textContent = who.trim().charAt(0).toUpperCase();
      tab.querySelector('.fam-tab-name').textContent = who.trim();
      tab.querySelector('.fam-tab-role').textContent = role.trim();
      tab.addEventListener('click', function(){ select(i); });
      tab.addEventListener('keydown', function(e){
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if(d){ e.preventDefault(); select((i + d + cards.length) % cards.length, true); }
      });
      tabsEl.appendChild(tab); tabs.push(tab);
    });
    reader.classList.add('is-ready');
    select(0);
  })();

  /* =========================================================
     PATCH NOTE : s'ouvre une fois par version, rouvrable depuis la carte
     (change PATCH_VERSION à chaque nouvelle mise à jour pour la réafficher)
     ========================================================= */
  var PATCH_VERSION = '2026-10-20b';
  var patchEl = document.getElementById('patch');
  var patchOpenBtn = document.getElementById('patch-open');
  var patchPrevFocus = null;
  function openPatch(){
    if(!patchEl) return;
    patchPrevFocus = document.activeElement;
    patchEl.hidden = false;
    void patchEl.offsetWidth;
    patchEl.classList.add('is-open');
    document.body.classList.add('patch-lock');
    var body = patchEl.querySelector('.patch-body'); if(body){ body.scrollTop = 0; }
    window.setTimeout(function(){ var x = patchEl.querySelector('.patch-close'); if(x){ x.focus(); } }, 60);
  }
  function closePatch(){
    if(!patchEl || patchEl.hidden) return;
    lsSet('patch', PATCH_VERSION);
    patchEl.classList.remove('is-open');
    document.body.classList.remove('patch-lock');
    window.setTimeout(function(){ patchEl.hidden = true; }, reduceMotion ? 10 : 320);
    if(patchPrevFocus && patchPrevFocus.focus){ try{ patchPrevFocus.focus(); }catch(e){} }
  }
  function showPatchIfNew(){
    var hsh = window.location.hash.replace('#', '');
    if(lsGet('patch') === PATCH_VERSION && !/[?&]reset\b/.test(window.location.search)) return;
    if(hsh !== '' && hsh !== 'map' && hsh !== 'home') return;
    openPatch();
  }
  if(patchEl){
    patchEl.querySelectorAll('[data-patch-close]').forEach(function(el){ el.addEventListener('click', closePatch); });
    patchEl.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ e.stopPropagation(); closePatch(); return; }
      if(e.key !== 'Tab') return;
      var f = patchEl.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if(!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    });
  }
  if(patchOpenBtn){ patchOpenBtn.addEventListener('click', openPatch); }

  /* =========================================================
     ÉCRAN D'INTRO "Pour Sarah" (première visite seulement)
     ========================================================= */
  var introEl = document.getElementById('intro');
  if(introEl){
    var introHash = window.location.hash.replace('#', '');
    var introSeen = lsGet('intro') === '1' && !/[?&]reset\b/.test(window.location.search);
    if(!introSeen && (introHash === '' || introHash === 'map')){
      introEl.hidden = false;
      document.body.classList.add('intro-open');
      var ic = document.getElementById('intro-stars');
      var ictx = ic.getContext('2d');
      var istars = [];
      var iw = 0, ih = 0, iraf = null;
      var sizeIntro = function(){
        iw = ic.width = window.innerWidth; ih = ic.height = window.innerHeight;
        istars = [];
        for(var i = 0; i < 130; i++){ istars.push({ x: Math.random() * iw, y: Math.random() * ih, r: Math.random() * 1.5 + 0.3, ph: Math.random() * 6.28, sp: 0.4 + Math.random() }); }
      };
      sizeIntro();
      var drawIntro = function(t){
        ictx.clearRect(0, 0, iw, ih);
        ictx.fillStyle = '#F5F0FF';
        for(var i = 0; i < istars.length; i++){
          var st = istars[i];
          ictx.globalAlpha = reduceMotion ? 0.7 : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(st.ph + t * 0.001 * st.sp));
          ictx.beginPath(); ictx.arc(st.x, st.y, st.r, 0, 6.283); ictx.fill();
        }
        if(!reduceMotion){ iraf = requestAnimationFrame(drawIntro); }
      };
      iraf = requestAnimationFrame(drawIntro);
      var introBtn = document.getElementById('intro-btn');
      window.setTimeout(function(){ introBtn.focus(); }, 60);
      introBtn.addEventListener('click', function(){
        lsSet('intro', '1');
        introEl.classList.add('leaving');
        document.body.classList.remove('intro-open');
        window.setTimeout(function(){
          introEl.hidden = true;
          if(iraf){ cancelAnimationFrame(iraf); }
          showPatchIfNew();
        }, reduceMotion ? 10 : 900);
      });
    } else {
      window.setTimeout(showPatchIfNew, 500);
    }
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
        sctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'night' ? '#F5F0FF' : '#3E1470';
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

  /* ---- sauvegarde de la progression (localStorage, préfixe "sarah:") ----
     Ajoute ?reset à l'adresse de la page pour tout remettre à zéro. */
  function saveGet(k){ try{ return window.localStorage.getItem('sarah:' + k); }catch(e){ return null; } }
  function saveSet(k, v){ try{ window.localStorage.setItem('sarah:' + k, v); }catch(e){} }
  if(/[?&]reset\b/.test(window.location.search)){
    try{
      Object.keys(window.localStorage).forEach(function(key){
        if(key.indexOf('sarah') === 0){ window.localStorage.removeItem(key); }
      });
    }catch(e){}
  }

  /* =========================================================
     LE COFFRE (section Secret)
     Il ne s'ouvre qu'après avoir passé les 4 épreuves.
     ========================================================= */

  /* ÉDITABLE : les 7 raisons (une par étoile) */
  var VAULT_REASONS = [
    { title: "Ta façon d'écouter", text: "Tu écoutes pour comprendre, pas pour répondre. Peu de gens savent faire ça, et toi tu le fais sans même y penser." },
    { title: "Ton rire", text: "Il est contagieux. Il y a des jours où il suffit que je l'entende pour que tout aille mieux." },
    { title: "Ta loyauté", text: "Quand tu es là, tu es là pour de bon, dans les bons moments comme dans les moins bons." },
    { title: "Ta sensibilité", text: "Elle te fait parfois douter, mais c'est aussi ce qui te rend si humaine et si attentionnée." },
    { title: "Tes folies", text: "Les idées improbables, les vocaux de vingt minutes, les fous rires à des heures impossibles. Merci d'être aussi dingue que moi." },
    { title: "Ta force", text: "Tu avances même quand c'est dur, et tu ne le montres pas toujours. Moi, je le vois, et je suis fier de toi." },
    { title: "Ta présence", text: "Juste le fait que tu existes et que tu sois dans ma vie. Le reste n'est que du bonus." }
  ];
  /* ÉDITABLE : la lettre finale */
  var VAULT_GREETING = "Chère Sarah,";
  var VAULT_LETTER = [
    "Si tu lis ces lignes, c'est que tu as exploré tout l'univers jusqu'au bout. Bravo, et surtout merci d'avoir pris le temps.",
    "Ce site, je l'ai construit pour te dire, autrement qu'avec un simple message, à quel point tu comptes pour moi. Chaque étoile, chaque lettre, chaque petite surprise est là pour une seule raison : te faire sourire.",
    "Quoi qu'il arrive, je serai toujours dans ton équipe. Ne l'oublie jamais."
  ];
  var VAULT_SIGNATURE = "Avec tout mon cœur,";

  var vaultEls = {
    locked: document.getElementById('vault-locked'),
    open: document.getElementById('vault-open'),
    sky: document.getElementById('vault-stars'),
    lines: document.getElementById('vault-sky-lines'),
    reason: document.getElementById('vault-reason'),
    reasonCount: document.getElementById('vault-reason-count'),
    reasonTitle: document.getElementById('vault-reason-title'),
    reasonText: document.getElementById('vault-reason-text'),
    lede: document.getElementById('vault-open-lede'),
    letterBtn: document.getElementById('vault-letter-btn'),
    letter: document.getElementById('vault-letter')
  };
  var vaultOpened = saveGet('vault') === '1';
  var vaultSeen = []; try{ vaultSeen = JSON.parse(saveGet('vault-seen') || '[]'); }catch(e){ vaultSeen = []; }
  /* positions des 7 étoiles (en % de la scène) : une petite constellation en forme de sourire */
  var VAULT_STAR_POS = [ [10,30], [24,62], [40,80], [58,86], [74,70], [88,44], [50,24] ];

  function sanctuaryFoundCount(){
    try{
      var d = JSON.parse(window.localStorage.getItem('sarah:sanctuary') || 'null');
      return d && d.found ? d.found.length : 0;
    }catch(e){ return 0; }
  }
  function unlockVault(){
    vaultOpened = true;
    saveSet('vault', '1');
    saveSet('trials', '4'); trialDone = 4;
    window.setTimeout(showVaultOpen, reduceMotion ? 50 : 1300);
  }

  function renderVaultSky(){
    vaultEls.sky.innerHTML = '';
    VAULT_REASONS.forEach(function(r, i){
      var pos = VAULT_STAR_POS[i % VAULT_STAR_POS.length];
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'vault-star' + (vaultSeen.indexOf(i) !== -1 ? ' is-seen' : '');
      b.style.left = pos[0] + '%'; b.style.top = pos[1] + '%';
      b.setAttribute('aria-label', 'Raison ' + (i + 1) + ' sur ' + VAULT_REASONS.length + (vaultSeen.indexOf(i) !== -1 ? ' (déjà lue)' : ''));
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-spark"/></svg><span>' + (i + 1) + '</span>';
      b.addEventListener('click', function(){ showReason(i, b); });
      vaultEls.sky.appendChild(b);
    });
    drawVaultLines();
    updateVaultProgress();
  }
  function drawVaultLines(){
    var NS = 'http://www.w3.org/2000/svg';
    vaultEls.lines.innerHTML = '';
    for(var k = 0; k < VAULT_REASONS.length - 1; k++){
      var a = VAULT_STAR_POS[k], b = VAULT_STAR_POS[k + 1];
      var p = document.createElementNS(NS, 'line');
      p.setAttribute('x1', a[0] * 10); p.setAttribute('y1', a[1] * 5.2);
      p.setAttribute('x2', b[0] * 10); p.setAttribute('y2', b[1] * 5.2);
      p.setAttribute('class', (vaultSeen.indexOf(k) !== -1 && vaultSeen.indexOf(k + 1) !== -1) ? 'lit' : '');
      vaultEls.lines.appendChild(p);
    }
  }
  function updateVaultProgress(){
    var total = VAULT_REASONS.length;
    var done = vaultSeen.length;
    if(done >= total){
      vaultEls.lede.textContent = "Toutes les étoiles sont allumées. Il reste une dernière chose…";
      vaultEls.letterBtn.hidden = false;
    } else {
      vaultEls.lede.textContent = "Touche chaque étoile pour lire une raison (" + done + "/" + total + ").";
      vaultEls.letterBtn.hidden = true;
    }
  }
  function showReason(i, btn){
    var r = VAULT_REASONS[i];
    vaultEls.reasonCount.textContent = 'Raison ' + (i + 1) + ' sur ' + VAULT_REASONS.length;
    vaultEls.reasonTitle.textContent = r.title;
    vaultEls.reasonText.textContent = r.text;
    vaultEls.reason.classList.remove('show'); void vaultEls.reason.offsetWidth; vaultEls.reason.classList.add('show');
    vaultEls.sky.querySelectorAll('.vault-star').forEach(function(s){ s.classList.remove('is-current'); });
    btn.classList.add('is-current', 'is-seen');
    if(vaultSeen.indexOf(i) === -1){
      vaultSeen.push(i);
      saveSet('vault-seen', JSON.stringify(vaultSeen));
      drawVaultLines();
      updateVaultProgress();
      if(!reduceMotion){
        var rc = btn.getBoundingClientRect();
        burst(rc.left + rc.width / 2, rc.top + rc.height / 2);
      }
    }
  }
  function showVaultOpen(){
    vaultEls.locked.hidden = true;
    vaultEls.open.hidden = false;
    renderVaultSky();
    if(screens.secret.classList.contains('active')){
      var hd = document.getElementById('vault-open-heading'); if(hd){ hd.focus(); }
    }
  }
  function openLetter2(){
    var g = document.getElementById('vault-letter-greeting');
    var body = document.getElementById('vault-letter-body');
    var sign = document.getElementById('vault-letter-sign');
    g.textContent = VAULT_GREETING;
    body.innerHTML = '';
    VAULT_LETTER.forEach(function(p){ var el = document.createElement('p'); el.textContent = p; body.appendChild(el); });
    sign.textContent = VAULT_SIGNATURE;
    vaultEls.letter.hidden = false;
    void vaultEls.letter.offsetWidth;
    vaultEls.letter.classList.add('is-open');
    var cl = vaultEls.letter.querySelector('.vault-letter-close'); if(cl){ cl.focus(); }
    if(!reduceMotion){ window.setTimeout(burstFromCenterScreen, 500); }
  }
  function closeLetter2(){
    vaultEls.letter.classList.remove('is-open');
    window.setTimeout(function(){ vaultEls.letter.hidden = true; }, reduceMotion ? 10 : 300);
  }
  /* =========================================================
     LES 4 ÉPREUVES (gardent le coffre)
     1 le message codé · 2 la constellation à rejouer
     3 les étoiles à éteindre · 4 le puzzle du ciel
     ========================================================= */
  var TRIAL_RIDDLE = "JE BRILLE SANS FLAMME ET LA NUIT JE TE GUIDE. QUI SUIS-JE ?"; /* ÉDITABLE (majuscules, sans accents) */
  var TRIAL_KEY = "CIEL";                     /* clé du chiffre de Vigenère (ÉDITABLE) */
  var TRIAL_ANSWERS = ['etoile', 'une etoile', 'une etoile filante'];
  var TRIAL_DEFS = [
    { name: 'Le message codé', kind: 'Décryptage', text: "Le message est chiffré avec une clé secrète : chaque lettre est décalée selon une lettre du mot-clé, qui se répète. Indice : la clé est l’endroit où vivent les étoiles (4 lettres). Trouve-la pour lire l’énigme, puis réponds." },
    { name: 'La constellation', kind: 'Mémoire', text: "Les étoiles s’allument dans un certain ordre. Rejoue la suite sans te tromper : elle s’allonge à chaque tour (7 étoiles)." },
    { name: 'Extinction', kind: 'Logique', text: "Toucher une étoile change aussi ses quatre voisines. Éteins-les toutes." },
    { name: 'Le puzzle du ciel', kind: 'Puzzle', text: "Les morceaux du ciel sont mélangés. Fais glisser les pièces pour les remettre de 1 à 8, la case vide en bas à droite." }
  ];
  var trialEls = {
    steps: document.getElementById('trial-steps'),
    title: document.getElementById('trial-title'),
    text: document.getElementById('trial-text'),
    board: document.getElementById('trial-board'),
    msg: document.getElementById('trial-msg'),
    reset: document.getElementById('trial-reset'),
    next: document.getElementById('trial-next')
  };
  var trialDone = parseInt(saveGet('trials') || '0', 10) || 0;
  if(vaultOpened) trialDone = 4;
  var trialCur = Math.min(trialDone, 3);
  var trialSolved = false;
  var trialToken = 0;
  var trialTimers = [];

  function trialLater(fn, ms){ var t = window.setTimeout(fn, ms); trialTimers.push(t); return t; }
  function trialClear(){ trialToken++; trialTimers.forEach(clearTimeout); trialTimers = []; }
  function caesar(s, k){
    return s.replace(/[A-Z]/g, function(c){ return String.fromCharCode((c.charCodeAt(0) - 65 + k + 26 * 4) % 26 + 65); });
  }
  function plain(s){ return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim(); }

  function renderTrialSteps(){
    trialEls.steps.innerHTML = '';
    TRIAL_DEFS.forEach(function(d, i){
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      var state = i < trialDone ? 'done' : (i === trialCur ? 'cur' : 'lock');
      b.className = 'trial-step is-' + state + (i === trialCur ? ' is-active' : '');
      b.disabled = i > trialDone;
      b.setAttribute('aria-label', 'Épreuve ' + (i + 1) + ' : ' + d.name + (i < trialDone ? ' (réussie)' : (i > trialDone ? ' (verrouillée)' : '')));
      if(i === trialCur) b.setAttribute('aria-current', 'step');
      b.innerHTML = '<span class="ts-n">' + (i < trialDone ? '✓' : (i > trialDone ? '🔒' : (i + 1))) + '</span><span class="ts-name">' + d.name + '</span><span class="ts-kind">' + d.kind + '</span>';
      b.addEventListener('click', function(){ startTrial(i); });
      li.appendChild(b);
      trialEls.steps.appendChild(li);
    });
  }
  function trialSay(msg, kind){
    trialEls.msg.textContent = msg || '';
    trialEls.msg.className = 'trial-msg' + (kind ? ' is-' + kind : '');
  }
  function startTrial(i){
    trialClear();
    trialCur = i; trialSolved = false;
    trialEls.next.hidden = true;
    trialEls.title.textContent = TRIAL_DEFS[i].name;
    document.getElementById('trial-num').textContent = i + 1;
    document.getElementById('trial-kind').textContent = 'Épreuve ' + (i + 1) + ' sur 4 · ' + TRIAL_DEFS[i].kind;
    trialEls.text.textContent = TRIAL_DEFS[i].text;
    trialEls.board.innerHTML = '';
    trialEls.board.className = 'trial-board tb-' + (i + 1);
    trialEls.reset.onclick = function(){ if(!trialSolved) startTrial(trialCur); };
    trialSay('');
    renderTrialSteps();
    [trialCipher, trialSimon, trialLights, trialSlide][i]();
  }
  function trialWin(){
    if(trialSolved) return;
    trialSolved = true;
    trialClear();
    trialDone = Math.max(trialDone, trialCur + 1);
    saveSet('trials', String(trialDone));
    renderTrialSteps();
    if(!reduceMotion){ burstFromCenterScreen(); }
    if(trialCur < 3){
      trialSay('Réussi ! L’épreuve suivante est ouverte.', 'ok');
      trialEls.next.hidden = false;
      trialEls.next.focus();
    } else {
      trialSay('Les quatre épreuves sont passées. Le coffre s’ouvre…', 'ok');
      trialLater(unlockVault, reduceMotion ? 50 : 1200);
    }
  }

  /* 1 · message codé (Vigenère, clé à deviner) */
  function vigenere(text, key, dir){
    var j = 0;
    return text.replace(/[A-Z]/g, function(c){
      var k = key.charCodeAt(j % key.length) - 65; j++;
      return String.fromCharCode((c.charCodeAt(0) - 65 + dir * k + 26) % 26 + 65);
    });
  }
  function trialCipher(){
    var enc = vigenere(TRIAL_RIDDLE, TRIAL_KEY, 1);
    var wrap = trialEls.board;
    wrap.innerHTML =
      '<p class="tc-cipher" aria-label="Message codé">' + enc + '</p>' +
      '<form class="tc-form" id="tc-key" autocomplete="off"><label for="tc-keyin">Clé</label><input id="tc-keyin" type="text" maxlength="' + TRIAL_KEY.length + '" placeholder="' + TRIAL_KEY.replace(/./g, '_') + '" aria-label="Clé de ' + TRIAL_KEY.length + ' lettres"></form>' +
      '<p class="tc-plain" id="tc-plain" aria-live="off"></p>' +
      '<form class="tc-form" id="tc-form" autocomplete="off"><input id="tc-ans" type="text" placeholder="Réponse à l’énigme" aria-label="Ta réponse à l’énigme"><button type="submit" class="trial-btn">Valider</button></form>';
    var kin = wrap.querySelector('#tc-keyin'), pl = wrap.querySelector('#tc-plain');
    function upd(){
      var k = kin.value.toUpperCase().replace(/[^A-Z]/g, '');
      pl.textContent = k.length === TRIAL_KEY.length ? vigenere(enc, k, -1) : 'Entre les ' + TRIAL_KEY.length + ' lettres de la clé pour déchiffrer.';
      pl.classList.toggle('is-ready', k.length === TRIAL_KEY.length);
    }
    kin.addEventListener('input', upd); wrap.querySelector('#tc-key').addEventListener('submit', function(e){ e.preventDefault(); });
    upd();
    wrap.querySelector('#tc-form').addEventListener('submit', function(e){
      e.preventDefault();
      var a = plain(wrap.querySelector('#tc-ans').value);
      if(a && TRIAL_ANSWERS.indexOf(a) !== -1){ trialWin(); }
      else { trialSay(kin.value.toUpperCase() === TRIAL_KEY ? 'Le message est lisible, mais ce n’est pas la bonne réponse.' : 'Pas encore. Il faut d’abord trouver la bonne clé.', 'bad'); }
    });
  }

  /* 2 · constellation à rejouer */
  function trialSimon(){
    var COLORS = ['#ff8a3d', '#ff4fa3', '#c7f13b', '#58c8ff', '#b79bff'];
    var LEN = 7;
    var seq = [], pos = 0, busy = true, myToken = trialToken;
    var wrap = trialEls.board;
    wrap.innerHTML = '<div class="ts-info" id="ts-info" aria-live="polite"></div><div class="ts-pads" id="ts-pads"></div><button type="button" class="trial-btn" id="ts-go">Lancer</button>';
    var info = wrap.querySelector('#ts-info'), padsEl = wrap.querySelector('#ts-pads'), go = wrap.querySelector('#ts-go');
    var pads = COLORS.map(function(c, i){
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ts-pad'; b.style.setProperty('--pc', c);
      b.setAttribute('aria-label', 'Étoile ' + (i + 1));
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-spark"/></svg>';
      b.addEventListener('click', function(){ press(i); });
      padsEl.appendChild(b);
      return b;
    });
    function flash(i, ms){ pads[i].classList.add('lit'); trialLater(function(){ pads[i].classList.remove('lit'); }, ms); }
    function play(n){
      busy = true; pos = 0; info.textContent = 'Regarde bien… (' + n + '/' + LEN + ')';
      var t = reduceMotion ? 700 : 600;
      for(var k = 0; k < n; k++){ (function(k){ trialLater(function(){ flash(seq[k], t * 0.6); }, 700 + k * t); })(k); }
      trialLater(function(){ busy = false; info.textContent = 'À toi ! (0/' + n + ')'; }, 700 + n * t);
    }
    function press(i){
      if(busy || trialSolved) return;
      flash(i, 220);
      var n = seqLen;
      if(i !== seq[pos]){
        busy = true; trialSay('Raté, la constellation se rallume depuis le début.', 'bad');
        seqLen = 1; seq = []; for(var k = 0; k < LEN; k++){ seq.push(Math.floor(Math.random() * COLORS.length)); }
        trialLater(function(){ trialSay(''); play(1); }, 1100);
        return;
      }
      pos++;
      info.textContent = 'À toi ! (' + pos + '/' + n + ')';
      if(pos === n){
        if(n === LEN){ info.textContent = 'Parfait !'; trialWin(); }
        else { busy = true; seqLen++; trialSay(''); trialLater(function(){ play(seqLen); }, 800); }
      }
    }
    var seqLen = 1;
    go.addEventListener('click', function(){
      seq = []; for(var k = 0; k < LEN; k++){ seq.push(Math.floor(Math.random() * COLORS.length)); }
      seqLen = 1; trialSay(''); go.textContent = 'Recommencer'; trialClear(); play(1);
    });
    info.textContent = 'Appuie sur Lancer pour voir la première étoile.';
  }

  /* 3 · extinction (lights out 5×5, solvable par construction) */
  function trialLights(){
    var N = 5, grid = [], moves = 0;
    var wrap = trialEls.board;
    wrap.innerHTML = '<p class="tl-count" id="tl-count" aria-live="polite"></p><div class="tl-grid" id="tl-grid" role="group" aria-label="Grille d’étoiles"></div>';
    var gridEl = wrap.querySelector('#tl-grid'), count = wrap.querySelector('#tl-count');
    function toggle(i){
      var r = Math.floor(i / N), c = i % N;
      [[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){
        var rr = r + d[0], cc = c + d[1];
        if(rr >= 0 && rr < N && cc >= 0 && cc < N){ grid[rr * N + cc] = !grid[rr * N + cc]; }
      });
    }
    function fresh(){
      grid = []; for(var i = 0; i < N * N; i++) grid.push(false);
      [2, 6, 8, 10, 14, 17, 21, 23].forEach(toggle);
      moves = 0; draw();
    }
    function draw(){
      var cells = gridEl.children;
      for(var i = 0; i < N * N; i++){ cells[i].classList.toggle('on', grid[i]); cells[i].setAttribute('aria-pressed', grid[i] ? 'true' : 'false'); }
      var left = grid.filter(Boolean).length;
      count.textContent = left + ' étoile' + (left > 1 ? 's' : '') + ' allumée' + (left > 1 ? 's' : '') + ' · ' + moves + ' coup' + (moves > 1 ? 's' : '');
    }
    for(var i = 0; i < N * N; i++){
      (function(i){
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'tl-cell';
        b.setAttribute('aria-label', 'Étoile ligne ' + (Math.floor(i / N) + 1) + ', colonne ' + (i % N + 1));
        b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-spark"/></svg>';
        b.addEventListener('click', function(){
          if(trialSolved) return;
          toggle(i); moves++; draw();
          if(!grid.some(Boolean)){ trialWin(); }
        });
        gridEl.appendChild(b);
      })(i);
    }
    trialEls.reset.onclick = function(){ if(!trialSolved) fresh(); };
    fresh();
  }

  /* 4 · puzzle coulissant 3×3 */
  function trialSlide(){
    var tiles = [1,2,3,4,5,6,7,8,0], moves = 0;
    var wrap = trialEls.board;
    wrap.innerHTML = '<p class="tl-count" id="tp-count" aria-live="polite"></p><div class="tp-grid" id="tp-grid" role="group" aria-label="Puzzle coulissant"></div>';
    var gridEl = wrap.querySelector('#tp-grid'), count = wrap.querySelector('#tp-count');
    function neighbors(z){
      var r = Math.floor(z / 3), c = z % 3, out = [];
      if(r > 0) out.push(z - 3); if(r < 2) out.push(z + 3); if(c > 0) out.push(z - 1); if(c < 2) out.push(z + 1);
      return out;
    }
    function shuffle(){
      tiles = [1,2,3,4,5,6,7,8,0]; var z = 8, last = -1;
      for(var k = 0; k < 90; k++){
        var opts = neighbors(z).filter(function(x){ return x !== last; });
        var n = opts[Math.floor(Math.random() * opts.length)];
        tiles[z] = tiles[n]; tiles[n] = 0; last = z; z = n;
      }
      if(tiles.join() === '1,2,3,4,5,6,7,8,0'){ shuffle(); return; }
      moves = 0; draw();
    }
    function draw(){
      gridEl.innerHTML = '';
      tiles.forEach(function(t, i){
        var b = document.createElement('button');
        b.type = 'button';
        if(t === 0){ b.className = 'tp-tile tp-empty'; b.disabled = true; b.setAttribute('aria-label', 'Case vide'); }
        else {
          b.className = 'tp-tile' + (t === i + 1 ? ' ok' : '');
          b.textContent = t;
          b.setAttribute('aria-label', 'Pièce ' + t);
          b.addEventListener('click', function(){ slide(i); });
        }
        gridEl.appendChild(b);
      });
      count.textContent = moves + ' coup' + (moves > 1 ? 's' : '');
    }
    function slide(i){
      if(trialSolved) return;
      var z = tiles.indexOf(0);
      if(neighbors(z).indexOf(i) === -1) return;
      tiles[z] = tiles[i]; tiles[i] = 0; moves++; draw();
      if(tiles.join() === '1,2,3,4,5,6,7,8,0'){ trialWin(); }
    }
    trialEls.reset.onclick = function(){ if(!trialSolved) shuffle(); };
    shuffle();
  }

  function initVault(){
    if(!vaultEls.locked) return;
    renderTrialSteps();
    if(trialDone >= 4 && !vaultOpened){ unlockVault(); }
    else if(!vaultOpened){ startTrial(trialCur); }
    trialEls.next.addEventListener('click', function(){ startTrial(Math.min(trialCur + 1, 3)); });
    vaultEls.letterBtn.addEventListener('click', openLetter2);
    vaultEls.letter.querySelectorAll('[data-letter-close]').forEach(function(el){ el.addEventListener('click', closeLetter2); });
    vaultEls.letter.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ e.stopPropagation(); closeLetter2(); } });
    if(vaultOpened){ showVaultOpen(); }
  }

  /* =========================================================
     DÉMARRAGE
     ========================================================= */
  renderCalendar();
  renderLetters();
  initVault();
  route();
})();