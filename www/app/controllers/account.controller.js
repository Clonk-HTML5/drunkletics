angular.module('drunkletics')
.controller('AccountController', function($scope, ngFB) {

  $scope.getInfo = function() {
      ngFB.api({path: '/me'}).then(
          function(user) {
              console.log(JSON.stringify(user));
              $scope.user = user;
              // $scope.myPicture = 'http://graph.facebook.com/' + user.id + '/picture?type=large';
              $scope.getFriends(user);
          },
          errorHandler);
  }()

    $scope.getFriends = function(user) {
        //ngFB.api({path: '/' + user.id + '/friends', params:{limit: 50}}).then(
        ngFB.api({path: '/me/friends', params:{debug: 'all'}}).then(
            function(friends) {
                console.log(JSON.stringify(friends));
                $scope.friends = friends.data;
            },
            errorHandler);
    }

  $scope.share = function() {
      ngFB.api({
          method: 'POST',
          path: '/me/feed',
          params: {message: document.getElementById('Message').value || 'Testing Facebook APIs'}
      }).then(
          function() {
              alert('the item was posted on Facebook');
          },
          errorHandler);
  }

})
.controller('AccountSettingsController', function($scope,ngFB) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.login = function() {
      // ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
      ngFB.login({scope: 'email,user_friends,user_about_me,publish_actions'}).then(
          function(response) {
              alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
          },
          function(error) {
            console.log(error)
              alert('Facebook login failed: ' + error);
          });
  }

  $scope.readPermissions = function() {
      ngFB.api({
          method: 'GET',
          path: '/me/permissions'
      }).then(
          function(result) {
              alert(JSON.stringify(result.data));
          },
          errorHandler
      );
  }

  $scope.revoke = function() {
      ngFB.revokePermissions().then(
          function() {
              alert('Permissions revoked');
          },
          errorHandler);
  }

  $scope.logout = function() {
      ngFB.logout().then(
          function() {
              alert('Logout successful');
          },
          errorHandler);
  }
});


  function errorHandler(error) {
      alert(error.message);
  }
