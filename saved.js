document.addEventListener('DOMContentLoaded', function() {
    // Retrieve saved articles from localStorage or initialize an empty array
    var savedForLaterArticles = JSON.parse(localStorage.getItem('savedForLaterArticles')) || [];
    // Get the container for saved articles
    var savedArticlesContainer = document.getElementById('savedArticles');

    // Loop through each saved article
    savedForLaterArticles.forEach(function(article, index) {
        // Create a div element for the article card
        var articleCard = document.createElement('div');
        articleCard.className = 'card';

        // Create a div element for the card body
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create a h2 element for the card title
        var cardTitle = document.createElement('h2');
        cardTitle.className = 'card-title';
        
        // Create an anchor element for the article link
        var articleLink = document.createElement('a');
        articleLink.href = article.url;
        articleLink.textContent = article.title;
        // Append the article link to the card title
        cardTitle.appendChild(articleLink);
        
        // Append the card title to the card body
        cardBody.appendChild(cardTitle);

        // Create a paragraph element for the card text
        var cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = article.content;
        // Append the card text to the card body
        cardBody.appendChild(cardText);

        // Append the card body to the article card
        articleCard.appendChild(cardBody);

        // Append the article card to the saved articles container
        savedArticlesContainer.appendChild(articleCard);
    });
});
