angular.module('ToDoListController', []).
    controller('toDoController', ['$scope', 'ToDoListService', '$uibModal', function($scope, ToDoListService, $uibModal) {

        $scope.toDoLists = ToDoListService.getData();
        $scope.sortable = {};
        $scope.isToDoListsEmpty = true;

        $scope.checkMarkedToDo = function () {
            var empty = true;

            if($scope.toDoLists.length === 0) {
                empty = true;
            } else {
                for (var i = 0; i < $scope.toDoLists.length; i++) {
                    if(!$scope.toDoLists[i].done) {
                        empty = false;
                        break;
                    }
                }
            }
            
            $scope.isToDoListsEmpty = empty;
        };

        $scope.removeToDo = function(data) {
            $scope.toDoToBeDeleted = data;
            $scope.indexToDoToBeDeleted = $scope.toDoLists.indexOf(data);
            var modalInstance = $uibModal.open({
                templateUrl: 'removeToDoModal.html',
                controller: 'removeToDoModalController',
                scope: $scope,
                resolve: status
            });

            modalInstance.result.then(function(status) {
                if(status) {
                    $scope.checkMarkedToDo();
                }
            })
        }

        $scope.open = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'addToDoModal.html',
                controller: 'toDoModalController',
                scope: $scope,
                resolve: {
                    isToDoListEmpty: $scope.isToDoListsEmpty
                }
            });

            modalInstance.result.then(function(data) {
               $scope.isToDoListsEmpty = data;
            });
        }

    }]).
    controller('toDoModalController', ['$scope', 'ToDoListService', '$uibModalInstance', function($scope, ToDoListService, $uibModalInstance) {
        $scope.addToDo = ToDoListService.getEmptyToDo();
        $scope.testDateOpen = false;
        $scope.toDoPriorities = ToDoListService.getPriorities();

        $scope.add = function() {

            if($scope.addToDo.taskName !== undefined && $scope.addToDo.priority !== undefined) {
                // Deep copy newly created array
                var copy = {};
                angular.copy($scope.addToDo, copy);
                copy.id = $scope.toDoLists.length;
                $scope.toDoLists.push(copy);

                ToDoListService.addToDoList($scope.toDoLists);
                $scope.isToDoListsEmpty = false;
                $scope.addToDo = ToDoListService.getEmptyToDo();

                $uibModalInstance.close($scope.isToDoListsEmpty);
            }
        };

        $scope.close = function() {
            $uibModalInstance.close();
        };

        $scope.datePickerOpen = function () {
            $scope.testDateOpen = true;
        };
    }]);

    toDoListApp.controller('removeToDoModalController', ['$scope', 'ToDoListService', '$uibModalInstance', function($scope, ToDoListService, $uibModalInstance) {

        $scope.close = function() {
            $uibModalInstance.close(false);
        };

        $scope.delete = function() {
            $scope.toDoLists.splice($scope.indexToDoToBeDeleted, 1);
            $uibModalInstance.close(true);
        }
    }]);

    toDoListApp.controller('toDoDetailController', ['$scope', 'ToDoListService', '$routeParams', function($scope, ToDoListService, $routeParams) {
        $scope.todo_id = $routeParams.toDoid;
        $scope.testDateOpen = false;
        $scope.toDoPriorities = ToDoListService.getPriorities();
        $scope.detailData = ToDoListService.getDetailData($scope.todo_id);

        $scope.toDoDatepicker = {
            minDate: new Date()
        };

        $scope.datePickerOpen = function() {
            $scope.testDateOpen = true;
        };

        $scope.updateData = function() {
            if($scope.detailData.taskName !== undefined && $scope.detailData.priority !== undefined) {
                $scope.edit = false;
                ToDoListService.updateData($scope.detailData, $scope.todo_id);
            }
        }
    }]);