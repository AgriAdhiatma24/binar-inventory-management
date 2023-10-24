const db = require("./db.config");

async function runMigration() {
  try {
    await db.migrate.latest();
    console.log("Migrations completed successfully.");
    await db.seed.run();
    console.log("Seeds completed successfully.");
  } catch (error) {
    console.error("Error running migrations & seed:", error);
  }
}

async function rollbackMigration() {
  await db.migrate.rollback();
}

module.exports = { runMigration, rollbackMigration };
