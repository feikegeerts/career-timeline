import{W as ae,b as ne,s as H,h as m,J as re,a as ie,o as B,n as fe,c as le,d as J,f as D,j as N,N as se,g as F,i as G,p as te,a8 as M,T as Q,Y as K,a9 as U,C as ue,aa as W,ab as ve,ac as O,ad as oe,R as de,ae as _e,af as ce,ag as L,ah as he,K as pe,ai as Z,q as Ee,aj as ge}from"./Duf0wCb2.js";function me(i,e){return e}function Te(i,e,a,n){for(var t=[],o=e.length,l=0;l<o;l++)oe(e[l].e,t,!0);var d=o>0&&t.length===0&&a!==null;if(d){var g=a.parentNode;de(g),g.append(a),n.clear(),I(i,e[0].prev,e[o-1].next)}_e(t,()=>{for(var h=0;h<o;h++){var _=e[h];d||(n.delete(_.k),I(i,_.prev,_.next)),ce(_.e,!d)}})}function we(i,e,a,n,t,o=null){var l=i,d={flags:e,items:new Map,first:null},g=(e&Z)!==0;if(g){var h=i;l=m?H(re(h)):h.appendChild(ae())}m&&ie();var _=null,w=!1,s=fe(()=>{var v=a();return ve(v)?v:v==null?[]:Q(v)});ne(()=>{var v=B(s),r=v.length;if(w&&r===0)return;w=r===0;let A=!1;if(m){var p=l.data===le;p!==(r===0)&&(l=J(),H(l),D(!1),A=!0)}if(m){for(var E=null,T,c=0;c<r;c++){if(N.nodeType===8&&N.data===se){l=N,A=!0,D(!1);break}var f=v[c],u=n(f,c);T=$(N,d,E,null,f,u,c,t,e,a),d.items.set(u,T),E=T}r>0&&H(J())}m||Ae(v,d,l,t,e,n,a),o!==null&&(r===0?_?F(_):_=G(()=>o(l)):_!==null&&te(_,()=>{_=null})),A&&D(!0),B(s)}),m&&(l=N)}function Ae(i,e,a,n,t,o,l){var y,Y,P,V;var d=(t&ge)!==0,g=(t&(L|O))!==0,h=i.length,_=e.items,w=e.first,s=w,v,r=null,A,p=[],E=[],T,c,f,u;if(d)for(u=0;u<h;u+=1)T=i[u],c=o(T,u),f=_.get(c),f!==void 0&&((y=f.a)==null||y.measure(),(A??(A=new Set)).add(f));for(u=0;u<h;u+=1){if(T=i[u],c=o(T,u),f=_.get(c),f===void 0){var j=s?s.e.nodes_start:a;r=$(j,e,r,r===null?e.first:r.next,T,c,u,n,t,l),_.set(c,r),p=[],E=[],s=r.next;continue}if(g&&xe(f,T,u,t),(f.e.f&M)!==0&&(F(f.e),d&&((Y=f.a)==null||Y.unfix(),(A??(A=new Set)).delete(f))),f!==s){if(v!==void 0&&v.has(f)){if(p.length<E.length){var R=E[0],x;r=R.prev;var q=p[0],S=p[p.length-1];for(x=0;x<p.length;x+=1)X(p[x],R,a);for(x=0;x<E.length;x+=1)v.delete(E[x]);I(e,q.prev,S.next),I(e,r,q),I(e,S,R),s=R,r=S,u-=1,p=[],E=[]}else v.delete(f),X(f,s,a),I(e,f.prev,f.next),I(e,f,r===null?e.first:r.next),I(e,r,f),r=f;continue}for(p=[],E=[];s!==null&&s.k!==c;)(s.e.f&M)===0&&(v??(v=new Set)).add(s),E.push(s),s=s.next;if(s===null)continue;f=s}p.push(f),r=f,s=f.next}if(s!==null||v!==void 0){for(var C=v===void 0?[]:Q(v);s!==null;)(s.e.f&M)===0&&C.push(s),s=s.next;var b=C.length;if(b>0){var ee=(t&Z)!==0&&h===0?a:null;if(d){for(u=0;u<b;u+=1)(P=C[u].a)==null||P.measure();for(u=0;u<b;u+=1)(V=C[u].a)==null||V.fix()}Te(e,C,ee,_)}}d&&Ee(()=>{var k;if(A!==void 0)for(f of A)(k=f.a)==null||k.apply()}),K.first=e.first&&e.first.e,K.last=r&&r.e}function xe(i,e,a,n){(n&L)!==0&&U(i.v,e),(n&O)!==0?U(i.i,a):i.i=a}function $(i,e,a,n,t,o,l,d,g,h){var _=(g&L)!==0,w=(g&he)===0,s=_?w?ue(t):W(t):t,v=(g&O)===0?l:W(l),r={i:v,v:s,k:o,a:null,e:null,prev:a,next:n};try{return r.e=G(()=>d(i,s,v,h),m),r.e.prev=a&&a.e,r.e.next=n&&n.e,a===null?e.first=r:(a.next=r,a.e.next=r.e),n!==null&&(n.prev=r,n.e.prev=r.e),r}finally{}}function X(i,e,a){for(var n=i.next?i.next.e.nodes_start:a,t=e?e.e.nodes_start:a,o=i.e.nodes_start;o!==n;){var l=pe(o);t.before(o),o=l}}function I(i,e,a){e===null?i.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}const z=[...` 	
\r\f \v\uFEFF`];function Ce(i,e,a){var n=i==null?"":""+i;if(a){for(var t in a)if(a[t])n=n?n+" "+t:t;else if(n.length)for(var o=t.length,l=0;(l=n.indexOf(t,l))>=0;){var d=l+o;(l===0||z.includes(n[l-1]))&&(d===n.length||z.includes(n[d]))?n=(l===0?"":n.substring(0,l))+n.substring(d+1):l=d}}return n===""?null:n}function Ne(i,e){return i==null?null:String(i)}function Re(i){return function(...e){var a=e[0];return a.stopPropagation(),i==null?void 0:i.apply(this,e)}}export{Ce as a,we as e,me as i,Re as s,Ne as t};
