/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it, angular, io*/
'use strict';

(function () {

  var app = angular.module("shazamjs-admin");

  function ShazamAdminController($scope) {
    var socket = io("http://localhost:8080");


    var COREAPP = "coreApp",
      WEBSITEAPP = "websiteApp",
      DESKTOPAPP = "desktopApp",
      HARDWAREAPP = "hardwareApp",
      CONSOLEAPP = "consoleApp",
      MOBILEAPP = "mobileApp";

    var shazamMsg = {
      location: COREAPP
    };

    $scope.appState = {};

    $scope.shazam = function (source) {
      shazamMsg.location = source;
      console.log("Emiitted Shazam");
      socket.emit("Shazam!", shazamMsg);
    };

    $scope.toggleVisibile = function(source){

    };

    $scope.toggleEnable = function(source){

    };

    function onRefresh(newState) {
      $scope.$apply(function () {
        console.log("Refresh called @" + new Date());
        var lastLocation = newState.lastEventSource;

        //Copy the app state
        $scope.appState = newState;

        // console.log($scope.appState[lastLocation]);
        // //Set the image to be displayed
        if ($scope.appState.isBilly) {
          $scope.imgUrl = $scope.appState[lastLocation].billyImg;
          $scope.imgSrc = $scope.appState[lastLocation].billySrc;
        } else {
          $scope.imgUrl = $scope.appState[lastLocation].shazamImg;
          $scope.imgSrc = $scope.appState[lastLocation].shazamSrc;
        }
        console.log($scope.appState);
        console.log($scope.imgUrl);
        console.log($scope.imgSrc);
      });
    }

    function onTransform(newState) {
      console.log("Transform called @" + new Date());
      // console.log(newState);
      onRefresh(newState);
      //Flicker Screen
    }

    socket.on("Refresh!", onRefresh);
    socket.on("Transform!", onTransform);
    socket.emit("WhatAmI!");
  }

  app.controller('shazam.api.service', ["$scope", ShazamAdminController]);
}());
