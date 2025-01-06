(()=>{const e="kmarBlogCache",t="https://id.v3/",s="X-Swpp-Invalid",n="X-Swpp-Time",a=e=>{const t=t=>{const s=e.value;if(Array.isArray(s)){for(let e of s)if(t(e))return!0;return!1}return t(s)};switch(e.flag){case"html":return e=>/\/$|\.html$/.test(e);case"suf":return e=>t((t=>e.endsWith(t)));case"pre":return e=>t((t=>e.startsWith(t)));case"str":return e=>t((t=>e.includes(t)));case"reg":return e=>t((t=>new RegExp(t,"i").test(e)));default:throw e}},r=t=>caches.match(t,{cacheName:e}),i=async(t,s,a)=>{if(a){const e=new Headers(s.headers);e.set(n,(new Date).toISOString()),s=new Response(s.body,{status:s.status,headers:e})}const r=await caches.open(e);await r.put(t,s)},l=e=>r(e).then((t=>{if(!t)return;const n=new Headers(t.headers);return n.set(s,"1"),i(e,new Response(t.body,{status:t.status,headers:n}))})),c=()=>r(t).then((e=>e?.json?.())),o=e=>(e.tp=Date.now(),i(t,new Response(JSON.stringify(e)))),u=async(e,t,...s)=>{s.length||(s=await clients.matchAll());const n={type:e,data:t};for(let e of s)e.postMessage(n)},h=async(s,n)=>{if(!n&&s&&Date.now()-s.tp<6e5)return;const r=await(await fetch("swpp/update.json",{priority:"high"})).json(),{global:i,info:c}=r,u={global:i,local:c[0].version,escape:0};if(!s)return await o(u),s?1:-1;if(s.global===i&&s.local===u.local)return;const h=[];for(let n of c){if(n.version===s.local){const s=[];return await caches.open(e).then((e=>e.keys())).then((async e=>{for(let n of e){const e=n.url;e!==t&&h.find((t=>t(e)))&&(await l(n),s.push(e))}})),s}const r=n.change;if(r)for(let e of r)h.push(a(e))}return await caches.delete(e).then((()=>o(u))),2},d=e=>{let t=e.request;if("GET"!==t.method||!t.url.startsWith("http"))return;const s=null;new URL((n=t.url).endsWith("/index.html")?n.substring(0,n.length-10):n.endsWith(".html")?n.substring(0,n.length-5):n);var n;const a=!1};self.addEventListener("install",(e=>{skipWaiting()})),self.addEventListener("activate",(e=>e.waitUntil(clients.claim()))),self.addEventListener("fetch",(e=>d(e))),self.addEventListener("periodicSync",(e=>{"update"===e.tag&&e.waitUntil(h(!0))})),self.addEventListener("message",(async e=>{if("update"===e.data.type){const e=await c(),t=await h(e);if(!t)return;switch(t){case-1:return u("new",null);case 1:return u("revise",null);case 2:return u("update",null);default:if(Array.isArray(t))return u("update",t)}}}))})();