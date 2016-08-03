angular.module('example', ['ui','ngRoute'])
    .controller('AccountStructureController', ['$scope','DataService', function($scope,DataService) {
      $scope.accountStructurList = [];
     
     $scope.accountStructurList= DataService.getAccountStructureData();
     $scope.user={};
     $scope.total=0;
     $scope.parentAccountStructure=[{id:1,accountNumber:"123",accountDescription:"abc",balance:"4500"},
     {id:2,accountNumber:"2345",accountDescription:"def",balance:"5500"}]
     $scope.accountTypes=DataService.getAccountTypeData();

      $scope.addAccountStructure = function(user) {
         // $scope.user.accountChildDescription=user.accountDescription;
        
         $scope.total=$scope.total + parseInt(user.balance);
        // $scope.accountStructurList.push(user);
         DataService.setAccountStructureData(user);
         $scope.accountStructurList= DataService.getAccountStructureData();
         $scope.reset();
      };

      $scope.reset = function() {
        $scope.user = '';
      };

     $scope.deleteAccountStructure = function(acc) {
        $scope.accountStructurList.splice($scope.accountStructurList.indexOf(acc),1);
      };

     
    }]);

angular.module('example').controller('AccountTypeController', ['$scope','$window','DataService', function($scope,$window,DataService) {
      $scope.accountTypeList = [];

   
     $scope.parentAccountStructure= DataService.getAccountStructureData();

      $scope.addAccountType= function(account) {
         // $scope.user.accountChildDescription=user.accountDescription;
         $scope.accountTypeList.push(account);
         DataService.setAccountTypeData(account);
          $scope.reset();
      };

      $scope.reset = function() {
        $scope.account = '';
      };

     $scope.deleteAccountStructure = function(acc) {
        $scope.accountTypeList.splice($scope.accountTypeList.indexOf(acc),1);
      };

    
    }]);

 angular.module('example').factory('DataService', function() {
  
  var object = {}; 
  var accountTypeList=[];
  var accountStructurList = [];
  object.setAccountStructureData = function(obj) {
          accountStructurList.push(obj);
    }

  object.getAccountStructureData = function() {
      return accountStructurList;
    }
 object.setAccountTypeData = function(obj) {
          accountTypeList.push(obj);
    }

  object.getAccountTypeData = function() {
      return accountTypeList;
    }
  return object;
});

      angular.module('example').config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'accountStructure.html',
                controller  : 'AccountStructureController'
            })

            // route for the add account type page
            .when('/accountType', {
                templateUrl : 'accountType.html',
                controller  : 'AccountTypeController'
            }) ;
          
    });
