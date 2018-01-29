$(document).ready(() => {

    $.getJSON('/api/todos')
    .then(addTodos)

    $('#todoInput').keypress((event) => {
      if (event.which === 13) {
        createTodo();
      };
    });

    $('.list').on('click', 'span', (e) => {
      const $this = $(e.currentTarget);
      const $dataID = $this.parent().data('id');
      $this.parent().remove()
      $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + $dataID
      })
      .then((data) => {
        console.log(data);
      })
    })

}); //

const addTodos = (todos) => {
  todos.forEach(todo => {
    insertTodo(todo);
  })
};

const createTodo = () => {
  const input = $('#todoInput').val();
  $.post('/api/todos', {name: input})
  .then((todo) => {
    $('#todoInput').val('');
    insertTodo(todo)
  })
  .catch((err) => {
    console.log(err);
  });
};

const insertTodo = (todo) => {
    const newTodo = $('<li>' + todo.name + '<span>x</span></li>').addClass('task');
    newTodo.data('id', todo._id);
    if (todo.completed) {
      newTodo.addClass('done');
    }
    $('.list').append(newTodo);
};
