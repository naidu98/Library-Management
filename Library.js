let searchInputEl = document.getElementById("searchInput");
let selectDisplayCountEl = document.getElementById("selectDisplayCount");
let searchResultsEl = document.getElementById("searchResults");
let formEl = document.getElementById("Form");
let spinnerEl = document.getElementById("spinner");


function displayBooks(search_results) {
    let {
        title,
        imageLink,
        author
    } = search_results;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("country-card", "col-6", "mr-auto", "ml-auto", "d-flex", "flex-column")
    searchResultsEl.appendChild(resultItemEl);

    let imageEl = document.createElement("img");
    imageEl.classList.add("image", "mt-auto", "mb-auto")
    imageEl.src = imageLink;
    resultItemEl.appendChild(imageEl);

    let authorEl = document.createElement("p");
    authorEl.classList.add("author-name")
    authorEl.textContent = author;
    resultItemEl.appendChild(authorEl);
}

function displaySearchResults(searchResults) {
    let headingEl = document.createElement('h1');
    searchResultsEl.appendChild(headingEl);
    if (searchResults.length === 0) {
        headingEl.textContent = 'No results found'
    } else {
        for (let result of searchResults) {
            headingEl.textContent = 'Popular Books'
            displayBooks(result);
        }
    }
}

function getBooks(event) {
    if (event.key === "Enter") {
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputEl.value + "&maxResults=" + selectDisplayCountEl.value;
        let options = {
            method: "GET"
        }
        spinnerEl.classList.remove("d-none");
        searchResultsEl.classList.add("d-none");
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                spinnerEl.classList.add("d-none");
                searchResultsEl.classList.remove("d-none");
                let {
                    search_results
                } = jsonData;
                displaySearchResults(jsonData.search_results);
            });
    }
}

function changeCount(events) {
    if (event.key === "Enter") {
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputEl.value + "&maxResults=" + selectDisplayCountEl.value;
        console.log(url);
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                searchResultsEl.classList.remove("d-none");
                spinnerEl.classList.add("d-none");
                displaySearchResults(jsonData.search_results);
            });
    }
}
selectDisplayCountEl.addEventListener("change", changeCount);
searchInputEl.addEventListener("keydown", getBooks);
formEl.addEventListener("submit", function(events) {
    event.preventDefault();
});