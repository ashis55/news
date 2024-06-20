
// const API_KEY = "821de677d7194cbcae4d2bbcd6f36011";
// const url = "https://newsapi.org/v2/everything?q=";

// window.addEventListener("load", () => fetchNews("India"));

// async function fetchNews(query) {
//     try {
//         const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//         if (!res.ok) {
//             throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
//         }
//         const data = await res.json();
//         console.log(data);
//         bindData(data.articles);
//     } catch (error) {
//         console.error("Error fetching news:", error);
//     }
// }

// function bindData(articles) {
//     const cardsContainer = document.getElementById("cards-container");
//     const newsCardTemplate = document.getElementById("template-news-card");

//     cardsContainer.innerHTML = "";

//     if (articles && articles.length > 0) {
//         articles.forEach((article) => {
//             if (!article.urlToImage) return;
//             const cardClone = newsCardTemplate.content.cloneNode(true);
//             fillDataInCard(cardClone, article);
//             cardsContainer.appendChild(cardClone);
//         });
//      } //else {
//     //     console.error("No articles to display or articles data is invalid.");
//     // }
// }

// function fillDataInCard(cardClone, article) {
//     const newsImg = cardClone.querySelector("#news-img");
//     const newsTitle = cardClone.querySelector("#news-title");
//     const newsSource = cardClone.querySelector("#news-source");
//     const newsDesc = cardClone.querySelector("#news-desc");

//     newsImg.src = article.urlToImage;
//     newsTitle.innerHTML = article.title;
//     newsDesc.innerHTML = article.description;

//     const date = new Date(article.publishedAt).toLocaleString("en-US", {
//         timeZone: "Asia/Jakarta",
//     });

//     newsSource.innerHTML = `${article.source.name} · ${date}`;

//     cardClone.firstElementChild.addEventListener("click", () => {
//         window.open(article.url, "_blank");
//     });
// }

// let curSelectedNav = null;
// function onNavItemClick(id) {
//     fetchNews(id);
//     const navItem = document.getElementById(id);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = navItem;
//     curSelectedNav.classList.add("active");
// }

// const searchButton = document.getElementById("search-button");
// const searchText = document.getElementById("search-text");

// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;
// });

// ///

const url = "data.json"; // Local JSON file

window.addEventListener("load", () => fetchNews());

async function fetchNews() {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        bindData(data);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    if (articles && articles.length > 0) {
        articles.forEach((article) => {
            if (!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
        });
    }
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews();
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.toLowerCase();
    if (!query) return;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const filteredArticles = data.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.description.toLowerCase().includes(query) ||
                article.content.toLowerCase().includes(query)
            );
            bindData(filteredArticles);
            curSelectedNav?.classList.remove("active");
            curSelectedNav = null;
        })
        .catch(error => console.error("Error fetching news:", error));
});
