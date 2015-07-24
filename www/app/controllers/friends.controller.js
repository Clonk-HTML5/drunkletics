angular.module('drunkletics')
.controller('FriendsController', ['$scope', 'FriendsService', FriendsController])
.controller('FriendDetailController', ['$scope', '$stateParams', 'FriendsService', FriendDetailController]);

function FriendsController($scope, FriendsService) {
  $scope.friends = FriendsService.all();
}

function FriendDetailController($scope, $stateParams, FriendsService) {
  $scope.friend = FriendsService.get($stateParams.friendId);
}
