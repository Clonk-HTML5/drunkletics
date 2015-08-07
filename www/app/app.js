// angular.module('drunkletics', ['ionic', 'ionic-material', 'ionMdInput'])
angular.module('drunkletics', ['ionic', 'ion-profile-picture' ,'pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json'
  });

	$translateProvider.preferredLanguage('en');
  // $translateProvider.useLocalStorage();

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroController'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/dashboard/tab-dash.html',
        controller: 'OverviewController'
      }
    }
  })

  .state('tab.friends', {
    url: '/friends',
    views: {
      'tab-friends': {
        templateUrl: 'templates/friends/tab-friends.html',
        controller: 'FriendsController'
      }
    }
  })
  .state('tab.friend-detail', {
    url: '/friend/:friendId',
    views: {
      'tab-friends': {
        templateUrl: 'templates/friends/friend-detail.html',
        controller: 'FriendDetailController'
      }
    }
  })

  .state('tab.courses-categorie', {
    url: '/courses-categorie',
    views: {
      'tab-courses': {
        templateUrl: 'templates/courses/tab-courses-categorie-selection.html',
        controller: 'CoursesCategorieSelectionController'
      }
    }
  })
  .state('tab.workouts', {
    url: '/workouts',
    views: {
      'tab-courses': {
        templateUrl: 'templates/courses/workouts.html',
        controller: 'WorkoutsController'
      }
    }
  })

  .state('tab.workout-detail', {
    url: '/workout/:workoutId',
    views: {
      'tab-courses': {
        templateUrl: 'templates/courses/workout-detail.html',
        controller: 'WorkoutDetailController'
      }
    }
  })
  .state('tab.start-workout', {
    url: '/workout/start/:workoutId',
    views: {
      'tab-courses': {
        templateUrl: 'templates/courses/start-workout.html',
        controller: 'StartWorkoutController'
      }
    }
  })
  .state('tab.courses', {
    url: '/courses',
    views: {
      'tab-courses': {
        templateUrl: 'templates/courses/courses.html',
        controller: 'CoursesController'
      }
    }
  })
  .state('tab.course-detail', {
    url: '/course/:courseId',
    views: {
      'tab-courses': {
        templateUrl: 'templates/courses/course-detail.html',
        controller: 'CourseDetailController'
      }
    }
  })
  .state('tab.start-course', {
    url: '/course/start/:courseId',
    views: {
      'tab-courses': {
        templateUrl: 'templates/courses/start-course.html',
        controller: 'StartCourseController'
      }
    }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/tab-account.html',
        controller: 'AccountController'
      }
    }
  })
  .state('tab.account-settings', {
    url: '/account/settings',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/account-settings.html',
        controller: 'AccountSettingsController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/');

});
