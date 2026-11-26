# ♞ AUPP Chess Club

**Think. Plan. Win.**

AUPP Chess Club is a multi-page website developed for our Web Development final project at the American University of Phnom Penh (AUPP). The website provides a space for students to discover chess events, learn how to play chess, practice their skills, and connect with the club.

## Features

| Page | Description |
| --- | --- |
| Home | Introduces the club and highlights chess tournaments. |
| Events | Displays chess competitions, workshops, and tournament information. |
| Tutorials | Provides embedded videos on chess rules, beginner strategies, and improvement tips. |
| Chessboard | Designed for interactive chess practice using React, chess.js, and react-chessboard. |
| Contact | Displays a leadership table with member information and a club registration form. |

The website uses a consistent black-and-gold theme, shared navigation, external CSS stylesheets, Flexbox, CSS Grid, and media queries for responsive layouts.

## Technologies Used

- **HTML5**: Website structure, semantic elements, tables, forms, images, and embedded videos.
- **CSS3**: Styling, typography, layouts, and responsive design.
- **JavaScript**: Form interaction and game functionality.
- **React**: Interactive chessboard interface.
- **chess.js**: Chess rules, legal moves, and game state.
- **react-chessboard**: Visual chessboard and piece interaction.
- **Vite**: Local development server and build tool.
- **Git and GitHub**: Version control and team collaboration.

## Project Structure

```text
Web-dev-/
├── README.md
└── src/
    ├── assets/
    ├── homepage/
    │   ├── home.html
    │   └── home.css
    ├── events-page/
    │   ├── events.html
    │   └── events.css
    ├── tutorials-page/
    │   ├── tutorials.html
    │   └── tutorials.css
    ├── contacts-page/
    │   ├── contacts.html
    │   └── contacts.css
    |   └──scripts.js
    ├── chessboard-page/
    │   ├── chessboard.html
    │   ├── chessboard.css
    │   └── src/               # Required React files
    │       ├── App.jsx
    │       └── main.jsx
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

## Installation and Setup

### Requirements

- Node.js 22.12 or newer (a supported LTS version is recommended)
- npm (included with Node.js)
- Git (for cloning the repository)
- A web browser

### Run Locally

1. Clone or download this repository from GitHub and open the project folder in VS Code.
2. Open a terminal in the repository root and enter:

   ```bash
   cd src
   npm ci
   npm run dev
   ```

   On Windows PowerShell, if npm scripts are blocked by the execution policy, use:

   ```powershell
   npm.cmd ci
   npm.cmd run dev
   ```

3. Open the homepage at [http://127.0.0.1:8080/homepage/home.html](http://127.0.0.1:8080/homepage/home.html).
4. To open the chessboard directly, visit [http://127.0.0.1:8080/chessboard-page/chessboard.html](http://127.0.0.1:8080/chessboard-page/chessboard.html).

Use the actual server address displayed in the terminal and keep the terminal running. Stop the server with `Ctrl + C`.

**Important:** The chessboard requires `src/chessboard-page/src/App.jsx` and `src/chessboard-page/src/main.jsx`. Ensure both files are committed before running the game. Do not open the React page directly using a `file://` URL.

## Current Limitations and Future Improvements

- Complete and verify the React chessboard source files in the shared repository.
- Improve form validation and submission feedback. The registration form is frontend-only; it does not send or store information on a server.
- Refine mobile and tablet layouts and check all navigation links.
- Configure Vite's multi-page production build and deploy the website to GitHub Pages.

## Team

Developed collaboratively by students at the American University of Phnom Penh as part of the Web Development final project.

---

**AUPP Chess Club — Learn, Play, and Grow Together.**
