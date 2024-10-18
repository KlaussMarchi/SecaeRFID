function logButton(){
    window.location.href = '../Login/index.html'
}

function registerButton(){
    window.location.href = '../Register/index.html'
}

function goBack(){
    window.location.href = '../../index.html'
}

window.onload = function () {
    document.getElementById("buttonLog").addEventListener("click", logButton);
    document.getElementById("buttonReg").addEventListener("click", registerButton);
    document.getElementById("btnVoltar").addEventListener("click", goBack);
};


