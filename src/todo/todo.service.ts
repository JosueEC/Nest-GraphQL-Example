import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      todoId: 1,
      description: 'uno',
      done: true,
    },
    {
      todoId: 2,
      description: 'dos',
      done: false,
    },
    {
      todoId: 3,
      description: 'tres',
      done: false,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(todoId: number): Todo {
    const todo = this.todos.find((todo) => todo.todoId === todoId);

    if (!todo) {
      throw new NotFoundException(`Todo with ID: ${todoId} not found`);
    }

    return todo;
  }

  save(request: CreateTodoInput): Todo {
    const { description } = request;

    const newTodo: Todo = {
      todoId: this.todos.length + 1,
      description,
      done: false,
    };

    this.todos.push(newTodo);

    return this.findOne(newTodo.todoId);
  }
}
