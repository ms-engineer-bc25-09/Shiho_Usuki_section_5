import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

// ✅ .env ファイルを手動で読み込む
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // ✅ 直接 process.env から読む
    url: process.env.DATABASE_URL!,
  },
});
