const papers = [
  {
    id: "attention",
    title: "Attention Is All You Need",
    year: "2017",
    authors: "Vaswani et al.",
    url: "https://arxiv.org/abs/1706.03762",
    place: "The little library",
    x: 22,
    y: 40,
    w: 15,
    h: 26,
    clue: "A very small library. A very large attention span.",
    note: "You found a book that pays attention to all the other books.",
    summary:
      "The paper that introduced the Transformer: a sequence-modeling architecture built around attention, without recurrent or convolutional layers. A foundational idea behind modern language models.",
  },
  {
    id: "fewshot",
    title: "Language Models are Few-Shot Learners",
    year: "2020",
    authors: "Brown et al.",
    url: "https://arxiv.org/abs/2005.14165",
    place: "The compute greenhouse",
    x: 73,
    y: 37,
    w: 14,
    h: 25,
    clue: "Something is scaling in the greenhouse. It might be the electricity bill.",
    note: "The plants asked for sunlight. Someone ordered more GPUs.",
    summary:
      "The GPT-3 paper explored how scaling language models could enable new tasks through examples in the prompt, without updating the model’s weights for each task.",
  },
  {
    id: "feedback",
    title:
      "Training language models to follow instructions with human feedback",
    year: "2022",
    authors: "Ouyang et al.",
    url: "https://arxiv.org/abs/2203.02155",
    place: "The reflection pond",
    x: 70.4,
    y: 61.5,
    w: 7,
    h: 10,
    clue: "The pond has some feedback. Try listening to the duck.",
    note: "One quack for helpful. Two quacks for please bring bread.",
    summary:
      "An investigation of instruction-following through supervised fine-tuning and reinforcement learning from human feedback. Human preferences help shape which responses the model learns to produce.",
  },
  {
    id: "dpo",
    title: "Direct Preference Optimization",
    year: "2023",
    authors: "Rafailov et al.",
    url: "https://arxiv.org/abs/2305.18290",
    place: "The suspicious haystack",
    x: 43,
    y: 44,
    w: 10,
    h: 17,
    clue: "Somewhere in the hay, there is a more direct approach.",
    note: "A needle in a haystack. The needle preferred being found.",
    summary:
      "Your Language Model is Secretly a Reward Model. This paper develops a way to learn from preference data with a direct classification objective, simplifying the usual reward-model-and-RL pipeline.",
  },
  {
    id: "constitution",
    title: "Constitutional AI: Harmlessness from AI Feedback",
    year: "2022",
    authors: "Bai et al.",
    url: "https://arxiv.org/abs/2212.08073",
    place: "The abandoned field book",
    x: 49,
    y: 59,
    w: 5,
    h: 9,
    clue: "Someone left the garden rules open beside the path.",
    note: "Rule one: be kind. Rule two: do not optimize away the picnic.",
    summary:
      "A method for training assistants using a set of written principles, model self-critique, and AI feedback. It explores reducing dependence on human labels for identifying harmful outputs.",
  },
  {
    id: "maml",
    title: "Model-Agnostic Meta-Learning",
    year: "2017",
    authors: "Finn, Abbeel & Levine",
    url: "https://arxiv.org/abs/1703.03400",
    place: "The very slow race",
    x: 39,
    y: 74,
    w: 10,
    h: 10,
    clue: "The racers are learning how to learn. This may take a minute.",
    note: "The snail learned to learn faster. It is still a snail.",
    summary:
      "For Fast Adaptation of Deep Networks. MAML trains model parameters so a small number of gradient updates can adapt them to a new task. A classic approach to learning how to learn.",
  },
  {
    id: "scaling",
    title: "Scaling Laws for Neural Language Models",
    year: "2020",
    authors: "Kaplan et al.",
    url: "https://arxiv.org/abs/2001.08361",
    place: "The observatory",
    clue: "There might be something written in the stars.",
    note: "The universe is large. The training budget is, regrettably, finite.",
    summary:
      "An empirical study of how language-model loss changes with model size, dataset size, and training compute. The authors find power-law relationships across a wide range of scales.",
  },
];
const $ = (s) => document.querySelector(s);
let found = new Set();
try {
  const saved = JSON.parse(localStorage.getItem("almost-papers") || "[]");
  if (Array.isArray(saved))
    found = new Set(saved.filter((id) => papers.some((p) => p.id === id)));
} catch {}
const dialog = $("#dialog");
let toastTimer;
let hintIndex = 0;
let lastFocus;
function open(content) {
  dialog.classList.remove("telescope-view");
  lastFocus = document.activeElement;
  $("#dialog-content").innerHTML = content;
  if (!dialog.open) dialog.showModal();
  $("#close").focus();
}
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 4800);
}
function update() {
  $("#count").textContent = `${found.size} / ${papers.length}`;
}
function discover(p) {
  const isNew = !found.has(p.id);
  found.add(p.id);
  try {
    localStorage.setItem("almost-papers", JSON.stringify([...found]));
  } catch {}
  update();
  open(
    `<div class="eyebrow">${isNew ? "A SMALL DISCOVERY" : "FROM YOUR FIELD NOTES"} · ${p.year}</div><h2 id="dialog-title">${p.title}</h2><div class="paper-meta">${p.authors} / ${p.year}</div><p>${p.summary}</p><p class="discovery">${p.note}</p><a class="paper-link" href="${p.url}" target="_blank" rel="noopener noreferrer">Read the original paper ↗</a><p style="font-size:11px">${found.size === papers.length ? "All seven found. A remarkably productive day of wandering." : `${found.size} of ${papers.length} papers tucked into your field notes.`}</p>`,
  );
}
// Every hiding place has its own physical interaction. Coordinates use SVG units.
const moved = new Set();
const timers = new Set();
const later = (fn, ms) => {
  const timer = setTimeout(() => {
    timers.delete(timer);
    fn();
  }, ms);
  timers.add(timer);
};
const places = {
  attention: {
    x: 220,
    y: 255,
    w: 24,
    h: 32,
    bx: 228,
    by: 286,
    label: "Pull the terracotta book from the library shelf",
  },
  fewshot: {
    x: 897,
    y: 226,
    w: 43,
    h: 57,
    bx: 893,
    by: 252,
    label: "Pull the greenhouse plant upward",
  },
  feedback: {
    x: 845,
    y: 385,
    w: 44,
    h: 36,
    bx: 845,
    by: 390,
    label: "Visit the duck",
  },
  dpo: {
    x: 513,
    y: 278,
    w: 102,
    h: 83,
    bx: 513,
    by: 291,
    label: "Move the haystack sideways",
  },
  constitution: {
    x: 587,
    y: 371,
    w: 36,
    h: 27,
    bx: 587,
    by: 370,
    label: "Turn the field book’s page",
  },
  maml: {
    x: 468,
    y: 466,
    w: 52,
    h: 33,
    bx: 469,
    by: 466,
    label: "Give the snail a little encouragement",
  },
  scaling: {
    x: 687,
    y: 242,
    w: 70,
    h: 68,
    label: "Look through the telescope",
  },
};
const colors = [
  "#a6634a",
  "#697f75",
  "#9b844e",
  "#557d8c",
  "#9b725f",
  "#788653",
];
let duckClicks = 0,
  hayX = 0,
  plantY = 0;
