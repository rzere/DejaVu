$(document).ready(function() {
  $.getJSON('http://localhost:8080/results', function(data) {

    //var text = `url: ${data.url}<br>
    //metadata: ${data.metadata}<br>
    //caption: ${data.caption}`
    //var image = `<img src=${data.url}>`
    $.each(data, function(key, val) {
      html = '<div class="image-list">';
      html += '<img src ="' + val.img_url + '" class="image-styles" />';
      html += '<p class="image-title">' + "page url: " + val.page_url + '</p>';
      html += '</div>';
      $("#images").append(html);

    });
  });
});