(function() {
  'use strict';

  angular
    .module('carpooling')
    .controller('LoginController', LoginController);

  function LoginController($state, User, $cordovaToast) {
    var vm = this;
    vm.User = User;
    vm.load = false;
    
    vm.login = function(user){
      vm.load = true;
      if( !validateFields(user) ) {
        vm.load = false;
        toastMsg('Fields are required');
        return;
      }
      
      vm.User.login(user).then(function(res){
        if(res.data.status == 'ok'){
          vm.load = false;
          vm.User.setCurrentUser(res.data.user);
          $state.go('main');
        }

        if(res.data.error == 1000) {
          vm.load = false;
          toastMsg('Please check your username');
        }
        if(res.data.error == 1001) {
          vm.load = false;
          toastMsg('Please check your password');
        }
        if(res.data.error == 1002) {
          vm.load = false;
          var user = {
            email: res.data.email
          };
          res.data.user = user;
          vm.User.setCurrentUser(res.data.user);
          $state.go('verification');
        }
      }, function(err){
        console.log(err);
      });      
    }

    function validateFields(user) {
      var good = false;
      if(user !== undefined){
        if(user.username.length > 0
          && user.password.length > 0){
          good = true;
        }
      }
      
      return good;
    }

    function toastMsg(msg){
      $cordovaToast
        .show(msg, 'short', 'bottom')
        .then(function(success) {
          user.password == '';
        }, function (error) {
          console.log(error);
        });
    }

  }
})();
