import Utils from '../Utils.js' // time, div(), fixDec(), lower(), upper()
import Res from './Resources.js'
import * as Skill from './Skills.js'

class Char {
	constructor(name, sp, fp, ap, atr) {     
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
		this.agil = atr[0]
		this.con = atr[1]
		this.des = atr[2]
		this.for = atr[3]
		this.adap = atr[4]
		this.int = atr[5]
		this.vont = atr[6]
		this.sent = atr[7]
		this.alma = atr[8]
		this.sor = atr[9]

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