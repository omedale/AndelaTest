/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})


.controller('HomeCtrl', function($scope, $ionicLoading, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $location, $rootScope) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

     $scope.showSpinner = function(){
        $ionicLoading.show({
       template: '<p>Loading data...</p> <ion-spinner></ion-spinner>'
     });
 }

    $scope.hideSpinner = function(){
        $ionicLoading.hide();
    }


    $scope.initz = function(){
    // alert();
    $scope.showSpinner() ;
        $http.get("https://api.github.com/search/users?q=developer+location:lagos+language:java")
    .then(function(response) {
        $scope.content = response.data;
        $scope.developers =  $scope.content.items;
         console.log($scope.developers);
        $scope.hideSpinner();
    }, function(response) {
       $scope.hideSpinner();
       alert("Something went wrong...check internet connection ");
    });

    }
   
    $scope.openProfile = function(java){
        // itemdetail.avatar_url
        $rootScope.itemdetail=java;
         
        $location.path('/app/profile');
    }

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope,$cordovaInAppBrowser, $ionicPopup, $ionicActionSheet, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $location, $rootScope ,$window) {
    // Set Header
   // console.log( $rootScope.test);
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

      var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };


    $scope.openLink = function(link){
        $cordovaInAppBrowser.open(link, '_blank', options)
               // window.location.href= link ;
    }
    
    $scope.share = function(username,url) {
          var message = 'Check out this awesome developer<br/>'+username+'<br/>'+url+'';
          var confirmPopup = $ionicPopup.confirm({
                            title: 'Share User',
                            template: message
                          });

                          confirmPopup.then(function(res){
                            if (res) {
                             //user shared successfully
                            }else{
                              // User not shared
                            }
                          });
    }

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})
;
