import{r as f,R as b}from"./app.556a3bcf.js";import{e as A,u as L,c as O}from"./keyboard.21bc586a.js";function I(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(r=>setTimeout(()=>{throw r}))}function h(){let e=[],r=[],n={enqueue(t){r.push(t)},addEventListener(t,u,i,o){return t.addEventListener(u,i,o),n.add(()=>t.removeEventListener(u,i,o))},requestAnimationFrame(...t){let u=requestAnimationFrame(...t);return n.add(()=>cancelAnimationFrame(u))},nextFrame(...t){return n.requestAnimationFrame(()=>n.requestAnimationFrame(...t))},setTimeout(...t){let u=setTimeout(...t);return n.add(()=>clearTimeout(u))},microTask(...t){let u={current:!0};return I(()=>{u.current&&t[0]()}),n.add(()=>{u.current=!1})},add(t){return e.push(t),()=>{let u=e.indexOf(t);if(u>=0){let[i]=e.splice(u,1);i()}}},dispose(){for(let t of e.splice(0))t()},async workQueue(){for(let t of r.splice(0))await t()}};return n}function j(){let[e]=f.exports.useState(h);return f.exports.useEffect(()=>()=>e.dispose(),[e]),e}function E(e){return A?null:e instanceof Node?e.ownerDocument:e!=null&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let x=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var P=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(P||{}),y=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(y||{}),S=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(S||{});function w(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(x))}var F=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(F||{});function N(e,r=0){var n;return e===((n=E(e))==null?void 0:n.body)?!1:L(r,{[0](){return e.matches(x)},[1](){let t=e;for(;t!==null;){if(t.matches(x))return!0;t=t.parentElement}return!1}})}function H(e){let r=E(e);h().nextFrame(()=>{r&&!N(r.activeElement,0)&&D(e)})}function D(e){e==null||e.focus({preventScroll:!0})}let g=["textarea","input"].join(",");function T(e){var r,n;return(n=(r=e==null?void 0:e.matches)==null?void 0:r.call(e,g))!=null?n:!1}function M(e,r=n=>n){return e.slice().sort((n,t)=>{let u=r(n),i=r(t);if(u===null||i===null)return 0;let o=u.compareDocumentPosition(i);return o&Node.DOCUMENT_POSITION_FOLLOWING?-1:o&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function W(e,r){return C(w(),r,!0,e)}function C(e,r,n=!0,t=null){let u=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,i=Array.isArray(e)?n?M(e):e:w(e);t=t!=null?t:u.activeElement;let o=(()=>{if(r&5)return 1;if(r&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),c=(()=>{if(r&1)return 0;if(r&2)return Math.max(0,i.indexOf(t))-1;if(r&4)return Math.max(0,i.indexOf(t))+1;if(r&8)return i.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),d=r&32?{preventScroll:!0}:{},s=0,a=i.length,l;do{if(s>=a||s+a<=0)return 0;let m=c+s;if(r&16)m=(m+a)%a;else{if(m<0)return 3;if(m>=a)return 1}l=i[m],l==null||l.focus(d),s+=o}while(l!==u.activeElement);return r&6&&T(l)&&l.select(),l.hasAttribute("tabindex")||l.setAttribute("tabindex","0"),2}function v(e,r,n){let t=O(r);f.exports.useEffect(()=>{function u(i){t.current(i)}return document.addEventListener(e,u,n),()=>document.removeEventListener(e,u,n)},[e,n])}function $(e,r,n=!0){let t=f.exports.useRef(!1);f.exports.useEffect(()=>{requestAnimationFrame(()=>{t.current=n})},[n]);function u(o,c){if(!t.current||o.defaultPrevented)return;let d=function a(l){return typeof l=="function"?a(l()):Array.isArray(l)||l instanceof Set?l:[l]}(e),s=c(o);if(s!==null&&!!s.getRootNode().contains(s)){for(let a of d){if(a===null)continue;let l=a instanceof HTMLElement?a:a.current;if(l!=null&&l.contains(s))return}return!N(s,F.Loose)&&s.tabIndex!==-1&&o.preventDefault(),r(o,s)}}let i=f.exports.useRef(null);v("mousedown",o=>{var c,d;t.current&&(i.current=((d=(c=o.composedPath)==null?void 0:c.call(o))==null?void 0:d[0])||o.target)},!0),v("click",o=>{!i.current||(u(o,()=>i.current),i.current=null)},!0),v("blur",o=>u(o,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function q(e){throw new Error("Unexpected object: "+e)}var R=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(R||{});function G(e,r){let n=r.resolveItems();if(n.length<=0)return null;let t=r.resolveActiveIndex(),u=t!=null?t:-1,i=(()=>{switch(e.focus){case 0:return n.findIndex(o=>!r.resolveDisabled(o));case 1:{let o=n.slice().reverse().findIndex((c,d,s)=>u!==-1&&s.length-d-1>=u?!1:!r.resolveDisabled(c));return o===-1?o:n.length-1-o}case 2:return n.findIndex((o,c)=>c<=u?!1:!r.resolveDisabled(o));case 3:{let o=n.slice().reverse().findIndex(c=>!r.resolveDisabled(c));return o===-1?o:n.length-1-o}case 4:return n.findIndex(o=>r.resolveId(o)===e.id);case 5:return null;default:q(e)}})();return i===-1?t:i}let p=f.exports.createContext(null);p.displayName="OpenClosedContext";var k=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(k||{});function Q(){return f.exports.useContext(p)}function z({value:e,children:r}){return b.createElement(p.Provider,{value:e},r)}export{z as C,W as D,N as F,H as I,$ as L,F as N,M as S,P as T,j as a,R as b,E as e,h as m,k as p,Q as s,G as x};
