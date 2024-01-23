import Utils from '../Utils.js' // time, div(), fixDec(), lower(), upper()
import Res from './Resources.js'
import * as Skill from './Skills.js'

class Char {
  
	constructor(name, sp, fp, ap, atr) { // atr = [base, atual, pico]
		this.name = name
		this.skills = {
      add(name, level = 0) {
        name = Utils.upper(name)
        let temp = new Skill[name](level)
        this[temp.key] = temp
        this[temp.key].parent = this
      }, // adiciona skill
      
      add_Generic(generic, name, level = 0) {
        name = Utils.upper(name)
        let temp = new Skill[name](level, generic)
        this[temp.key] = temp
        this[temp.key].parent = this
        let temp2 = new Skill[name](level)
        
        if(!this[temp.key].parent[temp2.key].child) {
          this[temp.key].parent[temp2.key].child = []
        } // If child = false converte em objeto
        this[temp.key].parent[temp2.key].child.push(this[temp.key].key) // Adiciona skill genérica como child da skill mestra
      }, // adiciona skill genérica
      list(){
        Utils.div()
        console.log(`|| ${this.parent.name}'s Skill List ||\n`)
        let skip = 4
        Object.entries(this).forEach((i) => { 
          skip ? skip-- : 
            console.log(`${this[i[0]].name} ${this[i[0]].level}`)
        })
      }
    }
		this.skills.parent = this

		// attributes
    let tempAtr = {
      names: [
        ['agil','Agilidade'],
        ['con','Constituição'],
        ['des','Destreza'],
        ['for','Força'],
        ['adap','Adaptabilidade'],
        ['int','Intelecto'],
        ['vont','Vontade'],
        ['sent','Sentidos'],
        ['alma','Alma'],
        ['sor','Sorte']
      ]  
    }
    this.atr = []

    // Atributos Primários
    Object.entries(tempAtr.names).forEach((i) => {
      this.atr[i[1][0]] = {
        name: tempAtr.names[i[0]][1],
        key: tempAtr.names[i[0]][0],
        base: atr[i[0]][0],
        atual: atr[i[0]][1],
        pico: atr[i[0]][2],
        treino: {
          ultimo: 0,
          buff: 1,
          debuff: [
            0, // debuff (base)
            Number(Utils.fixDec(Math.random()*0.20+0.05)), // recovery (-)
            Number(Utils.fixDec(Math.random()*0.10+0.05))  // tiredness (+)
          ],
          debuff_eff: [
            1, // debuff effectiviness (base)
            Number(Utils.fixDec(Math.random()*0.20+0.10)) // decrease rhythm (-)
          ],
          stiffness: [
            0, // stiffness (base)
            Number(Utils.fixDec(Math.random()*0.132+0.066)), // stiffness minus (-)
            Number(Utils.fixDec(Math.random()*0.066+0.033)) // stiffness plus (+)
          ],
          rec_eff : 1,
          atrophy_rate: Number(Utils.fixDec(Math.random()*0.4+0.8)),
          acent: [
            1, // positiva
            1 // negativa
          ]
        },
        update(rotina, tempo) {
          const debug = false
          const bioBase = this.base/4
          let temp = 0
          let state = ''

          for (var i = 0; i < tempo; i++) {

            Utils.time.dias++
            
            let per = 0 // porcentagem que será alterada do atributo

            if(rotina <= this.atual && this.treino.debuff[0]) state = 'rest'
              else if(rotina*this.treino.buff < this.atual) state = 'atrophy'
                else if(rotina > this.atual) state = 'work'
                  else state = 'none'

            const stiff_plus = (1000*this.treino.stiffness[0] + this.treino.stiffness[2]*1000)/1000
            const stiff_minus = (1000*this.treino.stiffness[0] - this.treino.stiffness[1]*1000)/1000
          
            if(state == 'work') {
              this.treino.debuff_eff[0] < 2 ?
                this.treino.debuff_eff[0] += (1000*0.03 * ((1000*(rotina-this.atual)/3** (1+this.treino.stiffness[0]))))/1000/1000
                : this.treino.debuff_eff[0] = 2
            } 
            else if(state == 'none' || state == 'atrophy') 
              stiff_plus > 1 ? this.treino.stiffness[0] = 1 : this.treino.stiffness[0] = stiff_plus

            if(debug) console.log(`debuff_eff[0]: ${this.treino.debuff_eff[0]}`)
            
            if(state == 'rest') {
              const rec_pred = this.treino.debuff[1] <= this.treino.debuff[0] ? this.treino.debuff[1] : this.treino.debuff[0] // recovery prediction
              
              if (this.treino.debuff[0] >= 0.25) this.treino.rec_eff - 0.1 < 0 ? this.treino.rec_eff = 0 : this.treino.rec_eff -= 0.1
                else if (this.treino.rec_eff < 1) this.treino.rec_eff + 0.1 < 1 ? this.treino.rec_eff = 1 : this.treino.rec_eff += 0.1

              this.treino.debuff[0] > this.treino.debuff[2]*2 ? per = this.treino.ultimo/(1-this.treino.debuff[0]-rec_pred)*this.treino.rec_eff 
                : per = this.treino.ultimo*(1-this.treino.debuff[0]*1.5)*this.treino.rec_eff // monta a diferença entre treino 1-1 e 1-2 para os demais e quanto se ganha em descanso

              if(this.treino.debuff[0] == this.treino.debuff[2]) per = this.treino.ultimo*0.85 // monta a diferença entre treino 1-1 para os demais
              
              this.treino.stiffness[0] + this.treino.stiffness[2]/2 > 1 ? this.treino.stiffness[0] = 1 : this.treino.stiffness[0] += this.treino.stiffness[2]/2
              if(debug) console.log('rest')
            } // afeta cap e velocidade de alteração
            else {
              let a = [0, this.atual]
              state == 'atrophy' ? a[0] = rotina*this.treino.buff/this.treino.atrophy_rate : a[0] = rotina/2*this.treino.buff+bioBase*2 // afeta cap e velocidade de alteração
              a[1] < a[0] ? per = (a[0]-a[1])*0.5/7 : per = (1000*a[0] - a[1]*1000)*1.45/7 /1000 // afeta velocidade de alteração
            }

            if(state != 'rest') per *= 1 - this.treino.debuff[0] * this.treino.debuff_eff[0]
            if(debug) console.log(`debuff: ${this.treino.debuff[0]}`)
            
            if(debug) console.log(`stiffness[0]: ${this.treino.stiffness[0]}`)
            if(state == 'work') per *= 1 - this.treino.stiffness[0] * this.treino.debuff_eff[0]
            
            if(per > 0 && this.atual < this.pico) per *= 1+(this.pico - this.atual)*0.1
           // per > 0 ? per *= this.treino.acent[0] : per *= this.treino.acent[1] // aplica acentuação
             if(debug) console.log(`per: ${per}%`)
            this.atual += this.base*(per/100)
             if(debug) console.log(`this.atual: ${this.atual}`)
            
            // START: Post-Workout
            if(state == 'atrophy' && this.atual < this.pico && per < 0) this.pico += this.base*(per/100)*(this.base-this.atual)/3.5
            if(this.atual > this.pico) this.pico = this.atual
            if(state == 'work') stiff_minus < 0 ? this.treino.stiffness[0] = 0 : this.treino.stiffness[0] = stiff_minus // Stiffness removed with workout

            // START: debuff management
            let debuff = ((1000*this.treino.debuff[0] + this.treino.debuff[2]*1000)/1000) 
            if(debug) console.log(`debuff_calc: ${debuff}`)
            if(state == 'work' && this.treino.debuff[0] < 0.5)  {
              if(debuff < 0.5) this.treino.debuff[0] = debuff
                else this.treino.debuff[0] = 0.5
            }

            if(state == 'rest') {
              if(this.treino.debuff[0] > this.treino.debuff[1]) this.treino.debuff[0] = (1000*this.treino.debuff[0] - this.treino.debuff[1]*1000)/1000
                else this.treino.debuff[0] = 0

              const debuff_eff_calc = (1000*this.treino.debuff_eff[0] - this.treino.debuff_eff[1]*1000)/1000
              
              if(debuff_eff_calc > 1) this.treino.debuff_eff[0] = debuff_eff_calc
                else this.treino.debuff_eff[0] = 1 
            }
            
            // END: debuff management
            
            if(state == 'work') this.treino.ultimo = per
            temp += per
            if(debug) Utils.div()
          }
            
          //console.log(`${Utils.time.dias} Dias\nGanho de atributo total: ${temp}%`)
          return temp
        }
      }

      let x = ''
      if (i[0] <= 3) {x = 'fisico'} else
        if (i[0] <= 6) {x = 'mental'} else
          if (i[0] <= 7) {x = 'sentidos'} else
            if (i[0] <= 8) {x = 'almatico'} else {x = 'outros'}
      
      this.atr[i[1][0]].categoria = ['primario', x]
    })

		// resources
		this.sp = new Res('Estâmina', sp)
		this.sp.parent = this

		this.fp = new Res('Fortitude', fp)
		this.fp.parent = this

		this.ap = new Res('Arcano', ap)
		this.ap.parent = this
	}
}

export {Char as default}