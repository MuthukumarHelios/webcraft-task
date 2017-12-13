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
    return $http.post("/user/register",obj);
  },
  
  // file upload @params Formdata
  createPost : (obj) => {

    var request = {
      method: 'POST',
      url: '/user/createPost',
      data: new FormData(),
      headers: {
          'Content-Type': undefined
      }
  };
  return $http(request);
},
  commentPost: (obj) => {
     return $http.post('/user/posts/comment',obj)
  },
  allposts: () => {
    return $http.get('/user/posts/all')
  },
  
  searchPost: (obj) => {
    return $http.post('/user/posts/search?search'+obj)
  }
 
}

});
