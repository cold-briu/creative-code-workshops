# Using the camera in p5.js

The `createCapture(VIDEO)` function in p5.js allows access to the device's webcam to capture real-time video. This stream can be displayed on the canvas and processed via code.

## Index
1. [HTML and CSS Basics](#1-html-and-css-basics)
   - [1.1 Initial structure](#11-initial-structure)
   - [1.2 The style: `<style>` & Helvetica](#12-the-style-style--helvetica)
   - [1.3 The Result](#13-the-result)
2. [CDN and Canvas Configuration](#2-cdn-and-canvas-configuration)
   - [2.1 Importing the library](#21-importing-the-library)
   - [2.2 The drawing canvas: `setup()` and `draw()`](#22-the-drawing-canvas-setup-and-draw)
   - [2.3 The Result](#23-the-result)
3. [Basic Camera Capture](#3-basic-camera-capture)
   - [3.1 Starting the capture: `createCapture()`](#31-starting-the-capture-createcapture)
   - [3.2 Showing the video: `image()`](#32-showing-the-video-image)
   - [3.3 Hiding the original element: `hide()`](#33-hiding-the-original-element-hide)
   - [3.4 Applying a filter: `filter()`](#34-applying-a-filter-filter)
   - [3.5 The Result](#35-the-result)

## 1. HTML and CSS Basics
### 1.1 Initial structure
Every HTML document requires a standard scaffold to work correctly in the browser. Using the `html:5` abbreviation in Antigravity generates this structure automatically, providing the necessary tags for the document type, language, metadata, and the main sections: `<head>` and `<body>`.

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
### 1.2 The style: `<style>` & Helvetica
To define the visual appearance, we use a `<style>` tag. We will set the `font-family` to Helvetica for the `<body>` and add an `<h1>` tag to display the project's title.

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

### 1.3 The Result
With these changes, the project title will be displayed with a clean Helvetica font. This provides a clear heading for our camera sketch.

![Final result shown in browser](./images/1-html-and-css-basics.png)

## 2. CDN and Canvas Configuration
### 2.1 Importing the library
To use p5.js, we need to tell our browser where to find it. We are going to add a `<script>` tag in the `<head>` that connects to the p5.js library.


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

### 2.2 The drawing canvas: `setup()` and `draw()`
To start drawing, we use the `setup()` and `draw()` functions. `setup()` runs once to create the canvas, and `draw()` runs continuously to render frames. We will define `width` and `height` variables to set the canvas size, providing a single place to modify the dimensions.

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

### 2.3 The Result
With these functions, a canvas will appear on the page. The `setup()` function creates the drawing area, and `draw()` paints the background color sixty times per second.

![Final result shown in browser](./images/2-cdn-and-canvas-configuration.png)

## 3. Basic Camera Capture
### 3.1 Starting the capture: `createCapture()`
To capture video from the computer's camera, we use the `createCapture(VIDEO)` function. We store the capture in a `video` variable so we can use it in other parts of the code.

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

### 3.2 Showing the video: `image()`
To display the video stream inside our canvas, we use the `image()` function. This function treats the video capture as a drawing element, allowing us to specify its position and size. At this stage, the video will appear twice: once as an HTML element outside the canvas (created by `createCapture`) and once inside the canvas.

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

### 3.3 Hiding the original element: `hide()`
By default, `createCapture()` adds a video element to the page, which means we see the camera stream twice. To keep only the version inside the canvas, we use the `.hide()` method on the video variable. We also use `.size()` to ensure the capture resolution matches our canvas dimensions.

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

### 3.4 Applying a filter: `filter()`
Once we have the video stream on the canvas, we can apply different filters to modify its appearance. The `filter(POSTERIZE)` function reduces the number of colors in the image, giving it a stylized, graphic look. The number we pass to it determines how many levels of color to use.

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

### 3.5 The Result
Now the camera stream is visible inside our drawing area with a posterize effect applied. This allows us to use the canvas as the primary workspace for any creative coding filters or effects we want to apply to the video.

![Final result shown in browser](./images/3-basic-camera-capture.png)
