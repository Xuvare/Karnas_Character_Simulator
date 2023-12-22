import Utils from './Modules/Utils.js' // time, div(), fixDec(), lower(), upper()
import Res from './Modules/Character/Resources.js'
import Char from './Modules/Character/Char.js'
import * as Skill from './Modules/Character/Skills.js'


const shiro = new Char('Shiro', 100, 66, 75, [
  12, // Agilidade
  12, // Constituição
  12, // Destreza
  12, // Força
  12, // Adaptabilidade
  12, // Intelecto
  12, // Vontade
  12, // Sentidos
  12, // Alma
  12  // Sorte
])

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

let last = 0

const decay = (base, atual, rotina, tempo, nutrição) => { // protótipo para decay de força
  const bioBase = base/4
  let temp = 0
  const mod = nutrição
  
  for (var i = 0; i < tempo; i++) {
    Utils.div()
    console.log(`Dia ${i+1}`)
    let a = [rotina/2*mod+bioBase*2, atual]
    let per = (a[0]-a[1])*2/7 // porcentagem que será alterada do atributo
    
  /*console.log(a[0], a[1])
    console.log(a[0]-a[1]) */
    if(per > 37/350) per = 37/350
    console.log(`${per}%`)
    atual += base*(per/100)
    console.log(atual)
    
    last = per
    temp += per
  }
  Utils.div()
  console.log(`Ganho de atributo total: ${temp}%`)
}

decay(18, 36, 39, 1, 1.4)

Utils.div()