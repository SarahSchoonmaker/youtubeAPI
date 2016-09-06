$(function(){
  var search;
  var nextToken;
  $('#search').submit(function (event) {
    event.preventDefault();
    search = $('#query').val();
    $('#loading').css("display", "block");
    getVideo(search);
  });


  function getVideo(search,token) {
    url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
      part: 'snippet',
      key: 'AIzaSyBxg8x5GUhljKkrDTgPdjYKrpUu8CUYTF8',
      q: search
    };
    if (token) {
      params.pageToken=token;
    }

    $.getJSON(url, params, function (search) {
      showResults(search);
      $('#loading').hide();
    });
  }

  function showResults(results) {
    $('#query').val("");
    var arr = [];
    var input = results.items;

    nextToken=results.nextPageToken;
    
    $.each(input, function( index, value ) {
      var title = value.snippet.title;
      var thumbnail = value.snippet.thumbnails.default.url;
      arr.push( '<p>' + title + '</p>' + '<img src="' + thumbnail + '">');
      $('#previous').css("display", "inline");
      $('#next').css("display", "inline");
    });

    $('#search-results').append(arr);

  }

  $("#next").click(function () {
      getVideo(search,nextToken);
  });

});



