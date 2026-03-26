import type { Page } from "../../app/domain/output/page.js"
import type { UserOutput } from "../../app/domain/output/user-output.js"
import type { User } from "../../app/domain/user.js"
import type { UserGateway } from "../../app/gateway/user-gateway.js"
import { db } from "../../database/config.js"
import { UserRepository } from "../repository/user-repository.js"

export class UserAdapter implements UserGateway {
    constructor(
        private userGateway: UserGateway = new UserRepository(db)
    ) {}

    async find(page: number, size: number): Promise<Page> {
        return this.userGateway.find(page, size)
    }

    async create(user: User): Promise<User> {
        return this.userGateway.create(user)
    }

    async update(user: User): Promise<User> {
        return this.userGateway.update(user)
    }

    async delete(user: User): Promise<User> {
        return this.userGateway.delete(user)
    }

    async findById(id: string): Promise<User> {
        return this.userGateway.findById(id)
    }

    async findAll(): Promise<UserOutput[]> {
        return this.userGateway.findAll()
    }
}