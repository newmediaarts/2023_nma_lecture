function i(t,e,o){return(1-o)*t+o*e}function a(){const t=document.querySelector(".preloader"),e=t.querySelector(".preloader__progress"),o=document.querySelectorAll("video"),s=o.length;let l=0;o.forEach((r,c)=>{switch(r.tagName.toLowerCase()){case"video":const n=r.getAttribute("data-src");r.setAttribute("src",n),r.addEventListener("loadeddata",()=>{r.readyState>=3&&(l+=1,d(t,e,s,l))})}})}function d(t,e,o,s){const l=s/o*100;e.innerText=`${l}%`,l===100&&t.classList.add("preloader--loaded")}function h(t){const e=t.querySelectorAll("a"),o=t.querySelectorAll("video");e.forEach((s,l)=>{s.addEventListener("mouseleave",()=>{s.removeAttribute("active")}),s.addEventListener("mouseover",()=>{s.setAttribute("active",""),o.forEach((r,c)=>{c===l?(r.style.setProperty("--video-height","100%"),r.play()):(r.style.setProperty("--video-height","0%"),r.pause())})})})}class u{constructor(){this.scrollElement=document.querySelector("[smooth-scroll]"),this.currentScrollPos=0,this.targetScrollPos=0,this.scrollEase=.1,this.workGalleryElements=document.querySelectorAll(".work"),this._initSmoothScroll(),this._update(),this._createPage()}_update(){this._smoothScroll(),this.frame=requestAnimationFrame(this._update.bind(this))}_createPage(){a(),this.workGalleryElements.length>0&&this.workGalleryElements.forEach(e=>h(e))}_initSmoothScroll(){document.body.style.height=`${this.scrollElement.getBoundingClientRect().height}px`}_smoothScroll(){this.targetScrollPos=window.scrollY,this.currentScrollPos=i(this.currentScrollPos,this.targetScrollPos,this.scrollEase);const e=`translate3d(0, ${this.currentScrollPos*-1}px, 0)`;this.scrollElement.style.transform=e}}new u;
