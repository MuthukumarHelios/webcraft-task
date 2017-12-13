log = console.log;

angular.module('angcontroller',['angservice', 'ngCookies'])
.controller('maincontroller', function(factoryname,$cookieStore, $scope, $state,) {
 

$scope.formdata = {};

// User Registrtion @param{formdata}
$scope.register = () => {
     factoryname.register($scope.formdata).then(result => {
       if(result.data.error){
         alert(result.data.data);
       }   else{
         
        alert("You have succeess fully registered login now")
        $state.go('login');
       }
     }).then(er => {
       log(er.message);
     }) 

} 


//login Service for user 

$scope.login = () => {

  // alert("l")

  var valid = $scope.formdata.email !== undefined && $scope.formdata.password !== undefined;

if(valid){

    factoryname.login($scope.formdata).then(result => {     
      log(result);
        if(result.data.error){
          alert(result.data.data);
        }else{
          $state.go('register');
         
        }
    
      $scope.formdata = {};
      // $cookieStore.put('user_id',"hey how ");
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

factoryname.allposts().then(result => {
  
     $scope.allposts = result.data;

}).catch(er => {
 log(er.message);
});

$scope.createPost = () => {
  alert('')
log("formdate", $scope.formdata);
  factoryname.createPost($scope.formdata).then(result => {
     log(result); 
    $scope.formdata = {};
  }).catch(er => {
     log(er.message);
  })

}

  $scope.test = "you angular";
});