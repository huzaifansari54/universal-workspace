# Frontend Documentation: Universal Action Workspace

This document provides a detailed breakdown of the frontend components, design decisions, and architectural patterns used in the Universal Action Workspace.

## 1. Design System: Aether UI
The application uses a custom design system called **Aether UI**, focused on a premium "Obsidian" aesthetic with glassmorphism and high-contrast accents.

### Color Palette
- **Deep Slate (`--background`)**: `#0f172a` - The primary base for the application.
- **Electric Indigo (`--accent-primary`)**: `#6366f1` - Used for primary actions, active states, and glowing effects.
- **Cyan Mist (`--accent-secondary`)**: `#22d3ee` - Used for secondary highlights and success states.
- **Translucent Slate (`--surface`)**: `rgba(30, 41, 59, 0.7)` - The base for glassmorphic containers.

---

## 2. Global Layout
The layout follows a persistent sidebar pattern to maximize screen real estate on web devices.

### Root Layout (`layout.tsx`)
- **Structure**: A flex container with a fixed-width `Sidebar` and a flexible `main` content area.
- **Margins**: The `main` area has a `marginLeft` equal to `--sidebar-width` to prevent content from being hidden behind the fixed sidebar.
- **Background**: Features a subtle radial gradient highlight in the top-right corner to add depth.

### Sidebar Component
- **Path**: `apps/web/src/components/Sidebar/Sidebar.tsx`
- **Purpose**: Provides global navigation and branding.
- **Features**:
    - Glassmorphic background using the `.glass` utility.
    - Integrated branding (Logo).
    - Navigation links with active state detection using `usePathname`.
    - User profile/settings shortcut at the bottom.

---

## 3. Pages & Routes

### `Home` Page (`/`)
The "Templates Hub". Displays a grid of `TemplateCard` components. It serves as the primary dashboard for quick-triggering common workflows.

### `Workspace` Page (`/workspace`)
The "Manual Action Builder". This is where users build custom recipes from scratch. (Currently a placeholder).

### `Activity` Page (`/activity`)
The "Execution Log". A place to track background jobs and review past action results. (Currently a placeholder).

### `Modules` Page (`/modules`)
The "Integrations Center". Used for managing OAuth connections and external tool configurations. (Currently a placeholder).

---

## 4. Component Details

### `TemplateCard` Component
**Functionality:**
Displays a summary of a predefined action flow template.

**Props:**
- `title`: string - The name of the template.
- `description`: string - A brief explanation of what the action does.
- `modules`: string[] - Array of names/icons of the modules used in this template.
- `onClick`: () => void - Callback when the card is clicked.

**Internal Logic:**
- Uses the `.glass` utility for its background.
- Combines local styles with the `.glow-hover` utility for a premium interaction feel.

---
