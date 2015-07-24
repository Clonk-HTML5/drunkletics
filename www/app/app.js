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
        templateUrl: 'templates/tab-dash.html',
        controller: 'OverviewController'
      }
    }
  })

  .state('tab.friends', {
    url: '/friends',
    views: {
      'tab-friends': {
        templateUrl: 'templates/tab-friends.html',
        controller: 'FriendsController'
      }
    }
  })
  .state('tab.friend-detail', {
    url: '/friend/:friendId',
    views: {
      'tab-friends': {
        templateUrl: 'templates/friend-detail.html',
        controller: 'FriendDetailController'
      }
    }
  })

  .state('tab.courses', {
    url: '/courses',
    views: {
      'tab-courses': {
        templateUrl: 'templates/tab-courses.html',
        controller: 'CoursesController'
      }
    }
  })

  .state('tab.course-detail', {
    url: '/course/:courseId',
    views: {
      'tab-courses': {
        templateUrl: 'templates/course-detail.html',
        controller: 'CourseDetailController'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountController'
      }
    }
  })

  .state('tab.account-settings', {
    url: '/account/settings',
    views: {
      'tab-account': {
        templateUrl: 'templates/account-settings.html',
        controller: 'AccountSettingsController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/');

});
