import Utils from "./Modules/Utils.js"; // time, div(), fixDec(), lower(), upper()
import Char from "./Modules/Character/Char.js";

const shiro = new Char("Shiro", 100, 66, 75, [
  // [base, atual, pico]
  [12, 12, 12], // Agilidade
  [12, 12, 12], // Constituição
  [12, 12, 12], // Destreza
  [12, 12, 12], // Força
  [12, 12, 12], // Adaptabilidade
  [12, 12, 12], // Intelecto
  [12, 12, 12], // Vontade
  [12, 12, 12], // Sentidos
  [12, 12, 12], // Alma
  [12, 12, 12], // Sorte
]);

/*
shiro.skills.add('Lâmina', 3)
shiro.skills.add('Espada', 4)
shiro.skills.add_Generic('Broadsword', 'Espada', 6)
shiro.skills.add_Generic('Florete', 'Espada', 3)
shiro.skills.add('Precisão_Alavanca', 2)
shiro.skills.add('Precisão_Corte', 3)
shiro.skills.add('Precisão_Bisel', 5)
shiro.skills.add('Precisão_Corte_Ponta', 3)
shiro.skills.add_Generic('Broadsword', 'Precisão_Bisel', 6)
shiro.skills.add_Generic('Florete', 'Precisão_Bisel', 1)
shiro.skills.add_Generic('Broadsword', 'Precisão_Corte_Ponta', 0)
shiro.skills.add_Generic('Florete', 'Precisão_Corte_Ponta', 3)

shiro.skills.list()
*/

let puyu = 0

const reset_atr = (randomize = false) => {
  if(randomize) {
    shiro.atr.for.treino.debuff[1] = Number(Utils.fixDec(Math.random()*0.20+0.05))
    shiro.atr.for.treino.debuff[2] = Number(Utils.fixDec(Math.random()*0.05+0.05))
    shiro.atr.for.treino.debuff_eff[1] = Number(Utils.fixDec(Math.random()*0.20+0.10))
    shiro.atr.for.treino.stiffness[1] = Number(Utils.fixDec(Math.random()*0.132+0.066))
    shiro.atr.for.treino.stiffness[2] = Number(Utils.fixDec(Math.random()*0.066+0.033))
    shiro.atr.for.treino.atrophy_rate = Number(Utils.fixDec(Math.random()*0.4+0.8))
  }
  
  shiro.atr.for.treino.ultimo = 0
  shiro.atr.for.treino.debuff[0] = 0
  shiro.atr.for.treino.debuff_eff[0] = 1
  shiro.atr.for.treino.stiffness[0] = 0
  shiro.atr.for.pico = shiro.atr.for.base
  shiro.atr.for.atual = shiro.atr.for.base
}

const emulate_train = (rest, train, days, log = true) => {
  if(log) Utils.div()
  if(log) console.log(`Rest: ${rest}\nTrain: ${train}`)
  if(log) Utils.div()

  reset_atr()
  
  days = Math.round((days-train)/(rest+train))
  puyu = 0
  
  puyu += shiro.atr.for.update(shiro.atr.for.atual + 4.5, train)
  for (let i = 0; i < days; i++) {
    puyu += shiro.atr.for.update(12, rest)
    puyu += shiro.atr.for.update(shiro.atr.for.atual + 4.5, train)
  }
  //console.log(`${Utils.time.dias} Dias\n${shiro.atr.for.atual}`)
  if(log) console.log(`Ganho de atributo total: ${puyu}%`)
  Utils.time.dias = 0
}

shiro.atr.for.treino.buff = 1

// START: storage creation
let storage = new Array(6) // creates lines
for(let i = 0; i < 6; i++) {
  storage[i] = new Array(6)
} // creates columns
for(let x = 0; x < 6; x++) {
  for(let y = 0; y < 6; y++) {
    storage[x][y] = [99999, -99999, 0]
  }
} // creates branching and assigns values
// END: storage creation

const target = 7

for (let i = 0; i < 1000000; i++) {
  reset_atr(true)
  // Utils.div()
  
  /*
  shiro.atr.for.treino.debuff[1] = 0.05/2+0.25
  shiro.atr.for.treino.debuff[2] = 0.05/2+0.10
  shiro.atr.for.treino.debuff_eff[1] = 0.30/2+0.10
  shiro.atr.for.treino.stiffness[1] = 0.198/2+0.066
  shiro.atr.for.treino.stiffness[2] = 0.099/2+0.033
  shiro.atr.for.treino.atrophy_rate = 0.4/2+0.8 */
  /*console.log(`debuff recovery: ${shiro.atr.for.treino.debuff[1] * 100}%`)
  console.log(`debuff generation: ${shiro.atr.for.treino.debuff[2] * 100}%`)
  console.log(`debuff_eff recovery: ${shiro.atr.for.treino.debuff_eff[1]}`)
  console.log(`stiffness decrease: ${shiro.atr.for.treino.stiffness[1] * 100}%`)
  console.log(`stiffness increase: ${shiro.atr.for.treino.stiffness[2] * 100}%`)
  console.log(`atrophy rate: x${shiro.atr.for.treino.atrophy_rate}`)

  for (let z = 1; z <= 5; z++) { //train days
    Utils.div()
    for (let i = 1; i <= 3; i++) { //rest days
      emulate_train(i, z, 91, true)
    }
  } */

  
  //emulate_train(1, 0, 7, true)


  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
      if(x+y+2 == target) {
        emulate_train(x+1, y+1, 91, false)
        if(puyu < storage[x][y][0]) storage[x][y][0] = puyu 
          else if (puyu > storage[x][y][1]) storage[x][y][1] = puyu 
        storage[x][y][2] == 0 ? storage[x][y][2] = puyu : storage[x][y][2] = (storage[x][y][2]+puyu)/2
      }
    }
  } 
}


for(let x = 0; x < 6; x++) {
  for(let y = 0; y < 6; y++) {
    if(x+y+2 == target){
      Utils.div()
      console.log(`Rest: ${x+1}\nTrain: ${y+1}`)
      console.log(`Topo: ${storage[x][y][1]}\nMédia: ${storage[x][y][2]}\nFundo: ${storage[x][y][0]}`)
    }
  }
} 


Utils.div()
