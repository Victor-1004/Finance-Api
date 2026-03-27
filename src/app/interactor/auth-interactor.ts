import bcrypt from "bcryptjs";
import { jwtService } from "../../infra/security/jwt-service.js";
import type { UserGateway } from "../gateway/user/user-gateway.js";
import { User } from "../domain/user/user.js";
import { randomUUID } from "node:crypto";

export class AuthInteractor {
  constructor(private userGateway: UserGateway) {}

  async login(email: string, password: string) {
    const user = await this.userGateway.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }

  async middleware(req: any, res: any, next: any) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Token not found" });
    }
    const user = jwtService.verify(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    next();
  }

  async register(name: string, email: string, password: string) {
    const user = await this.userGateway.findByEmail(email);
    if (user) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(randomUUID(), name, email, hashedPassword);
    return this.userGateway.create(newUser);
  }
}
