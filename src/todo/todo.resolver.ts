import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';

@Resolver()
export class TodoResolver {
  @Query(() => [Todo], {
    name: 'todos',
  })
  findAll(): Todo[] {
    return [
      {
        todoId: 1,
        description: 'uno',
        done: false,
      },
    ];
  }

  findOne() {
    return [];
  }

  create() {
    return [];
  }

  update() {
    return [];
  }

  remove() {
    return [];
  }
}
