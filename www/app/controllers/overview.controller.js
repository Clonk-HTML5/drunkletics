angular.module('drunkletics').controller('OverviewController', ['$scope', '$ionicModal', '$ionicPlatform', 'StoryService', OverviewController]);

function OverviewController($scope, $ionicModal, $ionicPlatform, StoryService) {
	var vm = this;

	// Initialize the database.
	$ionicPlatform.ready(function() {
		StoryService.initDB();

		// Get all story records from the database.
		StoryService.getAllStories().then(function(stories) {
			$scope.stories = stories;
		});
	});

	// Initialize the modal view.
	$ionicModal.fromTemplateUrl('add-or-edit-story.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.showAddStoryModal = function showAddStoryModal() {
		$scope.story = {};
		$scope.action = 'Add';
		$scope.isAdd = true;
		$scope.modal.show();
	};

	$scope.showEditStoryModal = function showEditStoryModal(story) {
		$scope.story = story;
		$scope.action = 'Edit';
		$scope.isAdd = false;
		$scope.modal.show();
	};

	$scope.saveStory = function saveStory() {
		if ($scope.isAdd) {
			StoryService.addStory($scope.story);
		} else {
			StoryService.updateStory($scope.story);
		}
		$scope.modal.hide();
	};

	$scope.deleteStory = function deleteStory() {
		StoryService.deleteStory($scope.story);
		$scope.modal.hide();
	};

	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	return vm;
};
