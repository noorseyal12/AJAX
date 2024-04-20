$(function () {
  function fetchTodoDetails(todoId) {
    $.ajax({
      url: `https://dummyjson.com/todos/${todoId}`,
      method: "GET",
      success: function (todo) {
        console.log(todo);
        $("#todo-list").html(
          `<li>
              <strong>ID:</strong> ${todo.id}<br>
              <strong>Title:</strong> ${todo.todo}<br>
              <strong>Status:</strong> ${
                todo.completed ? "Completed" : "Pending"
              }<br>
              <strong>User ID:</strong> ${todo.userId}
            </li>`
        );
      },
      error: function (request, textStatus, errorThrown) {
        console.error("Error fetching todo details:", errorThrown);
      },
    });
  }

  $("#fetch").click(function () {
    let todoId = $("#get-id").val();
    fetchTodoDetails(todoId);
  });

  function addTodo(todoData) {
    console.log(todoData);
    $.ajax({
      url: "https://dummyjson.com/todos/add",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(todoData),
      success: function (newTodo) {
        console.log("New todo added:", newTodo);
      },
      error: function (request, textStatus, errorThrown) {
        console.error("Error adding new todo:", errorThrown);
      },
    });
  }

  $("#create-todo-form").submit(function (e) {
    e.preventDefault();
    let newTodoDetails = {
      todo: $("#title").val(),
      completed: false,
      userId: $("#user-id").val(),
    };
    addTodo(newTodoDetails);
  });

  function deleteTodo(todoId) {
    $.ajax({
      url: `https://dummyjson.com/todos/${todoId}`,
      method: "DELETE",
      success: function () {
        console.log("Todo deleted successfully.");
      },
      error: function (request, textStatus, errorThrown) {
        console.error("Error deleting todo:", errorThrown);
      },
    });
  }

  $("#delete-todo-form").submit(function (e) {
    e.preventDefault();
    let todoToDelete = $("#delete-id").val();
    deleteTodo(todoToDelete);
  });

  function updateTodoStatus(todoId, newStatus) {
    $.ajax({
      url: `https://dummyjson.com/todos/${todoId}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ completed: newStatus }),
      success: function (updatedTodo) {
        console.log("Todo status updated:", updatedTodo);
      },
      error: function (request, textStatus, errorThrown) {
        console.error("Error updating todo status:", errorThrown);
      },
    });
  }

  $("#update-todo-form").submit(function (e) {
    e.preventDefault();
    let todoIdToUpdate = $("#update-id").val();
    let newStatus = $("#update-status").val() === "true"; // Convert string to boolean
    updateTodoStatus(todoIdToUpdate, newStatus);
  });
});
