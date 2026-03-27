import type { Page } from "../../domain/user/output/page.js";
import type { UserOutput } from "../../domain/user/output/user-output.js";
import { User } from "../../domain/user/user.js";

export interface UserGateway {
  create(user: User): Promise<void>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(): Promise<UserOutput[]>;
  find(page: number, size: number): Promise<Page>;
  findByEmail(email: string): Promise<User>;
}
