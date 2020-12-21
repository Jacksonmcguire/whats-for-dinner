var sides = ['Miso Glazed Carrots', 'Coleslaw', 'Garden Salad', 'Crispy Potatoes', 'Sweet Potato Tots', 'Coconut Rice', 'Caeser Salad', 'Shrimp Summer Rolls', 'Garlic Butter Mushrooms', 'Hush Puppies'];
var mains = ['Spaghetti and Meatballs', 'Pineapple Chicken', 'Shakshuka', 'Thai Yellow Curry', 'Bibimbap', 'Chicken Parmesean', 'Butternut Squash Soup', 'BBQ Chicken Burgers', 'Ramen', 'Empanadas', 'Chicken Fried Rice', 'Sheet Pan Fajitas', 'Margarita Pizza'];
var desserts = ['Apple Pie', 'Lemon Meringue Pie', 'Black Forest Cake', 'Banana Bread', 'Peach Cobbler', 'Cheesecake', 'Funfetti Cake', 'Baklava', 'Flan', 'Macarons', 'Macaroons', 'Chocolate Cupcakes', 'Pavlova', 'Pumpkin Pie', 'Key Lime Pie', 'Tart Tatin', 'Croissants', 'Eclairs'];
var favoriteRecipes = [];
var h1; var p;

var mealForm = document.querySelector('#choose-meal-form');
var letsCookButton = document.querySelector('#lets-cook-button');
var mealFormLabels = mealForm.querySelectorAll('label');
var mealFormRadio = mealForm.querySelectorAll('input');
var leftBox = document.querySelector('.left-box');
var rightBox = document.querySelector('.right-box');
var clearButton = document.querySelector('#clear-button');
var favoritesView = document.querySelector('#favorite-view');
var container = document.querySelector('.container-1');
var body = document.querySelector('body');
var homeButton = document.querySelector('#home-button');
var favoritesList = document.querySelector('.favorite-list');
var viewFavoritesButton = document.querySelector('#view-favorites');
var listItems = favoritesList.querySelectorAll('li');
var currentRecipe;
clearButton.classList.toggle('hidden');

letsCookButton.addEventListener('click', showMeal);
rightBox.addEventListener('click', addToFavorites);
viewFavoritesButton.addEventListener('click', showFavorites);
homeButton.addEventListener('click', changeView);
favoritesList.addEventListener('click', removeRecipe);

function showMeal(event) {
  for(var i = 0; i < mealFormRadio.length; i++) {
    if(mealFormRadio[i].checked) {
      if(mealFormRadio[i].nextElementSibling === mealFormLabels[i]) {
        changeRightHtml(mealFormLabels[i]);}
        h1 = rightBox.querySelector('h1'); h1.classList.add('italics');
        p = rightBox.querySelector('p'); p.classList.add('random-meal');
        favButton = rightBox.querySelector('#favorite-button');
        favButton.classList.add('favorite');
      }
      rightBox.style.backgroundImage = 'none';
      event.preventDefault();
    }
  }

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function changeRightHtml(mealFormLabel) {
  if(mealFormLabel.id === "side-option") {
      rightBox.innerHTML =  `<h1 type="text">You should make:</h1><br>
      <p class="random-food">${getRandomElement(sides)}!</p><br>
      <button id="favorite-button">Add to Favorites</button>`;
  } else if(mealFormLabel.id === "main-dish") {
      rightBox.innerHTML =  `<h1 type="text">You should make:</h1><br>
      <p class="random-food">${getRandomElement(mains)}!</p>
      <button id="favorite-button">Add to Favorites</button>`;
  } else if(mealFormLabel.id === "dessert") {
      rightBox.innerHTML =  `<h1 type="text">You should make:</h1><br>
      <p class="random-food">${getRandomElement(desserts)}!</p>
      <button id="favorite-button">Add to Favorites</button>`;
  }
};

function addToFavorites(event) {
  if(event.target.closest = favButton) {
  if(favoriteRecipes.indexOf(rightBox.querySelector('p').innerText.replace('!', '.')) < 0) {
  favoriteRecipes.push(rightBox.querySelector('p').innerText.replace('!', '.'));
  JSON.stringify(favoriteRecipes);
  window.localStorage.setItem('favoriteRecipes', favoriteRecipes);
  }
  }
}

function showFavorites() {
  changeView();
  if(favoriteRecipes.length > 0) {
  for(var i = 0; i < favoriteRecipes.length; i++) {
    var li = document.createElement('li');
    favoritesList.appendChild(li);
    li.innerText = favoriteRecipes[i];
  }
  } else {
    acessLocalStorage();
  }
}

function changeView() {
  homeButton.classList.toggle('hidden');
  leftBox.classList.toggle('hidden');
  rightBox.classList.toggle('hidden');
  favoritesView.classList.toggle('hidden');
  viewFavoritesButton.classList.toggle('hidden');
}

function removeRecipe(event) {
  for(var i = 0; i < favoritesView.querySelectorAll('li').length; i++) {
    if(event.target === favoritesView.querySelectorAll('li')[i]) {
      favoritesList.removeChild(favoritesView.querySelectorAll('li')[i]);
    }
  }
}

function acessLocalStorage(event) {
  var savedData = localStorage.getItem('favoriteRecipes');
  var localRecipes = savedData.split(',');
  for(var i = 0; i < localRecipes.length; i++) {
    var li = document.createElement('li');
    if(favoritesList.innerText.includes(localRecipes[i]) === false) {
      favoritesList.appendChild(li);
      li.innerText = localRecipes[i];
      }
    }
  }
