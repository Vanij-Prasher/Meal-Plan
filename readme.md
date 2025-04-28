Personalized Meal Planner  (with Grok AI and Spoonacular API)

This project creates a personalized meal plan based on the user's input, including their  BMI ,  health condition ,  diet preferences , and  goal (e.g., muscle gain) . The system uses  Grok AI  to generate personalized meal suggestions, and  Spoonacular API  to fetch meal images. It uses a  Node.js server  to securely handle API calls and avoid exposing sensitive keys.

Features 
- Personalized meal suggestions based on  BMI ,  dietary preferences , and  health goals .
- Fetches  meal images  using Spoonacular API.
- Ensures  privacy and security  by keeping sensitive API keys on the backend.
- Provides  nutritional information  (calories, protein, fat, carbs) for each meal.

Technologies Used 
-  Frontend : HTML, CSS, JavaScript (Fetch API)
-  Backend : Node.js, Express
-  AI : Grok AI (for generating personalized meal plans)
-  Meal Image API : Spoonacular API (for fetching meal images)
-  Nutritional Data : Based on the response from Grok AI

---

Project Setup 

    1. Clone the repository 
Clone this repository to your local machine.

```bash
git clone <repo_url>
cd personalized-meal-planner
```

    2. Install Dependencies 

   Frontend
1. Navigate to the `public/` directory (where the HTML, CSS, and `Script.js` are stored).
2. Open `index.html` in a browser.

   Backend
1. Navigate to the root folder (`personalized-meal-planner/`).
2. Install the required Node.js dependencies:

```bash
npm install
```

    3. Environment Variables 

   Grok API Key
Create a `.env` file in the root folder (next to `Server.mjs`).

```bash
GROK_API_KEY=your_grok_api_key_here
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
```

    4. Running the Server 

Once the environment is set up, start the server with the following command:

```bash
npm start
```

This will start the server on `http://localhost:3000`.

    5. Running the Frontend 
You can now open the `public/index.html` file in a browser to interact with the meal planner.

---

   How It Works 

1.  User Input: 
   The user enters their  weight ,  height ,  health condition ,  health goal ,  diet ,  cuisine , and  excluded ingredients  via a form on the frontend.

2.  BMI Calculation: 
   Based on the  weight  and  height  provided, the system calculates the  BMI  and categorizes it into:
   - Underweight
   - Normal weight
   - Overweight
   - Obese

3.  API Call to Grok AI: 
   A request is sent to the  Node.js server  (`/meal-plan`) with the user's data. The server then forwards the request to the  Grok API , which returns personalized meal suggestions.

4.  Meal Suggestions: 
   The server processes the response from Grok AI and sends it back to the frontend. This includes the meal name, ingredients, preparation steps, allergens, and nutritional information (calories, protein, fat, carbs).

5.  Fetching Meal Images: 
   The frontend calls the  Spoonacular API  to fetch meal images based on the meal names.

6.  Displaying Results: 
   The frontend dynamically displays the meal suggestions with  images ,  ingredients ,  preparation ,  allergens , and  nutritional information .

---

   API Endpoints 

    POST /meal-plan 

 Request Body: 
```json
{
  "userMessage": "I want a personalized meal plan based on my BMI of 23.5, health condition of diabetes, and goal of muscle gain. Exclude nuts and dairy."
}
```

 Response: 
```json
{
  "response": "Meal suggestions including names, ingredients, preparation steps, allergens, and nutritional information."
}
```

---

   Security Considerations 
-  API Keys  (for Grok AI and Spoonacular) are  stored on the server  side to avoid exposure to the frontend.
-  CORS  is enabled in the backend to allow the frontend to make requests to the server.

---

   To Do / Future Improvements 
- Add  user authentication  to allow personalized meal plans for different users.
- Implement  better error handling  and display user-friendly messages for edge cases.
- Allow users to  save  their meal plans for future reference.
- Include  more detailed nutritional data  (e.g., vitamins, minerals).
  
---

   License 

This project is licensed under the MIT License.