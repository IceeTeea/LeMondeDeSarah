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
    { id: 'sept', label: 'Septembre · octobre', heading: 'Septembre · octobre', start: new Date(2026, 8, 10), texts: SEPT_TEXTS, prefix: 'jour-',  hash: 'calendar-sept',     storeKey: 'sarah-cal-opened' },
    { id: 'nov',  label: 'Novembre',            heading: 'Novembre',            start: new Date(2026, 10, 1), texts: NOV_TEXTS,  prefix: 'nov-',   hash: 'calendar', storeKey: 'sarah-cal-opened-nov' }
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
    updateNavCurrent(name);
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
    /* « Calendrier » ouvre directement novembre ; l'ancien mois reste dispo via l'onglet (#calendar-sept) */
    if(hash === 'calendar' || hash === 'calendar-nov' || hash === 'calendar-sept'){ setCalendar(hash === 'calendar-sept' ? 0 : 1); renderCalendar(); showScreen('calendar'); return; }
    if(hash === 'letters'){ renderLetters(); showScreen('letters'); return; }
    if(hash === 'window'){ showScreen('window'); return; }
    if(hash === 'sky'){ closeConstellation(); showScreen('sky'); return; }
    if(hash === 'secret'){ showScreen('secret'); return; }
        showScreen('home');   /* arrivée directe sur la page de Sarah */
  }

  navLinks.forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = btn.getAttribute('data-nav');
      var nh = target === 'home' ? '' : target;
      if(window.location.hash.replace('#','') === nh){ route(); }   /* déjà sur ce hash : on réaffiche */
      else { window.location.hash = nh; }
      closeNav();
    });
  });

  window.addEventListener('hashchange', route);

  /* =========================================================
     NAVIGATION « DOCK CÉLESTE »
     - pastille flottante : se masque en descendant, revient en remontant
     - « Explorer » ouvre le sommaire plein écran (focus géré, Échap ferme)
     - la section en cours s'affiche dans la pastille
     ========================================================= */
  var dockEl = document.getElementById('dock');
  var dockMenu = document.getElementById('dock-menu');
  var dockHere = document.getElementById('dock-here');
  var sommaire = document.getElementById('sommaire');
  var NAV_LABELS = { map:'La carte', home:'Accueil', calendar:'Calendrier', day:'Calendrier', letters:'Lettres', letter:'Lettres', window:'La chambre', sky:'Le ciel', secret:'Le Coffre' };
  var navCloseTimer = null;

  function navIsOpen(){ return !!sommaire && sommaire.classList.contains('is-open'); }
  function openNav(){
    if(!sommaire) return;
    window.clearTimeout(navCloseTimer);
    sommaire.hidden = false;
    void sommaire.offsetWidth;                       /* relance la transition */
    sommaire.classList.add('is-open');
    document.body.classList.add('nav-open');
    dockMenu.setAttribute('aria-expanded','true');
    var first = sommaire.querySelector('.som-link'); if(first){ window.setTimeout(function(){ first.focus({preventScroll:true}); }, 60); }
  }
  function closeNav(){
    if(!sommaire || !navIsOpen()) return;
    sommaire.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    dockMenu.setAttribute('aria-expanded','false');
    navCloseTimer = window.setTimeout(function(){ sommaire.hidden = true; }, reduceMotion ? 0 : 450);
  }
  function updateNavCurrent(name){
    if(dockHere){ dockHere.textContent = NAV_LABELS[name] || 'Accueil'; }
    var parent = name === 'day' ? 'calendar' : name === 'letter' ? 'letters' : name === 'sky' ? 'window' : name;
    document.querySelectorAll('.som-link[data-nav]').forEach(function(el){
      el.setAttribute('aria-current', el.getAttribute('data-nav') === parent ? 'true' : 'false');
    });
  }
  if(dockMenu){
    dockMenu.addEventListener('click', function(){ if(navIsOpen()){ closeNav(); } else { openNav(); } });
    sommaire.addEventListener('click', function(e){ if(e.target.closest('[data-nav-close]') || e.target.closest('a.som-link')){ closeNav(); } });
    /* piège à focus simple dans le sommaire */
    sommaire.addEventListener('keydown', function(e){
      if(e.key !== 'Tab') return;
      var f = [].slice.call(sommaire.querySelectorAll('.som-link')).concat([dockMenu]);
      var i = f.indexOf(document.activeElement);
      if(e.shiftKey && (i <= 0)){ e.preventDefault(); f[f.length - 1].focus(); }
      else if(!e.shiftKey && i === f.length - 1){ e.preventDefault(); f[0].focus(); }
    });
    /* projecteur doux qui suit la souris sur le sommaire */
    sommaire.addEventListener('pointermove', function(e){ sommaire.style.setProperty('--mx', e.clientX + 'px'); sommaire.style.setProperty('--my', e.clientY + 'px'); });
    /* pastille : masquée en descendant, visible en remontant */
    var lastY = window.scrollY;
    window.addEventListener('scroll', function(){
      var y = window.scrollY, away = y > lastY && y > 120 && !navIsOpen();
      dockEl.classList.toggle('is-away', away); dockEl.classList.toggle('is-solid', y > 24);
      lastY = y;
    }, { passive:true });
  }

  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape') return;
    if(navIsOpen()){ closeNav(); dockMenu.focus(); return; }
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
    /* ---- nouveau visuel : un vrai calendrier (semaine du lundi au dimanche) ----
       Chaque jour est une petite carte : à ouvrir, aujourd'hui, déjà ouvert ou pas encore.
       Les textes et la logique de déverrouillage (dateForDay / isUnlocked) sont inchangés. */
    var offset = (dateForDay(1).getDay() + 6) % 7;
    var WK = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
    calGrid.innerHTML = '';
    calGrid.style.height = '';
    calGrid.className = 'cal-board';
    var wk = document.createElement('div'); wk.className = 'cal-wk'; wk.setAttribute('aria-hidden', 'true');
    WK.forEach(function(w){ var sp = document.createElement('span'); sp.textContent = w; wk.appendChild(sp); });
    calGrid.appendChild(wk);
    var board = document.createElement('div'); board.className = 'cal-days'; calGrid.appendChild(board);
    for(var e = 0; e < offset; e++){ var gap = document.createElement('span'); gap.className = 'cal-gap'; gap.setAttribute('aria-hidden', 'true'); board.appendChild(gap); }
    var openedCount = 0;
    for(var n = 0; n < DAYS_IN_CAL; n++){
      (function(d){
        var unlocked = isUnlocked(d);
        var wasOpened = opened.indexOf(d) !== -1 && unlocked;
        if(wasOpened){ openedCount++; }
        var dt = dateForDay(d);
        var box = document.createElement('button');
        box.type = 'button';
        box.className = 'cal-day' + (unlocked ? '' : ' is-locked') + (isToday(d) ? ' is-today' : '') + (wasOpened ? ' is-opened' : '') + (unlocked && !wasOpened ? ' is-new' : '');
        box.style.setProperty('--i', n);
        var cap = dt.toLocaleDateString('fr-FR', { day:'numeric', month:'short' });
        box.innerHTML = '<span class="cd-num">' + d + '</span>' +
          '<span class="cd-cap">' + cap + '</span>' +
          '<span class="cd-state" aria-hidden="true">' +
            (!unlocked ? '<svg viewBox="0 0 24 24"><use href="#icon-lock"/></svg>' : wasOpened ? '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '<svg viewBox="0 0 24 24"><use href="#icon-spark"/></svg>') +
          '</span>' + (isToday(d) ? '<span class="cd-today">aujourd\'hui</span>' : '');
        box.setAttribute('aria-label', unlocked
          ? 'Jour ' + d + (wasOpened ? ' — déjà ouvert' : ' — à ouvrir')
          : 'Jour ' + d + ' — verrouillé jusqu\'au ' + frDate(d));
        box.addEventListener('click', function(){
          if(!unlocked){
            if(!reduceMotion){ box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake'); }
            return;
          }
          if(reduceMotion){ window.location.hash = activeCal.prefix + d; return; }
          box.classList.add('popping');
          window.setTimeout(function(){ window.location.hash = activeCal.prefix + d; }, 320);
        });
        board.appendChild(box);
      })(n + 1);
    }
    /* progression : cases déjà ouvertes sur celles disponibles */
    var prog = document.getElementById('cal-prog');
    if(prog){
      var avail = 0; for(var q = 1; q <= DAYS_IN_CAL; q++){ if(isUnlocked(q)){ avail++; } }
      prog.querySelector('i').style.width = (DAYS_IN_CAL ? openedCount / DAYS_IN_CAL * 100 : 0) + '%';
      prog.querySelector('span').textContent = openedCount + ' / ' + DAYS_IN_CAL + ' jours ouverts';
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

  /* ---- BUREAU D'ÉCRIVAIN : chaque lettre est une enveloppe posée sur le bureau ----
     Les textes (LETTERS) et la sauvegarde (sarah-letters-opened-v2, par mot-clé) sont inchangés. */
  var lettersFilter = 'all';
  var lettersCount = document.getElementById('letters-count');
  function applyLettersFilter(){
    var cards = lettersGrid.querySelectorAll('.env');
    cards.forEach(function(c){
      var read = c.classList.contains('is-opened');
      c.hidden = (lettersFilter === 'new' && read) || (lettersFilter === 'read' && !read);
    });
    document.querySelectorAll('.desk-chip').forEach(function(b){
      var on = b.getAttribute('data-filter') === lettersFilter;
      b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var empty = lettersGrid.querySelector('.desk-empty');
    var visible = lettersGrid.querySelectorAll('.env:not([hidden])').length;
    if(!visible && !empty){
      empty = document.createElement('p'); empty.className = 'desk-empty';
      empty.textContent = lettersFilter === 'new' ? 'Tu as tout ouvert, bravo.' : 'Aucune lettre ouverte pour l\'instant.';
      lettersGrid.appendChild(empty);
    } else if(visible && empty){ empty.remove(); }
  }
  function renderLetters(){
    var openedLetters = getOpenedLetters();
    lettersGrid.innerHTML = '';
    var readCount = 0;
    LETTERS.forEach(function(item, i){
      var card = document.createElement('button');
      card.type = 'button';
      var wasRead = openedLetters.indexOf(item.word) !== -1;
      if(wasRead){ readCount++; }
      card.className = 'env' + (wasRead ? ' is-opened' : '');
      card.style.setProperty('--i', i);
      card.style.setProperty('--tilt', (((i * 37) % 7) - 3) * 0.55 + 'deg');
      card.setAttribute('aria-label', item.trigger + (wasRead ? ' — déjà ouverte' : ''));
      /* « À ouvrir quand... ils te manquent » -> petit début + suite en grand */
      var parts = item.trigger.split(/\.\.\.|…/);
      var lead = parts.length > 1 ? parts[0].trim() + '…' : '';
      var rest = parts.length > 1 ? parts.slice(1).join(' ').trim() : item.trigger;
      card.innerHTML =
        '<span class="env-back" aria-hidden="true"></span>' +
        '<span class="env-sheet" aria-hidden="true"></span>' +
        '<span class="env-front" aria-hidden="true"></span>' +
        '<span class="env-flap" aria-hidden="true"></span>' +
        '<span class="env-seal" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#icon-spark"/></svg></span>' +
        '<span class="env-label"><small></small><b></b></span>' +
        '<span class="env-read" aria-hidden="true">lue</span>';
      card.querySelector('small').textContent = lead;
      card.querySelector('b').textContent = rest;
      card.addEventListener('click', function(){
        if(reduceMotion){ window.location.hash = 'lettre-' + (i + 1); return; }
        card.classList.add('popping');
        window.setTimeout(function(){ window.location.hash = 'lettre-' + (i + 1); }, 420);
      });
      lettersGrid.appendChild(card);
    });
    if(lettersCount){ lettersCount.textContent = readCount + ' / ' + LETTERS.length + ' lettres ouvertes'; }
    applyLettersFilter();
  }
  document.querySelectorAll('.desk-chip').forEach(function(b){
    b.addEventListener('click', function(){ lettersFilter = b.getAttribute('data-filter'); applyLettersFilter(); });
  });
  var lettersRandom = document.getElementById('letters-random');
  if(lettersRandom){
    lettersRandom.addEventListener('click', function(){
      var op = getOpenedLetters(), pool = [];
      LETTERS.forEach(function(it, i){ if(op.indexOf(it.word) === -1){ pool.push(i); } });
      if(!pool.length){ LETTERS.forEach(function(it, i){ pool.push(i); }); }
      window.location.hash = 'lettre-' + (pool[Math.floor(Math.random() * pool.length)] + 1);
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
  var NIGHT_SCREENS = { calendar:1, day:1, window:1, sky:1, secret:1 };
  var themeToggle = document.getElementById('theme-toggle');
  var currentScreenName = 'home';
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
    if(!mapStage || !mapLines || true) return;
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
  var PATCH_VERSION = '2026-11-15-b';
  var patchEl = document.getElementById('news');
  var patchOpenBtn = document.getElementById('patch-open');
  var nwSlides = patchEl ? [].slice.call(patchEl.querySelectorAll('.nw-slide')) : [];
  var nwIdx = 0, nwMax = 0, nwTimer = null, nwForced = false, nwPrevFocus = null, nwSeen = [];
  var NW_READ_MS = 3500;   /* temps minimum par page à la première lecture */
  var nwNext = document.getElementById('nw-next'), nwPrev = document.getElementById('nw-prev');
  var nwX = document.getElementById('nw-x'), nwHint = document.getElementById('nw-hint');
  var nwDots = document.getElementById('nw-dots'), nwCount = document.getElementById('nw-count');
  var nwLabel = document.getElementById('nw-next-label');
  function nwShow(i){
    nwIdx = i; nwMax = Math.max(nwMax, i);
    nwSlides.forEach(function(sl, k){ sl.classList.toggle('is-on', k === i); sl.hidden = k !== i; });
    nwCount.textContent = (i + 1) + ' / ' + nwSlides.length;
    nwDots.innerHTML = '';
    nwSlides.forEach(function(_, k){ var d = document.createElement('i'); d.className = k === i ? 'on' : (k < nwMax ? 'done' : ''); nwDots.appendChild(d); });
    nwPrev.hidden = i === 0;
    var last = i === nwSlides.length - 1;
    nwLabel.textContent = last ? "J'ai tout lu" : 'Suivant';
    var sc = patchEl.querySelector('.nw-slides'); if(sc) sc.scrollTop = 0;
    window.clearTimeout(nwTimer);
    nwNext.classList.remove('is-wait'); nwNext.style.removeProperty('--nw-ms');
    if(nwForced && !nwSeen[i]){
      var ms = reduceMotion ? 1500 : NW_READ_MS;
      nwNext.disabled = true; nwNext.classList.add('is-wait');
      void nwNext.offsetWidth;
      nwNext.style.setProperty('--nw-ms', ms + 'ms');
      nwHint.textContent = 'Lis la page : le bouton se débloque dans quelques secondes.';
      nwTimer = window.setTimeout(function(){
        nwSeen[i] = true; nwNext.disabled = false; nwNext.classList.remove('is-wait');
        nwHint.textContent = last ? 'Tu peux entrer.' : 'Tu peux passer à la suite.';
        try{ nwNext.focus({ preventScroll: true }); }catch(e){}
      }, ms);
    } else {
      nwSeen[i] = true; nwNext.disabled = false;
      nwHint.textContent = '';
    }
  }
  function openPatch(forced){
    if(!patchEl) return;
    nwForced = forced === true;
    nwSeen = []; nwMax = 0;
    nwPrevFocus = document.activeElement;
    patchEl.hidden = false;
    void patchEl.offsetWidth;
    patchEl.classList.add('is-open');
    document.body.classList.add('patch-lock');
    nwX.hidden = nwForced;     /* pas de croix à la première lecture : il faut lire jusqu'au bout */
    nwShow(0);
    if(!nwForced){ try{ nwNext.focus({ preventScroll: true }); }catch(e){} }
  }
  function closePatch(){
    if(!patchEl || patchEl.hidden) return;
    lsSet('patch', PATCH_VERSION);
    patchEl.classList.remove('is-open');
    document.body.classList.remove('patch-lock');
    window.clearTimeout(nwTimer);
    window.setTimeout(function(){ patchEl.hidden = true; }, reduceMotion ? 10 : 320);
    if(nwPrevFocus && nwPrevFocus.focus){ try{ nwPrevFocus.focus(); }catch(e){} }
  }
  function nwAdvance(){
    if(nwNext.disabled) return;
    if(nwIdx < nwSlides.length - 1){ nwShow(nwIdx + 1); } else { closePatch(); }
  }
  function showPatchIfNew(){
    var hsh = window.location.hash.replace('#', '');
    if(lsGet('patch') === PATCH_VERSION && !/[?&]reset\b/.test(window.location.search)) return;
    if(hsh !== '' && hsh !== 'home') return;
    openPatch(true);
  }
  if(patchEl){
    nwNext.addEventListener('click', nwAdvance);
    nwPrev.addEventListener('click', function(){ if(nwIdx > 0) nwShow(nwIdx - 1); });
    nwX.addEventListener('click', closePatch);
    patchEl.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ e.stopPropagation(); if(!nwForced) closePatch(); return; }
      if(e.key === 'ArrowRight'){ nwAdvance(); }
      if(e.key === 'ArrowLeft' && nwIdx > 0){ nwShow(nwIdx - 1); }
      if(e.key !== 'Tab') return;
      var f = [].slice.call(patchEl.querySelectorAll('button')).filter(function(b){ return !b.hidden && !b.disabled; });
      if(!f.length){ e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    });
  }
  if(patchOpenBtn){ patchOpenBtn.addEventListener('click', function(){ openPatch(false); }); }

  /* =========================================================
     Plus d'écran d'intro : arrivée directe sur la page de Sarah.
     Le patch note ne s'ouvre qu'une fois par version.
     ========================================================= */
  window.setTimeout(showPatchIfNew, 700);

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
  var colors = ['#C98E8B','#C98B63','#8C5E3F','#AEB78F','#E8CFA4'];

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
     DÉMARRAGE
     ========================================================= */
  renderCalendar();
  renderLetters();
  route();
})();