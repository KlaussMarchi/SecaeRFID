async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function connectSerial(){
    alert("conectando")
    await eel.connectSerial('COM11')()
    await sleep(1000)

    const response = await eel.getSerialResponse('COM11')();
    alert(response)
}

async function callPython(){
    const response = await eel.getSerialPorts()();
    document.getElementById("heading").textContent = response;    

    await sleep(3000)
    window.location.href = '../pages/Home/index.html'
}


document.getElementById("changeTextBtn").addEventListener("click", callPython)

