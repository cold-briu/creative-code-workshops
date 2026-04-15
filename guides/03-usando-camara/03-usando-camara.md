# Usando la cámara en p5.js

La función `createCapture(VIDEO)` en p5.js permite acceder a la cámara del dispositivo para capturar video en tiempo real. Esta transmisión se puede mostrar en el lienzo y procesar mediante código.

## Index
1. [Conceptos básicos de HTML y CSS](#1-conceptos-basicos-de-html-y-css)
   - [1.1 Estructura inicial](#11-estructura-inicial)
   - [1.2 El estilo: `<style>` & Helvetica](#12-el-estilo-style--helvetica)
   - [1.3 El resultado](#13-el-resultado)
2. [Configuración de CDN y Lienzo](#2-configuracion-de-cdn-y-lienzo)
   - [2.1 Importando la librería](#21-importando-la-libreria)
   - [2.2 El lienzo de dibujo: `setup()` y `draw()`](#22-el-lienzo-de-dibujo-setup-y-draw)
   - [2.3 El resultado](#23-el-resultado)
3. [Captura básica de cámara](#3-captura-basica-de-camara)
   - [3.1 Iniciando la captura: `createCapture()`](#31-iniciando-la-captura-createcapture)
   - [3.2 Mostrando el video: `image()`](#32-mostrando-el-video-image)
   - [3.3 Ocultando el elemento original: `hide()`](#33-ocultando-el-elemento-original-hide)
   - [3.4 Aplicando un filtro: `filter()`](#34-aplicando-un-filtro-filter)
   - [3.5 El resultado](#35-el-resultado)

## 1. Conceptos básicos de HTML y CSS
### 1.1 Estructura inicial
Cada documento HTML requiere un andamiaje estándar para funcionar correctamente en el navegador. Usar la abreviación `html:5` en Antigravity genera esta estructura automáticamente, dándote los **tags** necesarios para el tipo de documento, idioma, metadatos y las secciones principales: `<head>` y `<body>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js Camera</title>
</head>
<body>

</body>
</html>
```
### 1.2 El estilo: `<style>` & Helvetica
Para definir la apariencia visual, usamos una etiqueta `<style>`. Vamos a configurar el `font-family` a Helvetica para el `<body>` y agregar un **tag** `<h1>` para mostrar el título del proyecto.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js Camera</title>

  <style>
    body {
      font-family: Helvetica, sans-serif;
    }
  </style>
</head>
<body>
  <h1>p5.js Camera</h1>
</body>
</html>
```

### 1.3 El resultado
Con estos cambios, el título del proyecto se mostrará con una tipografía Helvetica limpia. Esto nos da un encabezado claro para nuestro **sketch** de cámara.

![Resultado final mostrado en el navegador](./images/1-html-and-css-basics.png)

## 2. Configuración de CDN y Lienzo
### 2.1 Importando la librería
Para usar p5.js, necesitamos decirle a nuestro navegador dónde encontrarla. Vamos a agregar un **tag** `<script>` en el `<head>` que se conecte a la librería de p5.js.


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js Camera</title>

  <style>
    body {
      font-family: Helvetica, sans-serif;
    }
  </style>

  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
</head>
<body>
  <h1>p5.js Camera</h1>
</body>
</html>
```

### 2.2 El lienzo de dibujo: `setup()` y `draw()`
Para empezar a dibujar, usamos las funciones `setup()` y `draw()`. `setup()` corre una sola vez para crear el lienzo, y `draw()` corre continuamente para renderizar los **frames**. Vamos a definir variables de `width` (ancho) y `height` (alto) para configurar el tamaño del lienzo, teniendo un solo lugar para modificar las dimensiones.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js Camera</title>

  <style>
    body {
      font-family: Helvetica, sans-serif;
    }
  </style>

  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
</head>
<body>
  <h1>p5.js Camera</h1>

  <script>
    let width = 400;
    let height = 400;

    function setup() {
      createCanvas(width, height);
    }

    function draw() {
      background(220);
    }
  </script>
</body>
</html>
```

### 2.3 El resultado
Con estas funciones, aparecerá un lienzo en la página. La función `setup()` crea el área de dibujo y `draw()` pinta el color de fondo 60 veces por segundo.

![Resultado final mostrado en el navegador](./images/2-cdn-and-canvas-configuration.png)

## 3. Captura básica de cámara
### 3.1 Iniciando la captura: `createCapture()`
Para capturar video de la cámara de la computadora, usamos la función `createCapture(VIDEO)`. Guardamos la captura en una variable `video` para poder usarla en otras partes del código.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js Camera</title>

  <style>
    body {
      font-family: Helvetica, sans-serif;
    }
  </style>

  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
</head>
<body>
  <h1>p5.js Camera</h1>

  <script>
    let width = 400;
    let height = 400;
    let video;

    function setup() {
      createCanvas(width, height);
      video = createCapture(VIDEO);
    }

    function draw() {
      background(220);
    }
  </script>
</body>
</html>
```

### 3.2 Mostrando el video: `image()`
Para mostrar la transmisión de video dentro de nuestro lienzo, usamos la función `image()`. Esta función trata la captura de video como un elemento de dibujo, permitiéndonos especificar su posición y tamaño. En esta etapa, el video aparecerá dos veces: una como elemento HTML fuera del lienzo (creado por `createCapture`) y otra dentro del lienzo.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js Camera</title>

  <style>
    body {
      font-family: Helvetica, sans-serif;
    }
  </style>

  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
</head>
<body>
  <h1>p5.js Camera</h1>

  <script>
    let width = 400;
    let height = 400;
    let video;

    function setup() {
      createCanvas(width, height);
      video = createCapture(VIDEO);
    }

    function draw() {
      background(220);
      image(video, 0, 0);
    }
  </script>
</body>
</html>
```

### 3.3 Ocultando el elemento original: `hide()`
Por defecto, `createCapture()` añade un elemento de video a la página, lo que significa que el video se ve dos veces. Para quedarnos solo con la versión dentro del lienzo, usamos el método `.hide()` en la variable del video. También usamos `.size()` para asegurar que la resolución de la captura coincida con las dimensiones de nuestro lienzo.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js Camera</title>

  <style>
    body {
      font-family: Helvetica, sans-serif;
    }
  </style>

  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
</head>
<body>
  <h1>p5.js Camera</h1>

  <script>
    let width = 400;
    let height = 400;
    let video;

    function setup() {
      createCanvas(width, height);
      video = createCapture(VIDEO);
      video.size(width, height);
      video.hide();
    }

    function draw() {
      background(220);
      image(video, 0, 0);
    }
  </script>
</body>
</html>
```

### 3.4 Aplicando un filtro: `filter()`
Una vez que tenemos la transmisión de video en el lienzo, podemos aplicar diferentes filtros para modificar su apariencia. La función `filter(POSTERIZE)` reduce la cantidad de colores en la imagen, dándole un look gráfico y estilizado. El número que le pasamos determina cuántos niveles de color usar.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js Camera</title>

  <style>
    body {
      font-family: Helvetica, sans-serif;
    }
  </style>

  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
</head>
<body>
  <h1>p5.js Camera</h1>

  <script>
    let width = 400;
    let height = 400;
    let video;

    function setup() {
      createCanvas(width, height);
      video = createCapture(VIDEO);
      video.size(width, height);
      video.hide();
    }

    function draw() {
      background(220);
      image(video, 0, 0);
      filter(POSTERIZE, 3);
    }
  </script>
</body>
</html>
```

### 3.5 El resultado
Ahora la transmisión de la cámara es visible dentro de nuestra área de dibujo con un efecto de **posterizado** aplicado. Esto nos permite usar el lienzo como el espacio de trabajo principal para cualquier filtro o efecto de **creative coding** que queramos aplicar al video.

![Resultado final mostrado en el navegador](./images/3-basic-camera-capture.png)