function position(el, x, y) {
  el.style.left = `${(x - 100) / 10}%`;
  el.style.top = `${(y - 110) / 4.6}%`;
}
function remember(p) {
  found.add(p.id);
  try {
    localStorage.setItem("almost-papers", JSON.stringify([...found]));
  } catch {}
  update();
}
function reveal(p, { keepTarget = false } = {}) {
  if (moved.has(p.id)) return;
  moved.add(p.id);
  if (p.id === "dpo") scatter(513, 296, "straw", 12);
  remember(p);
  const target = $(`[data-paper="${p.id}"]`);
  if (!keepTarget) {
    target.classList.add("revealed");
    target.tabIndex = -1;
  }
  const book = $(`[data-book="${p.id}"]`);
  if (book) {
    book.classList.add("visible");
    book.tabIndex = 0;
  }
  // Keep the discovery quiet visually; announce it to assistive technology.
  $("#discovery-announcement").textContent =
    `Found ${p.title}. Its book is ready to read. ${found.size} of ${papers.length} discoveries.`;
}
function scatter(x, y, kind, count = 8) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < count; i++) {
    const bit = document.createElement("i");
    bit.className = `particle ${kind}`;
    position(bit, x, y);
    bit.style.setProperty(
      "--dx",
      `${(Math.random() - 0.5) * (kind === "straw" ? 90 : 45)}px`,
    );
    bit.style.setProperty(
      "--dy",
      `${kind === "soil" ? 25 + Math.random() * 28 : -10 - Math.random() * 28}px`,
    );
    bit.style.setProperty("--turn", `${(Math.random() - 0.5) * 180}deg`);
    bit.style.animationDelay = `${i * 18}ms`;
    $("#effects").append(bit);
    later(() => bit.remove(), 1300);
  }
}
function ripple(x, y) {
  const ring = document.createElement("i");
  ring.className = "water-ring";
  position(ring, x, y);
  $("#effects").append(ring);
  later(() => ring.remove(), 1100);
}
function animateDuck() {
  duckClicks++;
  ripple(places.feedback.x, places.feedback.y);
  scatter(places.feedback.x, places.feedback.y, "splash", 6);
  const duck = $("#cover-feedback");
  duck.classList.remove("panicking");
  void duck.getBoundingClientRect();
  duck.classList.add("panicking");
  const [x, y] = [
    [35, -17],
    [-35, 15],
    [68, -23],
  ][Math.min(duckClicks - 1, 2)];
  duck.style.translate = `${x}px ${y}px`;
  position(
    $('[data-paper="feedback"]'),
    places.feedback.x + x,
    places.feedback.y + y,
  );
  later(() => duck.classList.remove("panicking"), 700);
  if (duckClicks === 3)
    later(() => reveal(papers.find((p) => p.id === "feedback")), 450);
}
function pullPlant() {
  if (moved.has("fewshot")) return;
  $("#greenhouse-plant").classList.remove("dragging");
  $("#greenhouse-plant").classList.add("uprooted");
  $("#greenhouse-plant").style.translate = "8px -63px";
  scatter(893, 251, "soil", 9);
  later(() => reveal(papers.find((p) => p.id === "fewshot")), 250);
}
function activate(p) {
  if (p.id === "scaling") {
    openTelescope(p);
    return;
  }
  if (moved.has(p.id)) return;
  switch (p.id) {
    case "attention":
      $("#library-spine").classList.remove("wobble");
      $("#library-spine").classList.add("pulled");
      later(() => reveal(p), 240);
      break;
    case "fewshot":
      pullPlant();
      break;
    case "feedback":
      animateDuck();
      break;
    case "constitution":
      $("#cover-constitution").style.translate = "-33px -12px";
      reveal(p);
      break;
    case "maml":
      $("#cover-maml").style.translate = "85px 0px";
      reveal(p);
      break;
    case "dpo": // A keyboard alternative to the physical sideways drag.
      hayX = 92;
      $("#cover-dpo").style.translate = `${hayX}px 0px`;
      position($('[data-paper="dpo"]'), places.dpo.x + hayX, places.dpo.y);
      reveal(p, { keepTarget: true });
      break;
  }
}
const announcement = document.createElement("div");
announcement.id = "discovery-announcement";
announcement.className = "sr-only";
announcement.setAttribute("role", "status");
document.body.append(announcement);
papers.forEach((p, i) => {
  const spot = places[p.id];
  if (p.id !== "scaling") {
    const book = document.createElement("a");
    book.className = `hidden-book book-${p.id}`;
    book.dataset.book = p.id;
    book.href = p.url;
    book.target = "_blank";
    book.rel = "noopener noreferrer";
    book.tabIndex = -1;
    book.setAttribute("aria-label", `Read ${p.title} (opens in a new tab)`);
    position(book, spot.bx, spot.by);
    book.style.setProperty("--book-color", colors[i]);
    book.innerHTML =
      '<span class="book-cover" aria-hidden="true">' +
      ["a", "✳", "≈", "↗", "§", "∞"][i] +
      "</span>";
    $("#books").append(book);
  }
  const button = document.createElement("button");
  button.className = `hotspot interaction-${p.id}`;
  button.dataset.paper = p.id;
  button.setAttribute("aria-label", spot.label);
  position(button, spot.x, spot.y);
  button.style.width = `${spot.w / 10}%`;
  button.style.height = `${spot.h / 4.6}%`;
  $("#hotspots").append(button);
  if (p.id === "attention") {
    for (const event of ["pointerenter", "focus"])
      button.addEventListener(event, () =>
        $("#library-spine").classList.add("wobble"),
      );
    for (const event of ["pointerleave", "blur"])
      button.addEventListener(event, () =>
        $("#library-spine").classList.remove("wobble"),
      );
  }
  if (p.id === "dpo" || p.id === "fewshot") {
    let start = null,
      dragged = false;
    const art = p.id === "dpo" ? $("#cover-dpo") : $("#greenhouse-plant");
    button.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY, original: hayX };
      dragged = false;
      button.setPointerCapture(e.pointerId);
      art.classList.add("dragging");
    });
    button.addEventListener("pointermove", (e) => {
      if (!start) return;
      const scale = 1000 / $("#scene").getBoundingClientRect().width;
      const dx = (e.clientX - start.x) * scale,
        dy = (e.clientY - start.y) * scale;
      if (Math.hypot(dx, dy) > 3) dragged = true;
      if (p.id === "dpo") {
        hayX = Math.max(-130, Math.min(130, start.original + dx));
        art.style.translate = `${hayX}px 0px`;
        position(button, spot.x + hayX, spot.y);
      } else {
        plantY = Math.max(-80, Math.min(0, dy));
        art.style.translate = `0px ${plantY}px`;
        art.classList.toggle("uprooted", plantY < -15);
      }
    });
    const finish = () => {
      if (!start) return;
      start = null;
      art.classList.remove("dragging");
      if (p.id === "dpo") {
        if (Math.abs(hayX) >= 72) reveal(p, { keepTarget: true });
        else {
          hayX = moved.has("dpo") ? 92 : 0;
          art.style.translate = `${hayX}px 0px`;
          position(button, spot.x + hayX, spot.y);
        }
      } else if (plantY <= -27) pullPlant();
      else {
        plantY = 0;
        art.style.translate = "0px 0px";
        art.classList.remove("uprooted");
      }
    };
    button.addEventListener("pointerup", finish);
    button.addEventListener("pointercancel", () => {
      start = null;
      art.classList.remove("dragging");
      if (p.id === "dpo") {
        hayX = moved.has("dpo") ? 92 : 0;
        art.style.translate = `${hayX}px 0px`;
        position(button, spot.x + hayX, spot.y);
      } else {
        plantY = 0;
        art.style.translate = "0px 0px";
        art.classList.remove("uprooted");
      }
    });
    button.addEventListener("click", (e) => {
      if (dragged) {
        dragged = false;
        return;
      }
      if (p.id === "fewshot" || e.detail === 0) activate(p);
    });
    if (p.id === "dpo")
      button.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          hayX = e.key === "ArrowLeft" ? -92 : 92;
          art.style.translate = `${hayX}px 0px`;
          position(button, spot.x + hayX, spot.y);
          reveal(p, { keepTarget: true });
        }
      });
  } else button.addEventListener("click", () => activate(p));
});
function openTelescope(p) {
  let stars = "";
  let value = 81;
  const rand = () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
  for (let i = 0; i < 190; i++) {
    const x = rand() * 700,
      y = rand() * 700;
    stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.45 + rand() * 1.1).toFixed(1)}" fill="#e3e8d7" opacity="${(0.2 + rand() * 0.6).toFixed(2)}"/>`;
  }
  const points = [
    [249, 294],
    [294, 289],
    [351, 315],
    [407, 288],
    [452, 294],
    [445, 403],
    [396, 400],
    [351, 427],
    [299, 401],
    [255, 403],
    [351, 370],
  ];
  const bookStars = points
    .map(
      ([x, y], i) =>
        `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 3 : 2}" fill="#f4dfac"/><circle cx="${x}" cy="${y}" r="8" fill="#f4dfac" opacity=".055"/>`,
    )
    .join("");
  open(
    `<div class="sky-header"><span>ALMOST OBSERVATORY / FIELD 07</span><h2 id="dialog-title">Elsewhere, for a moment.</h2></div><div class="telescope-lens"><svg viewBox="0 0 700 700" aria-label="A night sky with a book-shaped constellation"><defs><radialGradient id="night"><stop stop-color="#203b48"/><stop offset=".6" stop-color="#142a36"/><stop offset="1" stop-color="#0a151e"/></radialGradient></defs><circle cx="350" cy="350" r="349" fill="url(#night)"/>${stars}<g class="shooting-star"><path d="M110 140L160 170" stroke="#e7e5c4" stroke-width="1" opacity=".7"/><circle cx="160" cy="170" r="1.6" fill="#f5edc5"/></g><g fill="none" stroke="#b4c5c7" stroke-width=".8" opacity=".3"><path d="M113 190L157 143 209 176 183 220 113 190 94 249M492 172L541 212 585 201 610 268M147 454L173 501 233 532M444 522L490 484 539 509 572 467"/></g><g fill="#d9e5e2">${[
      [113, 190],
      [157, 143],
      [209, 176],
      [183, 220],
      [94, 249],
      [492, 172],
      [541, 212],
      [585, 201],
      [610, 268],
      [147, 454],
      [173, 501],
      [233, 532],
      [444, 522],
      [490, 484],
      [539, 509],
      [572, 467],
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`)
      .join(
        "",
      )}</g><a id="constellation-book" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Read Scaling Laws for Neural Language Models (opens in a new tab)"><path class="star-hit" d="M234 274H468V448H234Z" fill="transparent"/><g class="book-constellation"><path d="M249 294L294 289 351 315 407 288 452 294 445 403 396 400 351 427 299 401 255 403 249 294M351 315V427M269 318L295 316 329 332M268 343L295 341 329 357M374 333L407 316 431 318M374 358L406 342 431 343" fill="none" stroke="#d7c490" stroke-width="1.3"/>${bookStars}</g></a><g stroke="#668087" stroke-width="1" opacity=".5"><path d="M350 12V29M350 671V688M12 350H29M671 350H688"/></g></svg></div><p class="sky-caption">Some ideas are bigger than the garden.</p>`,
  );
  dialog.classList.add("telescope-view");
  $("#constellation-book").addEventListener("click", () => {
    moved.add(p.id);
    remember(p);
    $("#discovery-announcement").textContent = `Found ${p.title}.`;
  });
}
const reset = document.createElement("button");
reset.className = "reset-garden";
reset.textContent = "Hide the books again ↻";
reset.onclick = () => {
  timers.forEach(clearTimeout);
  timers.clear();
  $("#effects").replaceChildren();
  moved.clear();
  duckClicks = 0;
  hayX = 0;
  plantY = 0;
  document.querySelectorAll(".movable,#greenhouse-plant").forEach((el) => {
    el.style.translate = "0px 0px";
    el.classList.remove("dragging", "panicking", "uprooted");
  });
  $("#library-spine").classList.remove("pulled", "wobble");
  papers.forEach((p) => {
    const button = $(`[data-paper="${p.id}"]`);
    position(button, places[p.id].x, places[p.id].y);
    button.classList.remove("revealed", "hinted");
    button.tabIndex = 0;
    const book = $(`[data-book="${p.id}"]`);
    if (book) {
      book.classList.remove("visible");
      book.tabIndex = -1;
    }
  });
  toast("Everything is back in its unlikely place. Your field notes are safe.");
};
$(".garden-tools").append(reset);
update();

