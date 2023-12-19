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

Utils.div()