var Obj = {
  time: {
        _segundos: 0,
        _minutos: 0,
        _horas: 0,
        dias: 1,

        get segundos() {return this._segundos},
        set segundos(val) {
            this._segundos += val

            for (let i = 1; i <= Math.floor(this._segundos/60) ; i++)
            {
                this.minutos++
            }
        },

        get minutos() {return this._minutos},
        set minutos(val) {
            this._minutos += val

            for (let i = 1; i <= Math.floor(this._minutos/60) ; i++)
            {
                this.horas++
            }
        },

        get horas() {return this._horas},
        set horas(val) {
            this._horas += val

            for (let i = 1; i <= Math.floor(this._horas/24) ; i++)
            {
                this.dias++
            }
        },

        Check() {
            let zero = (num) => num < 10 ? `0${num}` : num

            console.log(`Dia ${this.dias} ${zero(this.horas)}:${zero(this.minutos)}:${zero(this.segundos)}`)
        }
    },
  div: () => {
        console.log('-----------------------------------------------------------------------------------')
    },
  fixDec: (num) => {
      if (typeof num != 'string')
      {
          num = num.toFixed(3)
          num = num.toString()
      }  

      if(num.includes('.'))
      {
          while (num[num.length-1] == 0)
          {
              num = num.substring(0, num.length-1)
          }
          if (num[num.length-1] == '.')
          {
              num = num.substring(0, num.length-1)
          }
      }

      return num
  }
}

export {Obj as default}