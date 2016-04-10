'use strict';

angular.module('carpooling')
  .config(function($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile/:_id',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
      });
  });