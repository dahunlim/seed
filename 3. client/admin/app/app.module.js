var app = angular.module('app', [
    'ngMessages',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'app.controller',
    'app.service',
    'app.directive',
    'app.constant',
    'app.filter',
    'aram.angular'
]);

var controller = angular.module('app.controller', []);
var service = angular.module('app.service', []);
var directive = angular.module('app.directive', []);
var constant = angular.module('app.constant', []);
var filter = angular.module('app.filter', []);