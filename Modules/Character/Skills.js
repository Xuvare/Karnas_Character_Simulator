import Utils from '../Utils.js' // time, div(), fixDec(), lower(), upper()
import Res from './Resources.js'

//Structure
class Skill {
  constructor(name, level, master, child) {
    this.name = name
    this.level = level
    this.master = master
    this.child = child
  }

  get_Master(num) {
    return this.master ? this.parent[this.master[num]] != undefined ? this.parent[this.master[num]] : 
      console.log(`|| Index ${num} master data missing ||`) : console.log('|| Skill does not have master ||')  
  }

  get_Child(num) {
    return this.child ? this.parent[this.child[num]] != undefined ? this.parent[this.child[num]] : 
      console.log(`|| Index ${num} child data missing ||`) : console.log('|| Skill does not have children ||')
  }

  print_Masters() {
    Utils.div()
    if(this.master) {
      console.log('|| Mestres ||\n')
      Object.entries(this.master).forEach((i) => {
        console.log(this.parent[i[1]].name)
      })
    } else console.log('|| Skill lacking master ||')
  }

  print_Children() {
    Utils.div()
    if(this.child) {
      console.log('|| Children ||\n')
      Object.entries(this.child).forEach((i) => {
        console.log(this.parent[i[1]].name)
      })
    } else console.log('|| Skill lacking children ||')
  }

  master_Masters() {
    return 0
  }
} // skill class, não confundir com objeto skills em character (character.skills.skill)

class Active extends Skill {
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
      effAtr += this.parent.parent.atr[i[1]].atual * this.ratio[i[0]]/100
    })
    return effAtr
  }

  _eff_Skill_Level() {
    
  }

  roll(random = false) {
    Utils.div()
    console.log(`Rolagem de ${this.name}`)
    console.log(`Nível: ${this.level}\n`)
    this.atr[1] == undefined ? console.log('|| Atributo ||') : console.log('|| Atributos ||')

    Object.entries(this.atr).forEach((i) => {
      const atrName = this.parent.parent.atr[i[1]].name
      const atrAtual = this.parent.parent.atr[i[1]].atual
      
      console.log(`${atrName}: ${Utils.fixDec(atrAtual * this.ratio[i[0]]/100)} (${Utils.fixDec(atrAtual)}) [${this.ratio[i[0]]}%]`)
    })

    const effAtr = this._eff_Atr()
    console.log(`\n|| Atributo Efetivo: ${Utils.fixDec(effAtr)} ||`)

    if (random == false) {
      for (let i = 2; i <= 8; i++) {
        const teste = ((3*effAtr/6+3)**(1+this.level/100*6))*(0.5+0.125*(i-1))
        console.log(`${i}: ${Utils.fixDec(teste)}`)
      }   
    } else {
      const x = Math.floor(Math.random()*4)+1
      const y = Math.floor(Math.random()*4)+1
      console.log(`${x+y}(${x}+${y}): ${Utils.fixDec(((3*effAtr/6+3)**(1+this.level/100*6))*(0.5+0.125*(x+y)))}`)
    }
  }

  use(tempo) {
    Utils.div()
    console.log(`${this.parent.parent.name} usou ${this.name}`)
    this.parent.parent[this.resource].desgaste = this.cost * tempo / this.duration
    this.roll(true)
    Utils.time.segundos += tempo
  }
}

class Passive extends Skill {
  constructor(name, level, master = false, child = false){
    super(name, level, master, child)
  }
}

// Database

// Mestre: Lâmina
export class Espada extends Passive { 
  constructor(level, generic = '') {
    let m = ['']
    if(generic == '') {
      m[0] = 'espada'
      m[1] = 'Espada'
      m[2] = 'lâmina'
      m[3] = false
    } else {
      m[0] = `${Utils.lower(generic)}`
      m[1] = `${Utils.upper(generic)}`
      m[2] = 'espada'
      m[3] = [`precisão_${Utils.lower(generic)}_bisel`, `precisão_${Utils.lower(generic)}_ponta`]
    }

    super(`${m[1]}`, level, m[2], m[3])
    this.key = `${m[0]}`
  }
} // Generic
export class Lâmina extends Passive {
  constructor(level) {
    super('Lâmina', level, false, ['espada'])
    this.key = 'lâmina'
  }
}

// Mestre: Precisão
export class Precisão_Alavanca extends Active { 
  constructor(level) {
    super('Precisão: Alavanca', level, 'sp', 0.5, 0.5, ['des'] , false, ['precisão_concussão'])
    this.key = 'precisão_alavanca'
  }
}
export class Precisão_Estocada extends Active { 
  constructor(level) {
    super('Precisão: Estocada', level, 'sp', 0.5, 0.5, ['des'] , false, ['precisão_perfuração'])
    this.key = 'precisão_estocada'
  }
}
export class Precisão_Concussão extends Passive { 
  constructor(level) {
    super('Precisão: Concussão', level , ['precisão_alavanca'], false)
    this.key = 'precisão_concussão'
  }
}
export class Precisão_Perfuração extends Passive { 
  constructor(level) {
    super('Precisão: Perfuração', level , ['precisão_estocada'], false)
    this.key = 'precisão_perfuração'
  }
}

// Skills Mistas
// tive que blasfemar os nomes pois ficavam ilegiveis caso não
export class Precisão_Corte extends Passive { 
  constructor(level) {
    super('Precisão: Corte', level , ['lâmina', 'precisão_alavanca'], ['precisão_ponta', 'precisão_bisel'])
    this.key = 'precisão_corte'
  }
}
export class Precisão_Bisel extends Active { 
  constructor(level, generic = '') {
    let m = ['']
    if(generic == '') {
      m[0] = ''
      m[1] = ''
      m[2] = 'precisão_corte'
    } else {
      m[0] = `_${Utils.lower(generic)}`
      m[1] = ` ${Utils.upper(generic)}`
      m[2] = [`precisão_bisel`, Utils.lower(generic)]
    }
    
    super(`Precisão${m[1]}: Bisel`, level, 'sp', 0.5, 0.5, ['des'] , m[2], false)
    this.key = `precisão${m[0]}_bisel`
  }
} // Generic
export class Precisão_Corte_Ponta extends Active { 
  constructor(level, generic = '') {
    let m = ['']
    if(generic == '') {
      m[0] = ''
      m[1] = ''
      m[2] = 'precisão_corte'
    } else {
      m[0] = `_${Utils.lower(generic)}`
      m[1] = ` ${Utils.upper(generic)}`
      m[2] = [`precisão_corte_ponta`, Utils.lower(generic)]
    }

    super(`Precisão Corte${m[1]}: Ponta`, level, 'sp', 0.5, 0.5, ['des'] , m[2], false)
    this.key = `precisão_corte${m[0]}_ponta`
  }
} // Generic

/* 
Lâmina 3
Espada 4, Precisão: Alavanca 2
Broadsword 6, Precisão Corte 3
Precisão: Bisel 5
Precisão Broadsword: Bisel 6

*/