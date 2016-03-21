var toDoListApp = angular.module('ToDoListApp');

toDoListApp.service('ToDoListService', function($filter) {
        var toDoListData = [];
        return {
            getData: function() {
                // Instead of returning from the server, we use service so we can transfer data between controllers
                return toDoListData;
            },

            getPriorities: function() {
                // Get the priorities from the service, we can switch this with API from the server later
                return ['High', 'Medium', 'Low'];
            },

            getEmptyToDo: function() {
                // Initialize empty to do list
                return {
                    taskName : '',
                    priority: '',
                    dueDate: new Date(),
                    description: '',
                    done: false
                };
            },
            getDetailData: function(id) {
                // Using angular filter to return a detail to-do view
                return $filter('filter')(toDoListData, {id:id})[0];
            },
            updateData: function(data, id) {
                // Using angular filter to store the updated detail to-do view
                $filter('filter')(toDoListData, {id:id})[0] = data;
            },
            addToDoList: function(data) {
                // Store new todolist in the service
                toDoListData = data;
            }
        }
    });