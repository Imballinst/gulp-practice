$.getJSON("file.json", function(json) {
  document.getElementById("header").innerHTML = json.header;
  document.getElementById("footer").innerHTML = json.footer;

  // For each article inside articles array in the JSON
  json.articles.forEach(function(article) {
    // DOM element
    var row = $('<div class="row"></div>');
    var col = $('<div class="col-md-12"></div>');
    var article_box = $('<div class="article-box"></div>');
    var title = $('<div class="article-title"></div>');
    var image = $('<div class="article-content-image"></div>');
    var text = $('<p class="base-text"></div>');
    // Image Element
    var imageElement = '<img src="' + article.image + '">';

    title.append(article.title);
    image.append(imageElement);
    text.append(article.text);

    $(".container").append(row
      .append(col
        .append(article_box
          .append(title)
          .append(image)
          .append(text))));
  });
});