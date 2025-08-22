# 🚀 Product Management Admin Panel

[Read in Persian (فارسی)](./README.fa.md)

A modern and fully responsive admin dashboard for managing a product inventory. Built with React and Vite, this project showcases frontend development best practices, including logic abstraction into custom hooks, server-state management with React Query, and a robust component-based architecture.

---

## ✨ Key Features

- **User Authentication:** Complete Login and Register system using JWT.
- **Full Product Management (CRUD):** Ability to Create, Read, Update, and Delete products.
- **Bulk Delete:** Select and delete multiple products at once.
- **Advanced Search:** Server-side search functionality with debouncing to optimize performance.
- **Pagination:** Server-side pagination to handle large datasets efficiently.
- **Client-Side Sorting:** Sort products by price and quantity.
- **Fully Responsive Design:** A seamless experience on all devices, from desktops to mobile phones.
- **Instant User Feedback:** Toast notifications for success and error states.

---

## 🛠️ Tech Stack

- **Core Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Server State Management:** [TanStack Query (React Query)](https://tanstack.com/query)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Styling:** CSS Modules
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons)

---

## ⚙️ Getting Started

To run this project locally, follow the steps below.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A package manager like `npm` or `yarn`

### 1. Clone the Repository

```bash
git clone <YOUR-REPOSITORY-URL>
cd <PROJECT-FOLDER-NAME>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a file named `.env` in the root of the project and add the following variable:

```
VITE_API_BASE_URL="http://localhost:3000"
```

**Note:** Ensure the URL and port match your running backend server.

### 4. Run the Application

First, make sure your backend server is running. Then, run the following command to start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another available port).

---

## 📂 Project Structure

```
src
├── api/         # Axios client configuration
├── assets/      # Static files like images and fonts
├── components/  # Reusable components (Button, Modal, Table, etc.)
├── constants/   # Constant values (e.g., page size)
├── context/     # React Context for global state (e.g., Authentication)
├── hooks/       # Custom hooks for abstracting logic
├── pages/       # Main components for each page (Login, Dashboard, etc.)
├── schemas/     # Yup schemas for form validation
└── utils/       # General helper functions (formatting, notifications, etc.)
```
