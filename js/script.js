/* QUERY SELECTORS ************************************************** */
const h1 = document.querySelector('h1');

const link = document.querySelector('a');

const searchInput = document.querySelector('.search-input');

const buttonsDiv = document.querySelector('.buttons-div');
const buttons = document.querySelectorAll('button');
const searchByName = document.querySelector('#name');
const searchByCapital = document.querySelector('#capital');
const searchByPopulation = document.querySelector('#population');
let selectedButton = document.querySelector('.selected');
console.log(selectedButton.id);

const countryCount = document.querySelector('.country-count');

const countriesWrapper = document.querySelector('.countries-wrapper');



/* VARIABLES ******************************************************** */

let H = Math.round(Math.random() * 360);
let S = Math.round(Math.random() * 100);

let mediumL = 25;
let mediumHSL = `hsl(${H}, ${S}%, ${mediumL}%)`

let darkL = 5;
let darkHSL = `hsl(${H}, ${S}%, ${darkL}%)`

let byName = 1;
let byCapital = 0;
let byPopulation = 0;

let sortMode = selectedButton.id;
let shownCountries;



/* STYLES ***************************************************************** */
searchInput.style.background = mediumHSL;
searchInput.style.border = `2px solid ${mediumHSL}`;

searchInput.addEventListener('mouseover', function() {
    searchInput.style.background = 'white';
});

searchInput.addEventListener('mouseout', function() {
    searchInput.style.background = mediumHSL;
});

searchInput.addEventListener('focus', function() {
    searchInput.style.background = 'white';
});

searchInput.addEventListener('blur', function() {
    searchInput.style.background = mediumHSL;
});

for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.padding = '1rem';
    buttons[i].style.margin = '1rem 0';
    buttons[i].style.background = 'white';
    buttons[i].style.border = `2px solid ${mediumHSL}`;
    buttons[i].style.width = '9rem';
    buttons[i].style.fontSize = '0.8rem';
    buttons[i].style.color = mediumHSL;

    buttons[i].addEventListener('mouseover', function() {
        buttons[i].style.color = 'white';
        buttons[i].style.background = mediumHSL;
    });
    
    buttons[i].addEventListener('mouseout', function() {
        buttons[i].style.color = mediumHSL;
        buttons[i].style.background = 'white';
    });
    
    buttons[i].addEventListener('focus', function() {
        buttons[i].style.color = 'white';
        buttons[i].style.background = mediumHSL;
    });
    
    buttons[i].addEventListener('blur', function() {
        buttons[i].style.color = mediumHSL;
        buttons[i].style.background = 'white';
    });
};




/* FUNCTIONS *************************************************************** */
function createCountryDivInnerHtml(object) {
    const {name, capital, languages, population, flag} = object;

    countryDivInnerHtml =
    `<div class="country-div">
        <div class="flag-div">
            <img class="flag-img" src="${flag}" />
        </div>

        <div class="properties-div">
            <p class="name-p">${name}</p>
            <p class="capital-p"><span class="property-name">Capital:</span> ${capital}</p>
            <p class="population-p"><span class="property-name">Population:</span> ${population.toLocaleString()}</p>
            <p class="languages-p"><span class="property-name">Languages:</span> ${languages.join(', ')}</p>
        </div>
    </div>`

    return countryDivInnerHtml;
};

function generateCountryDivColor() {
    const countryDivs = document.querySelectorAll('.country-div');
    for (i = 0; i < countryDivs.length; i++) {
        let L = Math.round(Math.random() * (90 - 60) + 60);
        let hsl = `hsl(${H}, ${S}%, ${L}%)`;

        countryDivs[i].style.background = hsl;
        countryDivs[i].style.color = darkHSL;
    }
}



function showCountries(array) {
    countryDivInnerHtml = '';
    countriesWrapper.innerHTML = '';

    for (i = 0; i < array.length; i++) {
        countryDivInnerHtml += createCountryDivInnerHtml(array[i]);
    };

    countriesWrapper.innerHTML = countryDivInnerHtml;

    generateCountryDivColor();

};



function filterCountries(array, search) {
    const filteredCountries = array.filter(country => {
        let {name, capital, languages} = country;
        let isName = name.toLowerCase().includes(search);
        let isCapital = capital.toLowerCase().includes(search);
        let isLanguages = languages.join(', ').toLowerCase().includes(search);

        return isName || isCapital || isLanguages;
    });

    return filteredCountries;
};



function changeSortMode(event) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = '';
        buttons[i].style.outline = 'none';
    };

    event.target.className = 'selected';

    selectedButton = document.querySelector('.selected');
    console.log(selectedButton.id, selectedButton.className);
    selectedButton.style.outline = `2px solid ${mediumHSL}`;

    if (selectedButton.id[0] === '-') {
        selectedButton.id = selectedButton.id.substr(1);
    }

    else {
        selectedButton.id = '-' + selectedButton.id;
    }

    sortMode = selectedButton.id;
};



function sortCountries(array, property) {
/*     property = `'${sortMode}'`;
 */    let sortOrder = 1;

    function compare(a, b) {
        if (a[property] < b[property]) {
            return -1;
        }
    };

    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }

    array.sort(compare);

    if (sortOrder === -1) {
        array.reverse();
    }

    console.log(property);
    return array;
};

sortCountries(countries, 'capital');



function showFilteredCountries(event) {
    countriesWrapper.innerHTML = '';
    let searchTerm = event.target.value.toLowerCase();
    shownCountries = showCountries(filterCountries(countries, searchTerm));
    return shownCountries;
};



/* EXECUTION *************************************************************** */

h1.style.color = mediumHSL;
link.style.color = mediumHSL;

countryCount.textContent = `showing ${countries.length} countries`;
showCountries(countries);

buttonsDiv.addEventListener('click', changeSortMode);

searchInput.addEventListener('input', showFilteredCountries);