// const apiKey = "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"; // Replace with your actual API key
// const apiUrl = "https://api.groq.com/openai/v1/chat/completions";  // Grok AI endpoint

// // Form submission event listener
// document.getElementById("diet-form").addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const weight = parseFloat(document.getElementById("weight").value);
//     const height = parseFloat(document.getElementById("height").value) / 100; // Convert to meters

//     // BMI Calculation
//     const bmi = weight / (height * height);

//     let bmiCategory = '';
//     if (bmi < 18.5) {
//         bmiCategory = 'Underweight';
//     } else if (bmi >= 18.5 && bmi < 24.9) {
//         bmiCategory = 'Normal weight';
//     } else if (bmi >= 25 && bmi < 29.9) {
//         bmiCategory = 'Overweight';
//     } else {
//         bmiCategory = 'Obese';
//     }

//     const calorieAdvice = getCalorieAdvice(bmiCategory);

//     // Get form inputs
//     const healthCondition = document.getElementById("health-condition").value;
//     const healthGoal = document.getElementById("health-goal").value;
//     const excludeIngredients = Array.from(document.getElementById("allergies").selectedOptions)
//         .map(option => option.value)
//         .join(",") || '';
//     const diet = document.getElementById("diet").value;
//     const cuisine = document.getElementById("cuisine").value;
//     const maxCalories = parseInt(document.getElementById("max-calories").value) || '';

//     // Create a message to Grok AI with the user's input
//     const userMessage = `
//     I want a personalized meal plan based on my BMI of ${bmi.toFixed(2)} (${bmiCategory}), with a health condition of ${healthCondition}, a goal of ${healthGoal}, and excluding these ingredients: ${excludeIngredients}. My preferred diet is ${diet} and cuisine is ${cuisine}. I want to limit my calories to ${maxCalories}.
//     Please provide 3 meal suggestions (including ingredients, preparation steps, allergens, and nutritional information) that fit my goal of muscle gain. For each meal, include a name, a list of ingredients, preparation steps, nutritional information (calories, protein, fat, carbs), and any allergens.
// `;

//     try {
//         const grokResponse = await getGrokAIResponse(userMessage);

//         if (grokResponse) {
//             displayAIResponse(grokResponse, calorieAdvice, bmi, bmiCategory, healthCondition, excludeIngredients);
//         } else {
//             document.getElementById("meal-results").innerHTML = "<p>No response from Grok AI. Please try again later.</p>";
//         }
//     } catch (error) {
//         console.error("Error integrating Grok AI:", error);
//         document.getElementById("meal-results").innerHTML = "<p>An error occurred while fetching the response from Grok AI. Please try again later.</p>";
//     }
// });

// // Function to get a response from Grok AI
// async function getGrokAIResponse(userMessage) {
//     const requestBody = {
//         messages: [
//             {
//                 role: "system",
//                 content: "You are an assistant for generating personalized meal plans."
//             },
//             {
//                 role: "user",
//                 content: userMessage
//             }
//         ],
//         model: "gemma2-9b-it"
//     };

//     try {
//         const response = await fetch(apiUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${apiKey}`
//             },
//             body: JSON.stringify(requestBody)
//         });

//         const data = await response.json();
//         return data.choices[0].message.content;
//     } catch (error) {
//         console.error("Error integrating Grok AI:", error);
//         return null;
//     }
// }

// // Generate calorie advice based on BMI category
// function getCalorieAdvice(bmiCategory) {
//     switch (bmiCategory) {
//         case 'Underweight':
//             return 'Increase your calorie intake with nutrient-dense foods.';
//         case 'Normal weight':
//             return 'Maintain your calorie intake to keep a healthy weight.';
//         case 'Overweight':
//             return 'Consider a calorie-controlled diet to lose weight.';
//         case 'Obese':
//             return 'Consult a healthcare provider for a tailored weight loss plan.';
//         default:
//             return 'Please select a valid health condition for more personalized advice.';
//     }
// }

// // Display the AI-generated response
// function displayAIResponse(response, calorieAdvice, bmi, bmiCategory, healthCondition, excludeIngredients) {
//     const resultsDiv = document.getElementById("meal-results");
//     resultsDiv.innerHTML = "";

