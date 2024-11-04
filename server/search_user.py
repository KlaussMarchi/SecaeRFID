import requests, webbrowser


url = r'https://xi-secae-default-rtdb.firebaseio.com/'
print('coletando dados, aguarde...')
allUsers = requests.get(url + 'users.json', timeout=10).json()


while True:
    searchValue = input('digite o valor: ').upper().strip()
    print()
    found = []

    for id, data in allUsers.items():
        for key in data.keys():
            if data.get(key) is None:
                continue
            
            if searchValue in data[key]:
                newData = data.copy()
                newData['key'] = id
                found.append(newData)
    
    for i, option in enumerate(found):
        print(f"[{i+1}] {option['name']} | {option['mat']} | {option['id']} | {option['key']}")

    print(f'[{len(found)+1}] REINICIAR PROGRAMA')
    choice = input('sua opção: ')
    choice = -1 if not choice.isdigit() else int(choice) - 1

    if choice == len(found) or choice == -1:
        print()
        continue
    
    target = found[choice]
    newURL = url + 'users/' + target['key']
    print('abrindo', newURL)
    webbrowser.open(newURL)
    print()

