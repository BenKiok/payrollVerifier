(()=>{"use strict";var e;const t={shift:function(e,t){var a=60*Number(e[0])+Number(e[1]),n=60*Number(t[0])+Number(t[1]);return a="PM"===e[2]?a+720:a,((n="PM"===t[2]?n+720:n)-a)/60},wage:function(e,t){return e*t},tax:e={fed:function(e){return.03375*e},medicare:function(e){return.0145*e},socialSecurity:function(e){return.062*e},state:function(e){return.04616667*e},medLeave:function(e){return.00248*e},famLeave:function(e){return.0013*e}},netPay:function(t){var a=t;return a-=e.fed(t),a-=e.medicare(t),a-=e.socialSecurity(t),a-=e.state(t),(a-=e.medLeave(t))-e.famLeave(t)}};var a,n,i,o,r,c,l,d,u,s,m,h,v;const x=(a=document.createElement("div"),n=document.createElement("h1"),i=document.createElement("h2"),o=document.createElement("h3"),r=document.createElement("section"),c=document.createElement("input"),l=document.createElement("input"),d=document.createElement("select"),u=document.createElement("select"),s=document.createElement("option"),m=document.createElement("option"),h=document.createElement("option"),v=document.createElement("button"),a.id="form",n.innerText="Check that paycheck...",i.innerText="What time did you work?",o.innerText="to",c.type="number",c.min="1",c.max="12",l.type="number",l.min="00",l.max="59",d.id="start",u.id="end",s.value="",s.innerText="--",m.value="AM",m.innerText="AM",h.value="PM",h.innerText="PM",v.id="add",v.innerText="Add Shift",d.append(s,m,h),u.append(s.cloneNode(!0),m.cloneNode(!0),h.cloneNode(!0)),r.append(c,l,d,o,c.cloneNode(),l.cloneNode(),u,v),a.append(n,i,r),a),f=function(){var e=document.createElement("div"),t=document.createElement("h2"),a=document.createElement("ul"),n=document.createElement("button");return e.id="list",t.innerText="Shifts",n.id="submit",n.innerText="Calculate Pay",e.append(t,a,n),e}(),N=((y=document.createElement("h1")).id="loading",y.innerText="Loading",y);var y;const p=function(){var e=document.createElement("div"),t=document.createElement("h1"),a=document.createElement("h2"),n=document.createElement("h2"),i=document.createElement("h2"),o=document.createElement("h3"),r=document.createElement("ul"),c=document.createElement("h2"),l=document.createElement("button"),d=["Federal Withholding:","Medicare:","Social Security:","MA State Withholding:","Medical Leave:","Family Leave:"];e.id="results",t.innerText="Payroll Summary",a.innerText="Total hours worked:",n.innerText="Total pay:",i.innerText="Taxes";for(var u=0;u<6;u++){var s=document.createElement("li");s.innerText=d[u],r.appendChild(s)}return o.innerText="Total taxes paid:",c.innerText="Net pay:",l.id="startOver",l.innerText="Start Over",e.append(t,a,n,i,r,o,c,l),e}();var T=document.querySelector("#app"),E={shifts:[],totalHrs:0,payrate:18,totalPay:0,netPay:0,taxes:{federal:0,medicare:0,socialSecurity:0,state:0,medLeave:0,famLeave:0,total:0}},S={forSubmit:!1,forStartOver:!1};T.append(x),document.querySelectorAll("input")[0].addEventListener("input",(function(){Number(this.value)>12&&(this.value=12)})),document.querySelectorAll("input")[1].addEventListener("input",(function(){var e="";if(!isNaN(this.value)&&this.value.length<=1)this.value="0"+this.value;else for(;"0"===this.value[0];){for(var t=1;t<this.value.length;t++)e+=this.value[t];this.value=e,e=""}Number(this.value)>59&&(this.value=59)})),document.querySelectorAll("input")[2].addEventListener("input",(function(){Number(this.value)>12&&(this.value=12)})),document.querySelectorAll("input")[3].addEventListener("input",(function(){var e="";if(!isNaN(this.value)&&this.value.length<=1)this.value="0"+this.value;else for(;"0"===this.value[0];){for(var t=1;t<this.value.length;t++)e+=this.value[t];this.value=e,e=""}Number(this.value)>59&&(this.value=59)})),document.querySelector("#add").addEventListener("click",(function(){for(var e=x.querySelector("section"),a=[],n=[],i=0,o=!0,r=0;r<e.childNodes.length;r++)3!==r&&7!==r&&(e.childNodes[r].value||(o=!1));if(o){a[0]=e.childNodes[0].value,a[1]=e.childNodes[1].value,a[2]=e.childNodes[2].value,n[0]=e.childNodes[4].value,n[1]=e.childNodes[5].value,n[2]=e.childNodes[6].value,i=(i=t.shift(a,n))<0?i+24:i,document.querySelector("#list")||(T.appendChild(f),S.forSubmit||(document.querySelector("#submit").addEventListener("click",(function(){var e;x.remove(),f.remove(),T.appendChild(N),e=setInterval((function(){N.innerText.length<10?N.innerText+=".":N.innerText="Loading"}),600),E.shifts.forEach((function(e){E.totalHrs+=e})),E.totalHrs=E.totalHrs.toFixed(2),E.totalPay=t.wage(E.totalHrs,E.payrate).toFixed(2),E.taxes.federal=t.tax.fed(E.totalPay).toFixed(2),E.taxes.medicare=t.tax.medicare(E.totalPay).toFixed(2),E.taxes.socialSecurity=t.tax.socialSecurity(E.totalPay).toFixed(2),E.taxes.state=t.tax.state(E.totalPay).toFixed(2),E.taxes.medLeave=t.tax.medLeave(E.totalPay).toFixed(2),E.taxes.famLeave=t.tax.famLeave(E.totalPay).toFixed(2),E.taxes.total=Number(E.taxes.federal)+Number(E.taxes.medicare)+Number(E.taxes.socialSecurity)+Number(E.taxes.state)+Number(E.taxes.medLeave)+Number(E.taxes.famLeave),E.taxes.total=E.taxes.total.toFixed(2),E.netPay=(E.totalPay-E.taxes.total).toFixed(2),p.childNodes[1].innerText+=" ".concat(E.totalHrs),p.childNodes[2].innerText+=" $".concat(E.totalPay),p.childNodes[4].childNodes[0].innerText+=" $".concat(E.taxes.federal),p.childNodes[4].childNodes[1].innerText+=" $".concat(E.taxes.medicare),p.childNodes[4].childNodes[2].innerText+=" $".concat(E.taxes.socialSecurity),p.childNodes[4].childNodes[3].innerText+=" $".concat(E.taxes.state),p.childNodes[4].childNodes[4].innerText+=" $".concat(E.taxes.medLeave),p.childNodes[4].childNodes[5].innerText+=" $".concat(E.taxes.famLeave),p.childNodes[5].innerText+=" $".concat(E.taxes.total),p.childNodes[6].innerText+=" $".concat(E.netPay),setTimeout((function(){clearInterval(e),N.remove(),T.append(p),S.forStartOver||(document.querySelector("#startOver").addEventListener("click",(function(){E.shifts=[],E.totalHrs=0,E.totalPay=0,E.netPay=0,E.taxes.federal=0,E.taxes.medicare=0,E.taxes.socialSecurity=0,E.taxes.state=0,E.taxes.medLeave=0,E.taxes.famLeave=0,p.childNodes[1].innerText="Total hours worked:",p.childNodes[2].innerText="Total pay:",p.childNodes[4].childNodes[0].innerText="Federal Withholding:",p.childNodes[4].childNodes[1].innerText="Medicare:",p.childNodes[4].childNodes[2].innerText="Social Security:",p.childNodes[4].childNodes[3].innerText="MA State Withholding:",p.childNodes[4].childNodes[4].innerText="Medical Leave:",p.childNodes[4].childNodes[5].innerText="Family Leave:",p.childNodes[5].innerText="Total taxes paid:",p.childNodes[6].innerText="Net pay:",p.remove(),Array.from(f.querySelector("ul").childNodes).forEach((function(e){e.remove()})),T.appendChild(x)})),S.forStartOver=!0)}),3e3)})),S.forSubmit=!0));var c=document.createElement("li");c.innerText="".concat(a[0],":").concat(a[1]," ").concat(a[2]," to ").concat(n[0],":").concat(n[1]," ").concat(n[2]),c.addEventListener("click",(function(){confirm("Do you want to remove this shift from the list?")&&(E.shifts.splice(Array.from(document.querySelector("#list ul").childNodes).indexOf(c),1),c.remove(),document.querySelector("#list ul").childNodes.length||f.remove())})),document.querySelector("#list ul").appendChild(c),E.shifts.push(i);for(var l=0;l<e.childNodes.length;l++)3!==l&&7!==l&&(e.childNodes[l].value="")}else alert("Please fill out all blank spaces.")}))})();