//     // Display BMI and advice
//     const bmiDisplay = document.createElement("div");
//     bmiDisplay.classList.add("bmi-display");
//     bmiDisplay.innerHTML = `
//         <h3>Your BMI: ${bmi.toFixed(2)} (${bmiCategory})</h3>
//         <p><strong>Diet Advice:</strong> ${calorieAdvice}</p>
//         <p><strong>Health Condition:</strong> ${healthCondition === 'none' ? 'No health condition specified' : healthCondition}</p>
//         <p><strong>Excluded Ingredients:</strong> ${excludeIngredients || "None"}</p>
//     `;
//     resultsDiv.appendChild(bmiDisplay);

//     // Parse AI response into meal objects
//     const meals = parseMealData(response);

//     // Display the meal cards if any meals are found
//     if (meals.length === 0) {
//         resultsDiv.innerHTML = "<p>No meals found. Try again later.</p>";
//     } else {
//         meals.forEach(meal => {
//             const mealCard = document.createElement("div");
//             mealCard.classList.add("meal-card");

//             mealCard.innerHTML = `
//                <img src="https://via.placeholder.com/150" alt="${meal.name}" onerror="this.onerror=null; this.src='fallback-image-url.jpg';">
//                 <h4>${meal.name}</h4>
//                 <p><strong>Ingredients:</strong> ${meal.ingredients.join(", ")}</p>
//                 <p><strong>Preparation:</strong> ${meal.preparation}</p>
//                 <p><strong>Allergens:</strong> ${meal.allergens}</p>
//                 <p><strong>Nutritional Info:</strong></p>
//                 <ul>
//                     <li>Calories: ${meal.nutritionalInfo.calories}</li>
//                     <li>Protein: ${meal.nutritionalInfo.protein}</li>
//                     <li>Fat: ${meal.nutritionalInfo.fat}</li>
//                     <li>Carbs: ${meal.nutritionalInfo.carbs}</li>
//                 </ul>
//             `;
//             resultsDiv.appendChild(mealCard);
//         });
//     }
// }

// // Parse AI response into meal objects
// function parseMealData(response) {
//     const meals = [];
    
//     const mealPattern = /Meal (\d+): (.*?)(?=\n|$)/g;
//     const ingredientPattern = /Ingredients:([\s\S]*?)Preparation:/g;
//     const preparationPattern = /Preparation:([\s\S]*?)Allergens:/g;
//     const allergenPattern = /Allergens:([\s\S]*?)Nutritional/;
//     const nutritionalPattern = /Nutritional Information \(per serving\): Calories: (\d+), Protein: (\d+g), Fat: (\d+g), Carbs: (\d+g)/;

//     let matchMeal;
//     const uniqueMeals = new Set();
    
//     while ((matchMeal = mealPattern.exec(response)) !== null) {
//         const mealDetails = {};

//         mealDetails.name = matchMeal[2].trim();
    
//         // Check if the meal has already been added
//         if (uniqueMeals.has(mealDetails.name)) continue;
//         uniqueMeals.add(mealDetails.name);
    
//         // Extract Ingredients
//         const matchIngredients = ingredientPattern.exec(response);
//         mealDetails.ingredients = matchIngredients ? matchIngredients[1].split('*').map(ingredient => ingredient.trim()).filter(Boolean) : ["Ingredients not available"];
    
//         // Extract Preparation Steps
//         const matchPreparation = preparationPattern.exec(response);
//         mealDetails.preparation = matchPreparation ? matchPreparation[1].trim() : "Preparation steps not available.";
    
//         // Handle missing allergens
//         const matchAllergens = allergenPattern.exec(response);
//         mealDetails.allergens = matchAllergens ? matchAllergens[1].trim() || "None" : "None";
    
//         // Handle missing nutritional info
//         const matchNutritional = nutritionalPattern.exec(response);
//         mealDetails.nutritionalInfo = matchNutritional ? {
//             calories: matchNutritional[1],
//             protein: matchNutritional[2],
//             fat: matchNutritional[3],
//             carbs: matchNutritional[4]
//         } : {
//             calories: 'N/A',
//             protein: 'N/A',
//             fat: 'N/A',
//             carbs: 'N/A'
//         };
    
