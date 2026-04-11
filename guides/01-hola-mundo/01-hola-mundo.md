# Hola Mundo

"Hola Mundo" es el programa clásico con el que todos empezamos a aprender un nuevo lenguaje. Es una introducción súper simple para confirmar que tu entorno de desarrollo está bien configurado y que ya puedes empezar a correr código sin problemas. 

## Index
1. [First HTML File](#1-first-html-file)
   - [1.1 Creating your file: `index.html`](#11-creating-your-file-indexhtml)
   - [1.2 The Root Container: `<html>`](#12-the-root-container-html)
   - [1.3 The Brain (Header): `<head>` & `<title>`](#13-the-brain-header-head--title)
   - [1.4 The Body and Title: `<body>` & `<h1>`](#14-the-body-and-title-body--h1)
   - [1.5 The Result](#15-the-result)
2. [First CSS Style](#2-first-css-style)
   - [2.1 The Heading ID](#21-the-heading-id)
   - [2.2 The Style Tag](#22-the-style-tag)
   - [2.3 Helvetica Font](#23-helvetica-font)
   - [2.4 The Result](#24-the-result)
3. [First JS Script](#3-first-js-script)
   - [3.1 The Script Tag](#31-the-script-tag)
   - [3.2 Asking for your name: `prompt()`](#32-asking-for-your-name-prompt)
   - [3.3 Displaying a greeting: `alert()`](#33-displaying-a-greeting-alert)
   - [3.4 The Result](#34-the-result)

## 1. Primer archivo HTML
Vamos a construir una página web sencilla desde cero, agregando elementos uno por uno.

### 1.1 Crea tu archivo: `index.html`
Antes de lanzarnos a escribir código, necesitamos un lugar donde ponerlo. Por convención, llamamos a nuestro archivo principal `index.html`. Es el estándar porque los servidores web siempre buscan un archivo llamado "index" en cuanto alguien entra a una página.

### 1.2 El contenedor raíz: <html>
Toda página HTML comienza con la etiqueta `<html>`. Esto le avisa al navegador que todo lo que esté aquí dentro es código HTML.

```html
<html>
</html>
```

### 1.3 El cerebro (Header): `<head>` & `<title>`
La sección `<head>` es como el "cerebro" de nuestra página. Aquí va toda la información que no se ve a simple vista, como el `<title>` que aparece arriba en la pestaña del navegador.

```html
<html>
  <head>
    <title>My First Web Page</title>
  </head>
</html>
```

### 1.4 El cuerpo y el título: `<body>` & `<h1>`
La etiqueta `<body>` es donde vive todo el contenido visible de tu página. Usamos una etiqueta `<h1>` dentro del cuerpo para crear un título grande e importante para nuestro sitio.

```html
<html>
  <head>
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

### 1.5 El resultado
Cuando abras tu archivo `index.html` en un navegador, esto es lo que deberías ver:

![Resultado final mostrado en el navegador](./images/1-first-html-file.png)

## 2. Primer estilo CSS
Ahora que ya tenemos la estructura, vamos a aprender a darle estilo a nuestros elementos usando CSS.

### 2.1 El ID del título
Para darle estilo a un elemento específico, podemos ponerle un nombre único llamado `id`. Esto nos permite enfocarnos solo en ese elemento sin afectar a los demás.

```html
<html>
  <head>
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <h1 id="styled-title">CSS Hello World</h1>
  </body>
</html>
```

### 2.2 La etiqueta <style>
Para escribir CSS, usamos la etiqueta `<style>` dentro del `<head>`. Usamos el símbolo `#` seguido del nombre del ID para crear un **selector**, que es lo que le dice al navegador exactamente a qué elemento queremos darle estilo.

```html
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      #styled-title {
      }
    </style>
  </head>
  <body>
    <h1>Hello World</h1>
    <h1 id="styled-title">CSS Hello World</h1>
  </body>
</html>
```

### 2.3 Tipografía Helvetica
Ahora vamos a agregar una **property** y un **value** dentro de las llaves. Vamos a cambiar el `font-family` a `Helvetica` para que todo se vea mucho más limpio y profesional.

```html
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      #styled-title {
        font-family: Helvetica;
      }
    </style>
  </head>
  <body>
    <h1>Hello World</h1>
    <h1 id="styled-title">CSS Hello World</h1>
  </body>
</html>
```

### 2.4 El resultado
Tu segundo título ahora debería aparecer con una tipografía limpia y moderna (Helvetica), mientras que el primero se mantiene con la fuente por defecto del navegador.

![Resultado final mostrado en el navegador](./images/2-first-css-style.png)

## 3. Primer script de JS
JavaScript es "el cerebro" que le da interactividad a tu página. Permite que tu sitio web piense, haga preguntas y reaccione a lo que el usuario haga.

### 3.1 La etiqueta <script>
Para escribir JavaScript, usamos el **tag** `<script>`. Así como el CSS va dentro de `<style>`, JavaScript vive dentro de `<script>`. Normalmente lo ponemos justo antes de cerrar el `body` para que el resto de la página cargue primero.

```html
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      #styled-title {
        font-family: Helvetica;
      }
    </style>
  </head>
  <body>
    <h1>Hello World</h1>
    <h1 id="styled-title">CSS Hello World</h1>
    <script>
    </script>
  </body>
</html>
```

### 3.2 Preguntando tu nombre: `prompt()`
La función `prompt()` es una forma súper sencilla de pedir información. Cuando el navegador corre esto, muestra una pequeña ventana emergente con un cuadro de texto.

```html
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      #styled-title {
        font-family: Helvetica;
      }
    </style>
  </head>
  <body>
    <h1>Hello World</h1>
    <h1 id="styled-title">CSS Hello World</h1>
    <script>
      prompt("What is your name?");
    </script>
  </body>
</html>
```

### 3.3 Mostrando un saludo: `alert()`
La función `alert()` muestra un mensaje simple en pantalla. Podemos usarla para saludar al usuario justo después de que nos dé su nombre.

```html
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      #styled-title {
        font-family: Helvetica;
      }
    </style>
  </head>
  <body>
    <h1>Hello World</h1>
    <h1 id="styled-title">CSS Hello World</h1>
    <script>
      let name = prompt("What is your name?");
      alert("Hello " + name + "!");
    </script>
  </body>
</html>
```

### 3.4 El resultado
¡Cuando recargues la página, verás el prompt pidiendo tu nombre y luego el alert dándote la bienvenida!

![Resultado final mostrado en el navegador](./images/3-first-js-script.png)
