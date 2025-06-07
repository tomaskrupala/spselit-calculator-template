const inputDisplay = document.getElementById("calculator-input");
const outputDisplay = document.getElementById("calculator-output");
const buttons = document.querySelectorAll("button");
const historyDisplay = document.getElementById("history-display");
const clearHistoryBtn = document.getElementById("clear-history-btn");

let vstup = "";
let vysledek = "";
let history = [];

const vypisHistorie = JSON.parse(localStorage.getItem("historiePoctu"));

function aktualizaceDisplayu() {
    inputDisplay.textContent = vstup || "0";
    outputDisplay.textContent = vysledek || "0";
}

window.onload = () => {
  const ulozenaHistorie = localStorage.getItem("historiePoctu");
  if (ulozenaHistorie) {
    history = JSON.parse(ulozenaHistorie);
    historyDisplay.innerHTML = history.map(item => `<p>${item}</p>`).join("");
  }
};

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        const id = button.id;
        if (value === "=") {
            try {
                vstup = vstup.replace("^", "**");
                console.log(vstup);
                vysledek = eval(vstup);
                if (vysledek % 2 !==0){
                    vysledek = Math.round(vysledek * 100) / 100;
                }
                history.push(`${vstup} = ${vysledek}`);
                console.log(history);
                aktualizaceDisplayu();
                vstup = vysledek.toString();
                localStorage.setItem("historiePoctu", JSON.stringify(history));
                historyDisplay.innerHTML = history.map(item => `<p>${item}</p>`).join("");
                console.log(localStorage);
            } catch (error) {
                outputDisplay.textContent = "Error";
            }
        } else if (id === "clear-all-btn") {
            vstup = "";
            vysledek = "";
            aktualizaceDisplayu();
        } else if (id === "clear-btn") {
            vstup = vstup.slice(0, -1);
            aktualizaceDisplayu();
        } else {
            vstup += value;
            aktualizaceDisplayu();
        }
    });
});

document.addEventListener("keydown", (event) => {
    const klavesa = event.key;
    if (klavesa === "Enter") {
        try {
            vstup = vstup.replace("^", "**");
            vysledek = eval(vstup);
            if (vysledek % 2 !==0){
                vysledek = Math.round(vysledek * 100) / 100; // zaokrouhlení na dvě desetinná místa
            }
            history.push(`${vstup} = ${vysledek}`);
            aktualizaceDisplayu();
            vstup = vysledek.toString();
        } catch (error) {
            outputDisplay.textContent = "Error";
        }
    } else if (klavesa === "Backspace") {
        vstup = vstup.slice(0, -1);
        aktualizaceDisplayu();
    } else if (klavesa === "Escape") {
        vstup = "";
        vysledek = "";
        aktualizaceDisplayu();
    } else if (/^[0-9+\-*/().^]$/.test(klavesa)) {
        vstup += klavesa;
        aktualizaceDisplayu();
    }
});

clearHistoryBtn.addEventListener("click", () => {
    history = [];
    localStorage.removeItem('historiePoctu');
    historyDisplay.innerHTML = "";
});