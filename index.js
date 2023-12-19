import Utils from './Modules/Utils.js' // time, div(), fixDec()
import Res from './Modules/Character/Resources.js' // Resources
import Char from './Modules/Character/Char.js' // Char
import {ActiveSkill, PassiveSkill} from './Modules/Character/Skills.js' // Skills


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
                        12] // Sorte
                       )

shiro.skills.lâmina = new PassiveSkill('Lâmina', 3, false, ['espada'])
shiro.skills.espada = new PassiveSkill('Espada', 4, ['lâmina'], ['broadsword', 'florete'])
shiro.skills.broadsword = new PassiveSkill('Broadsword', 6, ['espada'], ['precisão_broadsword_bisel', 'precisão_broadsword_ponta'])
shiro.skills.precisão_broadsword_bisel = new ActiveSkill('Precisão Broadsword: Bisel', 6, 'sp', 0.5, 0.5, ['des'], ['broadsword', 'precisão_bisel'], false, 100)
shiro.skills.precisão_broadsword_ponta = new ActiveSkill('Precisão Broadsword: Ponta', 3, 'sp', 0.5, 0.5, ['des'], ['broadsword', 'precisão_bisel'], false, 100)
shiro.skills.update()

shiro.skills.precisão_broadsword_bisel.print_Masters()

Utils.div()