import { Func } from './core/func'
import { Contents } from './parts/contents'
import './style.css'

const parent = document.querySelector('.l-main-wrapper') as HTMLElement
const num = Func.val(20, 80)
for(let i = 0; i < num; i++) {
  const el = document.createElement('div')
  el.classList.add('l-main')
  parent.appendChild(el)

  new Contents({
    el: el,
    id: i,
  })
}


