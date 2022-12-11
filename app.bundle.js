!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n){for(var i=0;i<n.length;i++){var r=n[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,n){if("object"!==e(t)||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,"string");if("object"!==e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===e(o)?o:String(o)),r)}var o}function n(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n)}function i(e,t){return function(e,t){return t.get?t.get.call(e):t.value}(e,o(e,t,"get"))}function r(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,o(e,t,"set"),n),n}function o(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}var l=new WeakMap,s=new WeakMap,a=new WeakMap,c=new WeakMap,u=new WeakMap,h=new WeakMap,f=function(){function e(t,o,f,d,v){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n(this,l,{writable:!0,value:void 0}),n(this,s,{writable:!0,value:void 0}),n(this,a,{writable:!0,value:void 0}),n(this,c,{writable:!0,value:void 0}),n(this,u,{writable:!0,value:void 0}),n(this,h,{writable:!0,value:void 0}),r(this,l,t),r(this,s,i(this,l).getContext("2d")),r(this,a,i(this,l).width=o),r(this,c,i(this,l).height=f),r(this,u,d),r(this,h,v)}var o,f;return o=e,(f=[{key:"canvas",get:function(){return i(this,l)}},{key:"context",get:function(){return i(this,s)}},{key:"width",get:function(){return i(this,a)}},{key:"height",get:function(){return i(this,c)}},{key:"rowCount",get:function(){return i(this,h)}},{key:"colCount",get:function(){return i(this,u)}},{key:"clear",value:function(){i(this,s).clearRect(0,0,i(this,a),i(this,c))}}])&&t(o.prototype,f),Object.defineProperty(o,"prototype",{writable:!1}),e}();function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function v(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,m(i.key),i)}}function y(e,t,n){return t&&v(e.prototype,t),n&&v(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function p(e,t,n){return(t=m(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){var t=function(e,t){if("object"!==d(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==d(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===d(t)?t:String(t)}var w=y((function e(t,n,i,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),p(this,"chance",void 0),p(this,"type",void 0),p(this,"image",void 0),p(this,"width",void 0),p(this,"height",void 0),p(this,"animationFrame",0),this.chance=t,this.type=n,this.image=new Image,this.image.src=i,this.image.width=this.width=r,this.image.height=this.height=o}));function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){I(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function I(e,t,n){return(t=S(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,S(i.key),i)}}function S(e){var t=function(e,t){if("object"!==b(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==b(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===b(t)?t:String(t)}function $(e,t){O(e,t),t.add(e)}function E(e,t,n){O(e,t),t.set(e,n)}function O(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function W(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function j(e,t){return function(e,t){return t.get?t.get.call(e):t.value}(e,B(e,t,"get"))}function P(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,B(e,t,"set"),n),n}function B(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}var M=new WeakMap,T=new WeakMap,C=new WeakMap,L=new WeakMap,R=new WeakMap,V=new WeakMap,_=new WeakMap,D=new WeakMap,G=new WeakMap,F=new WeakMap,A=new WeakMap,z=new WeakMap,N=new WeakSet,q=new WeakSet,X=new WeakSet,Y=new WeakSet,H=new WeakSet,J=new WeakSet,K=new WeakSet,Q=new WeakSet,U=new WeakSet,Z=new WeakSet,ee=new WeakSet,te=new WeakSet,ne=new WeakSet,ie=new WeakSet,re=new WeakSet,oe=new WeakSet,le=new WeakSet,se=new WeakSet,ae=new WeakSet,ce=new WeakSet,ue=new WeakSet,he=new WeakSet,fe=new WeakSet,de=function(){function e(t){var n=this,i=t.canvasInstance,r=t.interfaceInstance,o=t.itemsInstances,l=t.levels;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),$(this,fe),$(this,he),$(this,ue),$(this,ce),$(this,ae),$(this,se),$(this,le),$(this,oe),$(this,re),$(this,ie),$(this,ne),$(this,te),$(this,ee),$(this,Z),$(this,U),$(this,Q),$(this,K),$(this,J),$(this,H),$(this,Y),$(this,X),$(this,q),$(this,N),E(this,M,{writable:!0,value:void 0}),E(this,T,{writable:!0,value:void 0}),E(this,C,{writable:!0,value:void 0}),E(this,L,{writable:!0,value:void 0}),E(this,R,{writable:!0,value:[]}),E(this,V,{writable:!0,value:{}}),E(this,_,{writable:!0,value:void 0}),E(this,D,{writable:!0,value:void 0}),E(this,G,{writable:!0,value:void 0}),E(this,F,{writable:!0,value:0}),E(this,A,{writable:!0,value:2}),E(this,z,{writable:!0,value:1}),P(this,M,i),P(this,T,r),P(this,C,o),P(this,L,Array(j(this,M).colCount).fill(null).map((function(e,t){return Array(j(n,M).rowCount).fill(null)}))),P(this,D,l),P(this,_,localStorage.getItem("level")||1)}var t,n;return t=e,(n=[{key:"init",value:function(){W(this,ae,Me).call(this),W(this,se,Be).call(this),W(this,X,pe).call(this),W(this,fe,Re).call(this),W(this,ue,Ce).call(this),W(this,he,Le).call(this),W(this,ce,Te).call(this),j(this,T).setLevel(j(this,_))}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function ve(){var e=this;j(this,M).clear(),j(this,L).forEach((function(t,n){t.forEach((function(t,n){t&&(t.image.complete?j(e,M).context.drawImage(t.image,t.x,t.y,t.width,t.height):t.image.addEventListener("load",(function(){j(e,M).context.drawImage(t.image,t.x,t.y,t.width,t.height)})))}))}))}function ye(){var e=j(this,C)[Math.ceil(Math.random()*j(this,C).length)-1];return Math.random()<=e.chance?e:W(this,q,ye).call(this)}function pe(){var e=this;j(this,M).clear(),j(this,L).forEach((function(t,n){t.forEach((function(i,r){var o=W(e,q,ye).call(e);t[r]=x(x({},o),{},{y:n*o.height,x:r*o.width})}))})),W(this,re,We).call(this)?W(this,X,pe).call(this):W(this,N,ve).call(this)}function me(){return Math.round(Date.now()*(Math.random()||0))}function we(e,t,n){"bomb"===j(this,L)[e][t].type?W(this,K,ge).call(this,e,t):W(this,J,be).call(this,e,t,n)}function be(e,t){var n,i,r,o,l,s,a=j(this,L)[e][t],c=null,u=null,h=null,f=null;(null===(n=j(this,L)[e-1])||void 0===n||null===(i=n[t])||void 0===i?void 0:i.type)!==a.type||j(this,R).find((function(n){return n.rowIndex===e-1&&n.cellIndex===t}))||(c={rowIndex:e-1,cellIndex:t},j(this,R).push(c)),(null===(r=j(this,L)[e+1])||void 0===r||null===(o=r[t])||void 0===o?void 0:o.type)!==a.type||j(this,R).find((function(n){return n.rowIndex===e+1&&n.cellIndex===t}))||(u={rowIndex:e+1,cellIndex:t},j(this,R).push(u)),(null===(l=j(this,L)[e][t-1])||void 0===l?void 0:l.type)!==a.type||j(this,R).find((function(n){return n.rowIndex===e&&n.cellIndex===t-1}))||(h={rowIndex:e,cellIndex:t-1},j(this,R).push(h)),(null===(s=j(this,L)[e][t+1])||void 0===s?void 0:s.type)!==a.type||j(this,R).find((function(n){return n.rowIndex===e&&n.cellIndex===t+1}))||(f={rowIndex:e,cellIndex:t+1},j(this,R).push(f)),(c||u||h||f)&&(j(this,R).find((function(n){return n.rowIndex===e&&n.cellIndex===t}))||j(this,R).push({rowIndex:e,cellIndex:t}),c&&W(this,J,be).call(this,c.rowIndex,c.cellIndex),u&&W(this,J,be).call(this,u.rowIndex,u.cellIndex),h&&W(this,J,be).call(this,h.rowIndex,h.cellIndex),f&&W(this,J,be).call(this,f.rowIndex,f.cellIndex))}function ge(e,t){var n=this,i=j(this,D)[j(this,_)].bombRadius;j(this,R).push({rowIndex:e,cellIndex:t});for(var r=function(r){var o,l;if(null!==(o=j(n,L)[e-r])&&void 0!==o&&o[t]&&!j(n,R).find((function(n){return n.rowIndex===e-r&&n.cellIndex===t}))){j(n,R).push({rowIndex:e-r,cellIndex:t});for(var s=0;s<=i;s++){var a,c;null!==(a=j(n,L)[e-r])&&void 0!==a&&a[t-s]&&j(n,R).push({rowIndex:e-r,cellIndex:t-s}),null!==(c=j(n,L)[e-r])&&void 0!==c&&c[t+s]&&j(n,R).push({rowIndex:e-r,cellIndex:t+s})}}if(null!==(l=j(n,L)[e+r])&&void 0!==l&&l[t]&&!j(n,R).find((function(n){return n.rowIndex===e+r&&n.cellIndex===t}))){j(n,R).push({rowIndex:e+r,cellIndex:t});for(var u=0;u<=i;u++){var h,f;null!==(h=j(n,L)[e+r])&&void 0!==h&&h[t-u]&&j(n,R).push({rowIndex:e+r,cellIndex:t-u}),null!==(f=j(n,L)[e+r])&&void 0!==f&&f[t+u]&&j(n,R).push({rowIndex:e+r,cellIndex:t+u})}}j(n,L)[e][t-r]&&!j(n,R).find((function(n){return n.rowIndex===e&&n.cellIndex===t-r}))&&j(n,R).push({rowIndex:e,cellIndex:t-r}),j(n,L)[e][t+r]&&!j(n,R).find((function(n){return n.rowIndex===e&&n.cellIndex===t+r}))&&j(n,R).push({rowIndex:e,cellIndex:t+r})},o=0;o<=i;o++)r(o)}function xe(e,t,n){var i=j(this,L)[e][t];if(i){var r,o,l,s,a,c,u,h,f,d,v,y,p,m=null,w=null,b=null,g=null;(null===(r=j(this,L)[e-1])||void 0===r||null===(o=r[t])||void 0===o?void 0:o.type)!==i.type||null!==(l=j(this,V)[n])&&void 0!==l&&l.find((function(n){return n.rowIndex===e-1&&n.cellIndex===t}))||(m={rowIndex:e-1,cellIndex:t},j(this,V)[n]?j(this,V)[n].push(m):j(this,V)[n]=[m]),(null===(s=j(this,L)[e+1])||void 0===s||null===(a=s[t])||void 0===a?void 0:a.type)!==i.type||null!==(c=j(this,V)[n])&&void 0!==c&&c.find((function(n){return n.rowIndex===e+1&&n.cellIndex===t}))||(w={rowIndex:e+1,cellIndex:t},j(this,V)[n]?j(this,V)[n].push(w):j(this,V)[n]=[w]),(null===(u=j(this,L)[e])||void 0===u||null===(h=u[t-1])||void 0===h?void 0:h.type)!==i.type||null!==(f=j(this,V)[n])&&void 0!==f&&f.find((function(n){return n.rowIndex===e&&n.cellIndex===t-1}))||(b={rowIndex:e,cellIndex:t-1},j(this,V)[n]?j(this,V)[n].push(b):j(this,V)[n]=[b]),(null===(d=j(this,L)[e])||void 0===d||null===(v=d[t+1])||void 0===v?void 0:v.type)!==i.type||null!==(y=j(this,V)[n])&&void 0!==y&&y.find((function(n){return n.rowIndex===e&&n.cellIndex===t+1}))||(g={rowIndex:e,cellIndex:t+1},j(this,V)[n]?j(this,V)[n].push(g):j(this,V)[n]=[g]),(m||w||b||g)&&(null!==(p=j(this,V)[n])&&void 0!==p&&p.find((function(n){return n.rowIndex===e&&n.cellIndex===t}))||(j(this,R).push({rowIndex:e,cellIndex:t}),j(this,V)[n]?j(this,V)[n].push({rowIndex:e,cellIndex:t}):j(this,V)[n]=[{rowIndex:e,cellIndex:t}]),m&&W(this,Q,xe).call(this,m.rowIndex,m.cellIndex,n),w&&W(this,Q,xe).call(this,w.rowIndex,w.cellIndex,n),b&&W(this,Q,xe).call(this,b.rowIndex,b.cellIndex,n),g&&W(this,Q,xe).call(this,g.rowIndex,g.cellIndex,n))}}function Ie(){var e=this;j(this,R).forEach((function(t){var n=t.rowIndex,i=t.cellIndex;return j(e,L)[n][i]=null})),W(this,N,ve).call(this),P(this,R,[])}function ke(){return j(this,L).flat(1).filter((function(e){return!!e})).length===j(this,M).rowCount*j(this,M).colCount}function Se(e,t){var n=this;return new Promise((function(i){e.animationFrame%j(n,z)==0&&(e.y+=1),e.y<=t?(e.animationFrame++,requestAnimationFrame((function(){W(n,ee,Se).call(n,e,t).then((function(){i()}))}))):(e.animationFrame=0,i()),W(n,N,ve).call(n)}))}function $e(e){for(var t=this,n=j(this,L).length-1;n>=0;n--)if(!j(this,L)[n][e])if(0===n){var i=W(this,q,ye).call(this),r=x(x({},i),{},{y:-i.height,x:e*i.width,animation:!0});j(this,L)[n][e]=r,W(this,ee,Se).call(this,r,n*r.height).then((function(){W(t,Z,ke).call(t)||W(t,te,$e).call(t,e)}))}else for(var o=n-1;o>=0;o--){var l=j(this,L)[o][e];if(l){j(this,L)[n][e]=l,j(this,L)[o][e]=null,W(this,ee,Se).call(this,l,n*l.height).then((function(){W(t,Z,ke).call(t)||W(t,te,$e).call(t,e)}));break}}}function Ee(){for(var e=0;e<j(this,M).colCount;e++)W(this,te,$e).call(this,e)}function Oe(){return j(this,F)>=j(this,D)[j(this,_)].score}function We(){var e=this,t=!1;j(this,L).forEach((function(n,i){n.forEach((function(n,r){t=t||"bomb"===(null==n?void 0:n.type),W(e,Q,xe).call(e,i,r,W(e,Y,me).call(e))}))}));var n=Object.values(j(this,V)).some((function(t){return t.length>=j(e,A)}));return P(this,V,{}),P(this,R,[]),!t&&!n}function je(){P(this,F,j(this,F)+j(this,R).length),j(this,T).setScore(j(this,F),j(this,D)[j(this,_)],j(this,D)[j(this,_)+1])}function Pe(){P(this,F,0),j(this,T).resetScore(j(this,F))}function Be(){P(this,G,j(this,D)[j(this,_)].moves),j(this,T).resetMoves(j(this,G))}function Me(){j(this,D)[j(this,_)].match&&P(this,A,j(this,D)[j(this,_)].match),j(this,T).setMatch(j(this,A))}function Te(){var e=this;j(this,T).$restartBtn.addEventListener("click",(function(){P(e,_,1),W(e,le,Pe).call(e),W(e,se,Be).call(e),W(e,ae,Me).call(e),j(e,T).setLevel(j(e,_)),j(e,T).setProgress(j(e,F)/j(e,D)[j(e,_)].score),j(e,T).restartGame(),W(e,X,pe).call(e)}))}function Ce(){var e=this;j(this,T).$nextBtn.addEventListener("click",(function(){var t=j(e,_)+1;j(e,D)[t]&&(P(e,_,t),W(e,le,Pe).call(e),W(e,se,Be).call(e),W(e,ae,Me).call(e),W(e,X,pe).call(e),j(e,T).setLevel(j(e,_)),j(e,T).setProgress(j(e,F)/j(e,D)[j(e,_)].score))}))}function Le(){var e=this;j(this,T).$resetBtn.addEventListener("click",(function(){W(e,le,Pe).call(e),W(e,se,Be).call(e),W(e,X,pe).call(e),j(e,T).setProgress(j(e,F)/j(e,D)[j(e,_)].score)}))}function Re(){var e=this;j(this,M).canvas.addEventListener("click",(function(t){if(!W(e,ie,Oe).call(e)){P(e,R,[]);var n,i=Math.floor(t.offsetX/(j(e,M).width/j(e,M).colCount)),r=Math.floor(t.offsetY/(j(e,M).height/j(e,M).rowCount));W(e,H,we).call(e,r,i),j(e,R).length>=j(e,A)&&(W(e,oe,je).call(e),W(e,U,Ie).call(e),setTimeout((function(){W(e,ne,Ee).call(e)}),300),j(e,T).decreaseMoves(P(e,G,(n=j(e,G),--n))),j(e,T).setProgress(j(e,F)/j(e,D)[j(e,_)].score),W(e,re,We).call(e)&&!W(e,ie,Oe).call(e)&&j(e,T).showGameOver())}}))}function Ve(e){return Ve="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ve(e)}function _e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==Ve(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==Ve(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===Ve(r)?r:String(r)),i)}var r}function De(e){return De="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},De(e)}function Ge(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,Xe(i.key),i)}}function Fe(e,t){return Fe=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},Fe(e,t)}function Ae(e,t){if(t&&("object"===De(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return ze(e)}function ze(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Ne(e){return Ne=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},Ne(e)}function qe(e,t,n){return(t=Xe(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Xe(e){var t=function(e,t){if("object"!==De(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==De(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===De(t)?t:String(t)}var Ye=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Fe(e,t)}(l,e);var t,n,i,r,o=(i=l,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=Ne(i);if(r){var n=Ne(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Ae(this,e)});function l(e){var t,n=e.$level,i=e.$match,r=e.$progress,s=e.$moves,a=e.$score,c=e.$nextBtn,u=e.$resetBtn,h=e.$restartBtn,f=e.$gameOver,d=e.$gameWin;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),qe(ze(t=o.call(this)),"$level",void 0),qe(ze(t),"$match",void 0),qe(ze(t),"$progress",void 0),qe(ze(t),"$moves",void 0),qe(ze(t),"$score",void 0),qe(ze(t),"$nextBtn",void 0),qe(ze(t),"$resetBtn",void 0),qe(ze(t),"$restartBtn",void 0),qe(ze(t),"$gameOver",void 0),qe(ze(t),"$gameWin",void 0),t.$level=n,t.$match=i,t.$progress=r,t.$moves=s,t.$score=a,t.$nextBtn=c,t.$resetBtn=u,t.$restartBtn=h,t.$gameOver=f,t.$gameWin=d,t}return t=l,(n=[{key:"setLevel",value:function(e){this.setValue(this.$level,e),this.hideElement(this.$nextBtn)}},{key:"setScore",value:function(e,t,n){e<t.score?(this.setValue(this.$score,e),this.showElement(this.$resetBtn)):e>=t.score&&(this.setValue(this.$score,t.score),n?this.showNextLevel():this.showGameWin())}},{key:"resetScore",value:function(e){this.setValue(this.$score,e)}},{key:"setProgress",value:function(e){this.setWidth(this.$progress,e)}},{key:"decreaseMoves",value:function(e){this.setValue(this.$moves,e)}},{key:"resetMoves",value:function(e){this.setValue(this.$moves,e)}},{key:"setMatch",value:function(e){this.setValue(this.$match,e)}},{key:"restartGame",value:function(){this.hideElement(this.$gameOver),this.hideElement(this.$gameWin),this.hideElement(this.$restartBtn)}},{key:"showGameOver",value:function(){this.showElement(this.$gameOver),this.showElement(this.$restartBtn)}},{key:"showNextLevel",value:function(){this.showElement(this.$nextBtn),this.hideElement(this.$resetBtn)}},{key:"showGameWin",value:function(){this.showElement(this.$gameWin),this.showElement(this.$restartBtn),this.hideElement(this.$resetBtn)}}])&&Ge(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),l}(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,(n=[{key:"setValue",value:function(e,t){e.innerText=t}},{key:"resetValue",value:function(e){e.innerText="0"}},{key:"setWidth",value:function(e,t){e.style.width=100*t+"%"}},{key:"showElement",value:function(e){e.style.display="block"}},{key:"hideElement",value:function(e){e.style.display="none"}}])&&_e(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()),He=Math.floor(42.75),Je=Math.floor(48),Ke=9*He,Qe=9*Je,Ue=new f(document.getElementById("canvas"),Ke,Qe,9,9),Ze=[{chance:1,type:"blue",src:"assets/items/blue.png"},{chance:1,type:"purple",src:"assets/items/purple.png"},{chance:1,type:"red",src:"assets/items/red.png"},{chance:1,type:"yellow",src:"assets/items/yellow.png"},{chance:1,type:"green",src:"assets/items/green.png"},{chance:.05,type:"bomb",src:"assets/items/bomb.png"}].map((function(e){return new w(e.chance,e.type,e.src,He,Je)}));new de({canvasInstance:Ue,interfaceInstance:new Ye({$level:document.getElementById("level"),$match:document.getElementById("match"),$moves:document.getElementById("moves"),$progress:document.getElementById("progress"),$score:document.getElementById("score"),$nextBtn:document.getElementById("next"),$resetBtn:document.getElementById("reset"),$restartBtn:document.getElementById("restart"),$gameOver:document.getElementById("game-over"),$gameWin:document.getElementById("game-win")}),itemsInstances:Ze,levels:{1:{moves:40,score:100,match:2,bombRadius:1},2:{moves:35,score:10,match:4,bombRadius:2}}}).init()}();