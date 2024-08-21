import{_ as m,K as i,n as r,o as p,L as d,c as u,e as g,i as e,t as a,z as f,F as h}from"./index-aN_hNdHv.js";const n="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&w=1600",_={__name:"DemoBlockDemo",emits:["demo-loaded"],setup(k,{emit:c}){const{t:o,locale:v,messages:y}=i(),t=r(()=>`const catZoom = new SimpleZoom('.cat', {
  hoverScale: '200%', // ${o("magnifyTo2XOnHover")}
  clickScale: '800%' // ${o("magnifyTo8XOnMousedown")}
  // clickScale: '1000px' // ${o("canBeAbsoluteSize")}
})
console.log(catZoom) // ${o("openDevTools")}`),s=c;return p(()=>{s("demo-loaded",t.value)}),d(()=>{s("demo-loaded",t.value)}),(l,$)=>(u(),g(h,null,[e("h3",null,a(l.$t("catZoom")),1),e("ol",null,[e("li",null,a(l.$t("editCodeOptional")),1),e("li",null,a(l.$t("clickRun")),1),e("li",null,a(l.$t("seeWhatHappens")),1)]),e("figure",{class:"cat",style:f("background-image: url("+n+")")},[e("img",{src:n,alt:"A photo of a cat by Kelvin Valerio from Pexels",title:"Photo by Kelvin Valerio from Pexels",loading:"lazy"})],4)],64))}},B=m(_,[["__scopeId","data-v-819a99ed"]]);export{B as default};
