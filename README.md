
      ``# SED - Solar Energie Deutschland Website

This project is a web application for "SED - Solar Energie Deutschland," a company specializing in solar energy solutions. The website provides information about their products, the benefits of solar energy, a guide for potential customers, and allows users to submit inquiries for solar panel installations via a multi-step form.

## Features

*   **Informational Pages:**
    *   Home: Landing page with an overview and an inquiry form.
    *   Produkte (Products): Displays information about solar products.
    *   Vorteile (Benefits): Highlights the advantages of solar energy.
    *   Ratgeber (Guide): Offers advice and information to users.
    *   Impressum (Imprint): Legal notice page.
    *   Anfrage (Inquiry): Dedicated page for submitting inquiries, also featuring a form.
*   **Multi-step Inquiry Form:** Collects user details and solar energy requirements.
*   **Data Persistence:** User inquiries submitted through the forms are stored in a MongoDB database.
*   **Responsive Design:** Styled with Tailwind CSS for a responsive user experience across devices.
*   **Mobile-Friendly Navigation:** Includes a collapsible menu for smaller screens.
*   **Flash Messages:** System for displaying success or error messages after form submissions (setup in `app.js`, requires EJS integration to display).

## Tech Stack

*   **Backend:**
    *   Node.js
    *   Express.js (Web framework)
*   **Database:**
    *   MongoDB
    *   Mongoose (ODM - Object Data Modeling)
*   **Templating Engine:**
    *   EJS (Embedded JavaScript)
*   **Frontend Styling:**
    *   Tailwind CSS
*   **Frontend Logic:**
    *   Vanilla JavaScript (for mobile menu and form interactions within EJS templates)
*   **Middleware & Utilities:**
    *   `cookie-parser`: Parse cookie header.
    *   `body-parser`: Parse incoming request bodies.
    *   `morgan`: HTTP request logger.
    *   `cors`: Enable Cross-Origin Resource Sharing.
    *   `connect-flash`: For displaying flash messages.
    *   `http-errors`: Create HTTP errors for Express.

## Project Structure``
    

sed - www/  
├── models/ # Mongoose schemas and models  
│ └── userModel.js # Schema for user inquiries  
├── routes/ # Route definitions  
│ ├── anfrage.js  
│ ├── impressum.js  
│ ├── index.js  
│ ├── produkte.js  
│ ├── ratgeber.js  
│ ├── users.js  
│ └── vorteile.js  
├── views/ # EJS templates  
│ ├── anfrage.ejs  
│ ├── error.ejs  
│ ├── impressum.ejs  
│ ├── index.ejs  
│ ├── produkte.ejs  
│ ├── ratgeber.ejs  
│ └── vorteile.ejs  
├── public/ # Static assets (CSS, images, client-side JS) - convention  
│ ├── images/  
│ └── stylesheets/  
│ ├── css/  
│ ├── output.css # Compiled Tailwind CSS  
│ └── tailwind.css # Input Tailwind CSS (if used directly)  
├── .gitignore # Files and directories to be ignored by Git  
├── app.js # Main Express application setup  
├── db.js # MongoDB connection setup  
├── package.json # Project metadata and dependencies  
├── postcss.config.js # PostCSS configuration (for Tailwind)  
└── tailwind.config.js # Tailwind CSS configuration

      ``## Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   MongoDB (running instance, either local or cloud-based like MongoDB Atlas)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd sed-www
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

This project requires a MongoDB connection string.

1.  **Set up MongoDB:**
    Ensure you have a MongoDB instance running and accessible.

2.  **Update Connection Strings:**
    You need to replace the placeholder MongoDB URLs in the following files:
    *   `db.js`:
        ```javascript
        // const uri = "MONGO DB URL"; // Replace this line
        const uri = "your_mongodb_connection_string_here";
        ```
    *   `models/userModel.js`:
        ```javascript
        // const connect = mongoose.connect("MONGO URL"); // Replace this line
        const connect = mongoose.connect("your_mongodb_connection_string_here");
        ```

    **Note:** For better security and flexibility, it's recommended to use environment variables for your MongoDB URI. You would typically:
    *   Install `dotenv`: `npm install dotenv`
    *   Create a `.env` file in the root directory:
        ```env
        MONGO_URI=your_mongodb_connection_string_here
        ```
    *   Add `.env` to your `.gitignore` file.
    *   Modify `db.js` and `models/userModel.js` to load the URI from `process.env.MONGO_URI`.

## Running the Application

1.  **Build Tailwind CSS (if you make changes to `tailwind.css` or related files):**
    The `package.json` includes a script for this. Run it in a separate terminal or before starting the server if needed:
    ```bash
    npm run build:css
    ```
    This will watch for changes and recompile `public/stylesheets/output.css`.

2.  **Start the server:**
    *   For development (using the script defined in `package.json`):
        ```bash
        npm run dev
        ```
    *   For production (using the script defined in `package.json`):
        ```bash
        npm start
        ```
    The application will typically be available at `http://localhost:3000` (or the port specified in `./bin/www`).

## Scripts

The `package.json` file defines the following scripts:

*   `npm start`: Starts the application. Internally runs `node ./bin/www`.
*   `npm run dev`: Starts the application for development. Also runs `node ./bin/www`. (Consider using `nodemon` for auto-restarts during development by adding it to `devDependencies` and modifying this script: `nodemon ./bin/www`).
*   `npm run build:css`: Compiles the Tailwind CSS from `public/stylesheets/tailwind.css` (or as configured in `tailwind.config.js`) to `public/stylesheets/output.css` and watches for changes.

## Key Components

### Form Handling
*   Inquiry forms are present on the `index.ejs` and `anfrage.ejs` pages.
*   These forms submit data via POST request to the `/` route, handled in `app.js`.
*   The submitted data includes answers to questions and user contact information.

### Database Interaction (`models/userModel.js`, `db.js`)
*   `db.js` handles the initial connection setup to MongoDB.
*   `models/userModel.js` defines the Mongoose schema for storing user inquiry data.
*   The `app.js` POST `/` route uses `modelUser.insertMany()` to save the form data to the database.

### Routing (`routes/` directory and `app.js`)
*   `app.js` sets up the main Express application and mounts routers.
*   Each file in the `routes/` directory handles specific URL paths:
    *   `index.js`: Handles the root path (`/`) for the home page.
    *   `anfrage.js`: Handles `/anfrage`.
    *   `produkte.js`: Handles `/produkte`.
    *   And so on for other pages.

### Styling
*   Tailwind CSS is used for styling.
*   Configuration is in `tailwind.config.js` and `postcss.config.js`.
*   The compiled CSS is `public/stylesheets/output.css`, which is linked in the EJS templates.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

