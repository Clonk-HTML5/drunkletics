angular.module('drunkletics')
.controller('CoursesController', ['$scope', '$ionicPlatform', 'CoursesService', CoursesController])
.controller('CourseDetailController', ['$scope', '$stateParams', '$ionicPlatform', 'CoursesService', CourseDetailController]);

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
