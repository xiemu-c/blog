document.addEventListener("DOMContentLoaded",(()=>{const e=navigator.serviceWorker?.controller;if(!e)return;const t=e=>{const t=e.endsWith("js")?"script":"link",o="link"===t?"href":"src";for(let r of document.getElementsByTagName(t)){const n=r[o];if(e.length>n?e.endsWith(n):n.endsWith(e)){const e=document.createElement(t),o=r.textContent||r.innerHTML||"";return Array.from(r.attributes).forEach((t=>e.setAttribute(t.name,t.value))),e.appendChild(document.createTextNode(o)),void r.parentNode.replaceChildren(e,r)}}},o="updated",r=()=>console.log("版本更新成功");var n;sessionStorage.getItem(o)?(r(),sessionStorage.removeItem(o)):(n="update",navigator.serviceWorker.controller.postMessage(n)),navigator.serviceWorker.addEventListener("message",(e=>{(e=>{const n=e.data;sessionStorage.setItem(o,n.type);const s=n.data?.filter((e=>/\.(js|css)$/.test(e)));s?.length?(window.Pjax?.isSupported?.()&&s.forEach(t),location.reload()):(r(),sessionStorage.removeItem(o))})()}))}));