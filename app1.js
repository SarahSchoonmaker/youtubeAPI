$(function(){
  var currentSearch = -1;
  var allSearches = [];
  $('#search').submit(function (event) {
    event.preventDefault();
    search = $('#query').val();
    $('#loading').css("display", "block");
    $("#search-results").html('');
    currentSearch++;
    var youtubeSearch = new VideoSearch(search, function(results) {
      showResults(results);
      $('#loading').hide();
    });

    youtubeSearch.search();
    allSearches.push(youtubeSearch);

    showAllSearches();
  });

  function showAllSearches() {
    $('.last-searches').html('');
    $.each(allSearches, function(i, el) {
      $('.last-searches').append('<a href="#" class="last-search" data-pos="' + i +'"> ' + el.term +' </a>');
    });
  }

  function showResults(results) {

    $('#query').val("");
    var arr = [];
    var input = results;

    console.log(results);
    
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
    allSearches[currentSearch].loadMore();
  });

  $("body").on("click", ".last-search", function(e) {
    e.preventDefault();
    var pos = parseInt($(this).data("pos"));
    currentSearch = pos;
    $("#search-results").html('');

    showResults(allSearchxoes[pos].results);
  });

});



