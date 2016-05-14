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
        return;
      }

      vm.User.login(user).then(function(res){
        if(res.data.status == 'ok'){
          vm.load = false;
          vm.User.setCurrentUser(res.data.user);
          $state.go('main');
        }

        if(res.data.status == 'denied') {
          vm.load = false;
          $cordovaToast
            .show('Please check your password', 'short', 'center')
            .then(function(success) {
              user.password == '';
            }, function (error) {
              console.log(error);
            });
        }
      });      
    }

    function validateFields(user) {
      var good = false;
      if(user !== undefined){
        if(user.email.length > 0
          && user.password.length > 0){
          good = true;
        }
      }
      
      return good;
    }
  }
})();
