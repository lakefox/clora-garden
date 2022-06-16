const int sleep = 5;

bool on = false;
int prev = 0;

int base = 0;

// the setup routine runs once when you press reset:
void setup() {
  // initialize the digital pin as an output.
  pinMode(3, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(1, OUTPUT);
  pinMode(0, OUTPUT);

//  initialize the analog pin as an input
  pinMode(4, INPUT_PULLUP);
  base = digitalRead(4);
}

// the loop routine runs over and over again forever
void loop() {
  int red = digitalRead(4);
  if (red < base && prev != red) {
     on = true;
  } else {
    on = false;
  }
  prev = red;
  if (on) {
    //  1, 0, 1, 0
    digitalWrite(3, HIGH);
    digitalWrite(2, LOW);
    digitalWrite(1, HIGH);
    digitalWrite(0, LOW);
    delay(sleep);
    //  0, 1, 1, 0
    digitalWrite(3, LOW);
    digitalWrite(2, HIGH);
    digitalWrite(1, HIGH);
    digitalWrite(0, LOW);
    delay(sleep);
    //  0, 1, 0, 1
    digitalWrite(3, LOW);
    digitalWrite(2, HIGH);
    digitalWrite(1, LOW);
    digitalWrite(0, HIGH);
    delay(sleep);
    //  1, 0, 0, 1
    digitalWrite(3, HIGH);
    digitalWrite(2, LOW);
    digitalWrite(1, LOW);
    digitalWrite(0, HIGH);
    delay(sleep);
  }
}
