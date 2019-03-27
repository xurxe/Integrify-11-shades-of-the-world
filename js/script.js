/* GLOBAL VARIABLES ******************************************************** */

const countriesWrapper = document.querySelector('.countries-wrapper');

const subtitle = document.querySelector('.subtitle');

const searchInput = document.querySelector('.search-input');

const buttons = document.querySelector('.buttons');

let alphaByName = true;
let alphaByCapital = false;
let descendingByPopulation = false;




/* FUNCTIONS *************************************************************** */
const showCountries = (array) => {
    countryDivInnerHtml = '';
    countriesWrapper.innerHTML = '';

    array.forEach((country, i) => {
        countryDivInnerHtml += createCountryDivInnerHtml(country);
    });

    countriesWrapper.innerHTML = countryDivInnerHtml;

};



buttons.addEventListener('click', e => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.className);
});



const createCountryDivInnerHtml = object => {
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



searchInput.addEventListener('input', e => {
    countriesWrapper.innerHTML = '';
    let searchTerm = e.target.value.toLowerCase();
    showCountries(filterCountries(countries, searchTerm));
});



const filterCountries = (array, search) => {
    const filteredCountries = array.filter(country => {
        let {name, capital, languages} = country;
        let isName = name.toLowerCase().includes(search);
        let isCapital = capital.toLowerCase().includes(search);
        let isLanguages = languages.join(', ').toLowerCase().includes(search);

        return isName || isCapital || isLanguages;
    });

    return filteredCountries;
};



/* EXECUTION *************************************************************** */

subtitle.textContent = `showing ${countries.length} countries`;
showCountries(countries);