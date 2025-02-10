import { TestDataSource } from "../../src/test-data-source";

export default async function globalSetup() {
  try {
    console.log("Running global setup...");
    await TestDataSource.initialize();
    await TestDataSource.runMigrations();
    console.log("Test database initialized and migrations applied.");
  } catch (error) {
    console.error("Error during global setup:", error);
    process.exit(1);
  }
}
