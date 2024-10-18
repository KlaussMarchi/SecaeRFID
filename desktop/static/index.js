async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}


async function getAllPorts() {
    const response = await eel.getSerialPorts()();
    let dropdown = document.getElementById("opcoes");

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
        return
    }

    const response = await eel.getSerialResponse('check')()

    if(!response || response.length == 0)
        return await testSerialCom()

    input.value = response
}

async function handleNextPage(){
    window.location.href = '../pages/Home/index.html'
}


window.onload = function () {
    getAllPorts();
    
    document.getElementById("changeTextBtn").addEventListener("click", handleNextPage);
    document.getElementById("sendButtonForm").addEventListener("click", async () => await testSerialCom());
};


