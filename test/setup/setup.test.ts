// test/setup/test-db.ts
import sequelizeConnection from '../../src/database'; // Import your Sequelize connection
import { QueryInterface } from 'sequelize';
import { spawn } from 'child_process';

const queryInterface = sequelizeConnection.getQueryInterface() as QueryInterface;

async function setupTestDatabase() {
  try {
    await sequelizeConnection.authenticate(); // Ensure the connection to the main database is working
    await queryInterface.dropAllTables();
    await queryInterface.dropAllEnums();

    // Create the test database and re-run migrations
    await queryInterface.createDatabase('test_database');
    await sequelizeConnection.sync();

    // Run seeders using Sequelize CLI command
    await runSeeders();

    // Additional setup code specific to your project
  } catch (error) {
    throw new Error(`Test database setup failed: ${error.message}`);
  }
}

async function teardownTestDatabase() {
  try {
    await queryInterface.dropDatabase('test_database');

    // Additional teardown code specific to your project
  } catch (error) {
    throw new Error(`Test database teardown failed: ${error.message}`);
  }
}

// Function to run seeders using Sequelize CLI command
function runSeeders() {
  return new Promise<void>((resolve, reject) => {
    const child = spawn('npx', ['sequelize', 'db:seed:all'], { shell: true });

    child.on('exit', (code) => {
      if (code === 0) {
        console.log('Seeders executed successfully');
        resolve();
      } else {
        console.error(`Seeders failed with exit code ${code}`);
        reject(new Error(`Seeders failed with exit code ${code}`));
      }
    });

    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    child.stderr.on('data', (data) => {
      console.error(data.toString());
    });
  });
}

export { setupTestDatabase, teardownTestDatabase };