//         meals.push(mealDetails);
//     }

//     return meals;
// }


const apiKey = "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"; // Replace with your actual API key
const apiUrl = "https://api.groq.com/openai/v1/chat/completions";  // Grok AI endpoint
const spoonacularApiKey = "9a72c1f60f194798b3b5492437690e54"; // Replace with your actual API key

// Form submission event listener
document.getElementById("diet-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100; // Convert to meters

    // BMI Calculation
    const bmi = weight / (height * height);

    let bmiCategory = '';
    if (bmi < 18.5) {
        bmiCategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiCategory = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiCategory = 'Overweight';
    } else {
        bmiCategory = 'Obese';
    }

    const calorieAdvice = getCalorieAdvice(bmiCategory);

    // Get form inputs
    const healthCondition = document.getElementById("health-condition").value;
    const healthGoal = document.getElementById("health-goal").value;
    const excludeIngredients = Array.from(document.getElementById("allergies").selectedOptions)
        .map(option => option.value)
        .join(",") || '';
    const diet = document.getElementById("diet").value;
    const cuisine = document.getElementById("cuisine").value;
    const maxCalories = parseInt(document.getElementById("max-calories").value) || '';

    // Create a message to Grok AI with the user's input
    const userMessage = `
    I want a personalized meal plan based on my BMI of ${bmi.toFixed(2)} (${bmiCategory}), with a health condition of ${healthCondition}, a goal of ${healthGoal}, and excluding these ingredients: ${excludeIngredients}. My preferred diet is ${diet} and cuisine is ${cuisine}. I want to limit my calories to ${maxCalories}.
    Please provide 3 meal suggestions (including ingredients, preparation steps, allergens, and nutritional information) that fit my goal of muscle gain. For each meal, include a name, a list of ingredients, preparation steps, nutritional information (calories, protein, fat, carbs), and any allergens.
`;

    try {
        const grokResponse = await getGrokAIResponse(userMessage);

        if (grokResponse) {
            displayAIResponse(grokResponse, calorieAdvice, bmi, bmiCategory, healthCondition, excludeIngredients);
        } else {
            document.getElementById("meal-results").innerHTML = "<p>No response from Grok AI. Please try again later.</p>";
        }
    } catch (error) {
        console.error("Error integrating Grok AI:", error);
        document.getElementById("meal-results").innerHTML = "<p>An error occurred while fetching the response from Grok AI. Please try again later.</p>";
    }
});

// Function to get a response from Grok AI
async function getGrokAIResponse(userMessage) {
    const requestBody = {
        messages: [
            {
                role: "system",
                content: "You are an assistant for generating personalized meal plans."
            },
            {
                role: "user",
                content: userMessage
            }
        ],
        model: "gemma2-9b-it"
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error integrating Grok AI:", error);
        return null;
    }
}

// Generate calorie advice based on BMI category
function getCalorieAdvice(bmiCategory) {
    switch (bmiCategory) {
        case 'Underweight':
            return 'Increase your calorie intake with nutrient-dense foods.';
        case 'Normal weight':
            return 'Maintain your calorie intake to keep a healthy weight.';
        case 'Overweight':
            return 'Consider a calorie-controlled diet to lose weight.';
        case 'Obese':
            return 'Consult a healthcare provider for a tailored weight loss plan.';
        default:
            return 'Please select a valid health condition for more personalized advice.';
    }
}

// Fetch meal image from Spoonacular based on meal name
async function fetchMealImage(mealName) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(mealName)}&apiKey=${spoonacularApiKey}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return data.results[0].image; // Return the image URL of the first result
        } else {
            console.warn(`No image found for: ${mealName}`);
            return 'https://via.placeholder.com/150'; // Fallback if no image is found
        }
    } catch (error) {
        console.error("Error fetching image from Spoonacular:", error);
        return 'https://via.placeholder.com/150'; // Fallback on error
    }
}

