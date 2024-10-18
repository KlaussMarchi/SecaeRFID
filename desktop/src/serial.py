import eel
import serial
import serial.tools.list_ports
from time import sleep

device = {
    'object'  : None,
    'baudRate': 9600,
    'port'    : 'COM10'
}

@eel.expose
def getSerialPorts():
    return [str(port).split(' ')[0] for port in serial.tools.list_ports.comports()]


@eel.expose
def connectDevice(port, baudRate=9600, timeout=5):
    global device
    print('tentando conexão na', port)
    
    if device['object'] and device['object'].is_open:
        return True

    try:
        device['object']   = serial.Serial(port, baudRate, timeout=timeout)
        device['port']     = port
        device['baudRate'] = baudRate
    except Exception as e:
        print(e)
        device['object'] = None
        return False

    return True


@eel.expose
def setSerial(msg):
    global device
    print('enviando mensagem:', msg)
    arduino = device.get('object')

    if arduino is None:
        return False

    try:
        msg = ('$' + msg.strip() + '!' + '\r\n').encode()
        arduino.write(msg)
    except Exception as e:
        print(e)
        return False
    
    return True


@eel.expose
def getSerial():
    global device
    arduino = device.get('object')
    print('procurando...')

    if arduino is None:
        return None

    try:
        response = arduino.readline().decode('utf-8').strip()
        inicial  = response.find('$')
        final    = response.find('!')

        if inicial == -1 or final == -1:
            return None
        
        return response[inicial+1:final]
    except Exception as e:
        print(e)
        return None


@eel.expose
def getSerialResponse(msg):
    if not setSerial(msg):
        return None
    
    return getSerial()

