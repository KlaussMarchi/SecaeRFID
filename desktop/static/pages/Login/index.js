

async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function getCardID(){
    const response = await eel.getSerial()();

    if(!response || response.length < 5)
        return null

    return response.trim()
}

async function searchCardClick(){
    var input = document.getElementById('inputCard')
    input.value = 'carregando...'

    const response = await getCardID()

    if(!response)
        return await searchCardClick()

    input.value = response
    document.getElementById('nameInputReg').value = 'carregando...'
    document.getElementById('matInputReg').value  = 'carregando...'
    await findUser()
}

async function findUser(){
    let response = null
    const cardID = document.getElementById('inputCard').value.trim()
    const mat    = document.getElementById('matInputReg').value.trim()

    if(cardID.length == 0)
        response = await eel.findDatabaseRow('users', 'mat', mat)()
    else
        response = await eel.findDatabaseRow('users', 'id', cardID)()

    if(!response || !response.data)
        return alert('não encontrado')

    const user = response.data
    document.getElementById('inputCard').value = user.id
    document.getElementById('nameInputReg').value = user.name
    document.getElementById('matInputReg').value = user.mat
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
    const dropdown = document.getElementById("taskOptions");
    const selected = dropdown.options[dropdown.selectedIndex].value;

    const data = {
        name: document.getElementById('nameInputReg').value,
        mat: document.getElementById('matInputReg').value,
        id: document.getElementById('inputCard').value,
    }

    const response = await eel.addDatabaseRow(selected, data)()
    
    if(!response)
        alert('erro ao registrar')

    document.getElementById('nameInputReg').value = ''
    document.getElementById('matInputReg').value = ''
    document.getElementById('inputCard').value = ''
    alert('usuário registrado')
}

function goBack(){
    window.location.href = '../Home/index.html'
}

window.onload = function () {
    document.getElementById("searchUserButton").addEventListener("click", findUser);
    document.getElementById("seachCardButton").addEventListener("click", searchCardClick);
    document.getElementById("registerTask").addEventListener("click", registerTaskClick);
    document.getElementById("btnVoltar").addEventListener("click", goBack);

    importOptions()
};