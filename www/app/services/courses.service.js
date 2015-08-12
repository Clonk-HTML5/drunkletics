    angular.module('drunkletics').factory('CoursesService', ['$q', CoursesService]);

    function CoursesService($q) {
        var _db;
        var _remoteDB;
        var _courses;
        var _workouts;

        return {
            initDB: initDB,

            getAllCourses: getAllCourses,
            getAllWorkouts: getAllWorkouts,
            getCourse: getCourse,
            getWorkout: getWorkout,
            getWorkoutByQuery: getWorkoutByQuery,
            addCourse: addCourse,
            updateCourse: updateCourse,
            deleteCourse: deleteCourse
        };

        function initDB() {
            // Creates the database or opens if it already exists
            _db = new PouchDB('drunkletics', {adapter: 'websql'});
            _remoteDB = new PouchDB('http://localhost:5984/drunkletics');
            // _remoteDB = new PouchDB('https://drunkletics.smileupps.com/');
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
        function getWorkout(workoutId) {
          return $q.when(_db.get(workoutId)).then(function (doc) {
                return doc;
              }).catch(function (err) {
                // boo, something went wrong!
              });
        };
        function getWorkoutByQuery(workoutId) {
          return $q.when(
              _db.query(
                {
                  map: function (doc, emit) {
                    if(doc._id === workoutId){
                      if (doc.type == 'workout') {
                        emit([doc._id, 0]);
                        if(doc.exercises){
                          for (var i in doc.exercises) {
                            emit([doc._id, Number(i)+1], {_id: doc.exercises[i]});
                          }
                        }
                      }
                    }
                  }
                }
                , {
                  // startkey: workoutId,
                  // endkey: workoutId + '\uffff',
                  include_docs: true,
                  reduce: true,
                  group: true
                }
            )
            ).then(function (doc) {
                var returnArray = [];
                doc.rows.map(function(row) {
                      returnArray.push(row.doc);
                });
                return returnArray;
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
                return $q.when(
                  _db.query(
                    {
                      map: function (doc) {
                        if (doc.type == 'exercise') {
                          emit([doc.type, 0], null);
                        }
                      }
                    }
                    , {
                      include_docs: true,
                      reduce: true,
                      group: true
                    }
                )
                ).then(function (doc) {
                    _courses = doc.rows.map(function(row) {
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    _db.changes({ live: true, since: 'now', include_docs: true})
                       .on('change', onCoursesInDatabaseChange);

                   return _courses;

                  }).catch(function (err) {
                    // boo, something went wrong!
                  });

                // return $q.when(_db.allDocs({ include_docs: true}))
                //           .then(function(docs) {
                //             // Each row has a .doc object and we just want to send an
                //             // array of course objects back to the calling controller,
                //             // so let's map the array to contain just the .doc objects.
                //             _courses = docs.rows.map(function(row) {
                //               if (row.doc.type == 'exercise') {
                //                 console.log(row.doc.type)
                //                 // Dates are not automatically converted from a string.
                //                 // row.doc.Date = new Date(row.doc.Date);
                //                 return row.doc;
                //               }
                //             });
                //
                //             // Listen for changes on the database.
                //             _db.changes({ live: true, since: 'now', include_docs: true})
                //                .on('change', onCoursesInDatabaseChange);
                //
                //            return _courses;
                //          });
            } else {
                // Return cached data as a promise
                return $q.when(_courses);
            }
        };

        function onCoursesInDatabaseChange(change) {
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
        function getAllWorkouts() {

            if (!_workouts) {
                return $q.when(_db.allDocs({ include_docs: true}))
                          .then(function(docs) {
                            var returnArray = [];
                            // Each row has a .doc object and we just want to send an
                            // array of course objects back to the calling controller,
                            // so let's map the array to contain just the .doc objects.
                            docs.rows.map(function(row) {
                                if(row.doc.type === 'workout') {
                                  // returnArray[] = row.doc;
                                  // Dates are not automatically converted from a string.
                                  // row.doc.Date = new Date(row.doc.Date);
                                  returnArray.push(row.doc);
                                }
                            });

                            _workouts = returnArray;

                            // Listen for changes on the database.
                            _db.changes({ live: true, since: 'now', include_docs: true})
                               .on('change', onWorkoutsInDatabaseChange);

                           return _workouts;
                         });
            } else {
                // Return cached data as a promise
                return $q.when(_workouts);
            }
        };

        function onWorkoutsInDatabaseChange(change) {
            var index = findIndex(_workouts, change.id);
            var workout = _workouts[index];

            if (change.deleted) {
                if (workout) {
                  _workouts.splice(index, 1); // delete
                }
            } else {
                if (workout && workout._id === change.id) {
                  _workouts[index] = change.doc; // update
                } else {
                  _workouts.splice(index, 0, change.doc) // insert
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
