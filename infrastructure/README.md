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

## After Deployment

1. Upload your `careerEvents.json` to the created S3 bucket:

```bash
aws s3 cp ../../data/careerEvents.json s3://YOUR_BUCKET_NAME/
```

2. Update your application's environment variables with the API endpoint and key.
