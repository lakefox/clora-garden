#include <Arduino.h>

#define LED 2

void setup()
{
    // put your setup code here, to run once:
    Serial.begin(115200);
    pinMode(LED, OUTPUT);
}

void loop()
{
    // put your main code here, to run repeatedly:
    digitalWrite(LED, LOW);
    delay(20 / 1000);
    digitalWrite(LED, HIGH);
    Serial.println("Click");
    delay(20 / 1000);
}