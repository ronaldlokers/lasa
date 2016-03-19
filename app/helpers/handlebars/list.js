module.exports = function (items, options) {
    var result = "<ul>";

    for(var i=0, l=items.length; i<l; i++) {
      result += "<li>" + options.fn(items[i]) + "</li>";
    }

    return result + "</ul>";
};
