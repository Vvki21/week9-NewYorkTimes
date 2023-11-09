const apiKey = '41jdSr0yiGuzzGBuMTTAe4YWiATZrXW3'; // API 

const form = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = ''; // 清空之前的搜索结果

    const query = document.getElementById('query').value;

    const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const articles = data.response.docs;

        if (articles.length === 0) {
            resultsDiv.innerHTML = 'No articles found.';
        } else {
            articles.forEach((article) => {
                const articleDiv = document.createElement('div');
                articleDiv.innerHTML = `
                    <h2>${article.headline.main}</h2>
                    <p>${article.snippet}</p>
                    <a href="${article.web_url}" target="_blank">Read more</a>
                `;
                resultsDiv.appendChild(articleDiv);
            });
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = 'An error occurred while fetching data.';
    }
});
