
# Blueprint: 한국남성과의 연애/결혼 생활 Q&A AI

## Overview

This project is a web-based landing page for a Q&A AI service focused on providing information and answering questions about dating and marriage with Korean men. The goal is to create a visually appealing, engaging, and modern user experience that encourages user interaction.

## Style, Design, and Features

### Visual Design (Aesthetics)
*   **Color Palette:**
    *   **Primary:** A deep, trustworthy blue (`#3A4D8F`).
    *   **Accent:** A vibrant, friendly pink (`#E91E63`) for interactive elements like buttons and highlights.
    *   **Background:** A very light, textured gray (`#FDFDFD` with a subtle noise texture) to give a premium feel.
    *   **Text:** Dark gray (`#333333`) for readability.
    *   **UI Elements:** Soft, multi-layered drop shadows to create a sense of depth and lift elements off the page.
*   **Typography:**
    *   **Font:** Noto Sans KR from Google Fonts for excellent readability in both Korean and English.
    *   **Hierarchy:**
        *   **Hero Title:** Large, bold font size (e.g., 48px) to immediately grab attention.
        *   **Subheadings:** Medium font size (e.g., 24px) to guide the user.
        *   **Body Text:** Clear, legible font size (e.g., 16px).
*   **Iconography:** Modern, clean icons will be used for interactive elements (e.g., a paper plane icon for the "send" button).
*   **Layout:**
    *   A centered, single-column layout for mobile-first responsiveness.
    *   Generous white space to create a clean and uncluttered look.
    *   A "chat window" as the central focus of the page.

### Features
*   **Hero Section:** A compelling headline and a brief, inviting description of the service.
*   **Interactive Q&A Interface:**
    *   A display area that simulates a chat conversation.
    *   An input field for the user to type their questions.
    *   A "submit" button to send the question to the AI.
*   **Web Components:** The chat interface will be built as a custom element (`<qa-chat>`) to encapsulate its structure, style, and behavior.
*   **Modern CSS:**
    *   CSS Variables for easy theming.
    *   Flexbox for layout.
    *   Subtle animations and transitions for a smoother user experience.
*   **Accessibility:**
    *   Semantic HTML for screen readers.
    *   Proper color contrast.
    *   Accessible labels for all form elements.

## Current Plan: Initial Landing Page Setup

1.  **Update `index.html`:**
    *   Set the document language to Korean (`lang="ko"`).
    *   Change the page title.
    *   Add the Noto Sans KR font from Google Fonts.
    *   Create the basic HTML structure including a header, main content area, and the placeholder for the chat component.
2.  **Update `style.css`:**
    *   Implement the full visual design as outlined above.
    *   Add base styles, typography, color variables, and layout.
    *   Style the main chat container, input fields, and buttons with modern effects (shadows, glows).
3.  **Update `main.js`:**
    *   (No JavaScript functionality needed for the initial static page, but the file will be linked).

