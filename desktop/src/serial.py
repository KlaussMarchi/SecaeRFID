import eel
import serial
import serial.tools.list_ports

device = {
    'object'  : None,
    'baudRate': 9600,
    'port'    : 'COM10'
}

@eel.expose
def getSerialPorts():
    return [str(port) for port in serial.tools.list_ports.comports()]


@eel.expose
def connectDevice(port, baudRate=9600, timeout=5):
    global device
    
    if device['object'] and device['object'].is_open:
        return True

    try:
        device['port'] = port
        device['baudRate'] = baudRate
        device['object'] = serial.Serial(port, baudRate, timeout=timeout)
    except Exception as e:
        print(e)
        device['object'] = None
        return False

    return True


@eel.expose
def setSerial(msg):
    global device

    if device.get('object') is None:
        return False

    try:
        msg = (msg.strip() + '\r\n').encode()
        device['object'].write(msg)
    except Exception as e:
        print(e)
        return False
    
    return True


@eel.expose
def getSerial():
    global device

    if device.get('object') is None:
        return None

    try:
        return device['object'].readline().decode('utf-8').strip()
    except Exception as e:
        print(e)
        return None


@eel.expose
def getSerialResponse(msg):
    if not setSerial(msg):
        return None
    
    return getSerial()

