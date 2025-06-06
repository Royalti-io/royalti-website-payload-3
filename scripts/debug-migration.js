import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple debug script to check if the XML file exists and can be read
console.log('Debug script running...');

try {
  // Check if the XML file exists
  const xmlFilePath = path.join(__dirname, 'royaltiio.WordPress.2025-06-06.xml');
  console.log(`Checking if XML file exists at: ${xmlFilePath}`);
  
  const fileExists = fs.existsSync(xmlFilePath);
  console.log(`XML file exists: ${fileExists}`);
  
  if (fileExists) {
    // Try to read the first 500 characters to confirm it's accessible
    const data = fs.readFileSync(xmlFilePath, 'utf8').substring(0, 500);
    console.log('Successfully read XML file. First 500 characters:');
    console.log(data);
  }
  
  // Check the logs directory
  const logsDir = path.join(__dirname, '../logs');
  console.log(`Checking logs directory: ${logsDir}`);
  
  const logsDirExists = fs.existsSync(logsDir);
  console.log(`Logs directory exists: ${logsDirExists}`);
  
  // List files in logs directory if it exists
  if (logsDirExists) {
    const files = fs.readdirSync(logsDir);
    console.log('Files in logs directory:');
    console.log(files);
    
    // Check if migration.log exists and read it
    const migrationLogPath = path.join(logsDir, 'migration.log');
    if (fs.existsSync(migrationLogPath)) {
      const logData = fs.readFileSync(migrationLogPath, 'utf8');
      console.log('Content of migration.log:');
      console.log(logData.length > 1000 ? logData.substring(0, 1000) + '...' : logData);
    } else {
      console.log('Migration log file does not exist');
    }
  }
  
  console.log('Debug script completed successfully');
} catch (error) {
  console.error('Error in debug script:', error);
}
