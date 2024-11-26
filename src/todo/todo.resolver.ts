import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';

@Resolver()
export class TodoResolver {
  constructor(private readonly todosService: TodoService) {}

  @Query(() => [Todo], {
    name: 'todos',
  })
  findAll(): Todo[] {
    return this.todosService.findAll();
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
    name: 'save_todo',
  })
  save(@Args('request') request: CreateTodoInput): Todo {
    return this.todosService.save(request);
  }

  update() {
    return [];
  }

  remove() {
    return [];
  }
}
