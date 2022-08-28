const ORE_DATA = {};
const LENS_TYPE = {
  WHITE: 0,
  ORANGE: 1,
  MAGENTA: 2,
  LIGHT_BLUE: 3,
  YELLOW: 4,
  LIME: 5,
  PINK: 6,
  GRAY: 7,
  LIGHT_GRAY: 8,
  CYAN: 9,
  PURPLE: 10,
  BLUE: 11,
  BROWN: 12,
  GREEN: 13,
  RED: 14,
  BLACK: 15
};
let DEPTH = 64;
let BIOME = "";
let LENS_WEIGHT = 5;
let LENS = [-1, -1, -1, -1, -1, -1];

function dataRefiner(J) {
  for (var O in J) {
    for (var R in J[O].rarity) {
      J[O].rarity[R].whitelist = J[O].rarity[R].whitelist.split(/[, ]+/);
      J[O].rarity[R].blacklist = J[O].rarity[R].blacklist.split(/[, ]+/);
    }
  }
  return J;
}