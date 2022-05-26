-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "nick_name" TEXT DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "avatar" TEXT DEFAULT '',
    "roles" TEXT NOT NULL DEFAULT 'moderator',
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME
);
INSERT INTO "new_User" ("avatar", "created_at", "email", "hashedPassword", "id", "nick_name", "password", "resetToken", "resetTokenExpiresAt", "roles", "salt", "updated_at", "user_name") SELECT "avatar", "created_at", "email", "hashedPassword", "id", "nick_name", "password", "resetToken", "resetTokenExpiresAt", "roles", "salt", "updated_at", "user_name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
