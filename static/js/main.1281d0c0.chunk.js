(this["webpackJsonplatex-matrix-generatorr"]=this["webpackJsonplatex-matrix-generatorr"]||[]).push([[0],{17:function(e,t,a){},18:function(e,t,a){},24:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(11),r=a.n(s),l=(a(17),a(6)),i=(a(18),a(26)),o=a(28),j=a(29),h=a(27),u=a(12),b=(a(19),a(1));function d(e,t){var a="\\"+(t?"begin":"end")+"{",n=e.split("_");switch(n[0]){case"parentheses":a+="pmatrix";break;case"brackets":a+="bmatrix";break;case"determinant":a+="vmatrix";break;case"ddeterminant":a+="Vmatrix"}return n.length>1?"right"==n[1]&&(a+="*}"+(t?"[r]":"")):a+="}",a+="\n"}function x(e){return Object(b.jsx)("input",{className:" ",onFocus:function(e){return e.target.select()},style:{width:"50px",height:"40px",fontSize:"14px"},value:e.value,onChange:e.onChange})}var m=function(){for(var e=Object(n.useState)(3),t=Object(l.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(3),r=Object(l.a)(s,2),m=r[0],O=r[1],f=Object(n.useState)([["","",""],["","",""],["","",""]]),v=Object(l.a)(f,2),p=v[0],g=v[1],N=Object(n.useState)("parentheses"),C=Object(l.a)(N,2),k=C[0],y=C[1],w=Object(n.useState)(!1),S=Object(l.a)(w,2),A=S[0],I=S[1],L=Object(n.useState)("A"),G=Object(l.a)(L,2),z=G[0],B=G[1],D=[],M=function(e){for(var t=[Object(b.jsx)("th",{className:"text-end pe-3",onClick:function(){for(var t=[],a=0;a<p.length;a++)t[a]=p[a].slice();t[e]=new Array(m).fill(""),g(t)},style:{width:"50px",height:"40px",cursor:"not-allowed"},children:e+1})],a=function(a){t.push(Object(b.jsx)("td",{children:Object(b.jsx)(x,{value:p[e][a],onChange:function(t){for(var n=[],c=0;c<p.length;c++)n[c]=p[c].slice();n[e][a]=t.target.value,g(n)}})}))},n=0;n<m;n++)a(n);D.push(Object(b.jsx)("tr",{children:t}))},T=0;T<a;T++)M(T);var _=function(e,t,a,n){var c="";"none"!=n&&(c+=d(n,!0));for(var s=0;s<t;s++){for(var r=0;r<a;r++)c+=e[s][r],r!=a-1&&(c+=" & ");c+=" \\\\ \n"}return"none"!=n&&(c+=d(n,!1)),c}(p,a,m,k+(A?"_right":""));function J(e){if(p.length<e){for(var t=[],a=0;a<p.length;a++)t[a]=p[a].slice();for(;t.length<e;)t.push(new Array(m).fill(""));g(t)}c(e)}function R(e){if(p[0].length<e){for(var t=[],a=0;a<p.length;a++)for(t[a]=p[a].slice();t[a].length<e;)t[a].push("");g(t)}O(e)}return Object(b.jsxs)(i.a,{className:"mb-5",children:[Object(b.jsx)("h1",{className:"text-center mt-3",children:"LaTeX Matrix Generator"}),Object(b.jsxs)("div",{className:"w-50 mx-auto mt-5",children:[Object(b.jsxs)(o.a,{className:"d-flex",children:[Object(b.jsx)(o.a.Label,{column:!0,sm:3,className:"me-3 my-auto align-middle",children:Object(b.jsx)("strong",{children:"Rows: "})}),Object(b.jsx)(o.a.Control,{column:!0,sm:3,type:"number",value:a,onChange:function(e){J(parseInt(e.target.value))},style:{width:"200px"},min:"0","data-bind":"value:replyNumber"}),Object(b.jsxs)(o.a.Group,{column:!0,sm:3,className:"ms-3",children:[Object(b.jsx)(j.a,{variant:"success",className:"me-3",onClick:function(e){J(a+1)},children:"Add"}),Object(b.jsx)(j.a,{variant:"danger",onClick:function(e){a>0&&c(a-1)},children:"Sub"})]})]}),Object(b.jsxs)(o.a,{className:"d-flex mt-3",children:[Object(b.jsx)(o.a.Label,{column:!0,sm:3,className:"me-3 my-auto align-middle",children:Object(b.jsx)("strong",{children:"Columns: "})}),Object(b.jsx)(o.a.Control,{column:!0,sm:3,type:"number",value:m,onChange:function(e){R(parseInt(e.target.value))},style:{width:"200px"}}),Object(b.jsxs)(o.a.Group,{column:!0,sm:3,className:"ms-3",children:[Object(b.jsx)(j.a,{variant:"success",className:"me-3",onClick:function(e){R(m+1)},children:"Add"}),Object(b.jsx)(j.a,{variant:"danger",onClick:function(e){m>0&&R(m-1)},children:"Sub"})]})]})]}),Object(b.jsxs)(h.a,{className:"mx-auto mt-5",children:[Object(b.jsx)(u.a,{xs:6,children:Object(b.jsxs)(h.a,{children:[Object(b.jsx)(u.a,{xs:9,children:Object(b.jsxs)("table",{className:"mx-auto",children:[Object(b.jsx)("thead",{className:"text-center",style:{fontSize:"0.9rem"},children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{}),Array(m).fill(0).map((function(e,t){return Object(b.jsx)("th",{style:{cursor:"not-allowed"},className:"pb-1",onClick:function(){for(var e=[],n=0;n<p.length;n++)e[n]=p[n].slice();for(var c=0;c<a;c++)e[c][t]="";g(e)},children:t+1})}))]})}),Object(b.jsx)("tbody",{children:D})]})}),Object(b.jsx)(u.a,{xs:3,children:Object(b.jsxs)("div",{className:"d-flex flex-column",children:[Object(b.jsxs)(o.a.Control,{as:"select",className:"mb-3",value:k,onChange:function(e){y(e.target.value)},children:[Object(b.jsx)("option",{value:"parentheses",children:"Parentheses"}),Object(b.jsx)("option",{value:"brackets",children:"Brackets"}),Object(b.jsx)("option",{value:"determinant",children:"Determinant"}),Object(b.jsx)("option",{value:"ddeterminant",children:"DDeterminant"}),Object(b.jsx)("option",{value:"none",children:"None"})]}),Object(b.jsx)(o.a.Group,{className:"mb-3",controlId:"formBasicCheckbox",children:Object(b.jsx)(o.a.Check,{type:"checkbox",label:"Right Align",checked:A,onClick:function(e){I(e.target.checked)}})}),Object(b.jsx)(j.a,{variant:"success",className:"mb-3",onClick:function(){navigator.clipboard.writeText(_)},children:"Copy LaTeX"}),Object(b.jsx)(j.a,{className:"mb-3",variant:"danger",onClick:function(){for(var e=[],t=0;t<a;t++)e.push(new Array(m).fill(""));g(e)},children:"Clear Matrix"}),Object(b.jsx)("hr",{}),Object(b.jsxs)(o.a,{className:"d-flex mb-3",children:[Object(b.jsx)(o.a.Label,{className:"me-3 my-auto align-middle",children:"Name: "}),Object(b.jsx)(o.a.Control,{type:"input",value:z,onChange:function(e){B(e.target.value)},style:{width:"75px"}})]}),Object(b.jsx)(j.a,{className:"mb-3",variant:"success",onClick:function(){for(var e=[],t=0;t<p.length;t++)e[t]=p[t].slice();for(var n=0;n<a;n++)for(var c=0;c<m;c++)e[n][c]=z+"_{"+(n+1)+(c+1)+"}";g(e)},children:"Set Indices"})]})})]})}),Object(b.jsx)(u.a,{xs:6,children:Object(b.jsx)("textarea",{readOnly:!0,className:"d-block w-50 mx-auto",value:_,style:{height:"300px",fontSize:"14px"}})})]})]})};r.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(m,{})}),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.1281d0c0.chunk.js.map