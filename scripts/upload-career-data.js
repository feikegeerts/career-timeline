#!/usr/bin/env node

/**
 * This script uploads career data from your local machine to the S3 bucket
 * without going through GitHub, keeping your personal career data private.
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk'; // For colorful console output
import { program } from 'commander'; // For command line options
import { execSync } from 'child_process';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up command line options
program
  .name('upload-career-data')
  .description('Upload career data to S3 without going through GitHub')
  .option('-f, --file <path>', 'Path to career data JSON file', '../data/careerEvents.json')
  .option('-p, --profile <profile>', 'AWS profile to use', 'default')
  .option('-r, --region <region>', 'AWS region', 'eu-west-1') // Change this to your default region
  .parse(process.argv);

const options = program.opts();

async function uploadCareerData() {
  try {
    console.log(chalk.blue('🚀 Starting career data upload to S3...'));

    // Load the career data
    const filePath = path.resolve(__dirname, options.file);
    console.log(chalk.gray(`Reading data from ${filePath}`));

    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`❌ Error: File not found at ${filePath}`));
      process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Validate JSON
    try {
      JSON.parse(fileContent);
    } catch (e) {
      console.error(chalk.red(`❌ Error: Invalid JSON in ${filePath}`));
      console.error(e.message);
      process.exit(1);
    }

    console.log(chalk.green('✅ Career data file is valid JSON'));

    // Get S3 bucket name from CloudFormation outputs
    // You need to have AWS CLI installed and configured
    console.log(chalk.blue(`Using AWS profile: ${options.profile}`));

    // Set AWS_PROFILE environment variable for aws-cli commands
    process.env.AWS_PROFILE = options.profile;

    console.log(chalk.gray('Fetching S3 bucket name from CloudFormation stack...'));
    const stackOutput = execSync(
      `aws cloudformation describe-stacks --stack-name career-timeline-api --query "Stacks[0].Outputs" --region ${options.region}`,
      { encoding: 'utf-8' }
    );

    const outputs = JSON.parse(stackOutput);
    const s3Bucket = outputs.find(output => output.OutputKey === 'S3BucketName').OutputValue;

    if (!s3Bucket) {
      console.error(chalk.red('❌ Error: Could not find S3 bucket name in CloudFormation outputs'));
      process.exit(1);
    }

    console.log(chalk.blue(`Found S3 bucket: ${s3Bucket}`));

    // Upload to S3
    console.log(chalk.gray('Initializing S3 client...'));

    // Create S3 client with credentials from the profile
    const s3Client = new S3Client({
      region: options.region,
      credentials: fromIni({
        profile: options.profile,
      }),
    });

    console.log(chalk.gray('Uploading data to S3...'));

    // Create the command to upload the file
    const command = new PutObjectCommand({
      Bucket: s3Bucket,
      Key: 'careerEvents.json', // The name of the file in the S3 bucket
      Body: fileContent,
      ContentType: 'application/json',
    });

    // Execute the upload
    await s3Client.send(command);

    console.log(chalk.green('✅ Career data successfully uploaded to S3!'));
    console.log(chalk.gray(`Bucket: ${s3Bucket}`));
    console.log(chalk.gray('File: careerEvents.json'));
  } catch (error) {
    console.error(chalk.red('❌ Error uploading career data to S3:'));
    console.error(error);
    process.exit(1);
  }
}

uploadCareerData();
