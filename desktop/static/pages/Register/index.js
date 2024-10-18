async function getCardID(){
    const response = await eel.getSerial()();

    if(!response || response.length < 4)
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
}

async function registerUser(){
    const data = {
        name: document.getElementById('nameInputReg').value,
        mat: document.getElementById('matInputReg').value,
        id: document.getElementById('inputCard').value,
    }

    const response = await eel.addDatabaseRow('users', data)()

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
    document.getElementById("seachCardButton").addEventListener("click", searchCardClick);
    document.getElementById("registerUserButton").addEventListener("click", registerUser);
    document.getElementById("btnVoltar").addEventListener("click", goBack);
};

