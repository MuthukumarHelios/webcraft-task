log = console.log;

angular.module('angcontroller',['angservice', 'ngCookies'])
.controller('maincontroller', function(factoryname,$cookieStore, $scope, $state,) {
 

$scope.formdata = {};

$scope.login = () => {

  // alert("l")

  var valid = $scope.formdata.email !== undefined && $scope.formdata.password !== undefined;

if(valid){
    factoryname.login($scope.formdata).then(result => {     
      log(result);
      $cookieStore.put('user_id',"hey");
    }).catch(er => {  
     log(er.message);
    });   
  }else{
    alert("please Fill out the mandatory fiekds");
   }
};


$scope.logout = () => {
  log($cookieStore.get('user_id'));
  factoryname.logout().then(result => {
       log("logged out succcess");
       log(result);
  }).catch(er => {
    log(er.message);
  })
}

$scope.createPost = () => {

  factoryname.createPost().then(result => {
    
    
  }).catch(er => {
     log(er.message);
  })

}

   $scope.test = "you angular";
});