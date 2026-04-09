# First shape in p5.js

p5.js is a JavaScript library designed for creative coding, with a focus on making coding accessible for artists, designers, educators, and beginners. Based on the principles of Processing, p5.js allows you to create interactive graphics, animations, and sound directly in the browser in a simple and visual way.

## Index
1. [First HTML Template](#1-first-html-template)
   - [1.1 The Container: `<html>`](#11-the-container-html)
   - [1.2 The Brain: `<head>` & `<title>`](#12-the-brain-head--title)
   - [1.3 The Content: `<body>` & `<h1>`](#13-the-content-body--h1)
   - [1.4 The Style: `<style>` & Helvetica](#14-the-style-style--helvetica)
   - [1.5 The Result](#15-the-result)
2. [First p5.js Sketch](#2-first-p5-js-sketch)
   - [2.1 The p5.js Library: `script`](#21-the-p5js-library-script)
   - [2.2 Setting up the Canvas: `setup()`](#22-setting-up-the-canvas-setup)
   - [2.3 Drawing a Shape: `circle()`](#23-drawing-a-shape-circle)
   - [2.4 The Result](#24-the-result)
3. [First Movement](#3-first-movement)
   - [3.1 The Variable: `y`](#31-the-variable-y)
   - [3.2 The Engine: `draw()`](#32-the-engine-draw)
   - [3.3 Moving Upwards: Linear Movement](#33-moving-upwards-linear-movement)
   - [3.4 The Top Boundary: `if`](#34-the-top-boundary-if)
   - [3.5 Reversing Direction: `speed`](#35-reversing-direction-speed)
   - [3.6 The Bottom Boundary](#36-the-bottom-boundary)
   - [3.7 The Result](#37-the-result)

## 1. First HTML Template
Before we start drawing with p5.js, we need a solid foundation. We'll build a minimal HTML file that will serve as the host for our creative code.

### 1.1 The Container: `<html>`
Every web page starts with the `<html>` tag. It's the root container that holds everything else.

```html
<html>
</html>
```

### 1.2 The Brain: `<head>` & `<title>`
The `<head>` section is the "brain" of our page. It contains metadata and instructions for the browser, such as the title that appears in the tab.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
  </head>
</html>
```

### 1.3 The Content: `<body>` & `<h1>`
The `<body>` is where the visible parts of our page live. We'll add an `<h1>` heading to identify our project.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 1.4 The Style: `<style>` & Helvetica
To make our page look professional, we'll add some CSS. We'll use a `<style>` tag to change the font of the entire body to Helvetica.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 1.5 The Result
When you open this file, you should see your title in a clean Helvetica font. This is our empty canvas, ready for p5.js!

![Final result shown in browser](./images/1-first-html-template.png)

## 2. First p5.js Sketch
Now that we have our template, it's time to bring it to life with p5.js. We'll add the library and write our first piece of creative code.

### 2.1 The p5.js Library: `script`
To use p5.js, we need to tell our browser where to find it. We'll add a `<script>` tag in the `<head>` that links to the p5.js library.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 2.2 Setting up the Canvas: `setup()`
In p5.js, the `setup()` function runs once when the program starts. It's the perfect place to create our drawing area, called a "canvas". We'll make it a 400x400 square.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
    <script>
      function setup() {
        createCanvas(400, 400);
      }
    </script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 2.3 Drawing a Shape: `circle()`
Now for the magic. We'll use the `circle()` function inside `setup()` to draw a shape. It takes three numbers: the x-position, the y-position, and the diameter.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
    <script>
      function setup() {
        createCanvas(400, 400);
        circle(200, 200, 100);
      }
    </script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 2.4 The Result
Congratulations! You've just written your first p5.js sketch. You should see a square canvas with a circle right in the center.

![Final result shown in browser](./images/2-first-p5-js-sketch.png)

## 3. First Movement
Moving a shape is like making a flipbook. We need to remember where our shape is, and slightly change that position every time the page turns.

### 3.1 The Variable: `y`
To remember the position of our circle, we'll create a variable called `y`. This variable will hold the vertical position of our shape. We define it at the very top, outside of any functions.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
    <script>
      let y = 200;

      function setup() {
        createCanvas(400, 400);
      }
    </script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 3.2 The Engine: `draw()`
p5.js has a special function called `draw()`. While `setup()` runs only once, `draw()` runs 60 times every second! This is where we put everything that needs to move. We'll also add `background(220)` to clear the canvas every frame, otherwise our movement will leave a trail like a paintbrush.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
    <script>
      let y = 200;

      function setup() {
        createCanvas(400, 400);
      }

      function draw() {
        background(220);
        circle(200, y, 100);
      }
    </script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 3.3 Moving Upwards: Linear Movement
To make the circle move, we need to change the value of `y` inside `draw()`. Since the top of the canvas is `0`, reducing the `y` value will make the circle move upwards.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
    <script>
      let y = 200;

      function setup() {
        createCanvas(400, 400);
      }

      function draw() {
        background(220);
        circle(200, y, 100);
        
        y = y - 2;
      }
    </script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 3.4 The Top Boundary: `if`
Right now, the circle disappears off the top screen. We can use an `if` statement to check if it has reached the edge. If `y` is less than `0`, we'll reset it to the bottom (`400`) to create a loop.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
    <script>
      let y = 200;

      function setup() {
        createCanvas(400, 400);
      }

      function draw() {
        background(220);
        circle(200, y, 100);
        
        y = y - 2;

        if (y < 0) {
          y = 400;
        }
      }
    </script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 3.5 Reversing Direction: `speed`
Instead of teleporting, let's make it bounce. We'll add another variable called `speed`. Now, instead of hardcoding `y = y - 2`, we'll say `y = y + speed`. If we hit the top, we multiply `speed` by `-1` to reverse it!

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
    <script>
      let y = 200;
      let speed = -2;

      function setup() {
        createCanvas(400, 400);
      }

      function draw() {
        background(220);
        circle(200, y, 100);
        
        y = y + speed;

        if (y < 0) {
          speed = speed * -1;
        }
      }
    </script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 3.6 The Bottom Boundary
Finally, we want it to bounce off the bottom too. We'll add another condition to our `if` statement. If `y` is greater than `400`, we'll reverse the direction again.

```html
<html>
  <head>
    <title>P5.js First Shape</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.min.js"></script>
    <script>
      let y = 200;
      let speed = -2;

      function setup() {
        createCanvas(400, 400);
      }

      function draw() {
        background(220);
        circle(200, y, 100);
        
        y = y + speed;

        if (y < 0) {
          speed = speed * -1;
        }

        if (y > 400) {
          speed = speed * -1;
        }
      }
    </script>
  </head>
  <body>
    <h1>My Creative Sketch</h1>
  </body>
</html>
```

### 3.7 The Result
Now you have a dynamic sketch! The circle moves smoothly up and down, bouncing whenever it hits a boundary. This interplay between variables, logic (`if`), and the `draw()` loop is the essence of animation.

![Final result shown in browser](./images/3-first-movement.gif)
