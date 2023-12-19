import Utils from '../Utils.js' // time, div(), fixDec()
import Res from './Resources.js'

class Skill {
  constructor(name, level, master, child) {
    this.name = name
    this.level = level
    this.master = master
    this.child = child
  }

  get_Master(num) {
    return this.master ? this.parent[this.master[num]] != undefined ? this.parent[this.master[num]] : 
      console.log(` Index ${num} master data missing`) : console.log(' Skill does not have master')  
  }

  get_Child(num) {
    return this.child ? this.parent[this.child[num]] != undefined ? this.parent[this.child[num]] : 
      console.log(` Index ${num} child data missing`) : console.log(' Skill does not have children')
  }

  print_Masters() {
    Utils.div()
    
    if(this.master) {
      console.log(' Mestres:')
      Object.entries(this.master).forEach((i) => {
        console.log(i[1])
      })
    } else console.log(' Skill lacking master')
  }

  print_Children() {
    Utils.div()
    if(this.child) {
      console.log(' Children:')
      Object.entries(this.child).forEach((i) => {
        console.log(i[1])
      })
    } else console.log(' Skill lacking children')
  }

  master_Masters() {
    return 0
  }
}

class ActiveSkill extends Skill {
  constructor(name, level, resource, cost, duration , atr, master = false, child = false, ratio = [100] ){
    super(name, level, master, child)
    this.atr = atr
    this.ratio = ratio
    this.resource = resource
    this.cost = cost
    this.duration = duration
  }

  _eff_Atr() {
    let effAtr = 0
    Object.entries(this.atr).forEach((i) => {
      effAtr += this.parent.parent[i[1]] * this.ratio[i[0]]/100
    })
    return effAtr
  }

  roll(random = false) {
    Utils.div()
    console.log(`Rolagem de ${this.name}`)
    console.log(`Nível: ${this.level}\n`)
    this.atr[1] == undefined ? console.log(' Atributo:') : console.log(' Atributos:')

    Object.entries(this.atr).forEach((i) => {
      let atrName = 'teste'
      switch(i[1]){
        case 'agil': atrName = 'Agilidade'
          break;
        case 'con': atr_name = 'Constituição'
          break;
        case 'des': atr_name = 'Destreza'
          break;
        case 'for': atr_name = 'Força'
          break;
        case 'adap': atr_name = 'Adaptabilidade'
          break;
        case 'int': atr_name = 'Intelecto'
          break;
        case 'vont': atr_name = 'Vontade'
          break;
        case 'sent': atr_name = 'Sentidos'
          break;
        case 'alma': atr_name = 'Alma'
          break;
        case 'sor': atr_name = 'Sorte'
      }  
      console.log(`${atrName}: ${Utils.fixDec(this.parent.parent[i[1]] * this.ratio[i[0]]/100)} (${Utils.fixDec(this.parent.parent[i[1]])}) [${this.ratio[i[0]]}%]`)
    })

    const effAtr = this._Eff_Atr()
    console.log(`\n Atributo Efetivo: ${Utils.fixDec(effAtr)}`)

    if (random == false)
    {
      for (let i = 2; i <= 8; i++) {
        const teste = ((3*eff_atr/6+3)**(1+this.level/100*6))*(0.5+0.125*(i-1))
        console.log(`${i}: ${Utils.fixDec(teste)}`)
      }   
    } else {
      const roll = Math.floor(Math.random()*4)+1+Math.floor(Math.random()*4)+1
      console.log(`${roll}: ${Utils.fixDec(((3*eff_atr/6+3)**(1+this.level/100*6))*(0.5+0.125*(roll-1)))}`)
    }
  }

  use(tempo) {
    Utils.div()
    console.log(`${this.parent.parent.name} usou ${this.name}`)
    this.parent.parent[this.resource].desgaste = this.cost * tempo / this.duration
    this.Roll(true)
    Utils.time.segundos += tempo
  }
}

class PassiveSkill extends Skill {
  constructor(name, level, master = false, child = false){
    super(name, level, master, child)
  }
}

export {ActiveSkill, PassiveSkill}