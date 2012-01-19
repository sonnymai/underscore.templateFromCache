_.mixin({
    templateFromCache: _.memoize(function(options) {
        if (options.url) {
            return $.get(options.url)
                    .pipe(function(data, textStatus, jqXHR) {
                         return _.template(data);
                    });
        }
        return null;
    }, function(options) {
        _.defaults(options, {url: ''});
        return options.url;
    })
});