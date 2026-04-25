// Hardware Setup:
// Configures the built-in LED pin 
// as an electrical output.
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

// Execution Loop:
// Toggles the LED state between HIGH 
// (on) and LOW (off) every second.
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
