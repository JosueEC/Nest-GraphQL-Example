import { Injectable } from '@nestjs/common';
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
}
