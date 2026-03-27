import type { Page } from "../../domain/user/output/page.js";
import type { UserOutput } from "../../domain/user/output/user-output.js";
import type { User } from "../../domain/user/user.js";
import type { UserGateway } from "../../gateway/user/user-gateway.js";
import bcrypt from "bcryptjs";
export class UserInteractor {
  constructor(private userGateway: UserGateway) {}

  async find(page: number, size: number): Promise<Page> {
    if (page === null || page === undefined || page < 0) {
      page = 0;
    }
    if (size === null || size === undefined || size < 0) {
      size = 10;
    }

    return this.userGateway.find(page, size);
  }

  async create(user: User): Promise<void> {
    if (user.name === "") {
      throw new Error("Name is required");
    }
    if (user.email === "") {
      throw new Error("Email is required");
    }
    if (user.password === "") {
      throw new Error("Password is required");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await this.userGateway.create(user);
  }

  async update(user: User): Promise<User> {
    return this.userGateway.update(user);
  }

  async delete(user: User): Promise<User> {
    return this.userGateway.delete(user);
  }

  async findById(id: string): Promise<User> {
    return this.userGateway.findById(id);
  }

  async findAll(): Promise<UserOutput[]> {
    return this.userGateway.findAll();
  }
}
