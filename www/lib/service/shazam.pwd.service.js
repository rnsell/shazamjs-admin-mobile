/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it, angular, io*/
'use strict';

(function () {

  var app = angular.module("shazamjs-admin");

  function pwdService(){
    return "";
  }

  app.factory("ShazamPwd", [pwdService]);
}());
