
angular.module('app', ['angcontroller','ui.router', 'angservice', 'ngCookies'])
 .config(function($stateProvider, $httpProvider) {
     $stateProvider.
      state('login', {   //this state is meant for user login
        url: '/login',
        templateUrl: '/view/login.html',
        controller:'maincontroller' 
    })


.state('createPost', {   //this state is meant for user login
    url: '/createPost',
    templateUrl: '/view/createPost.html',
    controller:'maincontroller'
})
.state('register' , {
       
     url: '/register',
     templateUrl: '/view/register.html',
     controller: 'maincontroller'
  })


})