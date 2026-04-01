import bcrypt from "bcryptjs";
import { jwtService } from "../../infra/security/jwt-service.js";
import type { UserGateway } from "../gateway/user/user-gateway.js";
import { User } from "../domain/user/user.js";
import { randomUUID } from "node:crypto";
import { ApiError } from "../errors/api.js";

export class AuthInteractor {
  constructor(private userGateway: UserGateway) { }

  async login(email: string, password: string) {
    const user = await this.userGateway.findByEmail(email);
    if (!user) {
      throw new ApiError("Usuário ou senha inválidos", 403);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError("Usuário ou senha inválidos", 403);
    }
    const token = jwtService.sign({ id: user.id, email: user.email });
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }

  async middleware(req: any, res: any, next: any) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: "Token not found" });
      }
      const user = jwtService.verify(token);
      if (!user) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.headers.user = user;
      next();
    } catch (error: any) {
      return res.status(401).json({ error: error.message || "Invalid token" });
    }
  }

  async register(name: string, email: string, password: string) {
    const user = await this.userGateway.findByEmail(email);
    if (user) {
      throw new ApiError("E-mail já cadastrado", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(randomUUID(), name, email, hashedPassword);
    this.userGateway.create(newUser);
    const token = jwtService.sign({ id: newUser.id, email: newUser.email });
    return { token, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  }
}
