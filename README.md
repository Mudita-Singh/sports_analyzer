# SportAnalyzer

## Overview
**SportAnalyzer** is a modern full-stack web application designed for sports performance analysis. It allows users to track and analyze their physical metrics (height, weight, age) in the context of their chosen sport.

## Features
- **Profile Management**: Create and update user profiles with key physical metrics.
- **Support for Multiple Sports**: Choose specific sports for tailored analysis.
- **Modern Dashboard**: High-quality data visualization using Recharts.
- **Interactive UI**: Smooth animations and responsive design.

## Tech Stack
- **Frontend**: React 18, Vite, TanStack Query, Radix UI, Framer Motion, Tailwind CSS.
- **Backend**: Express.js, Node.js, Passport.js (Authentication).
- **Database**: Drizzle ORM (configured for PostgreSQL).
- **Validation**: Zod.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Mudita-Singh/sports_analyzer.git
    cd sports_analyzer
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run in development**:
    ```bash
    npm run dev
    ```

## Project Structure
- `client/`: React frontend source code.
- `server/`: Express backend and API logic.
- `shared/`: Shared TypeScript schemas and validation logic.
- `drizzle/`: Database migration and configuration.

## License
MIT
