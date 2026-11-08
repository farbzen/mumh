const STORAGE_KEY = "mumh";
const HUNTER_SLOTS = 4;
const SETTLE_MS = 800;

const DEFAULT_LANGUAGE = "en";
const DEFAULT_HUNTERNAME = "New Hunter";
const DEFAULT_WEAPONNAME = "sword_and_shield";
const DEFAULT_MONSTER = { name: "chatacabra", temper: "0", capture: false };

// Imprint mail kept out of plain text to deter scrapers
// (the postal address is an image: static/images/legal.webp).
const LEGAL_MAIL = "ZWQubmV6YnJhZkByZXRzYW1iZXc=";
const reveal = (encoded) => atob(encoded).split("").reverse().join("");

const randomInt = (max) => Math.floor(Math.random() * max);
const pick = (list) => list[randomInt(list.length)];
// Object.hasOwn needs Safari 15.4+, this works everywhere.
const hasOwn = (object, key) =>
  Object.prototype.hasOwnProperty.call(object, key);

// Highest temper level a monster can appear with.
const maxTemper = (monster) =>
  monster.arch_tempered ? 2 : monster.tempered ? 1 : 0;

function rollMonster(monsters) {
  const monster = pick(monsters);

  return {
    name: monster.name,
    temper: randomInt(maxTemper(monster) + 1).toString(),
    capture: monster.capturable && Math.random() < 0.5,
  };
}

// Fall back to the default if a stored monster no longer matches the data.
function restoreMonster(stored, monsters) {
  const monster = monsters.find((m) => m.name === stored?.name);
  if (!monster) return { ...DEFAULT_MONSTER };

  const temper = Number(stored.temper);

  return {
    name: monster.name,
    temper:
      Number.isInteger(temper) && temper >= 0 && temper <= maxTemper(monster)
        ? temper.toString()
        : "0",
    capture: monster.capturable && stored.capture === true,
  };
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private mode etc.): state lives for this visit only.
  }
}

document.addEventListener("alpine:init", () => {
  const data = JSON.parse(document.getElementById("mumh-data").textContent);
  const stored = loadState();

  Alpine.data("mumh", () => ({
    lang: hasOwn(data.languages, stored.lang) ? stored.lang : DEFAULT_LANGUAGE,
    hunterCount:
      Number.isInteger(stored.hunterCount) &&
      stored.hunterCount >= 1 &&
      stored.hunterCount <= HUNTER_SLOTS
        ? stored.hunterCount
        : HUNTER_SLOTS,
    hunters: Array.from({ length: HUNTER_SLOTS }, (_, i) => {
      const hunter = stored.hunters?.[i];
      return {
        name:
          typeof hunter?.name === "string" ? hunter.name : DEFAULT_HUNTERNAME,
        weapon: data.weapons.some((w) => w.name === hunter?.weapon)
          ? hunter.weapon
          : DEFAULT_WEAPONNAME,
      };
    }),
    monster: restoreMonster(stored.monster, data.monsters),
    legalOpen: false,
    phases: {},
    rolling: false,

    init() {
      Alpine.effect(() =>
        saveState({
          lang: this.lang,
          hunterCount: this.hunterCount,
          hunters: this.hunters,
          monster: this.monster,
        }),
      );
    },

    t(key) {
      return data.languages[this.lang][key] ?? key;
    },

    mail() {
      return reveal(LEGAL_MAIL);
    },

    setLang(lang) {
      if (hasOwn(data.languages, lang)) this.lang = lang;
    },

    phaseClass(key) {
      return { out: "card-out", in: "card-in" }[this.phases[key]] ?? "";
    },

    // Slide a card out, swap its content, slide it back in.
    // Resolves once the card has settled.
    animate(key, delaySeconds, swapSeconds, swap) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.phases[key] = "out";
          setTimeout(() => {
            swap();
            this.phases[key] = "in";
            setTimeout(() => {
              this.phases[key] = "";
              resolve();
            }, SETTLE_MS);
          }, swapSeconds * 1000);
        }, delaySeconds * 1000);
      });
    },

    // Locked until every running animation has settled.
    rollAll() {
      if (this.rolling) return;
      this.rolling = true;

      const animations = [
        this.animate("monster", 0, 0.6, () => {
          this.monster = rollMonster(data.monsters);
        }),
      ];

      this.hunters.forEach((hunter, index) => {
        const roll = () => (hunter.weapon = pick(data.weapons).name);

        // Hidden hunters get a fresh weapon without running an animation.
        if (index >= this.hunterCount) {
          roll();
          return;
        }

        const number = index + 1;
        animations.push(
          this.animate(index, 0.1 + number * 0.1, 0.6 + number * 0.6, roll),
        );
      });

      Promise.all(animations).then(() => (this.rolling = false));
    },
  }));
});
