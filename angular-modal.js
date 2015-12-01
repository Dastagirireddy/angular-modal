(function() {
    'use strict';

    angular
        .module('ngModal', [])
        .controller('ModalController', ['$scope', function($scope) {

        }])
        .factory('$modal', [
            '$q',
            '$templateCache',
            '$templateRequest',
            '$compile',
            '$rootScope',
            '$controller',
            function($q, $templateCache, $templateRequest, $compile, $rootScope, $controller) {

                var defer;

                /**
                 * @constructor
                 */
                function ModalService() {

                    var self = this;
                }

                /**
                 * @method
                 * @param - {Object}
                 */
                ModalService.prototype.open = Open;

                function Open(configObj) {

                    defer = $q.defer();
                    this.defaults = configObj;
                    var config = configObj;

                    if (typeof config === undefined) {

                        defer.reject(configObj);
                    } else {

                        var template = $templateCache.get(config.templateUrl);

                        if (template !== undefined) {

                            compileTemplate(template);
                        } else {

                            $templateRequest(config.templateUrl)
                                .then(function(content) {

                                    compileTemplate(content);
                                }, function(err) {

                                    console.log(err);
                                });
                        }
                    }

                    /**
                     * @method
                     * @return - {String}
                     */
                    function generateRandomId() {

                        var number = Math.ceil(Math.random(10) * 10000000);
                        return 'M' + number;
                    }

                    /**
                     * @method
                     * @param - {String}
                     */
                    function compileTemplate(template) {

                        var scope = $rootScope.$new();
                        var linkFn = $compile(template);
                        var id = generateRandomId();
                        var modalElement = linkFn(scope);
                        modalElement[0].id = id;
                        var ctrl = 'data-ng-controller';
                        scope.close = function() {

                            if (!config.appendElement) {

                                angular.element(document).find(config.id).remove();
                            } else {

                                var el = document.getElementById(config.id);
                                el.parentNode.removeChild(el);
                            }
                            scope.$destroy();
                            scope = null;
                        };

                        var myScope = $controller('ModalController', {
                            $scope: scope
                        });
                        angular.merge(modalElement[0], {
                            "data-ng-controller": 'ModalController'
                        });
                        config.id = id;

                        addModalToDom(modalElement);
                    }

                    /**
                     * @method
                     * @param - {Object}
                     * @return - {Object}
                     */
                    function addModalToDom(modalElement) {

                        if (config.appendElement) {

                            angular.element(document.getElementById(config.appendElement)).append(modalElement);
                        } else {

                            angular.element(document.body).append(modalElement);
                        }
                        config.scope = modalElement.scope();
                        defer.resolve(config);
                    }

                    return defer.promise;
                }

                /**
                 * @return - {ModalService Instance}
                 */
                return new ModalService();
            }
        ]);
})();