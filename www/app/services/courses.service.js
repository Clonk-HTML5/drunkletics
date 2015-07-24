    angular.module('drunkletics').factory('CoursesService', ['$q', CoursesService]);

    function CoursesService($q) {
        var _db;
        var _remoteDB;
        var _courses;

        return {
            initDB: initDB,

            getAllCourses: getAllCourses,
            getCourse: getCourse,
            addCourse: addCourse,
            updateCourse: updateCourse,
            deleteCourse: deleteCourse
        };

        function initDB() {
            // Creates the database or opens if it already exists
            _db = new PouchDB('courses', {adapter: 'websql'});
            // _db = new PouchDB('courses');
            _remoteDB = new PouchDB('http://localhost:5984/courses');
            _db.replicate.from(_remoteDB).on('complete', function () {
              // yay, we're done!

            }).on('error', function (err) {
              // boo, something went wrong!
            });
        };

        function getCourse(courseId) {
          return $q.when(_db.get(courseId)).then(function (doc) {
                return doc;
              }).catch(function (err) {
                // boo, something went wrong!
              });
        };

        function addCourse(course) {
            return $q.when(_db.post(course));
        };

        function updateCourse(course) {
            return $q.when(_db.put(course));
        };

        function deleteCourse(course) {
            return $q.when(_db.remove(course));
        };

        function getAllCourses() {

            if (!_courses) {
                return $q.when(_db.allDocs({ include_docs: true}))
                          .then(function(docs) {
                            // Each row has a .doc object and we just want to send an
                            // array of course objects back to the calling controller,
                            // so let's map the array to contain just the .doc objects.
                            _courses = docs.rows.map(function(row) {
                                // Dates are not automatically converted from a string.
                                row.doc.Date = new Date(row.doc.Date);
                                return row.doc;
                            });

                            // Listen for changes on the database.
                            _db.changes({ live: true, since: 'now', include_docs: true})
                               .on('change', onDatabaseChange);

                           return _courses;
                         });
            } else {
                // Return cached data as a promise
                return $q.when(_courses);
            }
        };

        function onDatabaseChange(change) {
            var index = findIndex(_courses, change.id);
            var course = _courses[index];

            if (change.deleted) {
                if (course) {
                    _courses.splice(index, 1); // delete
                }
            } else {
                if (course && course._id === change.id) {
                    _courses[index] = change.doc; // update
                } else {
                    _courses.splice(index, 0, change.doc) // insert
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
