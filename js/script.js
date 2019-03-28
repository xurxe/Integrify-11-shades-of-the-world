/* GLOBAL VARIABLES ******************************************************** */

const countriesWrapper = document.querySelector('.countries-wrapper');

const countryCount = document.querySelector('.country-count');

const searchInput = document.querySelector('.search-input');

const buttonsDiv = document.querySelector('.buttons-div');

const h1 = document.querySelector('h1');

const a = document.querySelector('a');

let alphaByName = true;
let alphaByCapital = false;
let descendingByPopulation = false;

let H = Math.round(Math.random() * 360);
let S = Math.round(Math.random() * 100);
let mediumL = 25;
let mediumHSL = `hsl(${H}, ${S}%, ${mediumL}%)`

let darkL = 5;
let darkHSL = `hsl(${H}, ${S}%, ${darkL}%)`

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

const buttons = document.querySelectorAll('button')
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



function changeSearchMode(event) {
    console.log(event);
    console.log(event.target);
    console.log(event.target.className);
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



function showFilteredCountries(event) {
    countriesWrapper.innerHTML = '';
    let searchTerm = event.target.value.toLowerCase();
    shownCountries = showCountries(filterCountries(countries, searchTerm));
};



/* EXECUTION *************************************************************** */

h1.style.color = mediumHSL;
a.style.color = mediumHSL;

countryCount.textContent = `showing ${countries.length} countries`;
showCountries(countries);

buttonsDiv.addEventListener('click', changeSearchMode);

searchInput.addEventListener('input', showFilteredCountries);