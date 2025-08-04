# Contact Management App

[Read in Persian (فارسی)](./README.fa.md)

A modern and responsive web application for managing contacts, built with React and Vite. This app allows you to perform full CRUD (Create, Read, Update, Delete) operations and features a dark mode, dynamic form validation, and advanced functionalities like bulk deletion.

---

## ✨ Features

-   **Smart Contact Management**: Easily add, view, edit, and delete your contacts from a clean and intuitive interface.
-   **Dark/Light Mode**: Switch between a light and dark theme for the best user experience, with changes applied instantly across the app.
-   **Bulk Deletion**: Select and delete multiple contacts at once with a confirmation step.
-   **Powerful Search**: Instantly filter contacts by name or email address in real-time.
-   **Dynamic Form Validation**: Get instant feedback on inputs to ensure data is correct before submission, with clear error and success states powered by Yup.
-   **Confirmation Modals**: Secure sensitive actions like deleting or editing with clear and beautifully animated confirmation dialogs.
-   **Responsive Design**: A seamless experience across all devices with different screen sizes.
-   **Modular Architecture**: A clean and maintainable codebase with a clear separation of concerns.

---

## 🛠️ Tech Stack

-   **[Vite](https://vitejs.dev/)**: A modern frontend build tool that provides a faster and leaner development experience.
-   **[React.js](https://react.dev/)**: A JavaScript library for building user interfaces, using modern hooks (`useReducer`, `useContext`, `useState`).
-   **[React Hook Form](https://react-hook-form.com/)**: For performant, flexible, and extensible forms with easy-to-use validation.
-   **[Yup](https://github.com/jquense/yup)**: For powerful and declarative object schema validation.
-   **[JSON Server](https://github.com/typicode/json-server)**: To simulate a REST API for data management during development.
-   **[Font Awesome](https://fontawesome.com/)**: For beautiful and scalable vector icons.
-   **CSS Modules & Global CSS**: For scoped, component-level styling (`*.module.css`) to prevent class name conflicts, alongside global styles for the overall theme.

---

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running.

### Prerequisites

Make sure you have **Node.js** and **npm** (or **yarn**) installed on your machine.

### Installation

1.  **Clone the repository:**
    *(Replace `YOUR_USERNAME/YOUR_REPO_NAME` with your actual GitHub username and repository name)*
    ```sh
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd YOUR_REPO_NAME
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Set up environment variables:**
    -   Create a file named `.env` in the project root.
    -   Add the following line to it. This tells the application where the mock API is running.
        ```
        VITE_API_URL=http://localhost:3001/contacts
        ```

5.  **Set up the Mock API Server:**
    -   This project uses `json-server` to store data. First, add a helper script to your `package.json` file inside the `"scripts"` object:
        ```json
        "scripts": {
          "server": "json-server --watch db.json --port 3001"
        }
        ```
    -   Create a file named `db.json` in the project root and copy the following structure into it:
        ```json
        {
          "contacts": [
            {
              "id": "1",
              "Name": "John",
              "LastName": "Doe",
              "Email": "john.doe@example.com",
              "Phone": "09123456789",
              "Category": "Colleague",
              "Gender": "Male"
            }
          ]
        }
        ```
    -   Now, in a terminal window, run the mock API server:
        ```sh
        npm run server
        ```
    -   Keep this terminal window open.

6.  **Run the Application:**
    -   Open a **new** terminal window (while the server is still running).
    -   Run the following command to start the main application:
        ```sh
        npm run dev
        ```
    -   Your project will now be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 🏗️ Code Structure

The project follows a modular and component-based architecture to ensure separation of concerns and maintainability.

-   **`src/context/Context.js`**: The heart of the application. Contains the global state management logic (`useReducer`), the context provider (`ContactService`), and all API interaction functions.

-   **`src/Components/Home.js`**: The main application shell and router. It decides whether to render the landing page content or the `ContactList` page.

-   **`src/Components/InputsComponent/`**: A folder containing all modules related to the contact form.
    -   **`Inputs.js`**: The main orchestrator for the form. It manages form state and logic using `react-hook-form` and assembles the sub-components.
    -   **`FormBanner.js`**: Displays the dynamic status banner (success, error, info).
    -   **`FormFields.js`**: Renders all the actual input fields for the form.
    -   **`FormActions.js`**: Renders the "Save" and "Back" action buttons.

-   **`src/Components/ContactListComponent/`**: A folder containing all modules for the contact list page.
    -   **`ContactList.js`**: The orchestrator for this page. It manages local UI state (search, modal visibility, etc.) and assembles the sub-components.
    -   **`ContactListHeader.js`**: Renders the page title, search bar, and main action buttons.
    -   **`ContactListBody.js`**: Renders the list of `ContactItem` components.
    -   **`ContactItem.js`**: A presentational component for displaying a single contact's information.
    -   **`ContactModals.js`**: Manages the logic and content for all confirmation and success modals.

-   **`src/Components/Modal.js`**: A reusable, low-level modal component that provides the basic structure and styling for all dialogs.

-   **`src/utils/validationSchema.js`**: Exports the **Yup** validation schema (`contactSchema`) used by `react-hook-form`.

-   **`src/App.js`**: The root component that wraps the entire application in the `ContactService` provider and manages the global `dark-mode` class on the `<body>`.

---

## 🏛️ Architectural Concepts

This project demonstrates several key architectural patterns in modern React development:

-   **Orchestrator vs. Presentational Components**: Parent components like `Inputs.js` and `ContactList.js` act as "orchestrators" (or containers). They handle logic, state management, and data fetching. Child components (`FormFields.js`, `ContactItem.js`) are "presentational"—they receive data via props and are only responsible for rendering the UI. This separation makes the code easier to reason about and test.

-   **Centralized vs. Local State**: The application makes a clear distinction between two types of state:
    -   **Global State** (managed by `useContext` and `useReducer`): Data that the entire application cares about, such as the list of contacts, the current theme (`darkMode`), and API logic.
    -   **Local UI State** (managed by `useState`): Data that only a specific component and its children need, such as the visibility of a modal or the current text in a search input. This prevents polluting the global state and avoids unnecessary re-renders across the app.