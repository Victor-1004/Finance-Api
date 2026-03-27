import { User } from "../user/user.js";

export class Category {
  constructor(
    public id: string,
    public name: string,
    public user_id: string,
    public is_default: boolean,
    public created_at: Date,
  ) {}

  public static mapCategory(result: any): Category {
    return new Category(
      result.id,
      result.name,
      result.user_id,
      result.is_default,
      result.created_at,
    );
  }

 
}
