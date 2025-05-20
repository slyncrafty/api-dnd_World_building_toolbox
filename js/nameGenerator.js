/* ========== Simple game name generator ========== */
export function generateGameName(race = 'default') {
  const nameSets = {
    dragonborn: {
        first: ['Arj', 'Bal', 'Dral', 'Kael', 'Rhogar'],
        middle: ['ax', 'un', 'orth', 'mir', 'dak'],
        end: ['an', 'eth', 'or', 'ash', 'ar', 'on'],
      },
    elf: {
        first: ['Ael', 'Lia', 'Faer', 'Syl', 'Thia'],
        middle: ['ra', 'wen', 'mir', 'li', 'thel'],
        end: ['iel', 'a', 'ion', 'is', 'el'],
    },
    dwarf: {
        first: ['Thra', 'Brun', 'Gim', 'Dur', 'Bald'],
        middle: ['or', 'an', 'ruk', 'grim'],
        end: ['in', 'ar', 'ur', 'ek'],
    },
    gnome: {
        first: ['Bin', 'Fizz', 'Nim', 'Wizzle', 'Tib'],
        middle: ['bo', 'wick', 'pop', 'ter'],
        end: ['in', 'o', 'le', 'it'],
    },
    halfling: {
        first: ['Milo', 'Tilly', 'Rosie', 'Finn', 'Sam'],
        middle: ['bo', 'le', 'ra', 'do'],
        end: ['y', 'ie', 'o', 'a'],
    },
    tiefling: {
        first: ['Zar', 'Nyx', 'Aby', 'Lil', 'Kali'],
        middle: ['ia', 'yx', 'ris', 'ra'],
        end: ['eth', 'or', 'is', 'on'],
    },
    orc: {
        first: ['Gor', 'Ug', 'Krug', 'Thok', 'Rug'],
        middle: ['nak', 'mok', 'dar'],
        end: ['g', '', 'th'],
    },
    human: {
        first: ['Jon', 'Anna', 'Luca', 'Marcus', 'Elena'],
        middle: ['bel', 'dan', 'ther', 'win'],
        end: ['a', 'us', 'an', 'o'],
    },

    default: {
        first: ['Aer', 'Bal', 'Kael', 'Mor', 'Zan'],
        middle: ['dor', 'mir', 'reth', 'val'],
        end: ['in', 'an', 'iel', 'us'],
    }
  };

  const set = nameSets[race.toLowerCase()] || nameSets.default;

  if (typeof set === 'function') {
    set = set(); 
  }
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return rand(set.first) + rand(set.middle) + rand(set.end);
}