// Display the AI-generated response
async function displayAIResponse(response, calorieAdvice, bmi, bmiCategory, healthCondition, excludeIngredients) {
    const resultsDiv = document.getElementById("meal-results");
    resultsDiv.innerHTML = "";

    // Display BMI and advice
    const bmiDisplay = document.createElement("div");
    bmiDisplay.classList.add("bmi-display");
    bmiDisplay.innerHTML = `
        <h3>Your BMI: ${bmi.toFixed(2)} (${bmiCategory})</h3>
        <p><strong>Diet Advice:</strong> ${calorieAdvice}</p>
        <p><strong>Health Condition:</strong> ${healthCondition === 'none' ? 'No health condition specified' : healthCondition}</p>
        <p><strong>Excluded Ingredients:</strong> ${excludeIngredients || "None"}</p>
    `;
    resultsDiv.appendChild(bmiDisplay);

    // Parse AI response into meal objects
    const meals = parseMealData(response);

    // Display the meal cards if any meals are found
    if (meals.length === 0) {
        resultsDiv.innerHTML = "<p>No meals found. Try again later.</p>";
    } else {
        for (const meal of meals) {
            const mealCard = document.createElement("div");
            mealCard.classList.add("meal-card");

            // Fetch meal image from Spoonacular
            const imageUrl = await fetchMealImage(meal.name);

            mealCard.innerHTML = `
                <img src="${imageUrl}" alt="${meal.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
                <h4>${meal.name}</h4>
                <p><strong>Ingredients:</strong> ${meal.ingredients.join(", ")}</p>
                <p><strong>Preparation:</strong> ${meal.preparation}</p>
                <p><strong>Allergens:</strong> ${meal.allergens}</p>
                <p><strong>Nutritional Info:</strong></p>
                <ul>
                    <li>Calories: ${meal.nutritionalInfo.calories}</li>
                    <li>Protein: ${meal.nutritionalInfo.protein}</li>
                    <li>Fat: ${meal.nutritionalInfo.fat}</li>
                    <li>Carbs: ${meal.nutritionalInfo.carbs}</li>
                </ul>
            `;
            resultsDiv.appendChild(mealCard);
        }
    }
}

// Parse AI response into meal objects
function parseMealData(response) {
    const meals = [];
    
    const mealPattern = /Meal (\d+): (.*?)(?=\n|$)/g;
    const ingredientPattern = /Ingredients:([\s\S]*?)Preparation:/g;
    const preparationPattern = /Preparation:([\s\S]*?)Allergens:/g;
    const allergenPattern = /Allergens:([\s\S]*?)Nutritional/;
    const nutritionalPattern = /Nutritional Information \(per serving\): Calories: (\d+), Protein: (\d+g), Fat: (\d+g), Carbs: (\d+g)/;

    let matchMeal;
    const uniqueMeals = new Set();
    
    while ((matchMeal = mealPattern.exec(response)) !== null) {
        const mealDetails = {};

        mealDetails.name = matchMeal[2].trim();
    
        // Check if the meal has already been added
        if (uniqueMeals.has(mealDetails.name)) continue;
        uniqueMeals.add(mealDetails.name);
    
        // Extract Ingredients
        const matchIngredients = ingredientPattern.exec(response);
        mealDetails.ingredients = matchIngredients ? matchIngredients[1].split('*').map(ingredient => ingredient.trim()).filter(Boolean) : ["Ingredients not available"];
    
        // Extract Preparation Steps
        const matchPreparation = preparationPattern.exec(response);
        mealDetails.preparation = matchPreparation ? matchPreparation[1].trim() : "Preparation steps not available.";
    
        // Handle missing allergens
        const matchAllergens = allergenPattern.exec(response);
        mealDetails.allergens = matchAllergens ? matchAllergens[1].trim() || "None" : "None";
    
        // Handle missing nutritional info
        const matchNutritional = nutritionalPattern.exec(response);
        mealDetails.nutritionalInfo = matchNutritional ? {
            calories: matchNutritional[1],
            protein: matchNutritional[2],
            fat: matchNutritional[3],
            carbs: matchNutritional[4]
        } : {
            calories: 'N/A',
            protein: 'N/A',
            fat: 'N/A',
            carbs: 'N/A'
        };
    
        meals.push(mealDetails);
    }

    return meals;
}