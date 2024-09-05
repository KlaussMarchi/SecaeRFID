#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10 
#define RST_PIN 9
#define BUZZER 12

MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

void setup() {
    Serial.begin(9600);
    SPI.begin();        
    rfid.PCD_Init(); 
    Serial.println("Aproxime o cartão RFID...");
}

void loop() {
    static unsigned long startTime = millis();

    if(millis() - startTime < 1000)
        return;

    startTime = millis();

    if(!isCardAvailable())
        return;

    String ID = readRFID();

    if(!isValidID(ID))
        return;
    
    Serial.println(ID);
    tone(BUZZER, 5000);
    delay(500);
    noTone(BUZZER);
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
        content.concat(String(rfid.uid.uidByte[i] < 0x10 ? "0" : ""));
        content.concat(String(rfid.uid.uidByte[i], HEX));
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
