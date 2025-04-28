import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();

// Middleware to parse JSON request bodies
app.use(cors({ origin: "*" }));
app.use(express.json());
const GROK_API_KEY = 'xai-ynKi4GmvpafQORo9XO3na4MYL2eRxLnIbUEyhYLwWGCxJbnogPdJMzUDQ9UxLIhzJFr46GXKJxwhKY0D'; // Replace with your actual Grok API key

// POST route to handle meal plan requests
app.post('/meal-plan', async (req, res) => {
    const grokData = req.body; // Data sent from the client (e.g., dietary preferences)

    try {
        const response = await fetch('https://api.grok.ai/meal-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}` // Replace with your actual API key
            },
            body: JSON.stringify(grokData)
        });

        const data = await response.json(); // Parse the response from Grok AI
        res.json(data); // Send the response back to the client
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        res.status(500).json({ error: 'Failed to fetch meal plan' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

