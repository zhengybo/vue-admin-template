import {Browser} from '@/js/public/tool'
// 基于top
export default class Move {
  constructor(element,option = {}) {
    this.element = element;
    this.elementR = parseInt(Browser.getStyle(element,'width'));
    this.callback = option.callback;
    this.flag = false;
    this.init();
  }

  ininXY(x,y){
    this.x = x || parseInt(Browser.getStyle(this.element,'left'));
    this.y = y || parseInt(Browser.getStyle(this.element,'top'));
  }

  init(){
    const fn = (e) => {
      e = e || window.event;
      this.onMove(e.clientX,e.clientY)
    }
    this.element.addEventListener('mousedown',(e) => {
      e = e || window.event;
      this.ininXY();
      this.flag = true;
      this.offsetX = e.clientX,
      this.offsetY = e.clientY;
      document.body.addEventListener('mousemove',fn,false);
    })
    document.body.addEventListener('mouseup',() => {
      if(!this.flag)return;
      this.ininXY(this.storeX,this.storeY);
      document.body.removeEventListener('mousemove',fn);
      this.flag = false;
      this.callback && this.callback(this.storeY + 'px');
    });
  }

  onMove(x,y){
    this.storeX = (x-this.offsetX) + this.x;
    this.storeY = (y-this.offsetY) + this.y;
    let sTop = 0,
        eTop = document.documentElement.clientHeight - this.elementR;
    if(this.storeY < sTop)this.storeY = sTop;
    if(this.storeY > eTop)this.storeY = eTop;
    this.setStyle({
      // left :this.storeX + 'px',
      top : this.storeY + 'px'
    })
  }

  setStyle(obj){
    Object.keys(obj).forEach(key => {
      this.element.style[key] = obj[key]
    })
  }
}
