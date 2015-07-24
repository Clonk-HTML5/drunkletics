angular.module('drunkletics')
.controller('MainController', function($scope, $translate) {

    $scope.ChangeLanguage = function(lang){
      $translate.use(lang);
    }

})
