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
}
