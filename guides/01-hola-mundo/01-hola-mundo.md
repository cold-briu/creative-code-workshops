# Hello World

"Hello World" is a traditional first program that beginners write when learning a new programming language. It serves as a simple introduction to verify that your development environment is set up correctly and that you can successfully run code. 


## Content 
- [Installing VSCode (Windows/Mac)](#1-installing-vscode-windowsmac)
- [Basic HTML Concepts](#2-basic-html-concepts)
- [Installing p5.js using a CDN](#3-installing-p5js-using-a-cdn)
- [Drawing a Circle](#4-drawing-a-circle)
- [Adding Movement to the Circle](#5-adding-movement-to-the-circle)
- [Adding Collisions](#6-adding-collisions)
- [Registering Keyboard Input](#7-registering-keyboard-input)
- class exercise: adding bounce physics

## 1. Installing VSCode (Windows/Mac)

### Windows

1. Visit the [Visual Studio Code download page](https://code.visualstudio.com/download)
2. Click on the "Windows" button to download the installer
3. Run the downloaded `.exe` file
4. Follow the installation wizard:
   - Accept the license agreement
   - Choose your installation location (default is recommended)
   - Select additional tasks (check "Add to PATH" for easier command line access)
   - Click "Install"
5. Once installed, launch VSCode from the Start menu or desktop shortcut

### Mac

1. Visit the [Visual Studio Code download page](https://code.visualstudio.com/download)
2. Click on the "Mac" button to download the `.zip` file
3. Extract the downloaded file (it will create a `Visual Studio Code.app` file)
4. Drag `Visual Studio Code.app` to your `Applications` folder
5. Launch VSCode from your Applications folder or Spotlight search
6. (Optional) To enable command line access, open VSCode, press `Cmd+Shift+P`, type "Shell Command: Install 'code' command in PATH", and press Enter

## 2. Basic HTML Concepts

### What is HTML?

HTML (Hypertext Markup Language) is the standard markup language used to create web pages. Hypertext refers to text that contains links to other texts or resources. HTML documents are served by web servers, interpreted by web browsers, and rendered as visual web pages that users can interact with. HTML describes the structure of a web page using a system of tags.

### What is a Tag?

A tag is a keyword enclosed in angle brackets (`< >`) that tells the browser how to display content. Most tags come in pairs: an opening tag (`<tag>`) and a closing tag (`</tag>`), with content in between.

### The Three Main Tags

Every HTML document has three essential tags that form its basic structure:

1. **`<html>`** - The root element that wraps all content on the page
2. **`<head>`** - Contains metadata about the document (not visible on the page)
3. **`<body>`** - Contains all visible content that appears on the web page

### Basic Tags in the Head Section

- **`<title>`** - Sets the title of the web page (appears in the browser tab)

### Basic Tags in the Body Section

- **`<h1>`** - Creates a main heading (largest heading size)
- **`<p>`** - Creates a paragraph of text

### Example HTML Structure

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Page title (shows in browser tab) -->
    <title>My First Web Page</title>
  </head>
  <body>
    <!-- Main heading -->
    <h1>Hello World</h1>
    <!-- Paragraph of text -->
    <p>This is my first paragraph.</p>
  </body>
</html>
``` 

### Styling with CSS

Now let's enhance our HTML page by adding styles using the `<style>` tag. CSS (Cascading Style Sheets) allows us to control the visual appearance of our web page elements.

In this step, we'll:
- Set the font family to Helvetica for the entire page
- Style the title (`<h1>`) with a bold dim blue color

Add a `<style>` tag inside the `<head>` section of your HTML document. Here's the updated example:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
    <!-- CSS styles for the page -->
    <style>
      /* Use Helvetica font for all body text */
      body {
        font-family: Helvetica, sans-serif;
      }
      /* Style the main heading: dim blue, bold */
      h1 {
        color: #1e3a5f;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my first paragraph.</p>
  </body>
</html>
```

**What's happening here?**

- The `<style>` tag is placed inside the `<head>` section, where metadata and styling information belong
- `body { font-family: Helvetica, sans-serif; }` sets Helvetica as the font for all text on the page. The `sans-serif` is a fallback in case Helvetica isn't available
- `h1 { color: #1e3a5f; font-weight: bold; }` styles the heading:
  - `color: #1e3a5f;` sets the text color to a dim blue (hex color code)
  - `font-weight: bold;` makes the text bold

When you open this HTML file in a browser, you'll see the "Hello World" heading displayed in bold dim blue, and all text will use the Helvetica font.

## 3. Installing p5.js using a CDN

p5.js is a JavaScript library that makes it easy to create interactive graphics, animations, and creative coding projects in the browser. Instead of downloading and hosting the library files yourself, you can use a CDN (Content Delivery Network) to load p5.js directly from the internet.

### What is a CDN?

A CDN (Content Delivery Network) is a network of servers distributed around the world that host files like JavaScript libraries. By using a CDN, you can include external libraries in your HTML without downloading them. The browser fetches the library from the CDN when your page loads.

### Adding p5.js to Your HTML

To use p5.js in your HTML file, you need to add a `<script>` tag in the `<head>` section that loads the p5.js library from a CDN. The `<script>` tag is used to include JavaScript code in your HTML document.

Here's how to add p5.js to your HTML file:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
      h1 {
        color: #1e3a5f;
        font-weight: bold;
      }
    </style>
    <!-- Load p5.js from CDN so we can draw and animate -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my first paragraph.</p>
  </body>
</html>
```

**What's happening here?**

- The `<script>` tag with `src` attribute tells the browser to load an external JavaScript file
- `src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"` is the URL where the p5.js library is hosted on the CDN
- By placing it in the `<head>` section, p5.js will be loaded before your page content, making it available for any JavaScript code you write

### Alternative CDN Options

You can also use other CDNs to load p5.js:

- **jsDelivr CDN**: `https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js`
- **unpkg CDN**: `https://unpkg.com/p5@1.7.0/lib/p5.js`

All of these will work the same way. Choose whichever CDN you prefer, or use the one that's most reliable in your region.

Now that p5.js is loaded, you're ready to start creating interactive graphics and animations!

## 4. Drawing a Circle

Now that we have p5.js loaded, let's create our first 2D shape: a circle! To draw shapes in p5.js, we need to use JavaScript code and understand p5.js's core functions.

### The `setup()` Function

The `setup()` function is a special p5.js function that runs once when your program starts. It's where you configure your canvas, set the initial environment, and define any settings that should only happen once.

**Key characteristics of `setup()`:**
- Runs only once when the page loads
- Typically used to create the canvas with `createCanvas()`
- Perfect for initializing variables and setting up your drawing environment

### Creating a Canvas

To draw shapes like a circle, we need to create a canvas. In p5.js, you create a 2D canvas using the `createCanvas()` function, which takes two parameters: width and height in pixels.

### The `draw()` Function

The `draw()` function is another special p5.js function that runs continuously in a loop (typically 60 times per second). This is where you put code that needs to be updated or redrawn repeatedly, like animations.

### Drawing a Circle

p5.js provides a `circle()` function that draws a 2D circle. The function takes three parameters: the x position, y position, and the diameter (size) of the circle.

Here's a complete example that draws a circle:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
      h1 {
        color: #1e3a5f;
        font-weight: bold;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my first paragraph.</p>
    <script>
      // Runs once when the program starts
      function setup() {
        createCanvas(800, 600); // 800px wide, 600px tall canvas
      }

      // Runs repeatedly (animation loop)
      function draw() {
        background(220);        // Light gray background
        circle(400, 300, 100); // x, y, diameter — center of canvas
      }
    </script>
  </body>
</html>
```

**What's happening here?**

- `function setup()` - Defines the setup function that runs once
- `createCanvas(800, 600)` - Creates a 2D canvas that's 800 pixels wide and 600 pixels tall
- `function draw()` - Defines the draw function that runs continuously
- `background(220)` - Sets the background color to light gray (values range from 0-255, where 220 is a light gray)
- `circle(400, 300, 100)` - Draws a circle at position (400, 300) with a diameter of 100 pixels. The coordinates (400, 300) place the circle at the center of our 800x600 canvas

When you open this HTML file in a browser, you'll see a circle rendered on the canvas at the center of the screen!

### Understanding the Code Structure

- The JavaScript code is placed inside a `<script>` tag in the `<body>` section
- `setup()` and `draw()` are special p5.js functions that are automatically called by the library
- You don't need to call these functions yourself - p5.js handles that for you
- The order of code execution: `setup()` runs first (once), then `draw()` runs repeatedly

## 5. Adding Movement to the Circle

Now that we can draw a circle, let's make it move! In this section, we'll learn how to create animation by changing the circle's position over time. We'll make the circle fall downward, like it's being pulled by gravity.

### Using Variables to Store Position

To make the circle move, we need to store its position in variables that can change over time. In JavaScript, we use the `let` keyword to create variables that can be updated.

**Key concepts:**
- Variables store values that can change
- We'll use `let` to declare variables for the circle's x and y position
- Variables are declared outside of functions so they can be accessed by both `setup()` and `draw()`

### Making the Circle Fall

To create a falling effect, we need to:
1. Declare a variable to store the circle's y position (vertical position)
2. Initialize it in `setup()` to set the starting position
3. Update it in `draw()` to make it move downward each frame

Here's the updated code that makes the circle fall:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
      h1 {
        color: #1e3a5f;
        font-weight: bold;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my first paragraph.</p>
    <script>
      // Vertical position of the circle (starts at top)
      let circleY = 0;

      function setup() {
        createCanvas(800, 600);
      }

      function draw() {
        background(220);
        circle(400, circleY, 100);  // Draw circle at current y
        circleY = circleY + 2;      // Move down 2 pixels per frame
      }
    </script>
  </body>
</html>
```

**What's happening here?**

- `let circleY = 0;` - Declares a variable called `circleY` and sets its initial value to 0. This variable stores the vertical position of the circle
- `circle(400, circleY, 100)` - Uses the `circleY` variable instead of a fixed number (300) for the y position. The x position stays at 400 (center horizontally)
- `circleY = circleY + 2;` - Updates the circle's y position by adding 2 pixels each frame. Since `draw()` runs 60 times per second, the circle moves 120 pixels per second downward

### Understanding the Animation

When you run this code, you'll see the circle start at the top of the canvas and fall downward continuously. Each time `draw()` runs:
1. The background is redrawn (erasing the previous circle)
2. The circle is drawn at the current `circleY` position
3. `circleY` is increased by 2, so the next frame will draw the circle slightly lower

### Adjusting the Speed

You can control how fast the circle falls by changing the number added to `circleY`:
- `circleY = circleY + 1;` - Falls slowly
- `circleY = circleY + 5;` - Falls faster
- `circleY = circleY + 0.5;` - Falls very slowly

Experiment with different values to see how it affects the animation speed!

### What's Next?

Now that the circle is moving, you might notice it falls off the bottom of the screen. In the next section, we'll learn how to add collisions so the circle bounces when it hits the edges of the canvas.

## 6. Adding Collisions

In the previous section, the circle falls off the screen and disappears. Let's fix that by adding collision detection! We'll create boundaries at the top and bottom of the canvas so the circle bounces back when it hits them.

### Understanding Boundaries

To detect collisions, we need to check if the circle has reached the edges of the canvas:
- **Top boundary**: When the circle's y position reaches the top (y = 0)
- **Bottom boundary**: When the circle's y position reaches the bottom (y = canvas height)

We check the circle's center position against the boundaries:
- Top: `circleY <= 0`
- Bottom: `circleY >= height`

### Using Conditional Statements (if statements)

To check if the circle has hit a boundary, we use `if` statements. An `if` statement allows us to execute code only when a certain condition is true.

**Basic structure:**
```javascript
// Run code only when the condition is true
if (condition) {
  // code to run if condition is true
}
```

### Reversing Direction

To make the circle bounce, we need to reverse its direction when it hits a boundary. Instead of always adding to `circleY`, we'll use a speed variable that can be positive (falling) or negative (rising).

Here's the updated code with top and bottom boundaries:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
      h1 {
        color: #1e3a5f;
        font-weight: bold;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my first paragraph.</p>
    <script>
      // Circle position and movement
      let circleY = 300;              // Start in the middle vertically
      let speedY = 2;                 // Positive = down, negative = up

      function setup() {
        createCanvas(800, 600);
      }

      function draw() {
        background(220);

        // Draw the circle at current position
        circle(400, circleY, 100);

        // Update position each frame
        circleY = circleY + speedY;

        // Check bottom boundary — bounce back up
        if (circleY >= height) {
          speedY = -speedY;            // Reverse direction
        }

        // Check top boundary — bounce back down
        if (circleY <= 0) {
          speedY = -speedY;            // Reverse direction
        }
      }
    </script>
  </body>
</html>
```

**What's happening here?**

- `let circleY = 300;` - Starts the circle in the middle vertically
- `let speedY = 2;` - Stores the vertical speed. Positive values move down, negative values move up
- `circleY = circleY + speedY;` - Updates the position using the speed variable
- `if (circleY >= height)` - Checks if the circle's center has reached or passed the bottom of the canvas
  - `speedY = -speedY;` - Reverses the direction by making speedY negative (if it was positive) or positive (if it was negative)
- `if (circleY <= 0)` - Checks if the circle's center has reached or passed the top of the canvas
  - Same logic as bottom boundary, but for the top

### Understanding the Bounce

When the circle hits a boundary:
1. The `speedY` value is reversed (positive becomes negative, negative becomes positive)
2. The circle continues moving in the opposite direction

### How It Works

- Initially, `speedY = 2`, so the circle moves down
- When it hits the bottom, `speedY` becomes `-2`, so it moves up
- When it hits the top, `speedY` becomes `2` again, so it moves down
- This creates a continuous bouncing effect!

### Adjusting the Bounce

You can modify the behavior:
- Change `speedY = 2` to a different value to make it bounce faster or slower
- The circle will bounce between the top and bottom boundaries indefinitely

### What's Next?

Now the circle bounces between the top and bottom! In the next section, we'll learn how to register keyboard input so you can control the circle's movement with the spacebar.

## 7. Registering Keyboard Input

In this section, we'll learn how to make the circle respond to keyboard input. We'll create a game-like behavior where the circle falls to the bottom and stays there, but when you press the spacebar, it launches upward, bounces off the top, and returns to the bottom to wait for the next spacebar press.

### The `keyPressed()` Function

p5.js provides a special function called `keyPressed()` that is automatically called whenever a key is pressed on the keyboard. This is where we'll add code to respond to keyboard input.

**Key characteristics of `keyPressed()`:**
- Runs automatically when any key is pressed
- Only runs once per key press (not continuously while held)
- Perfect for triggering actions like launching the circle

### Detecting the Spacebar

To check if a specific key was pressed, we use the `key` variable, which contains the character of the key that was pressed. For the spacebar, we check if `key === ' '` (a space character).

### Creating the Launch Behavior

We need to modify our collision logic so that:
1. The circle falls and stops at the bottom (no bounce)
2. When spacebar is pressed, the circle launches upward
3. The circle bounces off the top
4. The circle falls back to the bottom and stops again

Here's the complete code:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
      }
      h1 {
        color: #1e3a5f;
        font-weight: bold;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my first paragraph.</p>
    <script>
      // Ball state: position and speed
      let circleY = 0;                          // Start at top
      let speedY = 2;                           // Initial fall speed (down)

      function setup() {
        createCanvas(800, 600);
      }

      function draw() {
        background(220);

        // Draw the circle
        circle(400, circleY, 100);

        // Update position only when the ball is moving
        if (speedY !== 0) {
          circleY = circleY + speedY;
        }

        // Top boundary — bounce back down
        if (circleY <= 0) {
          speedY = -speedY;              // Reverse direction (now moving down)
        }

        // Bottom boundary — stop the ball (no bounce)
        if (circleY >= height) {
          speedY = 0;                    // Stop the ball
        }
      }

      // Called automatically when a key is pressed
      function keyPressed() {
        if (key === ' ') {                      // Spacebar
          if (speedY === 0) {                   // Only launch when stopped at bottom
            speedY = -5;                        // Launch upward
          }
        }
      }
    </script>
  </body>
</html>
```

**What's happening here?**

- `let circleY = 0;` - Starts the circle at the top
- `let speedY = 2;` - Initial falling speed (positive = down)
- `if (speedY !== 0)` - Only updates position when the ball is moving. When `speedY` is 0, the ball is stopped
- `if (circleY <= 0)` - Checks if the circle's center hits the top boundary
  - `speedY = -speedY;` - Reverses direction. If speedY was -5 (up), it becomes 5 (down)
- `if (circleY >= height)` - Checks if the circle's center hits the bottom boundary
  - `speedY = 0;` - Stops the ball completely (no bounce back up)
- `function keyPressed()` - This function runs automatically when any key is pressed
- `if (key === ' ')` - Checks if the pressed key is the spacebar (space character)
- `if (speedY === 0)` - Only launches if the ball is currently stopped at the bottom
- `speedY = -5;` - Sets the speed to -5 (negative = upward movement)

### Understanding the Behavior

1. **Initial state**: The circle starts at the top and falls down
2. **Hitting bottom**: When it reaches the bottom, `speedY` becomes 0, so it stops
3. **Spacebar press**: When you press spacebar, `speedY` becomes -5, launching it upward
4. **Hitting top**: When it hits the top, `speedY` becomes 5 (reversed), making it fall down
5. **Back to bottom**: It falls to the bottom and stops again, waiting for the next spacebar press

### How It Works

- The `keyPressed()` function is a special p5.js function that runs automatically when a key is pressed
- The `key` variable contains the character of the key that was pressed
- By checking `key === ' '`, we detect when the spacebar is pressed
- The condition `if (speedY === 0)` ensures we only launch when the ball is stopped at the bottom
- Setting `speedY = -5` gives the ball upward velocity (negative y values go up in p5.js)

### Adjusting the Launch

You can modify the launch behavior:
- Change `speedY = -5` to a different value (like `-3` or `-8`) to launch slower or faster
- The more negative the value, the faster it launches upward

### What's Next?

Now you can control the circle with the spacebar! Press spacebar to launch it, watch it bounce off the top, and it will return to the bottom waiting for your next command.
