# CartCraft - System Architecture

CartCraft is a full-stack e-commerce web application built with
Next.js, Node.js, Express.js and MongoDB.

The application follows a client-server architecture where the
frontend communicates with the backend through REST APIs.

---

## 1. High-Level Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │   Web Browser       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │      Next.js        │
                    │                     │
                    │  - Home             │
                    │  - Products         │
                    │  - Categories       │
                    │  - Cart             │
                    │  - Orders           │
                    │  - Login/Register   │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │   Node.js + Express │
                    │                     │
                    │  - Authentication   │
                    │  - Products         │
                    │  - Cart             │
                    │  - Orders           │
                    │  - Reviews          │
                    │  - Admin            │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │                     │
                    │  Users              │
                    │  Products           │
                    │  Cart Items         │
                    │  Orders             │
                    │  Reviews            │
                    └─────────────────────┘
   