(function() {

    angular.module('drunkletics').factory('StoryService', ['$q', StoryService]);

    function StoryService($q) {
        var _db;
        var _remoteDB;
        var _stories;

        return {
          initDB: initDB,

          getAllStories: getAllStories,
          addStory: addStory,
          updateStory: updateStory,
          deleteStory: deleteStory,
          replicateDatabase: replicateDatabase
        };

        function initDB() {
          // Creates the database or opens if it already exists
          _db = new PouchDB('stories', {adapter: 'websql'});
          _remoteDB = new PouchDB('http://localhost:5984/stories');
        };

        function addStory(story) {
          var addedStory = $q.when(_db.post(story));
          this.replicateDatabase();
          return addedStory;
        };

        function updateStory(story) {
          var updatedStory = $q.when(_db.put(story));
          this.replicateDatabase();
          return updatedStory;
        };

        function deleteStory(story) {
          var deletedStory = $q.when(_db.remove(story));
          this.replicateDatabase();
          return deletedStory;
        };

        function replicateDatabase(){
          _db.replicate.to(_remoteDB).on('complete', function () {
            // yay, we're done!
          }).on('error', function (err) {
            // boo, something went wrong!
          });
        };

        function getAllStories() {
          if (!_stories) {
              return $q.when(_db.allDocs({ include_docs: true}))
                        .then(function(docs) {

                          // Each row has a .doc object and we just want to send an
                          // array of story objects back to the calling controller,
                          // so let's map the array to contain just the .doc objects.
                          _stories = docs.rows.map(function(row) {
                              // Dates are not automatically converted from a string.
                              row.doc.Date = new Date(row.doc.Date);
                              return row.doc;
                          });

                          // Listen for changes on the database.
                          _db.changes({ live: true, since: 'now', include_docs: true})
                             .on('change', onDatabaseChange);

                         return _stories;
                       });
          } else {
              // Return cached data as a promise
              return $q.when(_stories);
          }
        };

        function onDatabaseChange(change) {
          var index = findIndex(_stories, change.id);
          var story = _stories[index];

          if (change.deleted) {
              if (story) {
                  _stories.splice(index, 1); // delete
              }
          } else {
              if (story && story._id === change.id) {
                  _stories[index] = change.doc; // update
              } else {
                  _stories.splice(index, 0, change.doc) // insert
              }
          }
        }

        function findIndex(array, id) {
          var low = 0, high = array.length, mid;
          while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
          }
          return low;
        }
    }
})();
