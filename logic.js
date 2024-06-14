//css and html editing
ArrayOfCalcContent = ["Ac", "DEL", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
let box = document.querySelector(".box");
let result = document.querySelector(".result");
let theEqudiv = document.querySelector(".the-equ");
ArrayOfCalcContent.forEach(ele => {
    let Button = document.createElement("button");
    Button.appendChild(document.createTextNode(ele));
    box.appendChild(Button);
});
let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    if (button.innerHTML == "Ac") {
        button.className = "Ac";
    } else {
        button.className = "num";
    }
    if (button.innerHTML == "=") {
        button.className = "equal";
    }
    if (button.innerHTML == "+" || button.innerHTML == "-" || button.innerHTML == "*" || button.innerHTML == "/") {
        button.className = "op";
    }
    if (button.innerHTML == "DEL") {
        button.className = "delete";
    }
});
//print number in result div and remove 0 that writen by default
let numbersbutton = document.querySelectorAll(".num")
console.log(numbersbutton)
let ArraysofBuNumbers = Array.from(numbersbutton)
console.log(ArraysofBuNumbers)
let oper = document.querySelectorAll("button.op");
let ArraysofBuOper = Array.from(oper)
ArraysofBuOper.forEach((operbutton) => {
    operbutton.addEventListener("click", (e) => {
        if (operbutton.className === "op") {
            ArraysofBuOper.forEach((operbutton) => {
                operbutton.className = "op press-again"
            })
            theEqudiv.appendChild(document.createTextNode(result.innerHTML + e.target.innerHTML)) //8+
        } else {
            theEqudiv.innerHTML = result.innerHTML
            theEqudiv.appendChild(document.createTextNode(e.target.innerHTML))
        }
        if (result.innerHTML.length === theEqudiv.innerHTML.length-1) {
            ArraysofBuNumbers.forEach((numberbutton) => {
                numberbutton.className = "num clicked"
            })
        }
        equalbutton.className = "equal"
    })
})
ArraysofBuNumbers.forEach((numberbutton) => {
    numberbutton.addEventListener("click", (e) => {
        if (numberbutton.className == "num clicked") {
            result.innerHTML = ""
        }
        ArraysofBuNumbers.forEach((numberbutton) => {
            if (result.innerHTML == "0") {
                result.innerHTML = ""
            }
            numberbutton.className = "num"
        })
        result.appendChild(document.createTextNode(e.target.innerHTML));
    })
});

//deletebutton and and Acbutton
let deleteButton = document.querySelector(".delete")

let isAnimationRunning = false

deleteButton.onclick = () => {
    result.style.setProperty("animation", " blanking 0.5s ease-out  backwards")
    result.innerHTML = "0"
    isAnimationRunning = true
    setTimeout(() => {
            result.style.removeProperty("animation")
    }, 500);
    // isAnimationRunning && result.style.removeProperty("animation")
    // && bt4er ano 3yz ya3ml 7aga lw  true bs mlo4 t3wa bla false (for tips only not related to calc project) 
}
//Acbutton
let Acbutton = document.querySelector(".Ac")
let midsection = document.createElement("div")
midsection.className = "midsection"
box.appendChild(midsection)
Acbutton.onclick = () => {
    setTimeout(() => {
        result.style.setProperty("animation", " blanking 0.5s ease-out  backwards")
        theEqudiv.style.setProperty("animation", " blanking 0.5s ease-out  backwards")
    }, 0);
    result.innerHTML = "0"
    theEqudiv.innerHTML = ""
    isAnimationRunning = true
    if (isAnimationRunning = true) {
        result.style.removeProperty("animation")
        theEqudiv.style.removeProperty("animation")
    }
    equalbutton.className = "equal"
}
////////////////////////////mathmatic
function theFirstTerm() {
    let firstTerm = [];
    let ArrayFromTheequ = Array.from(theEqudiv.innerHTML)
    let check = /[-?\+?\*?\/?]/
    if (ArrayFromTheequ[0] == "-") {
        firstTerm.push("-")
        for (let i = 1; i < ArrayFromTheequ.length; i++) {
            if (check.test(ArrayFromTheequ[i])) {
                break;
            } else {
                firstTerm.push(ArrayFromTheequ[i])
            }
        }
    } else {
        for (let i = 0; i < ArrayFromTheequ.length; i++) {
            if (check.test(ArrayFromTheequ[i])) {
                break;
            } else {
                firstTerm.push(ArrayFromTheequ[i])
            }
        }
    }
    return firstTerm.join("")
}

