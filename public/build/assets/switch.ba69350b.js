import{r as s,R as d}from"./app.556a3bcf.js";import{C as b,$ as m,o as f,I as g,y as v,s as w,a as H,F as L,r as U,b as $}from"./keyboard.21bc586a.js";function G(t={},r=null,e=[]){for(let[n,l]of Object.entries(t))C(e,T(r,n),l);return e}function T(t,r){return t?t+"["+r+"]":r}function C(t,r,e){if(Array.isArray(e))for(let[n,l]of e.entries())C(t,T(r,n.toString()),l);else e instanceof Date?t.push([r,e.toISOString()]):typeof e=="boolean"?t.push([r,e?"1":"0"]):typeof e=="string"?t.push([r,e]):typeof e=="number"?t.push([r,`${e}`]):e==null?t.push([r,""]):G(e,r,t)}function K(t){var r;let e=(r=t==null?void 0:t.form)!=null?r:t.closest("form");if(e){for(let n of e.elements)if(n.tagName==="INPUT"&&n.type==="submit"||n.tagName==="BUTTON"&&n.type==="submit"||n.nodeName==="INPUT"&&n.type==="image"){n.click();return}}}let Y="div";var P=(t=>(t[t.None=1]="None",t[t.Focusable=2]="Focusable",t[t.Hidden=4]="Hidden",t))(P||{});let z=b(function(t,r){let{features:e=1,...n}=t,l={ref:r,"aria-hidden":(e&2)===2?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(e&4)===4&&(e&2)!==2&&{display:"none"}}};return m({ourProps:l,theirProps:n,slot:{},defaultTag:Y,name:"Hidden"})});function B(t,r,e){let[n,l]=s.exports.useState(e),o=t!==void 0,i=s.exports.useRef(o),a=s.exports.useRef(!1),u=s.exports.useRef(!1);return o&&!i.current&&!a.current?(a.current=!0,i.current=o,console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")):!o&&i.current&&!u.current&&(u.current=!0,i.current=o,console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")),[o?t:n,f(c=>(o||l(c),r==null?void 0:r(c)))]}let E=s.exports.createContext(null);function D(){let t=s.exports.useContext(E);if(t===null){let r=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(r,D),r}return t}function J(){let[t,r]=s.exports.useState([]);return[t.length>0?t.join(" "):void 0,s.exports.useMemo(()=>function(e){let n=f(o=>(r(i=>[...i,o]),()=>r(i=>{let a=i.slice(),u=a.indexOf(o);return u!==-1&&a.splice(u,1),a}))),l=s.exports.useMemo(()=>({register:n,slot:e.slot,name:e.name,props:e.props}),[n,e.slot,e.name,e.props]);return d.createElement(E.Provider,{value:l},e.children)},[r])]}let Q="p",V=b(function(t,r){let e=D(),n=`headlessui-description-${g()}`,l=v(r);w(()=>e.register(n),[n,e.register]);let o=t,i={ref:l,...e.props,id:n};return m({ourProps:i,theirProps:o,slot:e.slot||{},defaultTag:Q,name:e.name||"Description"})}),N=s.exports.createContext(null);function F(){let t=s.exports.useContext(N);if(t===null){let r=new Error("You used a <Label /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(r,F),r}return t}function W(){let[t,r]=s.exports.useState([]);return[t.length>0?t.join(" "):void 0,s.exports.useMemo(()=>function(e){let n=f(o=>(r(i=>[...i,o]),()=>r(i=>{let a=i.slice(),u=a.indexOf(o);return u!==-1&&a.splice(u,1),a}))),l=s.exports.useMemo(()=>({register:n,slot:e.slot,name:e.name,props:e.props}),[n,e.slot,e.name,e.props]);return d.createElement(N.Provider,{value:l},e.children)},[r])]}let q="label",X=b(function(t,r){let{passive:e=!1,...n}=t,l=F(),o=`headlessui-label-${g()}`,i=v(r);w(()=>l.register(o),[o,l.register]);let a={ref:i,...l.props,id:o};return e&&("onClick"in a&&delete a.onClick,"onClick"in n&&delete n.onClick),m({ourProps:a,theirProps:n,slot:l.slot||{},defaultTag:q,name:l.name||"Label"})}),x=s.exports.createContext(null);x.displayName="GroupContext";let Z=s.exports.Fragment;function _(t){let[r,e]=s.exports.useState(null),[n,l]=W(),[o,i]=J(),a=s.exports.useMemo(()=>({switch:r,setSwitch:e,labelledby:n,describedby:o}),[r,e,n,o]),u={},c=t;return d.createElement(i,{name:"Switch.Description"},d.createElement(l,{name:"Switch.Label",props:{onClick(){!r||(r.click(),r.focus({preventScroll:!0}))}}},d.createElement(x.Provider,{value:a},m({ourProps:u,theirProps:c,defaultTag:Z,name:"Switch.Group"}))))}let ee="button",te=b(function(t,r){let{checked:e,defaultChecked:n=!1,onChange:l,name:o,value:i,...a}=t,u=`headlessui-switch-${g()}`,c=s.exports.useContext(x),y=s.exports.useRef(null),M=v(y,r,c===null?null:c.setSwitch),[h,k]=B(e,l,n),S=f(()=>k==null?void 0:k(!h)),O=f(p=>{if(U(p.currentTarget))return p.preventDefault();p.preventDefault(),S()}),R=f(p=>{p.key===$.Space?(p.preventDefault(),S()):p.key===$.Enter&&K(p.currentTarget)}),I=f(p=>p.preventDefault()),j=s.exports.useMemo(()=>({checked:h}),[h]),A={id:u,ref:M,role:"switch",type:H(t,y),tabIndex:0,"aria-checked":h,"aria-labelledby":c==null?void 0:c.labelledby,"aria-describedby":c==null?void 0:c.describedby,onClick:O,onKeyUp:R,onKeyPress:I};return d.createElement(d.Fragment,null,o!=null&&h&&d.createElement(z,{features:P.Hidden,...L({as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:h,name:o,value:i})}),m({ourProps:A,theirProps:a,slot:j,defaultTag:ee,name:"Switch"}))}),oe=Object.assign(te,{Group:_,Label:X,Description:V});export{B as T,oe as b,G as e,z as h,P as s};
