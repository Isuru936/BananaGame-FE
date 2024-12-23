
# Banana Game Deployment and Repository Information

## Deployed Game
You can access the deployed Banana Game using the following link:  
[Banana Game](https://witty-forest-077d05c10.4.azurestaticapps.net/) - NOT WORKING, OUT OF JUICE (CREDITS)

## Repositories
- **Frontend Repository**: [Banana Game Frontend](https://github.com/Isuru936/BananaGame-FE)
- **Backend Repository**: [Banana Game Backend](https://github.com/Isuru936/BananaGame-BE.git)

---

## Backend Configuration Guide

1. **Clone the Backend Repository**  
   Clone the backend repository from the following link:  
   [Banana Game Backend](https://github.com/Isuru936/BananaGame-BE.git)

2. **Set Configuration Values**  
   After cloning, navigate to the `appsettings.Development.json` file and configure the connection string as follows:
   ```json
   "ConnectionStrings": {
       "DefaultConnection": "<SET THE CONNECTION STRING>"
   }
   ```

   Next, configure the `appsettings.json` file with your JWT settings:
   ```json
   "JWT": {
       "ValidAudience": "http://localhost:7087",
       "ValidIssuer": "http://localhost:7087",
       "Secret": "<SET-YOUR-36-CHARACTER-SECRET-HERE>"
   }
   ```

3. **Run Migrations**  
   The backend uses a SQL database. To set up the database, run the following commands in the Package Manager Console:
   ```bash
   update-database -context ApplicationDbContext
   update-database -context IdentityDatabaseContext
   ```

4. **Run the Backend Program**  
   Once the migrations are complete, you can start the backend program.

---

## Frontend Configuration Guide

1. **Clone the Frontend Repository**  
   Clone the frontend repository from the following link:  
   [Banana Game Frontend](https://github.com/Isuru936/BananaGame-FE)

2. **Install Node Modules**  
   Navigate to the project directory and install the required dependencies by running:  
   ```bash
   npm install
   ```

3. **Run the Frontend Application**  
   Start the development server and enjoy the game:  
   ```bash
   npm run dev
   ```

---

If you need further assistance, feel free to reach out!
