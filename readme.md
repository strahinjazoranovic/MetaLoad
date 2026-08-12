![MetaLoad landing page](/public/images/landingPage.png)

MetaLoad is a loadout-sharing platform designed to make creating and sharing Call of Duty loadouts easier. Users can browse available loadouts or create their own loadouts.

## Features

- **Loadout Creation**: Users can create new loadouts by selecting a base weapon, specifying their in-game username, and adding up to five different types of attachments.
- **Admin functionality**: Admins can add new guns and attachments to the database.
- **Loadout Viewing**: Browse and view existing loadouts with their associated guns and attachments.
- **Database Integration**: Persists all data (guns, attachments, loadouts) using a PostgreSQL database.
- **User-Friendly Interface**: A clean UI built with React and Next.js, styled with Tailwind CSS and DaisyUI.

## Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Next.js API Routes (Node.js environment)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, DaisyUI, CSS
- **Database**: PostgreSQL

## Installation

This project is a Next.js application. Follow these steps to set it up locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/strahinjazoranovic/MetaLoad.git
    cd MetaLoad
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and copy the fields provided in .env.example and configure your PostgreSQL connection details

4.  **Database Setup:**
    Ensure you have a PostgreSQL database set up. The application expects the following tables:
    * At the moment I have no access to the up to date MetaLoad database, when I do this section will get updated

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at `http://localhost:3000`.

## Usage

MetaLoad is designed for Call of Duty Warzone players to manage and discover weapon loadouts.

### Key Use Cases:

*   **Create a Loadout**: Navigate to the `/create` page to build a new weapon loadout. You can select a gun, enter your username, and choose at least 5 attachments from predefined categories.
*   **View Loadouts**: Visit the `/loadouts` page to see a curated list of existing loadouts. Click on a gun to reveal its attachments and the username of the creator.
*   **Admin Functionality**: Use the `/create_admin` page to add new guns and attachments to the database. This is essential for populating the system with available weapons and attachments.

## Project Structure

```text
MetaLoad/
├── .env.example
├── .eslintrc.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public/
│   └── images/
│       ├── ames85.avif
│       ├── c9.avif
│       ├── cypher91.avif
│       └── avalon.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create/
│   │   │   │   ├── attachment/
│   │   │   │   ├── gun/
│   │   │   │   └── loadout/
│   │   │   └── fetch/
│   │   │       ├── attachments/
│   │   │       └── guns/
│   │   │           └── noAttachments/
│   │   ├── create/
│   │   ├── create_admin/
│   │   ├── loadouts/
│   │   ├── ui/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── next-env.d.ts
├── tsconfig.json
└── README.md
```

### Key Directories

* `src/app/api/` — API routes for creating and fetching guns, attachments, and loadouts.
* `src/app/create/` — Loadout creation page.
* `src/app/create_admin/` — Admin interface for managing guns and attachments.
* `src/app/loadouts/` — Loadout browsing page.
* `src/app/ui/` — Shared UI components and global styles.
* `public/images/` — Static images used throughout the application.
a
## Important Links

- **[Repository](https://github.com/strahinjazoranovic/MetaLoad)**
- **[Live demo](https://github.com/strahinjazoranovic/MetaLoad), coming soon** 

### Want more information about this project?

Head to my [portfolio](https://portfolio-topaz-xi-84.vercel.app/projects/metaload) for more information about MetaLoad and its development process

Developed by [strahinjazoranovic](https://github.com/strahinjazoranovic).
