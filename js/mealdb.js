const getValue = (inputId) => {
  const inputField = document.getElementById(inputId);
  const inputText = inputField.value;
  inputField.value = "";
  return inputText;
};
// select elements
const errorOne = document.getElementById("error-one");
const errorTwo = document.getElementById("error-two");
const cardContainer = document.getElementById("card-container");
const detailInfo = document.getElementById("detailInfo");

const searchBtn = async () => {
  const inputText = getValue("input-field");
  errorTwo.style.display = "none";
  cardContainer.textContent = "";
  detailInfo.textContent = "";
  if (inputText == "") {
    errorOne.style.display = "block";
  } else {
    errorOne.style.display = "none";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;

    const response = await fetch(url);
    const data = await response.json();
    displayData(data.meals);
  }
};

const displayData = (meals) => {
  try {
    if (!Array.isArray(meals)) {
      errorTwo.style.display = "block";
    } else {
      errorTwo.style.display = "none";
      const cardContainer = document.getElementById("card-container");
      cardContainer.textContent = "";
      meals.forEach((data) => {
        const { idMeal, strMeal, strInstructions, strMealThumb } = data;
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
      <div class="card h-100 shadow" onclick="showDetails(${idMeal})">
        <img src="${strMealThumb}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${strMeal}</h5>
              <p class="card-text">
                ${strInstructions.slice(0, 200)}
              </p>
                </div>
              </div> 
      `;
        cardContainer.appendChild(div);
      });
    }
  } catch (errorOne) {
    console.dir(errorOne.message);
  }
};
// show details
const showDetails = async (details) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`;
  const response = await fetch(url);
  const data = await response.json();
  displayDetails(data.meals);
};

const displayDetails = (data) => {
  const detailInfo = document.getElementById("detailInfo");
  detailInfo.textContent = "";
  data.forEach((data) => {
    const { strMeal, strInstructions, strMealThumb, strYoutube } = data;
    detailInfo.innerHTML = `
     <div class="card shadow">
      <img src="${strMealThumb}" class="card-img-top img-fluid" alt="..." />
       <div class="card-body">
         <h5 class="card-title">${strMeal}</h5>
          <p class="card-text">
             ${strInstructions.slice(0, 200)}
           </p>
           <a href="${strYoutube}" class="btn btn-primary d-block mx-auto" target="-blank">Go somewhere</a>
            </div>
          </div>
  `;
  });
};
