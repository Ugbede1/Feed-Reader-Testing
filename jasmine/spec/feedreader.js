/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */

     describe('RSS Feeds', function () {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

         it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
      });

         /* Test loops through each feed and checks if the URL is defined
         and that the URL is not empty the URL length is not less than nine characters
         */
      function checkValidUrls(feed) {
        it('feed have valid URL', function () {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBeLessThan(9); // Checks if at least it has something more than the http:// text is there
                expect(feed.url).toMatch(/^http(s?)\:\/\//); // Regular expression to check if the URL contains https or http meaning that is valid
        });
        }

        // Test for valid URL and it is not empty.
        for (i = 0; i < allFeeds.length; i++) {
            checkValidUrls(allFeeds[i]);
        }

        // Checks if name id defined ('checks for strings')
        it('has valid names', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                expect(typeof allFeeds[i].name).toBe('string');
            }
        });
    });

        //Tests for Menu behaviour named "The menu"
        describe('The menu', function () {

        // Test if the menu is hidden by checking if body element has 'menu-hidden' using .hasClass() function
          it('hidden by default', function () {
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });

        // Test to ensure menu visibility changes when menu Icon is clicked
        it('change visibility when menu icon is clicked', function () {

        // Menu becomes vissible when Menu Icon is clicked
            $(".menu-icon-link").trigger('click');
            expect($("body").hasClass('menu-hidden')).toBe(false);

        // Menu becomes invissible when Menu Icon is clicked
            $(".menu-icon-link").trigger('click');
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });
    });

      // New Test suit named "Initial Entries"
      describe('Initial Entities', function () {

      /* Test to ensure that the loadFeed function completes it's work when called
       * and there is at least a single .entry element within the .feed container.
       * by using Jasmine's beforeEach and asynchronous done() function
      */

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Test to check if there is at least a single .entry element within the .feed container

        it('there is at least a single .entry element within the .feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

        // new test suite named "New Feed Selection"
        describe('New Feed Selection', function () {

         /* Test that ensures when a new feed is loaded by the loadFeed function
          * that the content actually changes.
          */
        var originalContent;
        var changedContent;

        beforeEach(function (done) {
            loadFeed(0, function () {
                originalContent = $('.feed').text();

                loadFeed(1, function () {
                    changedContent = $('.feed').text();
                    done();
                });
            });

        });

        // Test to check if content changed.

        it('load new feed', function () {
            expect(changedContent).not.toBe(originalContent);
        });
    });
}());
