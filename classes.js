function VideoSearch(term, f) {
  this.term = term;
  this.doWithData = f;
  this.results = [];
}

VideoSearch.prototype.search = function() {
  var that = this;
  var url = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
    part: 'snippet',
    key: 'AIzaSyBxg8x5GUhljKkrDTgPdjYKrpUu8CUYTF8',
    q: this.term
  };

  if (this.pageToken) {
    params.pageToken=this.pageToken;
  }

  $.getJSON(url, params, function (results) {
    that.results = that.results.concat(results.items);
    that.pageToken = results.nextPageToken;
    that.doWithData(that.results);
  });
}

VideoSearch.prototype.loadMore = function() {
  this.search();
}

