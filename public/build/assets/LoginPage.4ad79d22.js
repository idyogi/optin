import{u,R as e}from"./app.556a3bcf.js";import{F as p}from"./reactstrap.modern.1d12cc3c.js";import"./index.04ccc04b.js";import"./popper.824c9986.js";import"./Transition.b01bfd7b.js";function w({config:a}){const{data:o,setData:s,post:d,processing:r,transform:f,errors:l}=u({}),m=(t,i)=>{const c={...o,[t]:i};s(c)},n=t=>{t.preventDefault(),console.log(a.app.url),d(a.app.url+"/login")};return e.createElement("div",null,e.createElement("div",{className:"min-h-screen w-full bg-gray-100 font-sans aliased flex flex-col"},e.createElement("div",{className:"flex-1 flex items-center bg-gray-100 py-12 relative"},e.createElement("div",{className:"h-1/2 w-full mx-auto bg-primary-600 absolute inset-x-0 top-0"}),e.createElement("div",{className:"max-w-xl mx-auto px-8 relative space-y-6"},e.createElement("h1",{className:"text-center text-3xl text-white font-medium"},e.createElement("a",{href:"/"},e.createElement("span",{className:"font-bold"},"Admin"),"Selvi")),e.createElement("div",{className:"rounded-lg shadow bg-white overflow-hidden divide-y divide-gray-200"},e.createElement("form",{onSubmit:n,className:"px-8 py-12 space-y-4"},e.createElement("div",{className:"px-4 "},l.email&&e.createElement("div",{id:"alert-2",className:"flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200",role:"alert"},e.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})),e.createElement("div",{className:"ml-3 text-sm font-medium text-red-700 dark:text-red-800"},e.createElement(p,null,l.email)))),e.createElement("h2",{className:"text-lg font-medium"}," Login "),e.createElement("div",null,e.createElement("label",{htmlFor:"email",className:"inline-block text-sm font-medium"}," Email address "),e.createElement("input",{type:"email",placeholder:"Enter your email",onChange:t=>m("email",t.target.value),className:"form-input border border-gray-300 w-full rounded-md shadow-sm mt-1"})),e.createElement("div",null,e.createElement("label",{htmlFor:"password",className:"inline-block text-sm font-medium"}," Password "),e.createElement("input",{type:"password",placeholder:"Enter your password",onChange:t=>m("password",t.target.value),className:"form-input border border-gray-300 w-full rounded-md shadow-sm mt-1"})),e.createElement("button",{onClick:n,disabled:r,className:"inline-flex items-center justify-center text-sm font-medium border rounded-md transition-all ease-in-out duration-100 focus:outline-none focus:shadow-outline border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-4 py-2 text-md flex w-full"},r?"Loading ...":"Masuk")))))))}export{w as default};
