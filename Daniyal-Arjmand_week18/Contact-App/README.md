# Contact Management App

[Read in Persian (فارسی)](./README.fa.md)

A modern and responsive web application for managing contacts, built with React and Vite. This app allows you to perform full CRUD (Create, Read, Update, Delete) operations and features a dark mode, dynamic form validation, and advanced functionalities like bulk deletion.

![A demonstration of the Contact Management App](https://via.placeholder.com/800x450.png?text=App+Screenshot+Here)

---

## ✨ Features

-   **Smart Contact Management**: Easily add, view, edit, and delete your contacts from a clean and intuitive interface.
-   **Dark/Light Mode**: Switch between a light and dark theme for the best user experience, with changes applied instantly across the app.
-   **Bulk Deletion**: Select and delete multiple contacts at once with a confirmation step.
-   **Powerful Search**: Instantly filter contacts by name or email address in real-time.
-   **Dynamic Form Validation**: Get instant feedback on inputs to ensure data is correct before submission, with clear error and success states.
-   **Confirmation Modals**: Secure sensitive actions like deleting or editing with clear and beautifully animated confirmation dialogs.
-   **Responsive Design**: A seamless experience across all devices with different screen sizes.
-   **Centralized State Management**: Uses React's `useReducer` and `useContext` hooks for predictable and maintainable state logic.

---

## 🛠️ Tech Stack

-   **[Vite](https://vitejs.dev/)**: A modern frontend build tool that provides a faster and leaner development experience.
-   **[React.js](https://react.dev/)**: A JavaScript library for building user interfaces, using modern hooks (`useReducer`, `useContext`, `useState`).
-   **[JSON Server](https://github.com/typicode/json-server)**: To simulate a REST API for data management during development.
-   **[Font Awesome](https://fontawesome.com/)**: For beautiful and scalable vector icons.
-   **CSS & CSS Modules**: For custom styling and to prevent class name conflicts, ensuring component-level style encapsulation.

---

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running.

### Prerequisites

Make sure you have **Node.js** and **npm** (or **yarn**) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/contact-management-app.git](https://github.com/your-username/contact-management-app.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd contact-management-app
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
    This project uses `json-server` to store data.
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
    -   Now, run the `json-server` on port `3001`:
        ```sh
        json-server --watch db.json --port 3001
        ```
    -   Keep this terminal window open.

6.  **Run the Application:**
    Open a new terminal and run the following command to start the main application using Vite's development server:
    ```sh
    npm run dev
    ```
    Your project will now be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 🏗️ Code Structure

-   **`src/context/Context.js`**: The heart of the application; contains the state management logic (`useReducer`), the context provider (`ContactService`), and all API call functions (CRUD operations).
-   **`src/Components/Home.js`**: The main landing page component. It serves as a dashboard, displaying the total number of contacts and providing navigation to the "Add Contact" form and the "Contact List" view. It also contains the dark mode toggle.
-   **`src/Components/Inputs.js`**: The form for adding and editing a contact. It includes dynamic validation, success/error banners, and input feedback icons.
-   **`src/Components/ContactList.js`**: The component that displays the list of contacts. It handles search functionality, selection for bulk deletion, and triggers modals for edit/delete confirmations.
-   **`src/Components/Modal.js`**: A reusable modal component for displaying confirmation, error, or success messages with different styles based on the context.
-   **`src/utils/validation.js`**: A utility module that exports the `validateForm` function, containing all the validation logic for the contact form.
-   **`src/App.js`**: The root component that sets up the `ContactService` provider, making the global state and dispatch functions available to the entire application.