#include <SPI.h>
#include <MFRC522.h>

#define SDA_PIN 10
#define RST_PIN 9
#define BUZZER 3

MFRC522 rfid(SDA_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

String getSerial(){
    String response = Serial.readString();
    int inicial = response.indexOf("$");
    int final   = response.indexOf("!");

    if(inicial == -1 || final == -1)
        return "-1";

    return response.substring(inicial+1, final);
}

void writeSerial(String text){
    text.trim();
    Serial.println("$" + text + "!");
}

void handleSerialTest(){
    if(!Serial.available())
        return;

    String response = getSerial();
    writeSerial("connected");
}

void setup() {
    Serial.begin(9600);
    SPI.begin();        
    rfid.PCD_Init(); 
}

void loop() {
    handleSerialTest();

    if(!isCardAvailable())
        return;

    String ID = readRFID();

    if(!isValidID(ID))
        return;
    
    writeSerial(ID);
    tone(BUZZER, 5000);
    delay(500);
    noTone(BUZZER);
    delay(5000);
}

bool isCardAvailable(){
    if(!rfid.PICC_IsNewCardPresent())
        return false;

    if(!rfid.PICC_ReadCardSerial())
        return false;
    
    return true;
}

String readRFID(){
    String content = "";

    for (byte i = 0; i < rfid.uid.size; i++) {
        content += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
        content += String(rfid.uid.uidByte[i], HEX);
    }
    
    content.toUpperCase();
    content.trim();
    return content;
}

bool isValidID(String cardID){
    if(cardID == "-1")
        return false;
    
    if(cardID.length() < 5)
        return false;
    
    return true;
}
