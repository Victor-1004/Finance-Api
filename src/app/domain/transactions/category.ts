import type { UUID } from "node:crypto";
import type { User } from "../user/user.js";

export class Category {
  constructor(
    public id: UUID,
    public name: string,
    public user_id: UUID,
    public is_default: boolean,
    public created_at: Date,
    public User?: User,
  ) {}


 
}
