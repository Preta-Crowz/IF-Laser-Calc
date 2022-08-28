function initLens() {
  var L = $("select.lens");
  for (var S of L) {
    $(S).append(`<option value='-1' selected></option>`);
    for (var C of Object.keys(LENS_TYPE)) {
      $(S).append(`<option value='${LENS_TYPE[C]}'>${C}</option>`);
    }
  }
}

function updateBiomeSelector() {
  BIOME = $("#biome").val();
  var B = createBiomeList();
  for (var s of $("#biome option")) s.remove();
  $("#biome").append(`<option value='' selected></option>`);
  for (var b of B) $("#biome").append(`<option value='${b}'>${b}</option>`);
  calculate();
}

function calculate() {
  var T = getTargets();
  var L = $("select.lens")
  var I = $("input.lens")
  for (var i = 0;i < 6;i++) {
    T = calcLensBonus(T, parseInt(L[i].value), I[i].checked)
  }
  var sum = 0;
  for (var R of T) {
    if (R.weight > 0) sum += R.weight;
  }
  for (var row of $("#result tbody tr")) row.remove();
  var res = $("#result tbody");
  for (var R of T) {
    if (R.weight <= 0) continue;
    res.append(`<tr><td>${R.item}</td><td>${R.weight}</td><td>${R.weight / sum * 100}%</td></tr>`)
  }
  console.log("Calculated!");
}

$(document).ready(() => {
  initLens();

  $("#dataset").change(() => {
    curr = $("#dataset").val();
    updateBiomeSelector();
  });
  updateBiomeSelector();

  $("#biome").change(() => {
    BIOME = $("#biome").val();
    calculate();
  });

  $("#depth").change(() => {
    DEPTH = parseInt($("#depth").val());
    calculate();
  });

  for (var L of $(".lens")) $(L).change(calculate);

  curr = $("#dataset").val();
  BIOME = $("#biome").val();
  DEPTH = parseInt($("#depth").val());
});