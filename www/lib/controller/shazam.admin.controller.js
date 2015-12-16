/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it, angular, io, socket*/
'use strict';

(function () {

  var app = angular.module("shazamjs-admin");

  function ShazamAdminController($scope, shazamPwd) {
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


    $scope.toggleVisibile = function (source) {
      console.log("Toggle Visible");
      console.log(shazamPwd);
      console.log(source);
      $scope.appState[source].visible = !$scope.appState[source].visible;
      console.log($scope.appState);
      var msg = {
        pwd: shazamPwd,
        appState: $scope.appState
      };
      socket.emit("Admin Update", msg);
    };

    $scope.toggleEnable = function (source) {
      $scope.appState[source].enabled = !$scope.appState[source].enabled;
      var msg = {
        pwd: shazamPwd,
        appState: $scope.appState
      };
      socket.emit("Admin Update", msg);
    };

    $scope.shazam = function (source) {
      shazamMsg.location = source;
      console.log("Emitted Shazam");
      socket.emit("Shazam!", shazamMsg);
    };

    function onRefresh(newState) {
      $scope.$apply(function () {
        console.log("Refresh called @" + new Date());
        var lastLocation = newState.lastEventSource;

        //Copy the app state
        // console.log(newState);
        $scope.appState = newState;
      });
    }

    function onTransform(newState) {
      console.log("Transform called @" + new Date());
      onRefresh(newState);
    }

    socket.on("Refresh!", onRefresh);
    socket.on("Transform!", onTransform);
    socket.emit("Who am I?");

  }

  app.controller('shazam.admin.controller', ["$scope", "ShazamPwd", ShazamAdminController]);
}());
