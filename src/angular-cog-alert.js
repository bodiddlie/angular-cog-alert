(function () {
    angular.module('cogAlert', ['ngAnimate'])
    .directive('cogAlerts', alertDirective)
    .factory('Alerting', Alerting);

    function alertDirective(Alerting) {
        var ddo = {
            restrict: 'E',
            template: '<div class="alert-box" ng-show="currentAlerts.length > 0"><div ng-repeat="alert in currentAlerts | filter: {show:true}" class="alert alert-{{alert.type}}">{{alert.message}}</div</div>',
            scope: true,
            link: function (scope) {
                scope.currentAlerts = Alerting.currentAlerts;
            }
        };

        return ddo;
    }

    function Alerting($timeout) {
        var currentAlerts = [];

        var fac = {
            currentAlerts: currentAlerts,
            addAlert: addAlert,
            addWarning: addWarning,
            addDanger: addDanger,
            addInfo: addInfo,
            addSuccess: addSuccess,
            removeAlert: removeAlert,
            errorHandler: errorHandler
        };

        function addAlert(type, message) {
            var alert = {
                type: type,
                message: message,
                show: true
            };
            currentAlerts.push(alert);

            $timeout(function () {
                hideAlert(alert);
            }, 5000);

            $timeout(function () {
                removeAlert(alert);
            }, 10000);
        }

        function hideAlert(alert) {
            alert.show = false;
        }

        function removeAlert(alert) {
            for (var i = 0; i < currentAlerts.length; i++) {
                if (currentAlerts[i] === alert) {
                    currentAlerts.splice(i, 1);
                    break;
                }
            }
        }

        function errorHandler(message) {
            return function () {
                addDanger(message);
            };
        }

        function addWarning(message) {
            addAlert('warning', message);
        }

        function addDanger(message) {
            addAlert('danger', message);
        }

        function addInfo(message) {
            addAlert('info', message);
        }

        function addSuccess(message) {
            addAlert('success', message);
        }

        return fac;
    }
})();
