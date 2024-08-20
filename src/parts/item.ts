import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {
  private _text:HTMLElement

  constructor(opt:any) {
    super(opt)

    this.addClass('item')
    this._text = this.qs('.text')

    if(opt.id == 0) {
      this._text.textContent = 'firework'
    } else {
      this.addClass('-nakami')
      // ランダムな100文字
      // this._text.textContent = Math.random().toString(36).slice(-8)
      this.qs('.text').textContent = 'firework'

      if(Util.hit(4)) {
        Tween.set(this.qs('.text'), {
          color: opt.col.getStyle()
        })
      } else {
        Tween.set(this.el, {
          backgroundColor: opt.col.getStyle(),
          // borderColor: txtCol.getStyle()
        })

        Tween.set(this.qs('.text'), {
          color: '#000'
        })
      }
    }
  }

  protected _update():void {
    super._update()
  }
}