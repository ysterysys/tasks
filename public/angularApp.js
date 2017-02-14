var app = 
angular.module('tasktool', ['ui.router'])


app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

/*app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);
*/

app.controller('MainCtrl', ['$scope',
'posts','$http',function($scope, posts,$http){
	
	function init(){
		getAllPost();
	}
	init();
	
 
$scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0
  });
  $scope.title = '';
  $scope.link = '';
};
$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};
$scope.createPost = createPost; // post to db
	function createPost(post){
	console.log(post);
	$http.post("/api/blogpost",post)
	getAllPost();
	}
$scope.getAllPost = getAllPost; //get from db
	function getAllPost(){
		$http
		.get("/api/blogpost")
		.success(function(posts){
			$scope.posts = posts;
			
		});
	}

$scope.deletePost = deletePost; //dele from db
	function deletePost(postId){
		$http.delete("/api/blogpost/"+postId)
		getAllPost();
		
	}

$scope.editPost = editPost; // 
	function editPost(post){
		$http
		.get("/api/blogpost/"+post)
		.success(function(post){
			$scope.post = post;
		});
	
	}
$scope.updatePost = updatePost;
 function updatePost(post){
	 $http
	 .put("/api/blogpost/"+post._id,post)
	 .success(getAllPost);
	
 }
$scope.toggle = function() {
        $scope.editBox = !$scope.editBox;
    };

$scope.editTag = editTag; // 
	function editTag(postId){
		
		if(postId){
		
		editPost(postId);
		
		}
		else{
			createPost(postId);
		}
	}
	$scope.createTag= function(){
		var tag = $scope.tagging;
		$http.post("/api/blogpost",tag)
			.success(function(tag, status,headers,config){
			$scope.tagging = tag;
			})
			.error(function(tag,status,header,config){
				$scope.tagging = "tag:"+status;
			});
	
	}
}]);

