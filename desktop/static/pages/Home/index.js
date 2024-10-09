async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function connectSerial(){
    await eel.connectDevice('COM11', 9600, 5)()
    await sleep(1000)

    const response = await eel.getSerialResponse('request')();
    alert(response)
}

document.getElementById("ConnectSerialBtn").addEventListener("click", connectSerial)