$("#close").onclick = () => dialog.close();
dialog.addEventListener("close", () => lastFocus?.focus());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
$("#notebook").onclick = () => {
  open(
    `<div class="eyebrow">COLLECTED WHILE WANDERING · ${found.size} / ${papers.length}</div><h2 id="dialog-title">Your field notes.</h2><p>${found.size ? "A few ideas worth taking home." : "An empty notebook is a lovely place to start. Look closely at the garden to uncover your first book."}</p><ul class="entries">${papers.map((p) => (found.has(p.id) ? `<li><small>${p.year} · ${p.place}</small><button data-entry="${p.id}">${p.title} ↗</button></li>` : `<li class="locked">Undiscovered / ${p.place}</li>`)).join("")}</ul><p style="font-size:11px">Saved in this browser, when local storage is available. No account, no tracking.</p>`,
  );
  document
    .querySelectorAll("[data-entry]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          discover(papers.find((p) => p.id === b.dataset.entry))),
    );
};
$("#about").onclick = () =>
  open(
    `<div class="eyebrow">WELCOME TO ALMOST</div><h2 id="dialog-title">Big questions.<br>Small ambitions.</h2><p>Everyone is racing toward superintelligence. We thought there should be somewhere to sit down along the way.</p><p>This is the Institute of Almost Superintelligence: an imaginary research garden, populated by very real papers and slightly underqualified snails.</p><p>A book on a shelf, roots in a pot, a rather nervous duck. Every hiding place has its own small secret. Seven research papers are scattered through the garden and sky. Click an uncovered book to open its original paper in a new tab. Each discovery also gets a page in your field notes. There is no time limit. There is, in fact, very little urgency.</p><p class="discovery">An independent art project. Not affiliated with Sam Altman, OpenAI, or any AI laboratory. The snails speak for themselves.</p>`,
  );
