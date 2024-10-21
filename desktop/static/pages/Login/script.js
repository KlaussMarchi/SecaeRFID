

async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function disableButton(msg, button, sound){
    if(sound == 'good')
        eel.makeGoodBeep()()

    if(sound == 'bad')
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
    var button = document.getElementById('searchCardButton')
    var input = document.getElementById('inputCard')

    button.disabled = true
    input.value = 'procurando...'
    await sleep(1000)

    const response = await getCardID()

    if(!response){
        await disableButton('', button)
        return await searchCardClick()
    }
    
    input.value = response.trim()
    await findUser()
    button.disabled = false
}

async function findUser(){
    const button = document.getElementById('searchUserButton')
    button.disabled = true
    await sleep(1000)

    let response = null
    const cardID = document.getElementById('inputCard').value.trim()
    const mat    = document.getElementById('matInputReg').value.trim()

    if(cardID.length < 5 && mat.length < 5)
        return await disableButton('dados inválidos', button, 'bad')

    document.getElementById('nameInputReg').value = 'carregando...'
    document.getElementById('matInputReg').value  = 'carregando...'
    await sleep(1500)

    if(cardID.length < 5)
        response = await eel.findDatabaseRow('users', 'mat', mat)()
    else
        response = await eel.findDatabaseRow('users', 'id', cardID)()

    if(!response || !response.data)
        return await disableButton('usuário não encontrado', button, 'bad')

    const user = response.data
    document.getElementById('inputCard').value    = user.id
    document.getElementById('nameInputReg').value = user.name
    document.getElementById('matInputReg').value  = user.mat
    button.disabled = false
    eel.makeGoodBeep()()
}

async function importOptions() {
    const options = await eel.getActivities()()
    let dropdown = document.getElementById("taskOptions");

    for(let option of options){
        var optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.text  = option.label;
        dropdown.appendChild(optionElement);
    }
}

async function registerTaskClick(){
    var button = document.getElementById('registerTask')
    button.disabled = true

    const dropdown = document.getElementById("taskOptions");
    const selected = dropdown.options[dropdown.selectedIndex].value;

    const data = {
        name: document.getElementById('nameInputReg').value.trim(),
        mat:  document.getElementById('matInputReg').value.trim(),
        id:   document.getElementById('inputCard').value.trim(),
    }

    if(data.name.length < 5 || data.mat.length < 5)
        return await disableButton('dados inválidos', button, 'bad')

    const response = await eel.addDatabaseRow(selected, data)()
    
    if(!response)
        return await disableButton('erro ao registrar', button, 'bad')

    document.getElementById('nameInputReg').value = ''
    document.getElementById('matInputReg').value  = ''
    document.getElementById('inputCard').value    = ''
    await disableButton('usuário registrado', button, 'good')
}

window.onload = function () {
    importOptions()

    document.getElementById("searchUserButton").addEventListener("click", async () => await findUser());
    document.getElementById("searchCardButton").addEventListener("click", async () => await searchCardClick());
    document.getElementById("registerTask").addEventListener("click", async () => await registerTaskClick());
};