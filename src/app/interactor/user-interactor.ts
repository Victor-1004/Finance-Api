import type { UserOutput } from "../domain/output/user-output.js"
import type { User } from "../domain/user.js"
import type { UserGateway } from "../gateway/user-gateway.js"
import bcrypt from "bcryptjs"
export class UserInteractor {
    constructor(
        private userGateway: UserGateway
    ) {}

    async create(user: User): Promise<User> {
        if (user.name === "") {
            throw new Error("Name is required")
        }
        if (user.email === "") {
            throw new Error("Email is required")
        }
        if (user.password === "") {
            throw new Error("Password is required")
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        return this.userGateway.create(user)
    }

    async update(user: User): Promise<User> {
        return this.userGateway.update(user)
    }

    async delete(user: User): Promise<User> {
        return this.userGateway.delete(user)
    }

    async findById(id: number): Promise<User> {
        return this.userGateway.findById(id)
    }

    async findAll(): Promise<UserOutput[]> {
        return this.userGateway.findAll()
    }
}