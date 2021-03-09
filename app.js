    // take input action here
const inputMeal = document.getElementById('meal-box');
document.getElementById('search').addEventListener('click', () => {
    // const inputMeal = document.getElementById('meal-box').value;
    mealDispay(inputMeal.value);
})

const mealDispay = mealName=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res => res.json())
    .then(data => displayFoods(data.meals))
}

// display food by names

const displayFoods = mealNames =>{
    const mealsContainerDiv = document.getElementById('meals-container')
    mealsContainerDiv.innerHTML = '';
    const noFound = document.getElementById('no-found');
    noFound.innerText = '';
    
    if(inputMeal.value == ''){
        noFound.innerText = "Please type a food name like 'Arrabiata'..."
        window.alert('Oops!👇🏻you should Type something');
    }
    else if(mealNames){
        mealNames.forEach(meal => {
            const foodDiv = document.createElement('div');
            const mealInfo = `
                <a href="#" class = "food-details">
                    <div class = 'card'>
                        <img src = "${meal.strMealThumb}" class= 'card-img-top'>
                    </div>   
                    <h4>${meal.strMeal}</h4>
                </a>
            `;
            foodDiv.innerHTML = mealInfo;
            foodDiv.className = `food-items col`
            mealsContainerDiv.appendChild(foodDiv);
        });
    }
    else{
        noFound.innerText = `Oops! No Meal found that you have search for "${inputMeal.value}"`;
        
    }
    document.getElementById('meal-box').value = '';
}