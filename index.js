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
const atr = {
  last: 0,
  atual: 18,
  base: 18,
  mod: 1.45,
  debuff: 0,

  decay(rotina, tempo) { // protótipo para decay de força
    const bioBase = this.base/4
    let temp = 0
    let rest = false

    for (var i = 0; i < tempo; i++) {

      let per = 0 // porcentagem que será alterada do atributo
      rotina < this.atual && this.debuff ? rest = true : rest = false
      
      // se estava se exercitou e no dia anterior também, aumenta debuff
      if(rotina >= this.atual && this.last && this.debuff < 0.5)  {
        this.debuff += 0.05
        console.log('debuff up')
      } else {
        if(rotina < this.atual && this.debuff > 0.15) {
          this.debuff -= 0.1
          console.log('debuff down')
        } else if (rotina < this.atual) {
          this.debuff = 0
          console.log('debuff zero')
        }
      }

      let a = [rotina/2*(this.mod-this.debuff)+bioBase*2, this.atual] // afeta cap
      
      per = (a[0]-a[1])*0.5/7 // afeta velocidade de alteração
      
      if(rest) {
        this.last *= 0.9
        per = this.last*0.5/7
        console.log('rest')
      } // afeta cap

      console.log(`${per}%`)
      this.atual += this.base*(per/100)
      console.log(this.atual)

      this.last = per
      temp += per
    }
    /* Utils.div()
    console.log(`Ganho de atributo total: ${temp}%`) */
  },

  day_In_Day_Out(dias) {
    let par = false

    for (var i = 1; i <= dias; i++)
    {
      if(par){
        Utils.div()
        console.log(`Dia ${i}`)
        this.decay(18, 1)
        par = false
      } else {
        Utils.div()
        console.log(`Dia ${i}`)
        this.decay(this.atual+3 , 1)
        par = true
      }
    }
  }
}

atr.day_In_Day_Out(365*4)

Utils.div()