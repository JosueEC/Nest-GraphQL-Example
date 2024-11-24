import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TodoResolver {
  @Query(() => [String])
  findAll() {
    return [];
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
