searching = false

async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function disableButton(msg, button, sound=false){
    if(sound && sound == 'good')
        eel.makeGoodBeep()()

    if(sound && sound == 'bad')
        eel.makeBadBeep()()

    if(msg.length > 5)
        alert(msg)

    await sleep(1500)
    button.disabled = false
}

async function getCardID(){
    const response = await eel.getSerial()();

    if(!response)
        return null

    const value = response.trim()

    if(value.length < 5)
        return null

    return value
}

async function searchCardClick(){
    var button = document.getElementById('seachCardButton')
    var input = document.getElementById('inputCard')

    button.disabled = true
    input.value = 'procurando...'
    await sleep(1000)

    let response = false
    searching = true

    while(!response && searching){
        response = await getCardID()
        await sleep(500)
    }
    
    if(!response)
        return await disableButton('', button)

    input.value = response.trim()
    eel.makeGoodBeep()
    await sleep(1500)
    button.disabled = false
}

async function registerUser(){
    var button = document.getElementById('registerUserButton')
    button.disabled = true
    await sleep(1500)

    const data = {
        name: document.getElementById('nameInputReg').value.toUpperCase().trim(),
        mat:  document.getElementById('matInputReg').value.replace(' ', '').trim(),
        id:   document.getElementById('inputCard').value.trim(),
    }

    if(data.name.length < 5 || data.mat.length < 5)
        return await disableButton('dados inválidos', button, 'bad')

    const response = await eel.addDatabaseRow('users', data)()

    if(!response)
        return await disableButton('usuário não encontrado', button, 'bad')

    document.getElementById('nameInputReg').value = ''
    document.getElementById('matInputReg').value = ''
    document.getElementById('inputCard').value = ''
    await disableButton('usuário registrado', button, 'good')
}

async function cleanCard() {
    document.getElementById('nameInputReg').value = ''
    document.getElementById('matInputReg').value  = ''
    document.getElementById('inputCard').value    = ''
    searching = false
}

window.onload = function () {
    document.getElementById("seachCardButton").addEventListener("click", async () => await searchCardClick());
    document.getElementById("registerUserButton").addEventListener("click", async () => await registerUser());
    document.getElementById("cleanCardButton").addEventListener("click", async () => await cleanCard());
};

