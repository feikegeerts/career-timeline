import{k as g,l as S,H,m as I,n as p,s as c,o as R,p as L,t as u,v as O,w as V,x as b,y as C,z as Y,A as k,B as M,C as P,D as $,c as j,E,F as z,G as B}from"./Bjca4J3u.js";import{a as F,r as A,h}from"./DTn9krFj.js";import{a as G}from"./BKFZWwoP.js";const W=["touchstart","touchmove"];function q(t){return W.includes(t)}function X(t,e){var r=e==null?"":typeof e=="object"?e+"":e;r!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=r,t.nodeValue=r+"")}function J(t,e){return N(t,e)}function Z(t,e){g(),e.intro=e.intro??!1;const r=e.target,_=E,l=u;try{for(var a=S(r);a&&(a.nodeType!==8||a.data!==H);)a=I(a);if(!a)throw p;c(!0),R(a),L();const d=N(t,{...e,anchor:a});if(u===null||u.nodeType!==8||u.data!==O)throw V(),p;return c(!1),d}catch(d){if(d===p)return e.recover===!1&&b(),g(),C(r),c(!1),J(t,e);throw d}finally{c(_),R(l)}}const i=new Map;function N(t,{target:e,anchor:r,props:_={},events:l,context:a,intro:d=!0}){g();var v=new Set,y=o=>{for(var s=0;s<o.length;s++){var n=o[s];if(!v.has(n)){v.add(n);var f=q(n);e.addEventListener(n,h,{passive:f});var T=i.get(n);T===void 0?(document.addEventListener(n,h,{passive:f}),i.set(n,1)):i.set(n,T+1)}}};y(Y(F)),A.add(y);var m=void 0,D=k(()=>{var o=r??e.appendChild(M());return P(()=>{if(a){$({});var s=j;s.c=a}l&&(_.$$events=l),E&&G(o,null),m=t(o,_)||{},E&&(z.nodes_end=u),a&&B()}),()=>{var f;for(var s of v){e.removeEventListener(s,h);var n=i.get(s);--n===0?(document.removeEventListener(s,h),i.delete(s)):i.set(s,n)}A.delete(y),o!==r&&((f=o.parentNode)==null||f.removeChild(o))}});return w.set(m,D),m}let w=new WeakMap;function x(t,e){const r=w.get(t);return r?(w.delete(t),r(e)):Promise.resolve()}export{Z as h,J as m,X as s,x as u};
