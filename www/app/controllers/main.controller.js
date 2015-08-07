angular.module('drunkletics')
.controller('MainController', function($scope, $translate, $ionicPlatform, CoursesService) {

    $scope.ChangeLanguage = function(lang){
      $translate.use(lang);
    }

    $ionicPlatform.ready(function() {
      CoursesService.initDB();
    });

})
