#include <Arduino.h>
#include <Servo.h>

Servo servo;

#define LED 2

int pos = 0;

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(LED, OUTPUT);
  servo.attach(0, 800, 2400);
}

bool ran = false;

void loop()
{
  if (!ran)
  {
    step(60);
    // flow(180);
  }
}

void step(int steps)
{
  for (size_t i = 0; i < steps / 4; i++)
  {
    digitalWrite(LED, LOW);
    delay(20 / 1000);
    digitalWrite(LED, HIGH);
    delay(20 / 1000);
    Serial.println("Step \n");
  }
}

void flow(int deg)
{
  servo.write(deg);
}
