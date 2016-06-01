$.getJSON("./../../file.json", function(json) {
  document.getElementById("header").innerHTML = json.header;
  document.getElementById("footer").innerHTML = json.footer;

  // DOM Element
  var row = $('<div class="row"></div>');
  var col = $('<div class="col-md-12"></div>');
  row.append(col);

  for (i = 0; i < json.articles.length; i++) {
    // Empty Content
    var content = $('<div class="content"></div>');
    var title = $('<div class="title"></div>');
    var content_image = $('<div class="content-image"></div>');
    var text = $('<p class="base-text"></div>');
    var imageSection = '<img src="' + json.articles[i].image + '">';

    title.append(json.articles[i].title);
    content_image.append(imageSection);
    text.append(json.articles[i].text);

    $(".container").append(content.append(title).append(content_image).append(content).append(text));
  }
});