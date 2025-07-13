# Resume Management Backend

## Environment Variables Required

For the backend to work properly on Vercel, you need to set the following environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **MONGO_URI** - Your MongoDB Atlas connection string
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

2. **AWS_ACCESS_KEY_ID** - Your AWS Access Key ID
   ```
   AKIAIOSFODNN7EXAMPLE
   ```

3. **AWS_SECRET_ACCESS_KEY** - Your AWS Secret Access Key
   ```
   wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   ```

4. **AWS_S3_BUCKET_NAME** - Your S3 bucket name
   ```
   resume-uploads-your-name
   ```

5. **AWS_REGION** - Your AWS region (optional, defaults to us-east-1)
   ```
   us-east-1
   ```

6. **FRONTEND_URL** - Your frontend URL (optional, for CORS)
   ```
   https://your-frontend-domain.vercel.app
   ```

7. **SERVER_BASE_URL** - Your backend URL (optional)
   ```
   https://your-backend-domain.vercel.app
   ```

## How to Set Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your backend project
3. Go to "Settings" → "Environment Variables"
4. Add each variable with its value
5. Redeploy your application

## Important Notes:

### MongoDB Atlas Setup:

1. Make sure your MongoDB Atlas cluster allows connections from all IPs (0.0.0.0/0)
2. Or add Vercel's IP ranges to your whitelist
3. Use the connection string from your Atlas dashboard

### AWS S3 Setup:

1. **Create AWS Account** (free tier available)
2. **Create S3 Bucket**:
   - Go to AWS S3 Console
   - Create bucket named `resume-uploads-[your-name]`
   - Set region (choose closest to your users)
   - Enable public access (we control access via IAM)

3. **Create IAM User**:
   - Go to AWS IAM Console
   - Create user with S3 access
   - Attach policy: `AmazonS3FullAccess` (or create custom policy)
   - Generate Access Key and Secret Key

4. **Bucket Policy** (for public read access):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

### File Uploads:

- Files are uploaded to AWS S3 for persistent storage
- Files are publicly accessible via URLs
- File metadata is stored in MongoDB
- Supports resume download and viewing

### Deployment:

- The application is configured for Vercel serverless deployment
- All file operations use memory storage
- Database operations are optimized for serverless environment

## Local Development:

1. Create a `.env` file in the root directory
2. Add the environment variables listed above
3. Run `npm install`
4. Run `npm start` or `npm run dev`

## API Endpoints:

- `POST /api/recruiters/login` - Recruiter login
- `POST /api/team-leaders/login` - Team leader login
- `POST /api/candidates` - Create new candidate
- `POST /api/candidates/upload` - Upload resume (memory storage)
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job
- And more...

## Troubleshooting:

### MongoDB Connection Issues:

- Check if your MONGO_URI is correct
- Ensure your Atlas cluster allows connections from all IPs
- Verify your database user has proper permissions

### File Upload Issues:

- Files are processed in memory only
- No persistent storage in serverless environment
- Consider cloud storage for production use