$("#colophon").onclick = () =>
  open(
    `<div class="eyebrow">A NOTE FROM THE GARDENER</div><h2 id="dialog-title">A softer corner<br>of the internet.</h2><p>Original illustrations, a few quiet interactions, and a fondness for big ideas in small places.</p><p>Inspired by the gentle, playful worlds of <a href="https://www.baothiento.com/" target="_blank" rel="noopener noreferrer">Bao To</a>. Built as an independent internet daydream at altman.si.</p><p>Paper titles and links lead to the authors’ original work. This garden is a tiny curated reading trail, not a ranking of progress toward superintelligence.</p><p><a href="https://github.com/boovines/altman-si" target="_blank" rel="noopener noreferrer">Visit the source code ↗</a></p>`,
  );
$("#hint").onclick = () => {
  const remaining = papers.filter((p) => !moved.has(p.id));
  if (!remaining.length) {
    toast("You found them all. The garden is still yours to enjoy.");
    return;
  }
  const p = remaining[hintIndex++ % remaining.length];
  document
    .querySelectorAll(".hinted")
    .forEach((b) => b.classList.remove("hinted"));
  $(`[data-paper="${p.id}"]`).classList.add("hinted");
  toast(p.clue);
};
let paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
function motion() {
  document.body.classList.toggle("paused", paused);
  $("#motion").setAttribute("aria-pressed", String(paused));
  $("#motion").innerHTML = paused
    ? "Let the breeze in <span>▷</span>"
    : "Pause the breeze <span>Ⅱ</span>";
}
motion();
$("#motion").onclick = () => {
  paused = !paused;
  motion();
};
const bulletins = [
  "The snails have requested more compute.",
  "The library is open. The future is not peer-reviewed.",
  "A breakthrough is expected shortly. Please have some tea.",
  "The duck has declined to comment on scaling laws.",
  "The finish line has been moved. Again.",
  "The greenhouse is experiencing emergent tomatoes.",
];
let bulletin = 0;
$("#next-status").onclick = () =>
  ($("#status").textContent = bulletins[++bulletin % bulletins.length]);
// Deterministic planting: the same small garden on every visit.
let seed = 42;
const random = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
let planting = "";
for (let i = 0; i < 100; i++) {
  let x = 130 + random() * 920,
    y = 210 + random() * 300;
  if (((x - 600) / 500) ** 2 + ((y - 345) / 220) ** 2 > 1) continue;
  planting += `<path d="M${x} ${y}l-2-6m2 6l4-8" stroke="#8f9f72" opacity=".45" stroke-width="1"/>`;
  if (i % 4 === 0)
    planting += `<use href="#flower" transform="translate(${x} ${y}) scale(${0.6 + random() * 0.5})"/>`;
}
[
  [172, 304, 0.85],
  [370, 236, 0.65],
  [962, 311, 0.8],
  [780, 226, 0.48],
  [997, 399, 0.57],
  [199, 431, 0.45],
].forEach(
  ([x, y, s]) =>
    (planting += `<use href="#tree" transform="translate(${x} ${y}) scale(${s})"/>`),
);
$("#vegetation").innerHTML = planting;
