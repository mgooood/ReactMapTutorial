# React Map Tutorial

## Repository Structure

This repository "ReactMapTutorial" contains two main sibling components:

1. **React Application**: A modern React 19 application with ArcGIS map integration built with Vite and TypeScript at the root level.

2. **Tutorial Instructions (`instructions_html/`)**: A set of static HTML pages that provide step-by-step instructions on how to build the React map application.

## Tutorial Content

The `instructions_html/` directory contains a complete tutorial that walks through:

- Setting up a React 19 project with Vite and TypeScript
- Integrating Esri's ArcGIS JavaScript SDK for interactive mapping
- Implementing Esri's Calcite Design System for UI components
- Creating a login interface and map visualization
- Following modern web development best practices

### Viewing the Tutorial

To view the tutorial instructions, run an HTTP server in the instructions_html directory:

```
cd instructions_html
http-server -p 8080
```

Then visit http://localhost:8080 in your browser.

## React Application

The React application is set up directly in the root directory of this repository. To run the application:

```
npm install
npm run dev
```

## Features

- Mobile-first responsive design
- Copy-to-clipboard functionality for code snippets in the tutorial
- Detailed explanations of commands and concepts
- Step-by-step instructions with visual aids
- Interactive ArcGIS map integration in the React app

## Target Audience

This tutorial is designed for:
- Beginning web developers new to React
- Developers interested in adding map functionality to web applications
- Anyone wanting to learn modern frontend development practices
