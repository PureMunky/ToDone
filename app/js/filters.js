ToDone.App.filter('linkify', function () {
  return function (input) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    return input ? input.replace(exp, "<a href='$1' target='_blank'>$1</a>") : '';
  };
});

ToDone.App.filter('until', function () {
  return function (input) {
    var toDate = new Date(input),
      fromDate = new Date(),
      mili = (toDate - fromDate),
      days = Math.round((mili / (1000 * 60 * 60 * 24)) + 0.5, 0);

    return days + ' days';
  };
});