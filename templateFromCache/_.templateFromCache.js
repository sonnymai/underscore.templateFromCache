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


// _.mixin({
//     templateFromCache: _.memoize(function(options) {
//         var template;
//         if (options.url) {
//             return this.getTemplate(options.url).then(function(data){
//                 template =  _.template(data);
//             });
//         }

//         return null;
//     }, function(options) {
//         _.defaults(options, {url: ''});
//         return options.url;
//     }),

//     getTemplate: function(url){
//         var self, dfr;
//         self = this;
//         dfr = $.Deferred();

//         $.ajax({
//             url: url,
//             type: 'GET',
//             success: dfr.resolve,
//             error: dfr.fail
//         });

//         return dfr.promise();
//     }
// });