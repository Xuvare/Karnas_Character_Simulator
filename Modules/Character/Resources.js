import Utils from '../Utils.js' // time, div(), fixDec()

class Resource {
  constructor(name, trueMax) {
    this.name = name
    this.trueMax = trueMax
    this._desgaste = {
      Gasto: 0,
      Cansaço: 0,
      Fatiga: 0,
      Exaustão: 0
    }

    this.FD = 6 // fator de desgaste
    this.atual = this.trueMax
    this.max = this.trueMax
 }

  // Processamento de desgaste
  get desgaste() {return this._desgaste}
  set desgaste(val) {  
    this.desgaste.Gasto = val
    this.atual -= val

    Utils.div()
    console.log(`${this.parent.name} consumiu ${Utils.fixDec(val)} ${this.name}\n`)
    console.log(`+${Utils.fixDec(val)} Gasto (${Utils.fixDec((val/this.trueMax*100))}%)`)

    let skip = true
    let counter = 1

    Object.entries(this.desgaste).forEach((e) => {
      if (skip) {
        skip = false
      }
      else {
        const num = val / this.FD ** counter
        this.desgaste[e[0]] += num
        this.atual -= num
        this.max -= num
        counter++

        console.log(`+${Utils.fixDec(num)} ${e[0]} (${Utils.fixDec((num/this.trueMax*100))}%)`)
      }
    });
  }  

  check(rest = 0) {

    Utils.div()
    let t_rest = rest
    Object.entries(this.desgaste).forEach((e) => {
      if (t_rest){
        this.atual += e[1]
        if (e[0] != 'Gasto')
        {
          this.max += e[1]
        }
        t_rest--
      }
    })
    console.log('Checagem de Recurso\n')
    console.log(`${this.name}: ${Utils.fixDec(this.atual)}/${Utils.fixDec(this.max)}`)
    console.log(`${this.name} relação total: ${Utils.fixDec((this.atual/this.trueMax*100))}%/${Utils.fixDec((this.max/this.trueMax*100))}%`)
    console.log(`${this.name} relação atual: ${Utils.fixDec((this.atual/this.max*100))}%/100%`)

    Object.entries(this.desgaste).forEach((e) => {
      if (rest) {   
        rest--
      } else {
        console.log(`${e[0]}: ${Utils.fixDec(e[1])} (${Utils.fixDec((e[1]/this.trueMax*100))}%)`)
      }
    })
  }

  recover(val, nivel = 1) {
    Utils.div()

    console.log(`${name} completou um repouso nivel ${nivel} de ${val} pontos.\n`)

    Object.entries(this.desgaste).forEach((e) => {
      if (nivel) {
        const num = val*nivel
        this.desgaste[e[0]] -= num
        
        if (this.desgaste[e[0]] < 0) {this.desgaste[e[0]] = 0}

        if (e[0] == 'Gasto' && this.desgaste[e[0]] < this.max) {
          this.atual += num
          if (this.atual > this.max) this.atual = this.max
        }
        
        nivel--

        console.log(`-${num} ${e[0]} (${(this.desgaste[e[0]]/this.trueMax*100)*-1}%)`)
      }
    })
  }
}

export {Resource as default}