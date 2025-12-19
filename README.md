
# react-interview

This is a simple React application using Vite as the build tool. Candidates are expected to build a Todo List UI by consuming the provided API. The scaffold includes basic setup and configurations to get started quickly.

### Installation

This project provides a development environment using **devContainers**. Open the repository in a devContainer using your preferred IDE (e.g., VS Code). The devContainer will have all dependencies pre-installed.

## Contact

- Martín Fernández (mfernandez@crunchloop.io)

## About Crunchloop

![crunchloop](https://s3.amazonaws.com/crunchloop.io/logo-blue.png)

We strongly believe in giving back :rocket:. Let's work together [`Get in touch`](https://crunchloop.io/#contact).

---

# Frontend Setup and Documentation

## Overview

This is a modern TodoList application built with React, TypeScript, and Tailwind CSS. The application allows users to create multiple todo lists, add tasks with descriptions, mark them as complete, and perform bulk operations like completing all tasks in a list.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **FastAPI** - Backend API (separate repository)

## Features

- Create and manage multiple todo lists
- Add tasks with names and descriptions
- Toggle individual task completion status
- Complete all tasks in a list at once
- Edit and delete lists and tasks
- Real-time progress tracking
- Toast notifications for user feedback
- Responsive design

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v22 or higher recommended)
- **npm** or **yarn**
- **Backend API running** - The FastAPI backend must be running and accessible

## Environment Setup

Create a `.env` file in the root directory with the following configuration:
```env
VITE_API_URL=http://localhost:8080
```

This URL should point to your running FastAPI backend server.

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Option 1: Local Development
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Option 2: Docker with Dev Containers (Recommended)

This project includes a dev container configuration for consistent development environments.

**Dev Container Configuration** (`.devcontainer/devcontainer.json`):
```json
{
    "name": "Node.js & TypeScript",
    "image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm",
    "forwardPorts": [5173],
    "postCreateCommand": [
        "bash",
        ".devcontainer/postCreate.sh"
    ],
    "customizations": {
        "vscode": {
            "extensions": [
                "dbaeumer.vscode-eslint",
                "esbenp.prettier-vscode",
                "bradlc.vscode-tailwindcss"
            ]
        }
    }
}
```

**Steps to run with Docker:**

1. Open the project in VS Code
2. Install the "Dev Containers" extension
3. Press `F1` and select "Dev Containers: Reopen in Container"
4. Once the container is built, run `npm run dev`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```bash
src/
├── assets/
│   └── logo.png
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── LoadingSpinner.tsx
│   │   ├── Modal.tsx
│   │   └── ToastContainer.tsx
│   ├── TodoItem/            # Task-related components
│   │   ├── TodoItemForm.tsx
│   │   └── TodoItemsPanel.tsx
│   └── TodoList/            # List-related components
│       ├── TodoListForm.tsx
│       ├── TodoListHeader.tsx
│       └── TodoListPanel.tsx
├── hooks/                   # Custom React hooks
│   ├── useAsync.ts          # Async operation handler
│   ├── useToast.ts          # Toast notifications
│   ├── useTodoItems.ts      # Todo items state management
│   └── useTodoLists.ts      # Todo lists state management
├── services/                # API integration layer
│   ├── api.ts               # Base API client
│   ├── todoItemService.ts   # Todo items API calls
│   └── todoListService.ts   # Todo lists API calls
├── types/                   # TypeScript type definitions
│   ├── todoItem.types.ts
│   └── todoList.types.ts
├── App.tsx                  # Main application component
├── index.css                # Global styles
├── main.tsx                 # Application entry point
└── vite-env.d.ts           # Vite type definitions
```

### Configuration Files

- `.env` - Environment variables
- `index.html` - HTML entry point
- `package.json` - Dependencies and scripts
- `package-lock.json` - Dependency lock file
- `README.md` - Project documentation
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.app.json` - TypeScript configuration for app
- `tsconfig.node.json` - TypeScript configuration for Node
- `vite.config.ts` - Vite configuration
- `.gitignore` - Git ignore rules
- `eslint.config.js` - ESLint configuration

## Architecture

### Separation of Concerns

The application follows a clean architecture pattern:

1. **Components** - Presentational layer, separated into:
   - Common components (reusable UI elements)
   - Feature-specific components (TodoList, TodoItem)

2. **Hooks** - Business logic and state management:
   - `useAsync` - Generic async operation handler
   - `useToast` - Toast notification system
   - `useTodoItems` - Todo items CRUD operations
   - `useTodoLists` - Todo lists CRUD operations

3. **Services** - API communication layer:
   - `api.ts` - Base HTTP client with error handling
   - `todoItemService.ts` - Todo items API endpoints
   - `todoListService.ts` - Todo lists API endpoints

4. **Types** - TypeScript definitions for type safety

### API Integration

The frontend connects to a FastAPI backend. The base API client (`api.ts`) handles:

- HTTP requests (GET, POST, PUT, DELETE)
- Error handling with custom `ApiError` class
- JSON serialization/deserialization
- Response status validation

**API Base URL Configuration:**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
```

### API Endpoints

**Todo Lists:**
- `GET /api/todolists` - Get all lists
- `GET /api/todolists/:id` - Get list by ID
- `POST /api/todolists` - Create new list
- `PUT /api/todolists/:id` - Update list
- `DELETE /api/todolists/:id` - Delete list

**Todo Items:**
- `GET /api/todolists/:todoListId/items` - Get all items in a list
- `GET /api/todolists/:todoListId/items/:itemId` - Get item by ID
- `POST /api/todolists/:todoListId/items` - Create new item
- `PUT /api/todolists/:todoListId/items/:itemId` - Update item
- `DELETE /api/todolists/:todoListId/items/:itemId` - Delete item
- `POST /api/todolists/:todoListId/items/complete-all` - Complete all items

## Vite Configuration

The project uses custom Vite configuration for Docker compatibility:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',      // Allow external connections
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true    // Required for Docker file watching
    }
  }
});
```

## Important Notes

⚠️ **Backend Requirement**: The FastAPI backend must be running and accessible at the URL specified in your `.env` file before starting the frontend.

⚠️ **Port Configuration**: The application runs on port 5173 by default. Ensure this port is available or modify the configuration in `vite.config.ts`.

⚠️ **Environment Variables**: Always create a `.env` file before running the application. Without it, API calls will fail.

## Troubleshooting

### Backend Connection Issues

If you encounter API connection errors:
1. Verify the backend is running
2. Check the `VITE_API_URL` in your `.env` file
3. Ensure there are no CORS issues on the backend
4. Check browser console for detailed error messages

### Port Already in Use

If port 5173 is already in use:
1. Stop the process using that port
2. Or modify the port in `vite.config.ts`

### Docker Issues

If the dev container fails to start:
1. Ensure Docker is running
2. Check the `.devcontainer/postCreate.sh` script exists and is executable
3. Try rebuilding the container: "Dev Containers: Rebuild Container"

## Development Best Practices

- Use TypeScript strict mode for type safety
- Follow the existing component structure
- Keep hooks focused on single responsibilities
- Handle all API errors with user-friendly messages
- Use toast notifications for user feedback
- Test changes with both empty and populated states

## Contributing

When contributing to this project:
1. Follow the existing code structure
2. Maintain TypeScript type definitions
3. Add appropriate error handling
4. Update this documentation if needed

5. Test with the backend API
