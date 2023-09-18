document.addEventListener("DOMContentLoaded", function () {
  var savedArticles = JSON.parse(sessionStorage.getItem("savedArticles")) || [];

  // Display saved articles
  var articlesContainer = document.getElementById("articles");
  savedArticles.forEach(function (article, index) {
    createArticleCard(article, index);
  });

  // Handle create article form submission
  var createArticleForm = document.getElementById("createArticleForm");
  createArticleForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var articleTitle = document.getElementById("articleTitle").value;
    var articleContent = document.getElementById("articleContent").value;

    // Create article object
    var article = {
      title: articleTitle,
      content: articleContent,
      likes: 0,
      index: savedArticles.length, // unique identifier
    };

    savedArticles.push(article);
    sessionStorage.setItem("savedArticles", JSON.stringify(savedArticles));

    createArticleCard(article, article.index);
    // Clear the article title and content input boxes
    document.getElementById("articleTitle").value = "";
    document.getElementById("articleContent").value = "";
  });

  // Function to create article card
  function createArticleCard(article, index) {
    var articleCard = document.createElement("div");
    articleCard.className = "card mb-3";

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var cardTitle = document.createElement("h2");
    cardTitle.className = "card-title";
    cardTitle.textContent = article.title;
    cardBody.appendChild(cardTitle);

    var cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerHTML = article.content.replace(/\n/g, "<br>");
    cardBody.appendChild(cardText);

    var likesText = document.createElement("p");
    likesText.className = "likes-text";
    likesText.textContent = article.likes + " likes";
    cardBody.appendChild(likesText);

    var btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    var saveButton = document.createElement("button");
    saveButton.className = "btn btn-secondary saveButton";
    saveButton.setAttribute("data-article-index", index);
    saveButton.textContent = "Save for later";
    btnGroup.appendChild(saveButton);

    var likeButton = document.createElement("button");
    likeButton.className = "btn btn-secondary likeButton";
    likeButton.setAttribute("data-article-index", index);
    likeButton.textContent = "Like";
    btnGroup.appendChild(likeButton);

    cardBody.appendChild(btnGroup);

    // Comment list
    var commentsList = document.createElement("div");
    commentsList.id = "commentsList" + index;
    commentsList.className = "comments-list";
    cardBody.appendChild(commentsList);

    // Comment box
    var commentBox = document.createElement("textarea");
    commentBox.id = "commentBox" + index;
    commentBox.className = "form-control mt-2";
    commentBox.rows = "2";
    cardBody.appendChild(commentBox);

    // Comment button
    var commentButton = document.createElement("button");
    commentButton.id = "commentButton" + index;
    commentButton.className = "btn btn-primary mt-2";
    commentButton.textContent = "Comment";
    cardBody.appendChild(commentButton);

    articleCard.appendChild(cardBody);
    articlesContainer.appendChild(articleCard);
  }
});

// Handle save, like and comment button clicks
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("saveButton")) {
    var index = event.target.getAttribute("data-article-index");
    var savedArticles = JSON.parse(sessionStorage.getItem("savedArticles"));
    var article = savedArticles[index];
    article.url = window.location.href + "#" + index; // save the current URL with a fragment identifier

    var savedForLaterArticles =
      JSON.parse(localStorage.getItem("savedForLaterArticles")) || [];
    savedForLaterArticles.push(article);
    localStorage.setItem(
      "savedForLaterArticles",
      JSON.stringify(savedForLaterArticles)
    );

    alert(
      "Article saved for later.\nYou have " +
        savedForLaterArticles.length +
        ' item(s) in your "Save for later" folder.'
    );
  } else if (event.target.classList.contains("likeButton")) {
    var index = event.target.getAttribute("data-article-index");
    var savedArticles = JSON.parse(sessionStorage.getItem("savedArticles"));
    var article = savedArticles[index];
    article.likes++;
    sessionStorage.setItem("savedArticles", JSON.stringify(savedArticles));

    var likesText =
      event.target.parentElement.parentElement.querySelector(".likes-text");
    likesText.textContent = article.likes + " likes";

    alert("You and " + (article.likes - 1) + " others like this.");
  } else if (event.target.id.includes("commentButton")) {
    var index = event.target.id.replace("commentButton", "");
    var commentBox = document.getElementById("commentBox" + index);
    var commentContent = commentBox.value;

    // Display submitted comment
    var commentsList = document.getElementById("commentsList" + index);
    var commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.innerHTML = commentContent.replace(/\n/g, "<br>");
    commentsList.appendChild(commentElement);

    commentBox.value = ""; // clear the comment box
  }
});
