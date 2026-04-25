# Arduino & p5.js: Computación Física

Esta guía explica cómo configurar un Arduino, leer datos de un joystick y enviarlos a p5.js para su visualización.

## Index
- [1. Configuración de Driver e IDE](#1-configuración-de-driver-e-ide)
  - [1.1 Instalación del Driver CH340](#11-instalación-del-driver-ch340)
  - [1.2 Instalación del IDE de Arduino](#12-instalación-del-ide-de-arduino)
  - [1.3 Seleccionando Placa y Puerto](#13-seleccionando-placa-y-puerto)
  - [1.4 El Resultado](#14-el-resultado)
- [2. Probando la Conexión (Blink)](#2-probando-la-conexión-blink)
  - [2.1 Hola Hardware](#21-hola-hardware)
  - [2.2 El Resultado](#22-el-resultado)
- [3. Lectura de Datos del Sensor (Joystick)](#3-lectura-de-datos-del-sensor-joystick)
  - [3.1 Código de Lectura del Joystick](#31-código-de-lectura-del-joystick)
  - [3.2 El Resultado](#32-el-resultado)
- [4. Puente p5.SerialControl](#4-puente-p5serialcontrol)
  - [4.1 Descarga e Instalación](#41-descarga-e-instalación)
  - [4.2 Conectando al Arduino](#42-conectando-al-arduino)
  - [4.3 El Resultado](#43-el-resultado)
- [5. Registrador de Datos en p5.js](#5-registrador-de-datos-en-p5js)
  - [5.1 Configuración y Librerías](#51-configuración-y-librerías)
  - [5.2 Sketch Básico](#52-sketch-básico)
  - [5.3 Consola de Datos](#53-consola-de-datos)
  - [5.4 El Resultado](#54-el-resultado)
- [6. Mapeo y Visualización de Datos](#6-mapeo-y-visualización-de-datos)
  - [6.1 Configurando el Lienzo](#61-configurando-el-lienzo)
  - [6.2 Mapeo y Dibujo](#62-mapeo-y-dibujo)
  - [6.3 El Resultado](#63-el-resultado)

## 1. Configuración de Driver e IDE

### 1.1 Instalación del Driver CH340
La mayoría de los clones de Arduino Nano usan el chip CH340 para la comunicación USB. Si tu computadora no reconoce la placa, instala el driver desde el [sitio oficial de WCH](https://www.wch-ic.com/downloads/CH341SER_EXE.html).

### 1.2 Instalación del IDE de Arduino
El Arduino Integrated Development Environment (IDE) es donde escribimos nuestro código (**sketches**). Descárgalo desde el [sitio oficial de Arduino](https://www.arduino.cc/en/software).

La interfaz incluye:
- **Verify (Checkmark):** Compila el código para buscar errores.
- **Upload (Arrow):** Envía el código a la placa.

### 1.3 Seleccionando Placa y Puerto
Debemos configurar el hardware antes de subir cualquier código:
1. Conecta el **Arduino Nano** vía USB.
2. Selecciona `Tools > Board > Arduino Nano`.
3. Selecciona `Tools > Processor > ATmega328P (Old Bootloader)`.
4. Selecciona `Tools > Port` y elige el puerto que diga "Arduino" o "CH340".

### 1.4 El Resultado
El IDE de Arduino ahora está configurado y listo para comunicarse con tu placa.

![IDE de Arduino configurado para Nano](./images/1-driver-ide-setup.png)

## 2. Probando la Conexión (Blink)

### 2.1 Hola Hardware
Ejecutaremos el ejemplo **Blink** para probar la conexión. Esto enciende y apaga el LED integrado en la placa.

Ve a `File > Examples > 01.Basics > Blink`.

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

Haz clic en **Upload**.

### 2.2 El Resultado
Si todo sale bien, el LED naranja de la placa debería parpadear cada segundo.

![Placa Arduino con LED parpadeando](./images/2-testing-connection-blink.png)

## 3. Lectura de Datos del Sensor (Joystick)

### 3.1 Código de Lectura del Joystick
Este sketch lee los valores de los ejes análogos y del botón digital del joystick, y los envía al puerto serial.

```cpp
const int xAxisPin = A0;
const int yAxisPin = A1;
const int buttonPin = A2;

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

### 3.2 El Resultado
Abre el `Tools > Serial Monitor` para ver el flujo de datos entrantes.

![Serial Monitor mostrando valores del joystick](./images/3-reading-sensor-data-joystick.png)

> [!IMPORTANT]
> **Cierra el Serial Monitor** antes de pasar a la siguiente sección. Solo una aplicación puede acceder al puerto Serial al mismo tiempo.

## 4. Puente p5.SerialControl

### 4.1 Descarga e Instalación
Descarga **p5.serialcontrol** desde los [lanzamientos oficiales](https://github.com/p5-serial/p5.serialcontrol/releases). Esta aplicación actúa como un puente para llevar los datos Serial al navegador.

### 4.2 Conectando al Arduino
1. Abre la aplicación **p5.serialcontrol**.
2. Localiza el puerto de tu Arduino.
3. Haz clic en **Open**.

### 4.3 El Resultado
La aplicación ahora está recibiendo datos de Arduino y compartiéndolos a través de WebSockets.

![App p5.SerialControl conectada](./images/4-p5serialcontrol-bridge.png)

## 5. Registrador de Datos en p5.js

### 5.1 Configuración y Librerías
Para usar p5.js, necesitamos decirle a nuestro navegador dónde encontrarlo. Vamos a añadir una etiqueta `<script>` en el `<head>` que conecte con la librería p5.js y la librería serial.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/p5.serialport@0.0.31/lib/p5.serialport.min.js"></script>
</head>
<body>
  <script src="sketch.js"></script>
</body>
</html>
```

### 5.2 Sketch Básico
En `sketch.js`, inicializa la conexión especificando tu puerto.

```javascript
let serial;
let portName = 'COM7'; // Reemplaza con tu puerto

function setup() {
  noCanvas();
  serial = new p5.SerialPort();
  serial.openPort(portName);
}
```

### 5.3 Consola de Datos
Consultaremos el puerto serial dentro del bucle `draw()` para verificar la conexión.

```javascript
function draw() {
  let data = serial.readLine();
  
  if (data.length > 0) {
    console.log("Received: " + data);
  }
}
```

### 5.4 El Resultado
Abre la consola del navegador para ver el flujo de datos proveniente del joystick.

![Consola del navegador mostrando datos seriales](./images/5-p5js-data-logger.png)

## 6. Mapeo y Visualización de Datos

### 6.1 Configurando el Lienzo
Crea un área de dibujo usando variables para las dimensiones.

```javascript
let width = 800;
let height = 600;

function setup() {
  createCanvas(width, height);
  serial = new p5.SerialPort();
  serial.openPort(portName);
}
```

### 6.2 Mapeo y Dibujo
Divide la cadena serial y mapea los valores (0-1023) al tamaño del lienzo.

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

### 6.3 El Resultado
El joystick ahora controla la posición y el color de un círculo en el lienzo.

![Resultado de visualización de datos del sensor](./images/6-data-mapping-visualization.png)
