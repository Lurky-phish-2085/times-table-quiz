# Times Table Quiz

Practice your times table.

## Table of Contents

- [Times Table Quiz](#times-table-quiz)
  * [🚀 Features](#features)
  * [👨‍💻 Local Development](#local-development)
    + [🛠️ Prerequisites](#prerequisites)
    + [📦 Installation](#installation)
    + [Local Dev Server](#local-dev-server)
  * [🐞 Known Issues and Bugs](#known-issues-and-bugs)
    + [Firefox Android Auto scroll page issue](#firefox-android-auto-scroll-page-issue)

## 🚀 Features

- 🎯 **Customizable Practice Range** – Select any combination of multiplication columns from 1 to 12 to tailor your learning experience.
- 🔀 **Dynamic Quiz Generator** – Get hit with randomized multiplication challenges that keep you on your toes every session.
- ⏱️ **60-Second Speed Challenge** – Race against the clock to answer as many questions as you can before time runs out!
- 📈 **Skill Sharpening Made Fun** – Perfect for learners who want to boost their times table mastery through fast-paced, interactive gameplay.

## 👨‍💻 Local Development

This is a React + Vite application. Follow the steps below to set it up and run it locally.

### 🛠️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v22.15.1 or higher recommended)
- [npm](https://www.npmjs.com/)

### 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Lurky-phish-2085/times-table-quiz
cd times-table-quiz
npm install
```

### Local Dev Server

Start the development server:

```bash
npm run dev
```

This will launch the app in your default browser at [localhost:5173](http://localhost:5173).

## 🐞 Known Issues and Bugs

**NOTE:** This section outlines known issues and bugs that are currently unresolved.  
It will be updated as fixes are implemented or new issues are discovered.  

Please refer to this list for the latest status, especially if you're testing or contributing to the app.

- [Firefox Android Auto scroll page issue](#firefox-android-auto-scroll-page-issue)

### Firefox Android Auto scroll page issue

In Firefox Android, if the `Scroll to hide toolbar` setting is enabled which is found at `Settings -> Customize -> Gestures`, the auto scroll feature of the app will only scroll a little bit instead of scrolling to the most bottom or top of the screen.

