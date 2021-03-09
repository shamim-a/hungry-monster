    // take input action here
const inputMeal = document.getElementById('meal-box');
document.getElementById('search').addEventListener('click', () => {
    mealDispay(inputMeal.value);
})
//meal display API
const mealDispay = mealName=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res => res.json())
    .then(data => displayFoods(data.meals))
}

// display food by names

const displayFoods = mealNames =>{
    const mealDetails = document.getElementById('details-container');
    mealDetails.innerHTML = '';
    const mealsContainerDiv = document.getElementById('meals-container')
    mealsContainerDiv.innerHTML = '';
    const noFound = document.getElementById('no-found');
    noFound.innerText = '';

    // check input filled or blank

    if(inputMeal.value === ''){
        noFound.innerText = "Please type a food name like 'Arrabiata'..."
        window.alert('Oops!👇🏻you should Type something');
    }
    else if(mealNames){
        mealNames.forEach(meal => {
            const foodDiv = document.createElement('div');
            const mealInfo = `
                <div onclick = "foodDetailsApi(${meal.idMeal})" class = 'card'>
                    <img src = "${meal.strMealThumb}" class= 'card-img-top'>
                </div>   
                <h4>${meal.strMeal}</h4>
            `;
            foodDiv.innerHTML = mealInfo;
            foodDiv.className = `food-items col border-0`
            mealsContainerDiv.appendChild(foodDiv);
        });
    }
    else{
        noFound.innerText = `Oops! No Meal found that you have search for "${inputMeal.value}"`;
        
    }
    document.getElementById('meal-box').value = '';
}

// details function API is here
const foodDetailsApi = mealId =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => foodDetails(data.meals[0]))
}

const foodDetails = details =>{
    // console.log(details);
    const mealDetails = document.getElementById('details-container');
    mealDetails.innerHTML = `
        <div class="col">
        <div class="card">
            <img src="${details.strMealThumb}" class="card-img-top" alt="food-image">
            <div class="card-body">
                <h1 class="card-title">${details.strMeal}</h1>
                <br>
                <h4>Ingredients</h4>
                <br>
                <ul id = "ingredient">

                </ul>
            </div>
        </div>
    `;
    const mealIngredients = document.getElementById('ingredient');
    
    for (let i = 1; i <= 15; i++) {
        if (details['strIngredient' + i]) {
            const ingredient = document.createElement('li');
            ingredient.innerText = `${details['strMeasure' + i]} ${details['strIngredient' + i]}`;
            mealIngredients.appendChild(ingredient);
        }
    }
}