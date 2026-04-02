import { type MigrationInterface, type QueryRunner } from "typeorm";

export class InitialSchema1740787200000 implements MigrationInterface {
    name = "InitialSchema1740787200000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // USERS
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name varchar NOT NULL,
            email varchar NOT NULL UNIQUE,
            password varchar NOT NULL,
            created_at timestamp NOT NULL DEFAULT now()
        );
        `);

        // CATEGORIES
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS categories (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name text NOT NULL,
            user_id uuid,
            is_default boolean NOT NULL DEFAULT false,
            created_at timestamp NOT NULL DEFAULT now(),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `);

        // índice único para categorias de usuário
        await queryRunner.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS unique_user_categories
        ON categories (name, user_id)
        WHERE user_id IS NOT NULL;
        `);

        //  índice único para categorias globais
        await queryRunner.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS unique_default_categories
        ON categories (name)
        WHERE user_id IS NULL;
        `);

        // SEED (idempotente)
        await queryRunner.query(`
        INSERT INTO categories (name, is_default, created_at)
        VALUES
            ('Alimentação', true, NOW()),
            ('Transporte', true, NOW()),
            ('Moradia', true, NOW()),
            ('Contas', true, NOW()),
            ('Saúde', true, NOW()),
            ('Educação', true, NOW()),
            ('Lazer', true, NOW()),
            ('Compras', true, NOW()),
            ('Assinaturas', true, NOW()),
            ('Impostos', true, NOW()),
            ('Dívidas', true, NOW()),
            ('Salário', true, NOW()),
            ('Freelance', true, NOW()),
            ('Investimentos', true, NOW()),
            ('Presente', true, NOW()),
            ('Reembolso', true, NOW()),
            ('Outros', true, NOW())
        ON CONFLICT DO NOTHING;
        `);

        // TRANSACTIONS
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS transactions (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id uuid NOT NULL,
            category_id uuid,
            amount numeric(10, 2) NOT NULL,
            description text,
            "date" date NOT NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            type text NOT NULL CHECK (type IN ('income', 'expense')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        );
        `);

        // GOALS
        await queryRunner.query(`
        CREATE TABLE goals (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id uuid NOT NULL,
            name text NOT NULL,
            target_amount numeric(10, 2) NOT NULL,

            start_date date NOT NULL DEFAULT CURRENT_DATE,
            deadline date NOT NULL,

            category_id uuid,
            created_at timestamp NOT NULL DEFAULT now(),

            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
         );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ⚠️ cuidado: isso apaga tudo
        await queryRunner.query(`DROP TABLE IF EXISTS goals`);
        await queryRunner.query(`DROP TABLE IF EXISTS transactions`);
        await queryRunner.query(`DROP TABLE IF EXISTS categories`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
}