# Arduino & p5.js: Physical Computing

This guide covers how to set up an Arduino, read sensor data from a joystick, and send it to p5.js for visualization.

## Index
- [1. Setting up Arduino IDE](#1-setting-up-arduino-ide)
  - [1.1 Installation and Interface](#11-installation-and-interface)
  - [1.2 Selecting Board and Port](#12-selecting-board-and-port)
  - [1.3 The Result](#13-the-result)
- [2. Testing the Blink Sketch](#2-testing-the-blink-sketch)
  - [2.1 The "Hello World" of Hardware](#21-the-hello-world-of-hardware)
  - [2.2 The Result](#22-the-result)
- [3. Reading Joystick Signals](#3-reading-joystick-signals)
  - [3.1 Hardware Connections](#31-hardware-connections)
  - [3.2 Joystick reading code](#32-joystick-reading-code)
  - [3.3 The Result](#33-the-result)
- [4. Setting up p5.SerialControl](#4-setting-up-p5serialcontrol)
  - [4.1 Download](#41-download)
  - [4.2 Install](#42-install)
  - [4.3 Connecting](#43-connecting)
  - [4.4 The Result](#44-the-result)
- [5. p5.js Serial Data Logger](#5-p5js-serial-data-logger)
  - [5.1 Connection Setup](#51-connection-setup)
  - [5.2 Basic Sketch](#52-basic-sketch)
  - [5.3 Console log data](#53-console-log-data)
  - [5.4 The Result](#54-the-result)
- [6. Visualizing Sensor Data](#6-visualizing-sensor-data)
  - [6.1 Setting up the Canvas](#61-setting-up-the-canvas)
  - [6.2 Mapping and Drawing](#62-mapping-and-drawing)
  - [6.3 The Result](#63-the-result)

## 1. Setting up Arduino IDE

### 1.1 Installation and Interface
The Arduino Integrated Development Environment (IDE) is where we write code (**sketches**). Download it from the [official Arduino website](https://www.arduino.cc/en/software).

The interface includes:
- **Verify (Checkmark):** Compiles code to check for errors.
- **Upload (Arrow):** Sends code to the board.

### 1.2 Selecting Board and Port
We must configure the hardware before uploading:
1. Connect the **Arduino Nano** via USB.
2. Select `Tools > Board > Arduino Nano`.
3. Select `Tools > Processor > ATmega328P (Old Bootloader)`.
4. Select `Tools > Port` and choose the port showing "Arduino" or "CH340".

### 1.3 The Result
The Arduino IDE is now configured and ready to communicate with your board.

![Arduino IDE configured for Nano](./images/1-setting-up-arduino-ide.png)

## 2. Testing the Blink Sketch

### 2.1 The "Hello World" of Hardware
We will run the **Blink** example to test the connection. This turns the built-in LED on and off.

Go to `File > Examples > 01.Basics > Blink`.

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
```

Click **Upload**.

### 2.2 The Result
If successful, the orange LED on the board should blink every second.

![Arduino board with blinking LED](./images/2-testing-the-blink-sketch.png)

## 3. Reading Joystick Signals

### 3.1 Hardware Connections
Connect the joystick to the Arduino:
- **GND** to **GND**
- **VCC** to **5V**
- **VRx** to **A0**
- **VRy** to **A1**
- **SW** to **Pin 2**

### 3.2 Joystick reading code
This sketch reads analog axis and digital button values and sends them to the serial port.

```cpp
const int xAxisPin = A0;
const int yAxisPin = A1;
const int buttonPin = 2;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
}

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
```

### 3.3 The Result
Open `Tools > Serial Monitor` to see the incoming data stream.

![Serial Monitor showing joystick values](./images/3-reading-joystick-signals.png)

> [!IMPORTANT]
> **Close the Serial Monitor** before moving to the next section. Only one application can access the Serial port at a time.

## 4. Setting up p5.SerialControl

### 4.1 Download
Download **p5.serialcontrol** from the [official releases](https://github.com/p5-serial/p5.serialcontrol/releases). This app bridges Serial data to the browser.

### 4.2 Install
Install the application and open it.

### 4.3 Connecting
1. Open the **p5.serialcontrol** app.
2. Locate your Arduino port.
3. Click **Open**.

### 4.4 The Result
The application is now receiving data from the Arduino and sharing it via WebSockets.

![p5.SerialControl app connected](./images/4-setting-up-p5serialcontrol.png)

## 5. p5.js Serial Data Logger

### 5.1 Connection Setup
To use p5.js, we need to tell our browser where to find it. We are going to add a  `<script>` tag in the `<head>` that connects to the p5.js library and the serial library.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.js"></script>
  <script src="https://unpkg.com/p5.serialserver@0.0.28/lib/p5.serialport.js"></script>
</head>
<body>
  <script src="sketch.js"></script>
</body>
</html>
```

### 5.2 Basic Sketch
In `sketch.js`, initialize the connection by specifying your port.

```javascript
let serial;
let portName = 'COM7'; // Replace with your port

function setup() {
  noCanvas();
  serial = new p5.SerialPort();
  serial.openPort(portName);
}
```

### 5.3 Console log data
We will poll the serial port inside the `draw()` loop to verify the connection.

```javascript
function draw() {
  let data = serial.readLine();
  
  if (data.length > 0) {
    console.log("Received: " + data);
  }
}
```

### 5.4 The Result
Open the browser console to see the data stream from the joystick.

![Browser console showing serial data](./images/5-p5js-serial-data-logger.png)

## 6. Visualizing Sensor Data

### 6.1 Setting up the Canvas
Create a drawing area using variables for dimensions.

```javascript
let width = 800;
let height = 600;

function setup() {
  createCanvas(width, height);
  serial = new p5.SerialPort();
  serial.openPort(portName);
}
```

### 6.2 Mapping and Drawing
Split the serial string and map the values (0-1023) to the canvas size.

```javascript
let x = 400, y = 300;

function draw() {
  background(10);
  
  let data = serial.readLine();
  
  if (data.length > 0) {
    let values = data.split(",");
    
    if (values.length >= 3) {
      x = map(Number(values[0]), 0, 1023, 0, width);
      y = map(Number(values[1]), 0, 1023, 0, height);
      
      if (values[2].trim() == "0") {
        fill("#ff00ea");
      } else {
        fill("#00ff64");
      }
    }
  }

  noStroke();
  circle(x, y, 60);
}
```

### 6.3 The Result
The joystick controls the position and color of a circle on the canvas.

![Visualizing sensor data result](./images/6-visualizing-sensor-data.png)
