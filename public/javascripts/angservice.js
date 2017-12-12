angular.module('angservice',[]).factory('factoryname',($http) => {

// Seperate factory for handling an https service



return {

  login : (obj) => {
    return $http.post("/user/login",obj);
  },
  logout : () => {
    return $http.post("/user/logout");
  },
  register : (obj) => {      
    return $http.post("/user/regiser",obj);
  },
  

  // file upload @params Formdata

  createPost : (obj) => {
     return $http.post('/user/createPost', obj);
  },
  

  commentPost: (obj) => {
     return $http.post('/user/posts/comment',obj)
  },
  
  searchPost: (obj) => {
    return $http.post('/user/posts/search?search'+obj)
 }
 
 }

});
