# Career Timeline Infrastructure

This directory contains the infrastructure as code (IaC) resources for the Career Timeline application.

## Architecture

The infrastructure uses AWS services to host a secure API for serving career timeline data:

- **Amazon S3**: Stores the career data in JSON format
- **AWS Lambda**: Retrieves and processes the data from S3
- **Amazon API Gateway**: Provides a secure REST API endpoint
- **AWS IAM**: Manages permissions between services

## Deployment

### Prerequisites

- AWS CLI installed and configured
- Proper AWS permissions to create the required resources

### Deploying the Stack

```bash
# Navigate to the infrastructure directory
cd infrastructure/cloudformation

# Deploy the stack
aws cloudformation create-stack \
  --stack-name career-timeline-api \
  --template-body file://career-timeline-api.yaml \
  --capabilities CAPABILITY_IAM

# Monitor stack creation
aws cloudformation describe-stack-events \
  --stack-name career-timeline-api

# Check stack outputs once deployed
aws cloudformation describe-stacks \
  --stack-name career-timeline-api \
  --query "Stacks[0].Outputs"
```

### Updating the Stack

```bash
aws cloudformation update-stack \
  --stack-name career-timeline-api \
  --template-body file://career-timeline-api.yaml \
  --capabilities CAPABILITY_IAM
```

### Deleting the Stack

```bash
aws cloudformation delete-stack \
  --stack-name career-timeline-api
```

### Personal Data Workflow

1. The `careerEvents.json` file should be kept in the `data/` directory but is excluded from git via `.gitignore`
2. Use the local upload script to directly update the S3 bucket with the data file

### Uploading Personal Data to S3

There is a dedicated script to upload the career data to S3 without going through GitHub:

```bash
# Install dependencies if you haven't already
yarn install

# Upload your personal data to S3
yarn upload-data

# If you need to specify a custom AWS profile
yarn upload-data -- --profile your-profile-name

# Additional options
yarn upload-data -- --help
```

## After Deployment

1. Update your application's environment variables with the API endpoint and key.
2. Upload your private `careerEvents.json` using the upload script described above.
