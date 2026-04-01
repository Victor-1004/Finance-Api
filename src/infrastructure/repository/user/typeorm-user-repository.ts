import type { UUID } from "node:crypto";
import { AppDataSource } from "../../../database/config.js";
import { UserEntity } from "../../entity/user/user-entity.js";


export class UserRepository {
  private repo = AppDataSource.getRepository(UserEntity);

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(data: Partial<UserEntity>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findById(id: UUID) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: UUID, data: Partial<UserEntity>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: UUID) {
    const user = await this.findById(id); 
    if (user) {
      await this.repo.delete(id);
    }
    return user;
  }

}