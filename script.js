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
    { trigger: "À ouvrir quand... tu paniques",       word: "RESPIRE",   sub: "Pose tout ce que tu fais, ferme les yeux et prends trois grandes inspirations. Rien n'est aussi grave ou définitif qu'il n'y paraît sur le moment. Je suis là, et on va régler ça ensemble, pas à pas." },
    { trigger: "À ouvrir quand... ils te manquent",  word: "ÉTOILES",     sub: "Lève les yeux vers le ciel, que ce soit sous la chaleur du Soleil ou la douceur de la Lune. Leur amour ne s'est pas envolé : il vit encore à travers ta force, ton sourire et la personne formidable que tu es. Tu n'es pas seule." },
    { trigger: "À ouvrir quand... tu doutes de toi",           word: "FORCE",   sub: "Si tu n'arrives pas à croire en toi aujourd'hui, appuie-toi sur la confiance que j'ai en toi. Tu as surmonté des épreuves bien plus lourdes que ce qui se dresse devant toi. Tu es capable de tout, n'en doute jamais." },
    { trigger: "À ouvrir quand... tu as eu une sale journée",              word: "PAUSE",     sub: "Change-toi les idées, mets ta tenue la plus confortable et oublie le reste du monde pour ce soir. Cette journée est terminée, elle ne définit en rien la suite. Demain est une page vierge." },
    { trigger: "À ouvrir quand... tu n'arrives pas à dormir",          word: "CALME",   sub: "Éteins ton écran, pose ton téléphone et laisse tes pensées filer sans les retenir. Tu n'as rien à résoudre cette nuit. Accorde à ton esprit le repos qu'il mérite." },
    { trigger: "À ouvrir quand... tu te sens seule",      word: "PRÉSENCE",    sub: "Même si des kilomètres ou du silence nous séparent en ce moment, mon amitié pour toi ne bouge pas. Tu as un ancrage solide ici, et tu pourras toujours compter sur moi, peu importe l'heure." },
    { trigger: "À ouvrir quand... tu as réussi un truc",   word: "FIERTÉ",       sub: "Je le savais ! Tu as travaillé dur pour ça et tu mérites amplement cette victoire. Savoure ce moment à 100 %, je suis tellement fier de toi !" },
    { trigger: "À ouvrir quand... tu as besoin de rigoler",   word: "DÉLIRE",    sub: "Rappelle-toi juste de nos pires moments de honte et de nos vocal à rallonge pour 0 raison. On est complètement folles/fous, mais c'est pour ça que notre duo est imbattable." },
    { trigger: "À ouvrir quand... tu te sens nostalgique",          word: "SOUVENIRS",  sub: "Regarde tout le chemin qu'on a parcouru depuis le début. On a créé des moments incroyables, et le plus beau dans tout ça, c'est qu'on a encore toute la vie pour en fabriquer d'autres." },
    { trigger: "À ouvrir quand... tu as peur de demain", word: "CONFIANCE", sub: "Demain, tu n'as pas besoin de tout savoir à l'avance. Avance pas à pas, à ton rythme : tu t'es toujours débrouillée, et ça ne va pas changer. Et si ça devient trop lourd, tu sais où me trouver." },
    { trigger: "À ouvrir quand... tu as envie de tout lâcher", word: "TIENS BON", sub: "Je sais que certains jours donnent envie de tout arrêter. Ce n'est pas de la faiblesse, c'est de la fatigue. Repose-toi d'abord, on reparlera du reste ensuite. Je suis là, et je ne te lâche pas." },
    { trigger: "À ouvrir quand... c'est ton anniversaire", word: "JOYEUX ANNIV", sub: "Une année de plus, et toujours la même lumière en toi. Merci d'exister, merci d'être dans ma vie. Je te souhaite une journée remplie de rires, de gâteau et de gens qui t'aiment. Tu le mérites tellement." },
    { trigger: "À ouvrir quand... tu te trouves nulle", word: "FAUX", sub: "Cette petite voix qui te dit que tu es nulle ? Elle ment. Je te vois telle que tu es vraiment : drôle, sensible, loyale, courageuse. Si tu as du mal à le croire aujourd'hui, crois-moi, moi." },
    { trigger: "À ouvrir quand... on s'est disputés", word: "PAIX", sub: "Une dispute ne change rien à ce que tu représentes pour moi. On est deux têtes pas toujours d'accord, mais on tient trop l'un à l'autre pour laisser ça durer. Respire, et reviens me parler quand tu veux." },
    { trigger: "À ouvrir quand... tu veux juste un câlin", word: "CÂLIN", sub: "Voilà un énorme câlin virtuel, serré comme il faut, avec tout ce qu'il faut de chaleur. En attendant le vrai, ferme les yeux et imagine-moi juste à côté de toi." }
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
    if(name === 'sky'){ startSkyLoop(); } else { stopSkyLoop(); }
    if(name === 'secret' && secretResumeFinal){ secretResumeFinal = false; window.setTimeout(openFinalVault, reduceMotion ? 50 : 400); }
    else if(name === 'secret' && secretEls.secretScreen && secretEls.secretScreen.classList.contains('vault-fullscreen')){ window.setTimeout(startRewardDust, 100); }

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
    try{ var raw = window.localStorage.getItem('sarah-letters-opened'); return raw ? JSON.parse(raw) : []; }catch(e){ return []; }
  }
  function markLetterOpened(i){
    try{
      var list = getOpenedLetters();
      if(list.indexOf(i) === -1){ list.push(i); window.localStorage.setItem('sarah-letters-opened', JSON.stringify(list)); }
    }catch(e){}
  }

  function renderLetters(){
    var openedLetters = getOpenedLetters();
    lettersGrid.innerHTML = '';
    LETTERS.forEach(function(item, i){
      var card = document.createElement('button');
      card.type = 'button';
      var wasRead = openedLetters.indexOf(i) !== -1;
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
    markLetterOpened(i);
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
      date: "XXX",
      text: "Plus Tard",
      x: 320, y: 260,
      path: [ {dx:0,dy:0}, {dx:-70,dy:-55}, {dx:30,dy:-95}, {dx:95,dy:-60} ]
    },
    {
      name: "XXX",
      date: "XXX",
      text: "Plus Tard",
      x: 980, y: 210,
      path: [ {dx:0,dy:0}, {dx:60,dy:-50}, {dx:130,dy:-30}, {dx:170,dy:30} ]
    },
    {
      name: "XXX",
      date: "XXX",
      text: "Plus Tard",
      x: 1560, y: 430,
      path: [ {dx:0,dy:0}, {dx:-55,dy:60}, {dx:-40,dy:140}, {dx:30,dy:180} ]
    },
    {
      name: "XXX",
      date: "XXX",
      text: "Plus Tard",
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
        }, reduceMotion ? 10 : 900);
      });
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

  /* =========================================================
     SECRET : accès sécurisé à 3 niveaux (digicode → énigme → terminal)
     ========================================================= */

  /* ————— ÉDITABLE : modifie ces constantes pour personnaliser le jeu ————— */
  var SECRET_CODE = "9204";        /* ÉDITABLE : code du digicode, 4 chiffres */
  /* ÉDITABLE : indices progressifs du digicode, un nouvel indice tous les SECRET_HINT_EVERY mauvais essais */
  var SECRET_HINTS = [
    "Le code n'est pas ici… ouvre l'œil du côté de la fenêtre, dans la chambre. 👀",
    "Regarde bien l'étagère de la chambre : les chiffres sont minuscules, presque invisibles.",
    "Quatre objets, quatre chiffres : lis-les de gauche à droite."
  ];
  var SECRET_HINT_EVERY = 3;

  /* ---- sauvegarde de la progression (localStorage, préfixe "sarah:") ----
     Ajoute ?reset à l'adresse de la page pour tout remettre à zéro. */
  function saveGet(k){ try{ return window.localStorage.getItem('sarah:' + k); }catch(e){ return null; } }
  function saveSet(k, v){ try{ window.localStorage.setItem('sarah:' + k, v); }catch(e){} }
  if(/[?&]reset\b/.test(window.location.search)){
    try{
      Object.keys(window.localStorage).forEach(function(key){
        if(key.indexOf('sarah:') === 0){ window.localStorage.removeItem(key); }
      });
    }catch(e){}
  }
  var secretResumeFinal = false; /* vrai si on reprend directement sur le coffre déjà ouvert */
  var RIDDLE_QUESTION = "Je grandis chaque année sans jamais vieillir vraiment, et on me fête à chaque automne. Qui suis-je ?"; /* ÉDITABLE */
  var RIDDLE_ANSWER = "anniversaire"; /* ÉDITABLE — comparaison insensible à la casse et aux espaces */
  var SECRET_PHRASE = "MEILLEURE AMIE POUR LA VIE"; /* ÉDITABLE — lettres A-Z et espaces uniquement, devinable lettre par lettre OU d'un coup en tapant la phrase entière */
  /* —————————————————————————————————————————————————————————————————
     ÉDITABLE : la récompense finale ("Le coffre de souvenirs").
     Tout ce qui s'affiche vient d'ici : change les textes quand tu veux. */
  var REWARD_TO = "Sarah"; /* ÉDITABLE — prénom écrit sur l'enveloppe */
  var REWARD_GREETING = "Chère Sarah,"; /* ÉDITABLE — première ligne de la lettre */
  /* ÉDITABLE : la lettre, un élément du tableau = un paragraphe. Elle s'écrit lettre par lettre. */
  var REWARD_LETTER = [
    "Si tu lis ça, c'est que tu as réussi les trois épreuves. Bien sûr que tu as réussi, je n'en attendais pas moins de toi.",
    "Je voulais te dire quelque chose que je ne dis pas assez : tu comptes énormément pour moi. Tu es de ces personnes qui rendent les bons jours meilleurs et les mauvais jours supportables.",
    "Merci d'être là, de me comprendre sans que j'aie besoin d'expliquer, et de rire aux mêmes bêtises que moi. Je ne l'ai jamais dit comme ça, alors voilà : tu es ma meilleure amie, pour de vrai.",
    "Ce coffre n'était qu'un prétexte pour te le dire. Prends ton temps, regarde nos souvenirs, et sache que ce n'est que le début."
  ];
  var REWARD_SIGNATURE = "Avec tout mon cœur,"; /* ÉDITABLE — ajoute ton prénom derrière si tu veux */
  /* ÉDITABLE : les polaroïds. title = légende sous la photo, text = le mot au dos.
     photo = chemin de ton image (ex. "souvenirs/1.jpg") ; laisse "" pour garder l'emplacement vide. */
  var REWARD_SOUVENIRS = [
    { title: "Le début de tout", text: "Le jour où on s'est rencontrées, je ne savais pas encore que tu deviendrais ma personne préférée.", photo: "" },
    { title: "Notre premier fou rire", text: "Celui qu'on n'arrivait plus à arrêter. Je souris encore rien qu'en y repensant.", photo: "" },
    { title: "Les soirées sans raison", text: "Celles où il ne se passe rien d'extraordinaire, et qui sont pourtant mes préférées.", photo: "" },
    { title: "Quand ça n'allait pas", text: "Tu étais là, sans poser de questions. C'est ça, une vraie meilleure amie.", photo: "" },
    { title: "Nos délires", text: "Personne d'autre ne comprendrait. C'est exactement ce qui les rend parfaits.", photo: "" },
    { title: "La suite", text: "Il y en aura plein d'autres. Je compte bien tous les collectionner avec toi.", photo: "" }
  ];
  var REWARD_OUTRO_TITLE = "Merci d'être toi."; /* ÉDITABLE */
  var REWARD_OUTRO_TEXT = "Ce coffre n'a pas de fond : il y aura toujours de nouveaux souvenirs à y ranger."; /* ÉDITABLE */
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
    /* ---- écran final : le coffre de souvenirs ---- */
    rewardApp: document.getElementById('reward-app'),
    rewardDust: document.getElementById('reward-dust'),
    rewardStages: document.querySelectorAll('.reward-stage'),
    rewardSteps: document.querySelectorAll('.reward-step'),
    envelope: document.getElementById('envelope'),
    envelopeTo: document.getElementById('env-to'),
    envelopeHint: document.getElementById('env-hint'),
    letterPaper: document.getElementById('letter-paper'),
    letterGreeting: document.getElementById('letter-greeting'),
    letterBody: document.getElementById('letter-body'),
    letterSign: document.getElementById('letter-sign'),
    letterNext: document.getElementById('reward-letter-next'),
    galleryTitle: document.getElementById('gallery-title'),
    polaroidWall: document.getElementById('polaroid-wall'),
    galleryCount: document.getElementById('gallery-count'),
    galleryNext: document.getElementById('gallery-next'),
    outroTitle: document.getElementById('outro-title'),
    outroText: document.getElementById('outro-text'),
    outroLetter: document.getElementById('outro-letter'),
    outroGallery: document.getElementById('outro-gallery'),
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
    saveSet('secret-level', String(name));
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

  function openFinalVault(){
    secretEls.vaultScene.classList.add('opened');
    if(secretEls.secretScreen){ secretEls.secretScreen.classList.add('vault-fullscreen'); }
    startReward();
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
           puis la récompense (enveloppe + lettre) démarre depuis le début */
        window.setTimeout(openFinalVault, reduceMotion ? 50 : 300);
      }
    }, delay);
  }

  /* ---- NIVEAU 1 : digicode ---- */
  var digicodeValue = "";
  var digicodeSolved = false;
  var digicodeFails = parseInt(saveGet('digicode-fails') || '0', 10) || 0;

  function renderDigicodeHint(){
    var el = document.getElementById('digicode-hint');
    if(!el) return;
    var idx = Math.min(SECRET_HINTS.length, Math.floor(digicodeFails / SECRET_HINT_EVERY)) - 1;
    el.textContent = idx >= 0 ? ('Indice : ' + SECRET_HINTS[idx]) : '';
  }

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
      digicodeFails++;
      saveSet('digicode-fails', String(digicodeFails));
      digicodeShakeError("Code incorrect. Réessaie.");
      renderDigicodeHint();
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
      saveSet('secret-letters', guessedLetters.join(''));
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
        saveSet('secret-letters', guessedLetters.join(''));
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
     ÉCRAN FINAL : "Le coffre de souvenirs"
     1) une enveloppe qui s'ouvre sur une lettre qui s'écrit toute seule,
     2) un mur de polaroïds à retourner, 3) un mot de la fin.
     Tous les textes viennent des constantes REWARD_… tout en haut
     du script secret.
     ========================================================= */
  var REWARD_STAGES = ['letter', 'gallery', 'outro'];
  var rewardStage = 'letter';
  var rewardMaxStage = 0;       /* étape la plus loin atteinte : les suivantes restent verrouillées */
  var rewardTypingToken = 0;    /* change à chaque (re)lancement ou saut : coupe l'ancienne frappe */
  var rewardLetterDone = false;
  var rewardLetterParas = [];
  var rewardFlipped = {};
  var rewardDustOn = false;

  function rewardSetText(el, text){ if(el){ el.textContent = text; } }

  /* ---- étincelles dorées qui montent doucement derrière tout (arrêtées quand l'écran n'est plus visible) ---- */
  function startRewardDust(tries){
    var canvas = secretEls.rewardDust;
    if(!canvas || reduceMotion || rewardDustOn) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var specks = [];
    function size(){
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if(!w || !h) return false;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(24, Math.round((w * h) / 22000));
      specks = [];
      for(var i = 0; i < count; i++){ specks.push(make(w, h, true)); }
      return true;
    }
    function make(w, h, anywhere){
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 10,
        r: 0.6 + Math.random() * 1.6,
        v: 0.15 + Math.random() * 0.4,
        d: (Math.random() - 0.5) * 0.25,
        t: Math.random() * Math.PI * 2
      };
    }
    if(!size()){ if((tries || 0) < 15){ window.setTimeout(function(){ startRewardDust((tries || 0) + 1); }, 200); } return; }
    rewardDustOn = true;
    window.addEventListener('resize', size);
    function frame(){
      if(!rewardDustOn || !secretEls.secretScreen || !secretEls.secretScreen.classList.contains('vault-fullscreen')){
        rewardDustOn = false;
        window.removeEventListener('resize', size);
        return;
      }
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if(!w || !h){ rewardDustOn = false; window.removeEventListener('resize', size); return; } /* écran masqué : on s'arrête */
      ctx.clearRect(0, 0, w, h);
      for(var i = 0; i < specks.length; i++){
        var s = specks[i];
        s.y -= s.v; s.x += s.d; s.t += 0.04;
        if(s.y < -10){ specks[i] = make(w, h, false); continue; }
        ctx.globalAlpha = 0.25 + (Math.sin(s.t) * 0.5 + 0.5) * 0.55;
        ctx.fillStyle = '#FFD27A';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---- navigation entre les 3 étapes ---- */
  function updateRewardSteps(){
    secretEls.rewardSteps.forEach(function(btn){
      var name = btn.getAttribute('data-stage');
      var idx = REWARD_STAGES.indexOf(name);
      btn.disabled = idx > rewardMaxStage;
      btn.classList.toggle('current', name === rewardStage);
      btn.classList.toggle('done', idx < REWARD_STAGES.indexOf(rewardStage));
      if(name === rewardStage){ btn.setAttribute('aria-current', 'step'); } else { btn.removeAttribute('aria-current'); }
    });
  }

  function unlockRewardStage(idx){
    if(idx > rewardMaxStage){ rewardMaxStage = idx; }
    updateRewardSteps();
  }

  function goRewardStage(name){
    var idx = REWARD_STAGES.indexOf(name);
    if(idx === -1 || idx > rewardMaxStage) return;
    rewardStage = name;
    secretEls.rewardStages.forEach(function(el){
      el.classList.toggle('active', el.getAttribute('data-stage') === name);
      el.scrollTop = 0;
    });
    updateRewardSteps();
    if(name === 'gallery'){
      /* les polaroïds sont "distribués" à chaque arrivée sur le mur */
      secretEls.polaroidWall.classList.remove('dealt');
      void secretEls.polaroidWall.offsetWidth;
      secretEls.polaroidWall.classList.add('dealt');
      window.setTimeout(function(){ if(secretEls.galleryTitle){ secretEls.galleryTitle.focus({ preventScroll: true }); } }, 60);
    } else if(name === 'outro'){
      if(!reduceMotion){ window.setTimeout(burstFromCenterScreen, 350); }
      window.setTimeout(function(){ if(secretEls.outroTitle){ secretEls.outroTitle.focus({ preventScroll: true }); } }, 60);
    } else if(secretEls.rewardApp){
      secretEls.rewardApp.focus({ preventScroll: true });
    }
  }

  /* ---- ÉTAPE 1 : la lettre qui s'écrit toute seule ---- */
  function finishRewardLetter(){
    rewardLetterDone = true;
    saveSet('reward-letter-read', '1');
    rewardLetterParas.forEach(function(p){ p.classList.remove('is-typing'); });
    secretEls.letterSign.classList.add('show');
    secretEls.letterNext.classList.add('show', 'ready');
    unlockRewardStage(1);
  }

  function fillRewardLetter(){
    rewardTypingToken++;
    rewardLetterParas.forEach(function(p, i){ p.textContent = REWARD_LETTER[i]; });
    finishRewardLetter();
  }

  function typeRewardLetter(){
    var body = secretEls.letterBody;
    body.innerHTML = '';
    secretEls.letterSign.classList.remove('show');
    secretEls.letterNext.classList.remove('show', 'ready');
    rewardLetterParas = REWARD_LETTER.map(function(){
      var p = document.createElement('p');
      body.appendChild(p);
      return p;
    });
    var token = ++rewardTypingToken;
    if(reduceMotion || rewardLetterDone){ fillRewardLetter(); return; }
    var pi = 0, ci = 0;
    function step(){
      if(token !== rewardTypingToken) return;
      if(pi >= REWARD_LETTER.length){ finishRewardLetter(); return; }
      var text = REWARD_LETTER[pi];
      var p = rewardLetterParas[pi];
      if(ci === 0){ p.classList.add('is-typing'); }
      if(ci < text.length){
        ci++;
        p.textContent = text.slice(0, ci);
        var ch = text.charAt(ci - 1);
        var wait = /[.!?…]/.test(ch) ? 280 : (/[,;:]/.test(ch) ? 140 : 26);
        var stage = document.getElementById('reward-letter');
        if(stage){ stage.scrollTop = stage.scrollHeight; }
        window.setTimeout(step, wait);
      } else {
        p.classList.remove('is-typing');
        pi++; ci = 0;
        window.setTimeout(step, 450);
      }
    }
    step();
  }

  function openRewardEnvelope(){
    var env = secretEls.envelope;
    if(!env || env.classList.contains('open')) return;
    env.classList.add('open');
    if(secretEls.envelopeHint){ secretEls.envelopeHint.classList.add('is-hidden'); }
    window.setTimeout(function(){
      env.classList.add('gone');
      window.setTimeout(function(){
        env.classList.add('is-hidden');
        showRewardLetter();
      }, reduceMotion ? 0 : 450);
    }, reduceMotion ? 0 : 750);
  }

  function showRewardLetter(){
    secretEls.letterPaper.classList.add('show');
    typeRewardLetter();
  }

  /* ---- ÉTAPE 2 : le mur de polaroïds ---- */
  function updateGalleryCount(){
    var n = Object.keys(rewardFlipped).length, total = REWARD_SOUVENIRS.length;
    rewardSetText(secretEls.galleryCount, n >= total ? 'Tu les as tous retournés.' : (n + ' / ' + total + ' retournés'));
    secretEls.galleryNext.classList.toggle('ready', n >= total);
  }

  function buildPolaroids(){
    var wall = secretEls.polaroidWall;
    wall.innerHTML = '';
    var tilts = [-3.5, 2.5, -1.5, 3, -2.5, 1.5];
    REWARD_SOUVENIRS.forEach(function(item, i){
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'polaroid';
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('aria-label', item.title + ' — toucher pour retourner');
      card.style.setProperty('--tilt', tilts[i % tilts.length] + 'deg');
      card.style.setProperty('--deal', (i * 0.11).toFixed(2) + 's');

      var inner = document.createElement('span'); inner.className = 'polaroid-inner';
      var front = document.createElement('span'); front.className = 'polaroid-face polaroid-front';
      var photo = document.createElement('span'); photo.className = 'polaroid-photo';
      function showEmpty(){
        photo.classList.add('is-empty');
        photo.innerHTML = '<svg aria-hidden="true"><use href="#icon-camera"/></svg><span>photo à ajouter</span>';
      }
      if(item.photo){
        var img = new Image();
        img.alt = '';
        img.addEventListener('error', showEmpty);
        img.src = item.photo;
        photo.appendChild(img);
      } else { showEmpty(); }
      var cap = document.createElement('span'); cap.className = 'polaroid-cap'; cap.textContent = item.title;
      front.appendChild(photo); front.appendChild(cap);

      var back = document.createElement('span'); back.className = 'polaroid-face polaroid-back';
      var txt = document.createElement('span'); txt.textContent = item.text;
      back.appendChild(txt);

      inner.appendChild(front); inner.appendChild(back);
      card.appendChild(inner);
      card.addEventListener('click', function(){
        var on = !card.classList.contains('flipped');
        card.classList.toggle('flipped', on);
        card.setAttribute('aria-pressed', on ? 'true' : 'false');
        if(on){ rewardFlipped[i] = true; }
        updateGalleryCount();
        if(on && Object.keys(rewardFlipped).length === REWARD_SOUVENIRS.length && !reduceMotion){
          burstFromElement(secretEls.galleryNext);
        }
      });
      wall.appendChild(card);
    });
    updateGalleryCount();
  }

  /* ---- contenu statique (textes éditables) ---- */
  function renderReward(){
    rewardSetText(secretEls.envelopeTo, 'Pour ' + REWARD_TO);
    rewardSetText(secretEls.letterGreeting, REWARD_GREETING);
    rewardSetText(secretEls.letterSign, REWARD_SIGNATURE);
    rewardSetText(secretEls.outroTitle, REWARD_OUTRO_TITLE);
    rewardSetText(secretEls.outroText, REWARD_OUTRO_TEXT);
    buildPolaroids();
    updateRewardSteps();
  }

  /* (re)lance la récompense depuis le début : appelée quand le coffre s'ouvre */
  function startReward(){
    rewardLetterDone = saveGet('reward-letter-read') === '1';
    rewardMaxStage = rewardLetterDone ? 2 : 0;
    rewardFlipped = {};
    rewardTypingToken++;
    buildPolaroids();
    var env = secretEls.envelope;
    env.classList.remove('open', 'gone', 'is-hidden');
    secretEls.envelopeHint.classList.remove('is-hidden');
    secretEls.letterPaper.classList.remove('show');
    secretEls.letterBody.innerHTML = '';
    secretEls.letterSign.classList.remove('show');
    secretEls.letterNext.classList.remove('show', 'ready');
    rewardStage = 'letter';
    secretEls.rewardStages.forEach(function(el){ el.classList.toggle('active', el.getAttribute('data-stage') === 'letter'); });
    updateRewardSteps();
    if(rewardLetterDone){
      /* déjà lue une fois : on affiche directement la lettre complète, sans refaire l'enveloppe */
      env.classList.add('open', 'gone', 'is-hidden');
      secretEls.envelopeHint.classList.add('is-hidden');
      showRewardLetter();
    }
    startRewardDust();
    if(secretEls.rewardApp){ secretEls.rewardApp.focus({ preventScroll: true }); }
  }

  if(secretEls.envelope){ secretEls.envelope.addEventListener('click', openRewardEnvelope); }
  if(secretEls.letterPaper){
    /* un clic sur la lettre pendant qu'elle s'écrit = tout afficher d'un coup */
    secretEls.letterPaper.addEventListener('click', function(){ if(!rewardLetterDone && secretEls.letterPaper.classList.contains('show')){ fillRewardLetter(); } });
  }
  if(secretEls.letterNext){ secretEls.letterNext.addEventListener('click', function(){ goRewardStage('gallery'); }); }
  if(secretEls.galleryNext){ secretEls.galleryNext.addEventListener('click', function(){ unlockRewardStage(2); goRewardStage('outro'); }); }
  if(secretEls.outroLetter){ secretEls.outroLetter.addEventListener('click', function(){ goRewardStage('letter'); }); }
  if(secretEls.outroGallery){ secretEls.outroGallery.addEventListener('click', function(){ goRewardStage('gallery'); }); }
  secretEls.rewardSteps.forEach(function(btn){
    btn.addEventListener('click', function(){ goRewardStage(btn.getAttribute('data-stage')); });
  });
  if(secretEls.rewardApp){
    secretEls.rewardApp.addEventListener('keydown', function(e){
      if(e.target && e.target.tagName === 'INPUT') return;
      var idx = REWARD_STAGES.indexOf(rewardStage);
      if(e.key === 'ArrowRight' && idx < rewardMaxStage){ goRewardStage(REWARD_STAGES[idx + 1]); }
      else if(e.key === 'ArrowLeft' && idx > 0){ goRewardStage(REWARD_STAGES[idx - 1]); }
    });
  }

  function initSecret(){
    renderDigicodeDots();
    buildVirtualKeyboard();
    renderPhrase();
    renderReward();
    renderDigicodeHint();
    /* reprise de la progression : on revient au niveau où elle s'était arrêtée */
    var savedLevel = saveGet('secret-level');
    if(savedLevel === '3'){
      (saveGet('secret-letters') || '').split('').forEach(function(l){
        if(/^[A-Z]$/.test(l) && guessedLetters.indexOf(l) === -1){
          guessedLetters.push(l);
          setKeyState(l, phraseLetters.indexOf(l) !== -1 ? 'correct' : 'incorrect');
        }
      });
      renderPhrase();
    }
    if(savedLevel === '2' || savedLevel === '3'){ showSecretLevel(savedLevel); }
    else if(savedLevel === 'final'){ secretResumeFinal = true; showSecretLevel('final'); }
    else { showSecretLevel(1); }
  }

  /* =========================================================
     DÉMARRAGE
     ========================================================= */
  renderCalendar();
  renderLetters();
  initSecret();
  route();
})();