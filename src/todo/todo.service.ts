import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterArgs } from './dto/args/filter.args';
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

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.done === true).length;
  }

  get pendingTodos() {
    return this.todos.filter((todo) => todo.done === false).length;
  }

  findAll(filters: FilterArgs): Todo[] {
    const { status } = filters;

    if (status !== undefined) {
      return this.todos.filter((todo) => todo.done === status);
    }

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

  update(request: UpdateTodoInput): Todo {
    const { todoId } = request;

    const todoToUpdate = this.findOne(todoId);

    const todoUpdated = Object.assign(todoToUpdate, request);

    this.todos.map((todo) => {
      return todo.todoId === todoId ? todoUpdated : todo;
    });

    return todoToUpdate;
  }

  remove(todoId: number): string {
    this.findOne(todoId);

    this.todos = this.todos.filter((todo) => todo.todoId !== todoId);

    return 'Todo removed successfully';
  }
}
