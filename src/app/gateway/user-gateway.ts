import type { UserOutput } from "../domain/output/user-output.js";
import { User } from "../domain/user.js";

export interface UserGateway {
    create(user: User): Promise<User>
    update(user: User): Promise<User>
    delete(user: User): Promise<User>
    findById(id: number): Promise<User>
    findAll(): Promise<UserOutput[]>
}