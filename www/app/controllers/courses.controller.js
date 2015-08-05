angular.module('drunkletics')
.controller('CoursesCategorieSelectionController', ['$scope', CoursesCategorieSelectionController])
.controller('WorkoutsController', ['$scope', '$ionicPlatform', 'CoursesService', WorkoutsController])
.controller('WorkoutDetailController', ['$scope', '$stateParams', '$ionicPlatform', 'CoursesService', WorkoutDetailController])
.controller('CoursesController', ['$scope', '$ionicPlatform', 'CoursesService', CoursesController])
.controller('CourseDetailController', ['$scope', '$stateParams', '$ionicPlatform', 'CoursesService', CourseDetailController]);

function CoursesCategorieSelectionController($scope) {
  $scope.categories = [
    { id: 1, name: 'Workouts', description: 'work hard', link: 'workouts'},
    { id: 2, name: 'Exercises', description: 'work hard', link: 'courses'}
  ];
}

function WorkoutsController($scope, $ionicPlatform, CoursesService) {
  $ionicPlatform.ready(function() {
    $scope.data = {
      showDelete: false,
      listCanSwipe: true
    };

    $scope.edit = function(item) {
      console.log('Edit Item: ' + item);
    };
    $scope.share = function(item) {
      console.log('Share Item: ' + item);
    };

    $scope.onItemDelete = function(item) {
      // $scope.items.splice($scope.items.indexOf(item), 1);
      console.log('try to delete' + item)
    };

    CoursesService.initDB();

    // Get all story records from the database.
    CoursesService.getAllWorkouts().then(function(workouts) {
      console.log(workouts)
      $scope.workouts = workouts;
    });
  });
}

function WorkoutDetailController($scope, $stateParams, $ionicPlatform, CoursesService) {
  $ionicPlatform.ready(function() {
    CoursesService.initDB();

    CoursesService.getWorkoutByQuery($stateParams.workoutId).then(function(workoutAndExcercises) {
      var excercisesArray = [];
      for(var wEIterator in workoutAndExcercises){
        if(workoutAndExcercises[wEIterator].type === 'workout') {
          $scope.workout = workoutAndExcercises[wEIterator];
        }
        if(workoutAndExcercises[wEIterator].type === 'exercise') {
          excercisesArray.push(workoutAndExcercises[wEIterator]);
        }
      }
      $scope.excercises = excercisesArray;
    });
  });
}

function CoursesController($scope, $ionicPlatform, CoursesService) {
  $ionicPlatform.ready(function() {
    $scope.data = {
      showDelete: false,
      listCanSwipe: true
    };

    $scope.edit = function(item) {
      console.log('Edit Item: ' + item);
    };
    $scope.share = function(item) {
      console.log('Share Item: ' + item);
    };

    $scope.onItemDelete = function(item) {
      // $scope.items.splice($scope.items.indexOf(item), 1);
      console.log('try to delete' + item)
    };

    CoursesService.initDB();

    // Get all story records from the database.
    CoursesService.getAllCourses().then(function(courses) {
      $scope.courses = courses;
    });
  });
}

function CourseDetailController($scope, $stateParams, $ionicPlatform, CoursesService) {
  $ionicPlatform.ready(function() {
    CoursesService.initDB();

    CoursesService.getCourse($stateParams.courseId).then(function(course) {
      $scope.course = course;
    });
  });
}
