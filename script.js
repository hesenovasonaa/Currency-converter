let user=document.querySelector(".input");
let user1=document.querySelector(".input1");
let rub=document.querySelector(".rub");
let rub1=document.querySelector(".rub1");
let usd=document.querySelector(".usd");
let usd1=document.querySelector(".usd1");
let eur=document.querySelector(".eur");
let eur1=document.querySelector(".eur1");
let gbp=document.querySelector(".gbp");
let gbp1=document.querySelector(".gbp1");
rub.addEventListener("click",()=>{});
rub1.addEventListener("click",()=>{});
usd.addEventListener("click",()=>{});
usd1.addEventListener("click",()=>{});
eur.addEventListener("click",()=>{});
eur1.addEventListener("click",()=>{});
gbp.addEventListener("click",()=>{});
gbp1.addEventListener("click",()=>{});
let web = document.querySelector(".web");
let news = {}; 
fetch(`https://api.exchangerate.host/live?access_key=cfd92779659d314ee189aaf8a4309c3a`)
.then(response=>response.json())
.then(data=>{
    news = data.quotes;
})
let keys="cfd92779659d314ee189aaf8a4309c3a";
let left = "RUB"; 
let right = "USD";
[rub, usd, eur, gbp].forEach(btn => {
    btn.addEventListener("click", () => {
        left = btn.textContent;
        [rub, usd, eur, gbp].forEach(b => {
            b.style.backgroundColor = "white"; 
            b.style.color = "#C6C6C6";        
        });
        btn.style.backgroundColor = "#833AE0";
        btn.style.color = "white";
    });
});
[rub1, usd1, eur1, gbp1].forEach(btn => {
    btn.addEventListener("click", () => {
        right = btn.textContent;
        [rub1, usd1, eur1, gbp1].forEach(b => {
            b.style.backgroundColor = "white"; 
            b.style.color = "#C6C6C6";        
        });
        btn.style.backgroundColor = "#833AE0";
        btn.style.color = "white";
    });
});
user.addEventListener("input", () => {
    user.value = user.value.replace(".", ",");
    let part = user.value.split(",");
    if (part.length === 2) {
        let after = "";
        for (let i = 0; i < part[1].length; i++) {
            if (i < 5) {
                after += part[1][i];
            }
        }
        user.value = part[0] + "," + after;
    }
});
user1.addEventListener("input", () => {
    user1.value = user1.value.replace(".", ",");
    let part = user1.value.split(",");
    if (part.length === 2) {
        let after = "";
        for (let i = 0; i < part[1].length; i++) {
            if (i < 5) {
                after += part[1][i];
            }
        }
        user1.value = part[0] + "," + after;
    }
});
function convert() {
    if (left === "" || right === ""){
        return;
    } 
    let fromInput;
    let toInput;
    let from;
    let to;
    if (activeInput === "left") {
        fromInput = user;
        toInput = user1;
        from = left;
        to = right;
    } else {
        fromInput = user1;
        toInput = user;
        from = right;
        to = left;
    }
    let value = fromInput.value.replace(",", ".");
    value = Number(value);
    if (isNaN(value)) {
        toInput.value = "";
        return;
    }
    if (from === to) {
        toInput.value = fromInput.value;
        return;
    }
    let a;
    if (from === "USD") {
        a = news["USD" + to];
    } 
    else if (to === "USD") {
        a = 1 / news["USD" + from];
    } 
    else {
        a= news["USD" + to] / news["USD" + from];
    }
    let result = value * a;
    toInput.value = result
        .toFixed(5)
        .replace(".", ",")
        .replace(/,?0+$/, "");
}
function check() {
    if (!navigator.onLine) {
        web.style.display = "block";
        return false;
    } else {
        web.style.display = "none";
        return true;
    }
}
check();
window.addEventListener("offline", check);
window.addEventListener("online", check);
const c = convert;
convert = function () {
    if (left === right) {
        c();
        return;
    }
    if (!navigator.onLine) {
        return;
    }
    if (!news || Object.keys(news).length === 0) {
        return;
    }
    c();
};
user.addEventListener("input", () => {
    activeInput = "left";
    convert();
});
user1.addEventListener("input", () => {
    activeInput = "right";
    convert();
});
[rub, usd, eur, gbp].forEach(btn => {
    btn.addEventListener("click", convert);
});
[rub1, usd1, eur1, gbp1].forEach(btn => {
    btn.addEventListener("click", convert);
});





