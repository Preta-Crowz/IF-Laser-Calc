let curr = "DEFAULT";

function createBiomeList() {
  var B = [];
  for (var O of ORE_DATA[curr]) {
    for (var R of O.rarity) {
      B = [...B, ...R.whitelist, ...R.blacklist];
    }
  }
  return new Set(B);
}

function getTargets() {
  var D = [];
  for (var O of ORE_DATA[curr]) {
    var weight = 0;
    for (var R of O.rarity) {
      if (R.depth_min > DEPTH || DEPTH > R.depth_max) continue;
      if (R.whitelist.length && R.whitelist.indexOf(BIOME) == -1) continue;
      if (R.blacklist.length && R.blacklist.indexOf(BIOME) != -1) continue;
      weight += R.weight;
    }
    if (weight > 0) {
      D.push({
        item: O.item,
        color: O.color,
        weight: weight
      });
    }
  }
  return D;
}

function calcLensBonus(D, color, isInvert) {
  var add = (isInvert ? -1 : 1) * LENS_WEIGHT;
  for (var O in D) {
    if (D[O].color == color) D[O].weight += add;
  }
  return D;
}