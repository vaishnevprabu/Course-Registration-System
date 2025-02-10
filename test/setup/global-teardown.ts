import { TestDataSource } from "../../src/test-data-source";

export default async function globalTeardown() {
  try {
    console.log("Running global teardown...");
    await TestDataSource.dropDatabase(); 
    await TestDataSource.destroy();
    console.log("Test database cleaned up.");
  } catch (error) {
    console.error("Error during global teardown:", error);
  }
}
