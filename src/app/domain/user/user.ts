import type { UUID } from "node:crypto";
import { Category } from "../transactions/category.js";
import type { Transaction } from "../transactions/transaction.js";

export class User {
  constructor(
    public id: UUID,
    public name: string,
    public email: string,
    public password: string,
    public categories?: Category[],
  ) {}

  public update(updatedUser: User): User {
    if (updatedUser.name) {
      this.name = updatedUser.name;
    }
    if (updatedUser.email) {
      this.email = updatedUser.email;
    }
    if (updatedUser.password) {
      this.password = updatedUser.password;
    }
    return this;
  }

  public static mapUser(result: any): User {
    return new User(
      result.id,
      result.name,
      result.email,
      result.password
    );
  }
}
