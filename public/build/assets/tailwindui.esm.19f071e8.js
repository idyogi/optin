import{r as a}from"./app.556a3bcf.js";function S(e,t){if(e==null)return{};var r={},n=Object.keys(e),i,u;for(u=0;u<n.length;u++)i=n[u],!(t.indexOf(i)>=0)&&(r[i]=e[i]);return r}var Y=0;function Z(){return++Y}function _(){var e=a.exports.useState(Z),t=e[0];return t}function B(){var e=a.exports.useRef(!0);return a.exports.useEffect(function(){e.current=!1},[]),e.current}function k(){var e=a.exports.useRef(!0);return a.exports.useEffect(function(){return function(){e.current=!1}},[]),e}var V=typeof window<"u"?a.exports.useLayoutEffect:a.exports.useEffect;function K(e,t){if(e in t){var r=t[e];return typeof r=="function"?r():r}var n=new Error('Tried to handle "'+e+'" but there is no handler defined. Only defined handlers are: '+Object.keys(t).map(function(i){return'"'+i+'"'}).join(", ")+".");throw Error.captureStackTrace&&Error.captureStackTrace(n,K),n}function ee(e){var t={called:!1};return function(){if(!t.called)return t.called=!0,e.apply(void 0,arguments)}}function W(){var e=[],t={requestAnimationFrame:function(r){function n(){return r.apply(this,arguments)}return n.toString=function(){return r.toString()},n}(function(){var r=requestAnimationFrame.apply(void 0,arguments);t.add(function(){return cancelAnimationFrame(r)})}),nextFrame:function(){for(var n=arguments.length,i=new Array(n),u=0;u<n;u++)i[u]=arguments[u];t.requestAnimationFrame(function(){t.requestAnimationFrame.apply(t,i)})},setTimeout:function(r){function n(){return r.apply(this,arguments)}return n.toString=function(){return r.toString()},n}(function(){var r=setTimeout.apply(void 0,arguments);t.add(function(){return clearTimeout(r)})}),add:function(n){e.push(n)},dispose:function(){e.splice(0).forEach(function(n){return n()})}};return t}function q(e){for(var t,r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];e&&n.length>0&&(t=e.classList).add.apply(t,n)}function E(e){for(var t,r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];e&&n.length>0&&(t=e.classList).remove.apply(t,n)}var m;(function(e){e.Finished="finished",e.Cancelled="cancelled"})(m||(m={}));function te(e,t){var r=W();if(!e)return r.dispose;var n=getComputedStyle(e),i=n.transitionDuration,u=n.transitionDelay,o=[i,u].map(function(c){var p=c.split(",").filter(Boolean).map(function(v){return v.includes("ms")?parseFloat(v):parseFloat(v)*1e3}).sort(function(v,T){return T-v}),d=p[0],C=d===void 0?0:d;return C}),l=o[0],f=o[1];return l!==0?r.setTimeout(function(){t(m.Finished)},l+f):t(m.Finished),r.add(function(){return t(m.Cancelled)}),r.dispose}function N(e,t,r,n,i){var u=W(),o=i!==void 0?ee(i):function(){};return q.apply(void 0,[e].concat(t,r)),u.nextFrame(function(){E.apply(void 0,[e].concat(r)),q.apply(void 0,[e].concat(n)),u.add(te(e,function(l){return E.apply(void 0,[e].concat(n,t)),o(l)}))}),u.add(function(){return E.apply(void 0,[e].concat(t,r,n))}),u.add(function(){return o(m.Cancelled)}),u.dispose}function x(e){return e===void 0&&(e=""),a.exports.useMemo(function(){return e.split(" ").filter(function(t){return t.trim().length>1})},[e])}var z=a.exports.createContext(null),s;(function(e){e.Visible="visible",e.Hidden="hidden"})(s||(s={}));function re(){var e=a.exports.useContext(z);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition />.");return e}function ne(){var e=a.exports.useContext(y);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition />.");return e}var y=a.exports.createContext(null);function G(e){var t=a.exports.useRef([]),r=k(),n=a.exports.useCallback(function(u){var o=t.current.indexOf(u);o!==-1&&(t.current.splice(o,1),t.current.length<=0&&r.current&&(e==null||e()))},[e,r,t]),i=a.exports.useCallback(function(u){return t.current.push(u),function(){return n(u)}},[t,n]);return a.exports.useMemo(function(){return{children:t,register:i,unregister:n}},[i,n,t])}function J(e){var t=e.children,r=e.enter,n=e.enterFrom,i=e.enterTo,u=e.leave,o=e.leaveFrom,l=e.leaveTo,f=S(e,["children","enter","enterFrom","enterTo","leave","leaveFrom","leaveTo"]),c=a.exports.useRef(null),p=a.exports.useState(s.Visible),d=p[0],C=p[1],v=re(),T=v.show,$=v.appear,A=ne(),R=A.register,w=A.unregister,H=B(),h=_(),g=a.exports.useRef(!1),F=G(a.exports.useCallback(function(){g.current||(C(s.Hidden),w(h))},[h,w,g]));V(function(){return R(h)},[R,h]);var M=x(r),O=x(n),P=x(i),j=x(u),D=x(o),L=x(l);if(a.exports.useEffect(function(){if(d===s.Visible&&c.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[c,d]),V(function(){var b=c.current;if(!!b&&!(H&&!$))return g.current=!0,T?N(b,M,O,P,function(){g.current=!1}):N(b,j,D,L,function(X){g.current=!1,X===m.Finished&&F.children.current.length<=0&&(C(s.Hidden),w(h))})},[h,g,w,F,c,H,$,T,M,O,P,j,D,L]),d===s.Hidden)return null;if(typeof t=="function")return a.exports.createElement(y.Provider,{value:F},t(c));var I=f.as,Q=I===void 0?"div":I,U=S(f,["as"]);return a.exports.createElement(y.Provider,{value:F},a.exports.createElement(Q,Object.assign({},U,{ref:c}),t))}function ie(e){var t,r=e.show,n=e.appear,i=n===void 0?!1:n,u=S(e,["show","appear"]);if(![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");var o=a.exports.useState(r?s.Visible:s.Hidden),l=o[0],f=o[1],c=G(a.exports.useCallback(function(){f(s.Hidden)},[])),p=B(),d=a.exports.useMemo(function(){return{show:r,appear:i||!p}},[r,i,p]);return a.exports.useEffect(function(){r?f(s.Visible):c.children.current.length<=0&&f(s.Hidden)},[r,c]),a.exports.createElement(y.Provider,{value:c},a.exports.createElement(z.Provider,{value:d},K(l,(t={},t[s.Visible]=function(){return a.exports.createElement(J,Object.assign({},u))},t[s.Hidden]=null,t))))}ie.Child=J;export{ie as T};
