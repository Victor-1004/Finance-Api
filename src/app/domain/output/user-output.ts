import type { UUID } from "crypto";
import type { User } from "../user.js";

export class UserOutput {
    constructor(
        private id: UUID,
        private name: string,
        private email: string
    ) {}

    public getId(): UUID {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getEmail(): string {
        return this.email
    }

    public static fromUser(user: User): UserOutput {
        return new UserOutput(user.id, user.name, user.email)
    }
}
