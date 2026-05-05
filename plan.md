# Universal Action Workspace: Frontend & UX Plan

This document serves as the master reference for the frontend design, layout, and user experience of the Universal Action Workspace.

## 1. Global Navigation: The Sidebar
Instead of a mobile bottom navigation bar, the web app features a persistent **Left Sidebar**.
- **Templates**: Dashboard for predefined, one-click flows.
- **Workspace**: The manual action builder (The core engine).
- **Activity & Modules**: Execution tracking and OAuth settings/management.
- **Aesthetic**: Glassmorphism effect with a dark "Obsidian" theme.

## 2. Main Dashboard: The "Templates" Hub
A responsive grid layout for predefined action flows.
- **Card Design**: Each card displays a brief description and icons of required modules (e.g., "Post video to all platforms" -> YouTube, TikTok, X).
- **Interaction**: Clicking a template opens a central modal for "Resource Upload."
- **Resources**: Support for Video, Image, and Text files.

## 3. The Action Builder: The Core "Workspace"
A powerful 3-column layout (Horizontal Wizard) for manual action construction:
- **Column 1 (Input)**: Drag-and-drop zone to select and preview the Resource. Includes metadata summary.
- **Column 2 (Configuration)**: 
    - Primary Dropdown: Select a registered Module (e.g., YouTube, AI Tool).
    - Secondary Dropdown: Select specific Capability (e.g., "Upload Video," "Summarize Text").
- **Column 3 (Execution)**: 
    - Review panel showing the planned "Recipe."
    - High-visibility **"Execute Action"** button with a glowing state.
    - Intentional execution ensures no forced automation.

## 4. Activity Dashboard & Security Settings
Designed for managing complex background data.
- **Activity Feed**: A clean data table showing:
    - Action Name & Timestamp.
    - Execution Mode: Local, API, or Assisted.
    - Progress Bar: Real-time status of background jobs.
- **Module Management**: 
    - Dedicated settings page for external apps.
    - Secure OAuth flow triggers for permission-based access.
    - Encrypted token storage status.

## 5. Visual Standards (Aether UI)
- **Colors**: Deep Slate background (#0f172a), Electric Indigo (#6366f1) and Cyan Mist (#22d3ee) accents.
- **Typography**: Modern sans-serif (Inter/Outfit).
- **Interactions**: Smooth 300ms transitions, hover-states with subtle scaling, and radial glowing effects for primary actions.
- **Responsiveness**: Fluid layout that adapts from large monitors to tablets.
