// Pin Configuration:
// Maps the joystick axes to analog pins 
// and the button to a digital pin.
const int xAxisPin = A0;
const int yAxisPin = A1;
const int buttonPin = 2;

// Hardware Initialization:
// Starts the serial communication and 
// activates the internal pull-up resistor.
void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
}

// Main Program Loop:
// Reads the sensors and sends their values 
// through the serial port in CSV format.
void loop() {
  int xValue = analogRead(xAxisPin);
  int yValue = analogRead(yAxisPin);
  int buttonValue = digitalRead(buttonPin);

  Serial.print(xValue);
  Serial.print(",");
  Serial.print(yValue);
  Serial.print(",");
  Serial.println(buttonValue);

  delay(50);
}
