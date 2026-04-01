import type { Page } from "../../domain/user/output/page.js";
import type { UserOutput } from "../../domain/user/output/user-output.js";
import { User } from "../../domain/user/user.js";

export interface UserGateway {
  create(user: User): Promise<User | null> ;
  update(user: User): Promise<User | null>;
  delete(user: User): Promise<User | null> ;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
