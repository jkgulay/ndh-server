import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const password = process.argv[2];
if (!password) {
  console.error("Usage: npm run hash-password -- <password>");
  process.exit(1);
}

bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
  console.log("\nAdd this to your .env as ADMIN_PASSWORD_HASH:\n");
  console.log(hash);
  console.log();
});
