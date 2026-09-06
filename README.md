# 🪐 Nova OS

<div align="center">

![Nova OS Banner](https://img.shields.io/badge/Nova%20OS-Web%20Desktop%20Environment-6366f1?style=for-the-badge&logo=react&logoColor=white)

**A modern, high-performance browser-based desktop operating system.**  
Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Express, and Prisma ORM.

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Deployment](#-docker-deployment) • [API Documentation](#-api--backend)

---

</div>

## 🌌 Overview

**Nova OS** is a feature-rich, web-native Operating System platform that simulates a full desktop experience inside the browser. It combines fluid UI animations, desktop window management, virtual file navigation, custom command-line terminal, authentication flows, and a microservice-ready backend database architecture.

Designed with modularity and clean engineering principles, **Nova OS** bridges web frontend craftsmanship with robust full-stack infrastructure.

---

## ✨ Key Features

### 🖥️ Desktop & Window Management
- **Fluid Window Operations**: Drag-and-drop, dynamic multi-edge resizing, z-index elevation, snap-to-edge, minimize, maximize, and smooth closing.
- **Dock & Taskbar**: Mac/Windows-inspired animated dock with active app indicators, status badges, and quick-launch shortcuts.
- **System Tray & Widgets**: Live system clock, calendar toggle, status indicators, and notification tray.
- **Context Menus**: Custom right-click desktop menus for wallpaper changes, layout options, and quick actions.

### 🔒 Authentication & Lock Screen
- **Protected Desktop Routing**: Next.js route protection segregating public auth views (`(public)`) from the main desktop (`(protected)`).
- **Interactive Lock Screen**: PIN/Password lock screen modal with user avatar customization and sleep/wake state logic.
- **Backend JWT Auth Integration**: Secure token verification via backend middleware.

### 📂 Virtual File System & Explorer
- **Directory Tree Navigation**: Hierarchical folder structures, breadcrumb paths, file metadata viewing.
- **File Operations**: Create, delete, move, rename, and view file details.
- **File Previews**: Media, plain text, and code file preview capabilities.

### ⚡ Integrated Command Line Interface (Terminal)
- **Built-in CLI Shell**: Custom terminal supporting command parsing, flag evaluation, and output formatting.
- **Supported Commands**: `ls`, `cd`, `cat`, `clear`, `mkdir`, `echo`, `sysinfo`, `help`, and app execution triggers.
- **Interactive Shell History**: Arrow-key navigation through past terminal commands.

### 🤖 AI Assistant Integration
- **Contextual Desktop Assistant**: AI-powered productivity interface built directly into the web desktop environment.

### 🎨 Personalization & UX
- **Theme & Wallpaper Customization**: Dynamic wallpaper gallery, blur/dark modes, and glassmorphism styling using Tailwind CSS and Framer Motion.
- **Responsive Layout**: Designed for seamless scaling across different viewport dimensions.

---

## 🛠️ Tech Stack

### Frontend Architecture
| Technology | Role |
| :--- | :--- |
| **[Next.js 15](https://nextjs.org/)** | App Router, Server Components & Client Boundaries |
| **[React 18](https://react.dev/)** | Component Architecture & Dynamic Hooks |
| **[TypeScript](https://www.typescriptlang.org/)** | Strict Static Type System |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-First Styling & Glassmorphic UI Design |
| **[Framer Motion](https://www.framer.com/motion/)** | Window Physics, Dragging, Micro-interactions & Transitions |
| **[Zustand](https://zustand-demo.pmnd.rs/)** | High-performance Global Window & Desktop State Management |
| **[Lucide React](https://lucide.dev/)** | Vector Icon System |

### Backend Infrastructure
| Technology | Role |
| :--- | :--- |
| **[Node.js / Express](https://expressjs.com/)** | REST API Server Architecture |
| **[Prisma ORM](https://www.prisma.io/)** | Type-safe Database Modeling & Migration Tooling |
| **[PostgreSQL](https://www.postgresql.org/)** | Relational Database Engine |
| **[Docker & Docker Compose](https://www.docker.com/)** | Container Orchestration & Multi-Service Deployment |

---

## 📁 Repository Structure

```gcode
nova-os/
├── docker-compose.yml         # Container orchestration for Frontend, Backend & DB
├── LICENSE                    # MIT License
├── README.md                  # Project Documentation
├── backend/                   # Node.js Express & Prisma API Server
│   ├── prisma/
│   │   └── schema.prisma      # Database Schema Definition
│   ├── src/
│   │   ├── middleware/        # Error Handling & Auth Middleware
│   │   ├── routes/            # Health Checks & API Endpoints
│   │   ├── app.ts             # Express App Configuration
│   │   └── server.ts          # Server Entrypoint
│   ├── .env.example           # Backend Environment Variables Template
│   ├── package.json
│   └── tsconfig.json
└── frontend/                  # Next.js 15 Desktop Web Application
    ├── src/
    │   └── app/
    │       ├── (protected)/   # Desktop Dashboard & Authenticated Views
    │       │   └── desktop/
    │       ├── (public)/      # Login & Lock Screen Components
    │       │   ├── lock/
    │       │   └── login/
    │       ├── layout.tsx     # Root Application Layout
    │       └── globals.css    # Global CSS & Design Tokens
    ├── .env.local.example     # Frontend Environment Variables Template
    ├── next.config.js
    ├── package.json
    └── tsconfig.json
