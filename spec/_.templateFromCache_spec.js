
describe("Underscore templateFromCache plugin", function() {
  var server;
  server = null;
  beforeEach(function() {
    return server = sinon.fakeServer.create();
  });
  describe('requests', function() {
    it("should request the given url", function() {
      var request;
      _.templateFromCache({
        url: '/requests/user1.tpl'
      });
      request = server.requests[0];
      return expect(request.url).toEqual('/requests/user1.tpl');
    });
    it("should be a GET request", function() {
      var request;
      _.templateFromCache({
        url: '/requests/user2.tpl'
      });
      request = server.requests[0];
      return expect(request.method).toEqual('GET');
    });
    return it("should not request the server a second time if it has been already requested", function() {
      _.templateFromCache({
        url: '/requests/user3.tpl'
      });
      _.templateFromCache({
        url: '/requests/user3.tpl'
      });
      return expect(server.requests.length).toEqual(1);
    });
  });
  return describe('templates', function() {
    return it("should return the content from the server", function() {
      server.respondWith('GET', '/templates/user1.tpl', [
        200, {
          "Content-Type": "text/html"
        }, "<p>I'm a template</p>"
      ]);
      _.templateFromCache({
        url: '/templates/user1.tpl'
      }).then(function(template) {
        return expect(template()).toEqual("<p>I'm a template</p>");
      });
      return server.respond();
    });
  });
});
