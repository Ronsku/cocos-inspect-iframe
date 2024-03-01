# Cocos Creator Iframe Wrapper Project

This project integrates a Cocos Creator development environment within an iframe, creating a seamless development and runtime environment. The application leverages the power of Cocos Creator for game or interactive content development, encapsulated within a web-friendly iframe for easy embedding and interaction.

## Overview

The project consists of two main components:

- The **Cocos Creator application**, which runs on a development server accessible at `http://localhost:7456`.
- The **Wrapper**, a web page that hosts the Cocos Creator application within an iframe, served at `http://localhost:5000`.

### Wrapper Details

The wrapper's HTML structure is defined in `wrapper/index.html`, containing an iframe that embeds the Cocos Creator environment:

```html
<iframe
  src="http://localhost:7456"
  style="width: 100%; height: 100%; border: none"
></iframe>
```

Communication between the iframe (Cocos Creator application) and the parent window (wrapper) is facilitated through message passing. The logic for this communication is defined in `wrapper/script.js`:

```javascript
window.addEventListener("message", function (event) {
  if (event.origin !== "http://localhost:7456") return;

  if (event.data === "hello") {
    event.source.postMessage("Hello from localhost:5000", event.origin);
  }
});
```

and on Cocos side in `assets/label-post-message.component.ts`:

```typescript
window.parent.postMessage("hello", "*");
window.addEventListener("message", (event) => {
  this.label.string = event.data;
});
```

## Getting Started

### Prerequisites

- Node.js: Ensure you have Node.js installed on your system. If not, download and install it from the [official Node.js website](https://nodejs.org/).
- npm: Comes with Node.js, but you can check your version by running `npm -v` in your terminal.

### Installation

1. **Navigate to Project Directory**

   - Open a terminal and change your directory to the project's root with `cd [project-directory-path]`.

2. **Install Dependencies**
   - Run `npm install` to install the necessary dependencies defined in the `package.json` file.

### Running the Project

1. **Start the Server**

   - In the terminal, within the project's root directory, execute `npm start`. This starts the local server.

2. **Access the Application**
   - Open up Cocos Creator from the `[project-directory-path]`
   - Open your preferred web browser and go to `http://localhost:5000` to view the application.

## How It Works

The application is structured into two main parts: the Cocos Creator application and the wrapper that hosts it in an iframe.

- **Cocos Creator Application**: Runs on a server accessible at `localhost:7456`. This is where the game or interactive content is developed and tested.

- **Wrapper**: A simple HTML page located in the `wrapper` directory. It includes an iframe element that loads the Cocos Creator application. The wrapper is served from `localhost:5000`.

### Communication Mechanism

The wrapper and the Cocos Creator application communicate through a message-passing interface. Messages are sent and received via the `postMessage` API, allowing for secure and controlled interaction between the two environments.
