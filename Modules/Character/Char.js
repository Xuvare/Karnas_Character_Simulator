import Res from './Resources.js'

class Char {
	constructor(name, sp, fp, ap, atr) {     
		this.name = name
		this.skills = {
			update() {
				let skip = 2
				Object.entries(this).forEach((i) => {skip ? skip-- : this[i[0]].parent = this})
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