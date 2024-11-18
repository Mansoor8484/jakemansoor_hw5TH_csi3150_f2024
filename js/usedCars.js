const usedCars = [
  {
    year: 2018,
    make: "Toyota",
    model: "Camry",
    mileage: 30000,
    price: 18000,
    color: "Silver",
    gasMileage: "25 mpg city, 35 mpg highway",
  },
  {
    year: 2016,
    make: "Honda",
    model: "Civic",
    mileage: 45000,
    price: 14000,
    color: "White",
    gasMileage: "30 mpg city, 40 mpg highway",
  },
  {
    year: 2017,
    make: "Ford",
    model: "Fusion",
    mileage: 35000,
    price: 16000,
    color: "Black",
    gasMileage: "28 mpg city, 38 mpg highway",
  },
  {
    year: 2019,
    make: "Nissan",
    model: "Altima",
    mileage: 25000,
    price: 17000,
    color: "Blue",
    gasMileage: "27 mpg city, 36 mpg highway",
  },
  {
    year: 2015,
    make: "Chevrolet",
    model: "Malibu",
    mileage: 50000,
    price: 12000,
    color: "Red",
    gasMileage: "25 mpg city, 37 mpg highway",
  },
  {
    year: 2016,
    make: "Volkswagen",
    model: "Passat",
    mileage: 40000,
    price: 15000,
    color: "Gray",
    gasMileage: "29 mpg city, 40 mpg highway",
  },
  {
    year: 2020,
    make: "Hyundai",
    model: "Elantra",
    mileage: 22000,
    price: 16000,
    color: "Silver",
    gasMileage: "30 mpg city, 41 mpg highway",
  },
  {
    year: 2014,
    make: "Subaru",
    model: "Outback",
    mileage: 60000,
    price: 14000,
    color: "Green",
    gasMileage: "22 mpg city, 30 mpg highway",
  },
  {
    year: 2017,
    make: "Mazda",
    model: "CX-5",
    mileage: 32000,
    price: 19000,
    color: "Blue",
    gasMileage: "24 mpg city, 31 mpg highway",
  },
  {
    year: 2018,
    make: "Kia",
    model: "Sorento",
    mileage: 28000,
    price: 17000,
    color: "White",
    gasMileage: "22 mpg city, 29 mpg highway",
  },
  {
    year: 2015,
    make: "Dodge",
    model: "Challenger",
    mileage: 30000,
    price: 24000,
    color: "Black",
    gasMileage: "19 mpg city, 30 mpg highway",
  },
  {
    year: 2017,
    make: "Cadillac",
    model: "XT5",
    mileage: 28000,
    price: 32000,
    color: "Red",
    gasMileage: "19 mpg city, 27 mpg highway",
  },
  {
    year: 2018,
    make: "Jaguar",
    model: "F-PACE",
    mileage: 26000,
    price: 38000,
    color: "Blue",
    gasMileage: "18 mpg city, 23 mpg highway",
  },
  {
    year: 2019,
    make: "Tesla",
    model: "Model S",
    mileage: 18000,
    price: 55000,
    color: "Black",
    gasMileage: "Electric (370 miles per charge)",
  },
  {
    year: 2020,
    make: "Porsche",
    model: "Cayenne",
    mileage: 22000,
    price: 68000,
    color: "White",
    gasMileage: "20 mpg city, 26 mpg highway",
  },
  {
    year: 2017,
    make: "Lexus",
    model: "ES",
    mileage: 29000,
    price: 26000,
    color: "White",
    gasMileage: "21 mpg city, 30 mpg highway",
  },
  {
    year: 2016,
    make: "BMW",
    model: "5 Series",
    mileage: 32000,
    price: 27000,
    color: "Black",
    gasMileage: "23 mpg city, 34 mpg highway",
  },
];

const form = document.getElementById("search-form");
const query = document.getElementById("search-input");
const result = document.getElementById("result");
const minYearInput = document.getElementById("min-year");
const maxYearInput = document.getElementById("max-year");
const brandInputs = document.querySelectorAll("input[name='brand']");
const minMileageInput = document.getElementById("minMileage");
const maxMileageInput = document.getElementById("maxMileage");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const colorInputs = document.querySelectorAll("input[name='color']");

let isSearching = false;

// destruct the object and create the card
function carCard(car) {
  const { year, make, model, mileage, price, color, gasMileage } = car;

  const cardTemplate = `
  <div class="card">
    <h1 class="year_make_model">${year} ${make} ${model}</h1>
    <p class="mileage">${mileage}</p>
    <p class="price">${price}</p>
    <p class="color">${color}</p>
    <p class="gasMileage">${gasMileage}</p>
  </div>
  `;

  return cardTemplate;
}

// clear result output for search
function clearResults() {
  result.innerHTML = "";
}

// displaying results
function displayResults(items) {
  const newContent = items.map(carCard).join("");
  result.innerHTML += newContent || "<p>No results, search again</p>";
}

// handle the search logic
function handleSearch(e) {
  e.preventDefault();
  clearResults();
  const searchTerm = query.value.toLowerCase();
  const minYear = parseInt(minYearInput.value, 10);
  const maxYear = parseInt(maxYearInput.value, 10);
  const selectedBrands = Array.from(brandInputs).filter(input => input.checked).map(input => input.value.toLowerCase());
  const minMileage = parseInt(minMileageInput.value, 10);
  const maxMileage = parseInt(maxMileageInput.value, 10);
  const minPrice = parseInt(minPriceInput.value, 10);
  const maxPrice = parseInt(maxPriceInput.value, 10);
  const selectedColors = Array.from(colorInputs).filter(input => input.checked).map(input => input.value.toLowerCase());

  const returnedCars = usedCars.filter(car => {
    const matchesSearchTerm = (
      car.year.toString().includes(searchTerm) ||
      car.make.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.mileage.toString().includes(searchTerm) ||
      car.price.toString().includes(searchTerm) ||
      car.color.toLowerCase().includes(searchTerm) ||
      car.gasMileage.toLowerCase().includes(searchTerm)
    );

    const matchesYearRange = (
      (!isNaN(minYear) ? car.year >= minYear : true) &&
      (!isNaN(maxYear) ? car.year <= maxYear : true)
    );

    const matchesBrand = (
      selectedBrands.length === 0 || selectedBrands.includes(car.make.toLowerCase())
    );

    const matchesMileageRange = (
      (!isNaN(minMileage) ? car.mileage >= minMileage : true) &&
      (!isNaN(maxMileage) ? car.mileage <= maxMileage : true)
    );

    const matchesPriceRange = (
      (!isNaN(minPrice) ? car.price >= minPrice : true) &&
      (!isNaN(maxPrice) ? car.price <= maxPrice : true)
    );

    const matchesColor = (
      selectedColors.length === 0 || selectedColors.includes(car.color.toLowerCase())
    );

    return matchesSearchTerm && matchesYearRange && matchesBrand && matchesMileageRange && matchesPriceRange && matchesColor;
  });

  displayResults(returnedCars);
}

form.addEventListener("submit", handleSearch);

// Display all cars initially
document.addEventListener("DOMContentLoaded", () => {
  displayResults(usedCars);
});