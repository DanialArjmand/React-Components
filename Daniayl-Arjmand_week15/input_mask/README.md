# City Finder

[Read in Persian (فارسی)](./README.fa.md)

An advanced autocomplete search component for React, designed to help users easily find a city from a predefined list. This project is built with modern React Hooks and focuses on providing a smooth and intuitive user experience.

![A demonstration of the City Finder autocomplete component in action]

## ✨ Features

- **Live Search**: Instantly displays suggestions as the user types.
- **Ghost Text**: Shows the top suggestion as a preview inside the input field for better guidance.
- **Full Keyboard Navigation**: Use `ArrowUp`/`ArrowDown` to navigate suggestions and `Enter` to select.
- **Case-Sensitive Search**: Ensures more precise filtering by matching the exact case of the city names.
- **Mouse Support**: Click on any suggestion to select it.
- **Clear Button**: An icon to quickly clear the input field and start over.
- **Modern React**: Built entirely with functional components and modern hooks (`useState`, `useEffect`, `useRef`).

---

## 🛠️ Tech Stack

- **React.js (v18+)**: A JavaScript library for building user interfaces.
- **Font Awesome**: For beautiful and scalable vector icons.
- **CSS**: For custom styling and a clean layout.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/city-finder.git](https://github.com/your-username/city-finder.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd city-finder
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Run the application:**
    ```sh
    npm run dev
    ```
    You should now be able to see the project running on `http://localhost:5173` (or another port specified in your terminal).

**Important:** Make sure the `cities.json` file is placed in the `src` directory for the component to function correctly.

---

## 🏗️ Code Structure

- **`App.jsx`**: The main application component that manages the core state, including the search value and the list of suggestions.
- **`Input.jsx`**: The UI component responsible for rendering the search field, title, icons, and ghost text.
- **`cities.json`**: A simple JSON file containing the list of cities.
