import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { AggregationsType } from './types/aggregations.type';
import { FilterArgs } from './dto/args/filter.args';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todosService: TodoService) {}

  @Query(() => [Todo], {
    name: 'todos',
  })
  findAll(@Args() filters: FilterArgs): Todo[] {
    return this.todosService.findAll(filters);
  }

  /**
   * Uso de 'fragment' en queries de Graphql para evitar la repetición
   * de argumentos en consultas:
   * 
   * {
   *   todo1: todo(todoId: 1) {
   *     ...todoFields
   *   }
   *   todo2: todo(todoId: 2) {
   *     ...todoFields
   *   }
   *   todo3: todo(todoId: 3) {
   *     ...todoFields
   *   }
   * }

   * fragment todoFields on Todo {
   *   todoId
   *   done
   *   description
   * }
   */
  @Query(() => Todo, {
    name: 'todo',
  })
  findOne(@Args('todoId', { type: () => Int }) todoId: number): Todo {
    return this.todosService.findOne(todoId);
  }

  @Mutation(() => Todo, {
    name: 'saveTodo',
  })
  save(@Args('request') request: CreateTodoInput): Todo {
    return this.todosService.save(request);
  }

  @Mutation(() => Todo, {
    name: 'updateTodo',
  })
  update(@Args('request') request: UpdateTodoInput): Todo {
    return this.todosService.update(request);
  }

  @Mutation(() => String, {
    name: 'removeTodo',
  })
  remove(@Args('todoId', { type: () => Int }) todoId: number): string {
    return this.todosService.remove(todoId);
  }

  // Aggregations
  @Query(() => Int, {
    name: 'totalTodos',
  })
  totalTodos(): number {
    return this.todosService.totalTodos;
  }

  @Query(() => Int, {
    name: 'completedTodos',
  })
  completedTodos(): number {
    return this.todosService.completedTodos;
  }

  @Query(() => Int, {
    name: 'pendingTodos',
  })
  pendingTodos(): number {
    return this.todosService.pendingTodos;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todosService.completedTodos,
      pending: this.todosService.pendingTodos,
      total: this.todosService.totalTodos,
      totalTodosCompleted: this.todosService.completedTodos,
    };
  }
}
