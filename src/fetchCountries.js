const BASE_URL = 'https://restcountries.com/v3.1/name'
const searchParameters = 'fields=name,capital,population,flags,languages'

export default function fetchCountries(name) {
    const url = `${BASE_URL}/${name}?${searchParameters}`;
    // console.log(url);
    return fetch(url)
        .then(response => response.json())
        // .then(r => console.log(r))
        .catch(error => console.log(error));
}

// export default { fetchCountries };

// fetchCountries('uk');