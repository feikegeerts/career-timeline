/**
 * Script to fetch API URL from CloudFormation and update .env.local file
 * Run this script before starting local development to ensure API URL is up-to-date
 */

import { CloudFormationClient, DescribeStacksCommand } from '@aws-sdk/client-cloudformation';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const STACK_NAME = 'career-timeline-api';
const ENV_FILE_PATH = path.join(__dirname, '..', '.env.local');
const ENV_VAR_NAME = 'VITE_PUBLIC_API_URL';

async function main() {
  try {
    console.log('Fetching API URL from AWS CloudFormation...');

    // Create CloudFormation client
    const cloudFormationClient = new CloudFormationClient();

    // Fetch stack outputs
    const command = new DescribeStacksCommand({
      StackName: STACK_NAME,
    });

    const response = await cloudFormationClient.send(command);

    // Find the API endpoint output
    const apiEndpointOutput = response.Stacks[0].Outputs.find(
      output => output.OutputKey === 'ApiEndpoint'
    );

    if (!apiEndpointOutput || !apiEndpointOutput.OutputValue) {
      throw new Error('API Endpoint not found in CloudFormation outputs');
    }

    const apiUrl = apiEndpointOutput.OutputValue;
    console.log(`Retrieved API URL: ${apiUrl}`);

    // Read existing .env.local file or create it if it doesn't exist
    let envContent = '';
    let existingVars = {};

    try {
      if (fs.existsSync(ENV_FILE_PATH)) {
        envContent = fs.readFileSync(ENV_FILE_PATH, 'utf8');
        existingVars = dotenv.parse(envContent);
      }
    } catch (error) {
      console.log('No existing .env.local file found, will create new one.');
    }

    // Check if API URL has changed
    if (existingVars[ENV_VAR_NAME] === apiUrl) {
      console.log('API URL in .env.local is already up-to-date, no changes needed.');
      return;
    }

    // Update or add the API URL
    existingVars[ENV_VAR_NAME] = apiUrl;

    // Convert back to env file format
    const newEnvContent = Object.entries(existingVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Write updated content back to file
    fs.writeFileSync(ENV_FILE_PATH, newEnvContent);

    console.log(`.env.local file has been updated with the latest API URL.`);
  } catch (error) {
    console.error('Error updating API URL:', error);
    process.exit(1);
  }
}

main();
