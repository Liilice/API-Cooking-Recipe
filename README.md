# Cooking Recipes API

This is an API to manage simple cooking recipes using NestJS and PostgreSQL.

## Installation

1. Clone the repository:

   ```bash
   git@github.com:Liilice/API-cooking-recipes.git
   cd api/
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the application:
   To start the application in development mode:
   `bash
    npm run start:dev
    `
   The application should now be accessible at http://localhost:3000.

4. Using Swagger to Test the API
   This API is documented and testable via Swagger. Swagger provides a user-friendly interface to interact with the API.
   To access Swagger, start your application as mentioned above and open your browser at:
   `bash
    http://localhost:3000/api
    `
   Here, you will find all available routes, their methods, and you can test requests directly from the Swagger interface.

5. The API provides the following endpoints:

### Ingredients

- `GET /ingredients`: Get all ingredients.
- `GET /ingredients/:id`: Get a specific ingredient by ID.
- `POST /ingredients`: Create a new ingredient.
- `PATCH /ingredients/:id`: Update an existing ingredient.
- `DELETE /ingredients/:id`: Delete an ingredient (returns HTTP 409 if the ingredient is referenced in any recipe).

### Recipes

- `GET /recipes`: Get all recipes.
- `GET /recipes/:id`: Get a specific recipe by ID.
- `POST /recipes`: Create a new recipe.
- `PARCH /recipes/:id`: Update an existing recipe (logs "BAZINGA" if the recipe name changes).
- `DELETE /recipes/:id`: Delete a recipe.
