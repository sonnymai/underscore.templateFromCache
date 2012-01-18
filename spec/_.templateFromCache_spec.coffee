describe "Underscore templateFromCache plugin", ->
  # Set up the fixture path
  # jasmine.getFixtures().fixturesPath = "spec/fixtures/"
  server = null

  beforeEach ->
     server = sinon.fakeServer.create()

  describe 'requests', ->
    it "should request the given url", ->
      _.templateFromCache({ url: '/requests/user1.tpl' })

      request = server.requests[0]
      expect( request.url ).toEqual '/requests/user1.tpl'
    
    it "should be a GET request", ->
      _.templateFromCache({ url: '/requests/user2.tpl' })

      request = server.requests[0]
      expect( request.method ).toEqual 'GET'

    it "should not request the server a second time if it has been already requested", ->
      _.templateFromCache({ url: '/requests/user3.tpl' })
      # Request it again
      _.templateFromCache({ url: '/requests/user3.tpl' })

      expect( server.requests.length ).toEqual 1

  describe 'templates', ->
    it "should return the content from the server", ->
      server.respondWith 'GET', '/templates/user1.tpl', [200, { "Content-Type": "text/html" }, "<p>I'm a template</p>"]
      
      _.templateFromCache({ url: '/templates/user1.tpl' }).then (template)->
        expect( template()).toEqual "<p>I'm a template</p>"

      server.respond()