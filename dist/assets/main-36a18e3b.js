function l(o,t,s){return(1-s)*o+s*t}class r{constructor(){this.scrollElement=document.querySelector("[smooth-scroll]"),this.currentScrollPos=0,this.targetScrollPos=0,this.scrollEase=.1,this._initSmoothScroll(),this._update()}_update(){this._smoothScroll(),this.frame=requestAnimationFrame(this._update.bind(this))}_initSmoothScroll(){document.body.style.height=`${this.scrollElement.getBoundingClientRect().height}px`}_smoothScroll(){this.targetScrollPos=window.scrollY,this.currentScrollPos=l(this.currentScrollPos,this.targetScrollPos,this.scrollEase);const t=`translate3d(0, ${this.currentScrollPos*-1}px, 0)`;this.scrollElement.style.transform=t}}new r;
