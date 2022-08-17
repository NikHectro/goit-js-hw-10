import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    searchForm: document.querySelector('#search-box'),
}

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
    evt.preventDefault();

    const searchInput = evt.target.value.trim(); // or target?
    console.log(searchInput);

    if (!searchInput) {
        clearPage()
        return
    }

    fetchCountries(searchInput)
        .then(countries => {
            clearPage();

            if (countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
                return
            }
            if (countries.length > 1 && countries.length <= 10) {
                renderContryList(countries);
            } else {
                renderContryCard(countries)
            }
        })
    .catch(() => Notiflix.Notify.failure("Oops, there is no country with that name"))
        // .then(renderContryList)
        // .catch(onFetchError) //.finally(() => searchInput.reset())
}

function renderContryList(countries) {
    const markup = countries.map(({name, flags}) => {
        return `
        <li class="country-list__item">
            <img
                class="country-list__flag"
                src="${flags.svg}"
                alt="Flag for ${name.official}"
            />
            <h2 class="country-list__name">${name.official}</h2>
        </li>`
    }).join('');
    return refs.countryList.insertAdjacentHTML("afterbegin", markup);
}

function renderContryCard(countries) {
    const markup = countries.map(({name,capital,population,flags,languages}) => {
        return `
            <h2 class="country-card__name">${name.official}</h2>
            <ul class="country-card__item">
            <li><img
                class="country-card__flag"
                src="${flags.svg}"
                alt="Flag for ${name.official}"
            />
            </li>
            <li class="country-card__detailes"><b>Capital: </b>${capital}</li>
            <li class="country-card__detailes"><b>Population: </b>${population}</li>
            <li class="country-card__detailes"><b>Languages: </b>${Object.values(languages)}</li>
        </ul>`
    }).join('');
    return refs.countryInfo.insertAdjacentHTML("afterbegin", markup);
}

function clearPage() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

// function onFetchError(error) {
//     alert("не знайдено")
// }