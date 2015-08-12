angular.module('drunkletics')
.controller('MainController', function($scope, $translate, $ionicPlatform, $ionicLoading, CoursesService) {

    $scope.ChangeLanguage = function(lang){
      $translate.use(lang);
    }

    $ionicPlatform.ready(function() {
      CoursesService.initDB();
    });

    $scope.load = function() {
        $ionicLoading.show({
          template: 'Loading...'
        });
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            fs.root.getDirectory(
                "Drunkletics",
                {
                    create: false
                },
                function(dirEntry) {
                    dirEntry.getFile(
                        "test.png",
                        {
                            create: false,
                            exclusive: false
                        },
                        function gotFileEntry(fe) {
                            $ionicLoading.hide();
                            $scope.imgFile = fe.toURL();
                        },
                        function(error) {
                            $ionicLoading.hide();
                            console.log("Error getting file");
                        }
                    );
                }
            );
        },
        function() {
            $ionicLoading.hide();
            console.log("Error requesting filesystem");
        });
    };


    $scope.download = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
          fs.root.getDirectory(
              "Drunkletics",
              {
                  create: true
              },
              function(dirEntry) {
                  dirEntry.getFile(
                      "test.png",
                      {
                          create: true,
                          exclusive: false
                      },
                      function gotFileEntry(fe) {
                          var p = fe.toURL();
                          fe.remove();
                          ft = new FileTransfer();
                          ft.download(
                              encodeURI("http://ionicframework.com/img/ionic-logo-blog.png"),
                              p,
                              function(entry) {
                                  $ionicLoading.hide();
                                  $scope.imgFile = entry.toURL();
                              },
                              function(error) {
                                  $ionicLoading.hide();
                                  alert("Download Error Source -> " + error.source);
                              },
                              false,
                              null
                          );
                      },
                      function() {
                          $ionicLoading.hide();
                          console.log("Get file failed");
                      }
                  );
              }
          );
      },
      function() {
          $ionicLoading.hide();
          console.log("Request for filesystem failed");
      });
  };

})
