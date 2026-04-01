import type { UUID } from "node:crypto";
import type { Page } from "../../../app/domain/user/output/page.js";
import type { UserOutput } from "../../../app/domain/user/output/user-output.js";
import type { User } from "../../../app/domain/user/user.js";
import type { UserGateway } from "../../../app/gateway/user/user-gateway.js";
import type { UserRepository } from "../../repository/user/typeorm-user-repository.js";
import { domainToEntity, entityToDomain } from "../mapper/user/user-mapper.js";

export class UserAdapter implements UserGateway {
  constructor(private userGateway: UserRepository ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userGateway.findByEmail(email);
    return entityToDomain(user) || null;
  }


  async create(user: User): Promise<User | null> {
    const createdUser = await this.userGateway.create(domainToEntity(user));
    return entityToDomain(createdUser) || null;
  }

  async update(user: User): Promise<User | null> {
    const updatedUser = await this.userGateway.update(user.id, domainToEntity(user));
    return entityToDomain(updatedUser) || null;
  }

  async delete(user: User): Promise<User | null> {
    const deletedUser = await this.userGateway.delete(user.id);
    return entityToDomain(deletedUser) || null;
  }

  async findById(id: UUID): Promise<User | null> {
    return entityToDomain( await this.userGateway.findById(id));
  }


}
