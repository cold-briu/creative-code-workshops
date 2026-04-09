# Hello World

"Hello World" is a traditional first program that beginners write when learning a new programming language. It serves as a simple introduction to verify that your development environment is set up correctly and that you can successfully run code. 

## Index
1. [First HTML File](#1-first-html-file)
   - [1.1 Creating your file: `index.html`](#11-creating-your-file-indexhtml)
   - [1.2 The Root Container: `<html>`](#12-the-root-container-html)
   - [1.3 The Brain (Header): `<head>` & `<title>`](#13-the-brain-header-head--title)
   - [1.4 The Body and Title: `<body>` & `<h1>`](#14-the-body-and-title-body--h1)
   - [1.5 The Result](#15-the-result)

## 1. First HTML File
Let's build a simple web page from scratch by adding elements one by one.

### 1.1 Creating your file: `index.html`
Before writing code, we need a file to put it in. We usually name our main file `index.html`. This is a common practice because web servers automatically look for a file named "index" when someone visits a web address.

### 1.2 The Root Container: `<html>`
Every HTML page starts with the `<html>` tag. This tells the browser that everything inside is HTML.

```html
<html>
</html>
```

### 1.3 The Brain (Header): `<head>` & `<title>`
The `<head>` section is like the "brain" of the page. It contains information that isn't shown directly on the page, like the `<title>` which appears in your browser tab.

```html
<html>
  <head>
    <title>My First Web Page</title>
  </head>
</html>
```

### 1.4 The Body and Title: `<body>` & `<h1>`
The `<body>` tag is where all the visible content of your page lives. We use an `<h1>` tag inside the body to create a large, important title for our page.

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

### 1.5 The Result
When you open your `index.html` file in a browser, this is what you should see:

![Final result shown in browser](./images/1-first-html-file.png)