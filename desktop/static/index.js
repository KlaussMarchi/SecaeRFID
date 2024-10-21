async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function getAllPorts() {
    let response = await eel.getSerialPorts()();
    let dropdown = document.getElementById("opcoes");

    if(response.length == 0)
        response = ['N/A']

    for(let x=0; x<response.length; x++){
        const port = response[x]
        var optionElement = document.createElement("option");
        optionElement.value = port;
        optionElement.text  = port;
        dropdown.appendChild(optionElement);
    }
}

async function testSerialCom(){
    var input = document.getElementById("meuInputForm")
    input.value = 'carregando...'

    const dropdown = document.getElementById("opcoes");
    const selectedPort = dropdown.options[dropdown.selectedIndex].value;
    const success = await eel.connectDevice(selectedPort)();

    if(!success){
        input.value = 'erro ao conectar'
        return await eel.makeBadBeep()();
    }

    const response = await eel.getSerialResponse('check')()

    if(!response || response.length == 0){
        await sleep(500)
        return await testSerialCom()
    }

    input.value = response
    await eel.makeGoodBeep()()
}


window.onload = function () {
    getAllPorts();
    
    document.getElementById("changeTextBtn").addEventListener("click", () => {
        window.location.href = '../pages/Home/index.html'
    })

    document.getElementById("sendButtonForm").addEventListener("click", async () => {
        var button = document.getElementById('sendButtonForm')
        button.disabled = true
        button.style.opacity = 0.8;
        button.style.cursor = 'not-allowed';
        await testSerialCom()
        await sleep(1000)
        button.disabled = false
        button.style.opacity = 1;
        button.style.cursor = 'pointer';
    })
};


