import type { Page } from "../../domain/user/output/page.js";
import type { UserOutput } from "../../domain/user/output/user-output.js";
import type { User } from "../../domain/user/user.js";
import type { CategoryGateway } from "../../gateway/transaction/category-gateway.js";
import type { TransactionGateway } from "../../gateway/transaction/transaction-gateway.js";
import type { UserGateway } from "../../gateway/user/user-gateway.js";
import bcrypt from "bcryptjs";
export class UserInteractor {
  constructor(
    private userGateway: UserGateway,
    private transactionGateway: TransactionGateway,
    private categoryGateway: CategoryGateway,
  ) {}

  async find(page: number, size: number): Promise<Page> {
    if (page === null || page === undefined || page < 0) {
      page = 0;
    }
    if (size === null || size === undefined || size < 0) {
      size = 10;
    }

    return this.userGateway.find(page, size);
  }

  async update(user: User): Promise<User> {
    return this.userGateway.update(user);
  }

  async delete(user: User): Promise<User> {
    return this.userGateway.delete(user);
  }

  async findById(id: string, page: number, size: number): Promise<User> {
    const user = await this.userGateway.findById(id);
    const transactions = await this.transactionGateway.findByUserId(id, page, size);
    const categories = await this.categoryGateway.findByUserId(id);
    user.transactions = transactions;
    user.categories = categories;
    return user;
  }

  async findAll(): Promise<UserOutput[]> {
    return this.userGateway.findAll();
  }
}
