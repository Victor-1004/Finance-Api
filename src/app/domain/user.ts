import type { UUID } from "node:crypto";

export class User {
    constructor(
        public id: UUID,
        public name: string,
        public email: string,
        public password: string
    ) {}


    public update(updatedUser: User): User {
        if (updatedUser.name) {
            this.name = updatedUser.name;
        }
        if (updatedUser.email) {
            this.email = updatedUser.email;
        }
        if (updatedUser.password) {
            this.password = updatedUser.password;
        }
        return this;
    }
}
