import{t as c,e as b,a as l}from"../chunks/DSM1Hnoc.js";import{i as Q}from"../chunks/CgJQub2e.js";import{D as X,F as Z,G as r,I as v,l as i,w,J as t,q as n,K as $,M as I,N as ee}from"../chunks/cjYEsfxZ.js";import{s as j}from"../chunks/CA1a2pwv.js";import{i as M}from"../chunks/BA4079Wh.js";import{s as te,b as ae,a as C,e as D,i as G}from"../chunks/D_eQo-_2.js";var se=c('<h2 class="scanning-text svelte-vt77x5">VIBE SCANNING IN PROGRESS...</h2> <div class="progress-container svelte-vt77x5"><div class="progress-bar svelte-vt77x5"></div></div> <p class="scanning-details svelte-vt77x5"> </p>',1),ve=c('<span class="emoji svelte-vt77x5"> </span>'),oe=c(`<div class="emoji-rain svelte-vt77x5"></div> <h2 class="big-text wobble svelte-vt77x5">VIBE CHECK PASSED!</h2> <div class="certificate svelte-vt77x5"><p class="svelte-vt77x5">This certifies that you are</p> <h3 class="super-vibe svelte-vt77x5">SUPER VIBEY</h3> <p class="small-text svelte-vt77x5">Keep on vibin'</p></div> <div class="dad-joke-container svelte-vt77x5"><p class="dad-joke svelte-vt77x5"></p> <p class="small-text svelte-vt77x5">- Dad Bot</p></div> <button class="fun-button close-button svelte-vt77x5"><span class="button-text svelte-vt77x5">Close</span></button>`,1),le=c('<div class="confetti svelte-vt77x5"></div>'),re=c('<div class="confetti-container svelte-vt77x5"></div>'),ie=c('<div class="modal-overlay svelte-vt77x5"><div class="modal svelte-vt77x5"><div class="modal-content svelte-vt77x5"><!></div></div> <!></div>'),ne=c('<main class="svelte-vt77x5"><div class="container svelte-vt77x5"><h1 class="rainbow-header svelte-vt77x5">Vibe Stack Developer</h1> <button class="svelte-vt77x5">Vibe Check Me</button> <!></div></main>');function ue(J,S){X(S,!1);let _=w(!1),m=w(!1),o=w(0),g;function K(){n(o,0),n(_,!0),g=setInterval(()=>{n(o,i(o)+1),i(o)>=100&&(clearInterval(g),R())},20)}function R(){n(m,!0),setTimeout(()=>{n(m,!1)},5e3)}function A(){n(_,!1),n(m,!1),clearInterval(g)}const E=["Why do programmers prefer dark mode? Because light attracts bugs!","I told my wife she was drawing her eyebrows too high. She looked surprised!","What do you call a fake noodle? An impasta!","Why don't scientists trust atoms? Because they make up everything!","How do you organize a space party? You planet!"],W=E[Math.floor(Math.random()*E.length)];Q();var k=ne(),B=v(k),V=r(v(B),2),z=r(V,2);{var H=y=>{var h=ie(),x=v(h),N=v(x),T=v(N);{var Y=e=>{var a=se(),s=r($(a),2),d=v(s);t(s);var f=r(s,2),p=v(f);t(f),I(()=>{C(d,`width: ${i(o)??""}%`),j(p,`Analyzing swagger levels... ${i(o)??""}%`)}),l(e,a)},q=e=>{var a=oe(),s=$(a);D(s,4,()=>Array(10),G,(U,ce,P)=>{var u=ve();C(u,`animation-delay: ${P*.2}s;`);var L=v(u,!0);t(u),I(()=>j(L,["😎","🔥","✨","🚀","🤣","👑"][P%6])),l(U,u)}),t(s);var d=r(s,6),f=v(d);f.textContent=`"${W??""}"`,ee(2),t(d);var p=r(d,2);b("click",p,A),l(e,a)};M(T,e=>{i(o)<100?e(Y):e(q,!1)})}t(N),t(x);var F=r(x,2);{var O=e=>{var a=re();D(a,4,()=>Array(50),G,(s,d,f)=>{var p=le();I(()=>C(p,`
                  left: ${Math.random()*100}%; 
                  animation-delay: ${Math.random()*3}s;
                  background-color: ${["#fd6c6c","#5bff7f","#ffff5b","#5b8fff","#ff5bff"][f%5]??""};
                  width: ${5+Math.random()*10}px;
                  height: ${5+Math.random()*10}px;
                `)),l(s,p)}),t(a),l(e,a)};M(F,e=>{i(m)&&e(O)})}t(h),b("click",x,te(function(e){ae.call(this,S,e)})),b("click",h,A),l(y,h)};M(z,y=>{i(_)&&y(H)})}t(B),t(k),b("click",V,K),l(J,k),Z()}export{ue as component};
