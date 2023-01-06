import{r as u,R as e,u as m}from"./app.556a3bcf.js";import"./react-toastify.esm.ea0b512f.js";import{b as g}from"./switch.ba69350b.js";import"./clsx.m.256e9345.js";import"./keyboard.21bc586a.js";function b({name:s,value:n,onChanged:r}){const[t,i]=u.exports.useState(n);function l(){i(!t),r(s,!t)}return e.createElement("div",null,e.createElement(g,{checked:t,onChange:l,className:`${t?"bg-indigo-600":"bg-gray-200"} z-0
          inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}," ",e.createElement("span",{className:"sr-only"},"Use setting"),e.createElement("span",{"aria-hidden":"true",className:`${t?"translate-x-5":"translate-x-0"}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`})))}function v({form:s,setting:n,transform:r}){const{data:t,setData:i}=m({title:n.title,slug:n.slug,settings:n.settings});m({});function l(a,o){i(a,o),a==="title"&&r({title:o,slug:t.slug,settings:t.settings}),a==="slug"&&r({title:t.title,slug:o,settings:t.settings}),a==="enableCookies"&&(t.settings.enableCookies=o,r({settings:t.settings,title:t.title,slug:t.slug}))}async function d(){return confirm("Are you sure?")?(window.location.href="/panel/forms/"+s.uuid+"/delete",!0):!1}async function c(){return window.location.href="/panel/forms/"+s.uuid+"/duplicate",!0}return e.createElement("div",null,e.createElement("div",{className:"bg-white shadow-xl sm:rounded-lg p-6"},e.createElement("div",{className:"relative mt-3 mb-4"},e.createElement("div",{className:"absolute inset-0 flex items-center","aria-hidden":"true"},e.createElement("div",{className:"w-full border-t border-gray-300"})),e.createElement("div",{className:"relative flex justify-start"},e.createElement("span",{className:"pr-3 bg-white text-lg font-medium text-gray-900"}," Form Meta "))),e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"mb-3",htmlFor:"title"},"Title Form"),e.createElement("input",{type:"text",name:"title",id:"title",value:t.title,onChange:a=>l("title",a.target.value),className:"focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 mt-2 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded",placeholder:"Untitled Form"})),e.createElement("div",{className:"flex items-center"},e.createElement(b,{name:"enableCookies",value:t.settings.enableCookies,onChanged:l}),e.createElement("span",{className:"ml-3",id:"toggleLabel"},e.createElement("span",{className:"text-sm font-medium text-gray-900"},"Aktifkan Session "))),e.createElement("span",{className:"text-sm mt-3 text-gray-500"},"jika session di aktifkan, maka lead yang sudah isi form akan langsung di redirect ke halaman response"),e.createElement("div",{className:"relative mt-10 mb-4"},e.createElement("div",{className:"absolute inset-0 flex items-center","aria-hidden":"true"},e.createElement("div",{className:"w-full border-t border-gray-300"})),e.createElement("div",{className:"relative flex justify-start"},e.createElement("span",{className:"pr-3 bg-white text-lg font-medium text-gray-900"}," Domain Setting "))),e.createElement("div",null,e.createElement("div",{className:"flex flex-wrap"},e.createElement("div",{className:"w-1/2"},e.createElement("div",{className:""},e.createElement("label",{className:"mb-3",htmlFor:""},"Domain"),e.createElement("div",{className:"relative rounded-md shadow-sm"},e.createElement("input",{type:"text",value:window.location.origin+"/form/",disabled:!0,className:"focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none mt-2 w-full py-1 rounded-tl-none rounded-bl-none border-l-0 px-2 mb-1 text-base leading-normal bg-white text-gray-500 sm:text-sm border border-gray-200 rounded"})))),e.createElement("div",{className:"w-1/2"},e.createElement("div",{className:""},e.createElement("label",{className:"mb-3",htmlFor:""},"Slug"),e.createElement("div",{className:"relative rounded-md shadow-sm"},e.createElement("div",{className:"absolute inset-y-0 left-0 pr-3 flex items-center pointer-events-none"}),e.createElement("input",{type:"text",value:t.slug,onChange:a=>l("slug",a.target.value),className:"focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none mt-2 w-full py-1 rounded-tl-none rounded-bl-none border-l-0 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded",placeholder:"Slug"}))))),e.createElement("p",{id:"url-alert"})),e.createElement("div",{className:"mt-10"},e.createElement("button",{type:"button",onClick:d,className:"text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"},"Hapus Form"),e.createElement("button",{type:"button",onClick:c,className:"text-sky-700 hover:text-white border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-sky-500 dark:hover:text-white dark:hover:bg-sky-600 dark:focus:ring-sky-900"},"Duplikat Form"))))}export{v as default};
