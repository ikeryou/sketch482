import { Color } from "three";
import { Conf } from "../core/conf";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Val } from "../libs/val";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _id: number
  private _rate: number = 0
  private _items: Array<Item> = []
  private _baseCol: Color
  private _hoverRate: Val = new Val()
  private _isHover: boolean = false
  private _isPlaying: boolean = false

  constructor(opt:any) {
    super(opt)

    this._id = opt.id

    const w = Util.randomInt(80, 180)
    Tween.set(this.el, {
      width: w + 'px',
    })

    this._baseCol = new Color(0x000000).offsetHSL(Util.random(0, 1), 1, 0.5)

    const num = 15
    for(let i = 0; i < num; i++) {
      // 複製する
      const org = document.querySelector('.l-accordion.js-org') as HTMLElement
      const el = org.cloneNode(true) as HTMLElement
      this.el.appendChild(el)
      el.classList.remove('js-org')

      const item = new Item({
        el: el,
        id: i,
        col: this._baseCol,
      })
      this._items.push(item)

      Tween.set(el, {
        zIndex: num - i,
      })
    }

    if(Conf.IS_TOUCH_DEVICE) {
      this._items[0].el.addEventListener('touchstart', () => {
        if(this._isHover) {
          this._eRollOut()
        } else {
          this._eRollOver()
        }

      })
    } else {
      this._setHover(this._items[0].el)
    }
  }

  //
  protected _eRollOver() {
    this._isHover = true
    if(this._isPlaying) return

    this._startRollOverMotion()
  }

  //
  private _startRollOverMotion() {
    this._items[0].addClass('-open')

    Tween.set(this.el, {
      zIndex: 9999,
    })

    Tween.set(this._items[0].el, {
      backgroundColor: this._baseCol.getStyle(),
      color: '#000'
    })

    this._isPlaying = true
    Tween.a(this._hoverRate, {
      val: [0, 1]
    }, 0.5, 0, Tween.ExpoEaseOut, null, null, () => {
      this._eEndRollOverMotion()
    })
  }

  //
  private _eEndRollOverMotion() {
    this._isPlaying = false
    if(!this._isHover) {
      this._startRollOutMotion()
    }
  }

  //
  protected _eRollOut() {
    this._isHover = false
    if(this._isPlaying) return

    this._startRollOutMotion()
  }

  //
  private _startRollOutMotion() {
    this._items[0].removeClass('-open')

    // Tween.set(this.el, {
    //   zIndex: 0,
    // })

    Tween.set(this._items[0].el, {
      backgroundColor: '',
      color: ''
    })

    this._isPlaying = true
    Tween.a(this._hoverRate, {
      val: 0
    }, 1, 0, Tween.ExpoEaseInOut, null, null, () => {
      this._eEndRollOutMotion()
    })
  }

  //
  private _eEndRollOutMotion() {
    this._isPlaying = false
    if(this._isHover) {
      this._startRollOverMotion()
    }
  }

  protected _update():void {
    super._update()

    this._rate = this._hoverRate.val

    this._items.forEach((item,i) => {
      const rot = Util.map(i, 0, (360 - (360 / this._items.length)) * this._rate, 0, this._items.length - 1)
      Tween.set(item.el, {
        rotationZ: rot * (this._id % 2 === 0 ? 1 : -1)
      })
    })
  }
}