function getlastterm() {
    let lastTerm = []
    let ArrayFromTheequ = Array.from(theEqudiv.innerHTML)
    check = /\d+[\-?\+?\*?\/?]/
    for (let i = theFirstTerm().length + 1; i < ArrayFromTheequ.length - 1; i++) {
        if (check.test(ArrayFromTheequ[i])) {
            lastTerm.push("")
        } else {
            lastTerm.push(ArrayFromTheequ[i])
        }
    }
    return lastTerm.join("")
}

let equalbutton = document.querySelector(".equal")
equalbutton.className = "equal"
equalbutton.addEventListener("click", (e) => {
    if (result.innerHTML.length !== "" && theEqudiv.innerHTML != "") {
        if (equalbutton.className == "equal" && equalbutton.className != "clicked") {
            theEqudiv.innerHTML = theEqudiv.innerHTML + result.innerHTML + equalbutton.innerHTML
            equalbutton.className = "equal clicked"
            let addtest = /(\d+)?(.)?\d+\+\d+(.)?(\d+)?/g
            if (addtest.test(theEqudiv.innerHTML)) {
                Add()
            }
            let ministest = /(\d+)?(.)?\d+\-\d+(.)?(\d+)?/g
            if (ministest.test(theEqudiv.innerHTML)) {
                minis()
            }
            let multitest = /(\d+)?(.)?\d+\*\d+(.)?(\d+)?/g
            if (multitest.test(theEqudiv.innerHTML)) {
                multi()
            }
            let divtest = /(\d+)?(.)?\d+\/\d+(.)?(\d+)?/g
            if (divtest.test(theEqudiv.innerHTML)) {
                div()
            }
            //function between happen depended on reqular ex
        }else{
            let ArrayFromTheequ = Array.from(theEqudiv.innerHTML)
            let ArrayFromfirstterm = Array.from(theFirstTerm())
            let check = ArrayFromTheequ.filter((ele, i) => {
                return ele !== ArrayFromfirstterm[i]
            })
            let lastTermWithopertor = check.join("")
            theEqudiv.innerHTML = ""
            theEqudiv.innerHTML = result.innerHTML + lastTermWithopertor
            let addtest = /(\-)?(\d+)?(.)?\d+\+\d+(.)?(\d+)?/g
            if (addtest.test(theEqudiv.innerHTML)) {
                Add()
            }
            let ministest = /(\-)?(\d+)?(.)?\d+\-\d+(.)?(\d+)?/g
            if (ministest.test(theEqudiv.innerHTML)) {
                minis()
            }
            let multitest = /(\d+)?(.)?\d+\*\d+(.)?(\d+)?/g
            if (multitest.test(theEqudiv.innerHTML)) {
                multi()
            }
            let divtest = /(\d+)?(.)?\d+\/\d+(.)?(\d+)?/g
            if (divtest.test(theEqudiv.innerHTML)) {
                div()
            }
        }
    }
});


function Add() {
    return result.innerHTML = Number(theFirstTerm()) + Number(getlastterm());
}

function minis() {
    return result.innerHTML = Number(theFirstTerm()) - Number(getlastterm());

}
function multi() {
    return result.innerHTML = Number(theFirstTerm()) * Number(getlastterm());
}
function div() {
    return result.innerHTML = Number(theFirstTerm()) / Number(getlastterm());
    
}

