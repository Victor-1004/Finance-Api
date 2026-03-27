import type { UUID } from "crypto";
import type { User } from "../user.js";
import type { Category } from "../../transactions/category.js";

export class UserOutput {
  constructor(
    private id: UUID,
    private name: string,
    private email: string,
    private categories: Category[],
  ) {}

  public getId(): UUID {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  public static fromUser(user: User): UserOutput {
    return new UserOutput(
      user.id,
      user.name,
      user.email,
      user.categories ?? [],
    );
  }
}
