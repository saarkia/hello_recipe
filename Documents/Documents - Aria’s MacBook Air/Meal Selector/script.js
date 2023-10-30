// Local Storage functions
function updateRatingInLocalStorage(mealName, rating) {
    let ratings = JSON.parse(localStorage.getItem('mealRatings')) || {};
    ratings[mealName] = rating;
    localStorage.setItem('mealRatings', JSON.stringify(ratings));
}

function getRatingFromLocalStorage(mealName) {
    let ratings = JSON.parse(localStorage.getItem('mealRatings')) || {};
    return ratings[mealName] || 'No ratings yet';
}

const meals = [
    { name: 'Pizza', category: 'Fast Food', calories: 300, ingredients: 'Dough, Cheese, Tomato Sauce', time: '20 minutes', ratings: [] },
    { name: 'Burger', category: 'Fast Food', calories: 500, ingredients: 'Bun, Patty, Lettuce', time: '15 minutes', ratings: [] },
    { name: 'Pasta', category: 'Vegan', calories: 250, ingredients: 'Pasta, Tomato Sauce, Vegetables', time: '25 minutes', ratings: [] },
    { name: 'Sushi', category: 'Seafood', calories: 200, ingredients: 'Rice, Fish, Seaweed', time: '30 minutes', ratings: [] },
    { name: 'Salad', category: 'Vegan', calories: 150, ingredients: 'Lettuce, Tomatoes, Cucumbers', time: '10 minutes', ratings: [] },
    { name: 'Steak', category: 'Meat', calories: 400, ingredients: 'Steak, Herbs, Spices', time: '40 minutes', ratings: [] },
    { name: 'Chicken Curry', category: 'Meat', calories: 350, ingredients: 'Chicken, Curry Sauce, Vegetables', time: '45 minutes', ratings: [] },
    { name: 'Fish and Chips', category: 'Seafood', calories: 450, ingredients: 'Fish, Potatoes, Tartar Sauce', time: '30 minutes', ratings: [] },
    { name: 'Tacos', category: 'Fast Food', calories: 300, ingredients: 'Tortilla, Meat, Vegetables', time: '20 minutes', ratings: [] },
    { name: 'Ramen', category: 'Vegan', calories: 280, ingredients: 'Noodles, Broth, Vegetables', time: '35 minutes', ratings: [] }
];

//test
// Updated function to select a random meal
function selectRandomMeal() {
    const selectedCategory = document.getElementById('mealCategory').value;
    const filteredMeals = meals.filter(meal => selectedCategory === 'all' ? true : meal.category.toLowerCase() === selectedCategory);

    if (filteredMeals.length === 0) {
        document.getElementById('selectedMeal').innerText = 'No meals available for this category';
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredMeals.length);
    const selectedMeal = filteredMeals[randomIndex];
    const storedRating = getRatingFromLocalStorage(selectedMeal.name);

    document.getElementById('selectedRating').innerText = `Average Rating: ${calculateAverageRating(selectedMeal.ratings)}`;
    document.getElementById('selectedMeal').innerText = `Selected Meal: ${selectedMeal.name}`;
    document.getElementById('selectedCategory').innerText = `Category: ${selectedMeal.category}`;
    document.getElementById('selectedCalories').innerText = `Calories: ${selectedMeal.calories}`;  // Populate calories
    document.getElementById('selectedIngredients').innerText = `Ingredients: ${selectedMeal.ingredients}`;  // Populate ingredients
    document.getElementById('selectedTime').innerText = `Cooking Time: ${selectedMeal.time}`;  // Populate cooking time
    document.getElementById('selectedRating').innerText = `Average Rating: ${storedRating}`;
}

// Function to calculate the average rating
function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 'No ratings yet';
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
}

// New function to handle rating submission
function submitRating() {
    const userRating = parseFloat(document.getElementById('userRating').value);
    if (isNaN(userRating)) return;
    const selectedMealName = document.getElementById('selectedMeal').innerText.split(': ')[1];
    const selectedMeal = meals.find(meal => meal.name === selectedMealName);
    selectedMeal.ratings.push(userRating);

    // Update the rating in local storage
    const newRating = calculateAverageRating(selectedMeal.ratings);
    updateRatingInLocalStorage(selectedMeal.name, newRating);
    
    // Update the displayed rating
    document.getElementById('selectedRating').innerText = `Average Rating: ${newRating}`;
}

// Attach the function to the button click event
document.getElementById('selectMeal').addEventListener('click', selectRandomMeal);
document.getElementById('submitRating').addEventListener('click', submitRating);


