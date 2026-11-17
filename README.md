# Pomodoro Clock

A simple Pomodoro timer built with plain HTML, CSS and JavaScript. Work in focused sessions, rest in short breaks, and let the clock loop automatically until you hit **Reset**.

## Features

- Centered `.container` (220px × 460px) with a semi-transparent background, split into two parts
- Upper part shows the live **mm:ss** countdown with a progress fill
- Adjustable **session time** and **break time** using `+` / `-` (default 20 / 5 min, never below the minimum)
- `+` / `-` buttons are **disabled while the timer is running**
- **Start / Pause** and **Reset** buttons
- When a session ends, the break starts automatically, then the next session — repeating until Reset
- Label changes between `Session N` and `Break!`, with colour changes (teal for session, orange for break)

## Project Structure

```
pomodoro-clock/
├── index.html   # markup
├── style.css    # layout and theme
├── script.js    # timer logic
└── README.md
```

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/pomodoro-clock.git
   ```
2. Open `index.html` in any modern browser — no build step or dependencies.

## How to Use

1. Set the session and break length with the `+` / `-` buttons.
2. Press **Start** to begin the session countdown.
3. Press **Pause** to stop temporarily, or **Reset** to return to Session 1 and unlock the settings.

## Notes

- The minimum length is 1 minute so a session or break can never be zero.
- Timing uses timestamps (`Date.now()`), so it stays accurate even if the browser tab is throttled.

## Author

Aditya Sharma — Chitkara University
