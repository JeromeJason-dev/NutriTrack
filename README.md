# NutriTrack — Daily Calorie Tracker

## Overview

A lightweight, client-side web app for logging and tracking your daily food intake. NutriTrack lets you quickly add meals, auto-fill calorie values from a local database, and monitor your total energy consumption for the day.

---

## Features

- **Meal Logging** — Add any food item with a custom calorie count in seconds.
- **Auto-fill Calories** — Type a food name and click *Auto-fill Calories* to look up its calorie value from a local JSON database (`calorie.json`), saving you the manual lookup.
- **Live Calorie Total** — Your cumulative daily intake updates in real time as you add or remove items.
- **Delete Individual Items** — Hover over any logged meal to reveal a remove button and delete it from the log.
- **Persistent Storage** — Your meal log is saved to `localStorage`, so it survives page refreshes and browser restarts without any account or server needed.
- **Reset Day** — A one-click "Reset Day Tracker" button wipes the log clean so you can start fresh each morning.

---

## Project Structure

```
nutritrack/
│
├── data/
│   └── calorie.json       # Simulated API database for fetching calories
│
├── Tailwindcss/
│
├── js/
│   └── style.js             # Core JavaScript application logic
│
└── index.html             # HTML5 Page Structure
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation
1. Clone the repository:

```bash
git clone https://github.com/JeromeJason-dev/NutriTrack.git
cd nutritrack
```
2. Open the project: Simply open the index.html file in your preferred browser to view the current build.

## How to Use

1. **Log a meal manually**
   - Type a food name in the *Food Name* field.
   - Enter the calorie count in the *Calories* field.
   - Click **Add to Log**.

2. **Use auto-fill**
   - Type a food name (e.g., `banana`, `egg`).
   - Click **Auto-fill Calories** — the calorie field is populated automatically if the food exists in `calorie.json`.
   - Adjust the value if needed, then click **Add to Log**.

3. **Remove an item**
   - Hover over any meal in the list and click the 🗑 trash icon on the right.

4. **Reset the tracker**
   - Click **Reset Day Tracker** at the bottom of the left panel and confirm the prompt to clear all logged meals.



## Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Application structure and markup |
| **Tailwind CSS** (CDN) | Utility-first styling — no build step needed |
| **JavaScript** | All app logic: state management, DOM manipulation, event handling |
| **localStorage** | Client-side data persistence across sessions |
| **Fetch API** | Async lookup against the local `calorie.json` database |

## Future Roadmap

- Backend Integration

## License

This project is licensed by the MIT license.