# MongoDB Connection Troubleshooting Guide

## Issue: Database Connection Not Available in Vercel Deployment

### Symptoms

- Error: "Database connection not available. Please try again."
- Console shows: "Database not connected. ReadyState: 2"
- Works fine in localhost but fails in Vercel

### Root Causes & Solutions

#### 1. Environment Variables

**Problem**: MongoDB connection string not properly set in Vercel

**Solution**:

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Environment Variables" section
4. Add these variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   NODE_ENV=production
   ```

**Check**: Visit `/health` endpoint to verify environment variables are set

#### 2. MongoDB Atlas Configuration

**Problem**: IP whitelist restrictions

**Solution**:

1. Go to MongoDB Atlas dashboard
2. Navigate to Network Access
3. Add IP address: `0.0.0.0/0` (allows all IPs)
4. Or add Vercel's IP ranges if you want to be more restrictive

#### 3. Connection String Format

**Problem**: Incorrect connection string format

**Solution**:

- Use this format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
- Make sure to URL-encode special characters in password
- Verify username and password are correct

#### 4. Serverless Function Timeouts

**Problem**: Cold starts and connection timeouts

**Solution**:

- The code has been updated to handle serverless environments better
- Connection pooling settings optimized for Vercel
- Added connection state checks

### Debugging Steps

#### Step 1: Check Environment Variables

```bash
# Test locally with production environment
NODE_ENV=production node test-connection.js
```

#### Step 2: Test Connection String

```bash
# Use the test script
node test-connection.js
```

#### Step 3: Check Vercel Logs

1. Go to Vercel dashboard
2. Navigate to your deployment
3. Check "Functions" tab for error logs
4. Look for database connection errors

#### Step 4: Health Check

Visit: `https://your-backend.vercel.app/health`

Expected response:

```json
{
  "status": "ok",
  "database": {
    "status": "connected",
    "readyState": 1
  },
  "environment": {
    "hasMongoUri": true
  }
}
```

### Common Error Messages & Solutions

#### "ENOTFOUND"

- **Cause**: DNS resolution failed
- **Solution**: Check connection string format and network connectivity

#### "ECONNREFUSED"

- **Cause**: Connection refused by server
- **Solution**: Check IP whitelist in MongoDB Atlas

#### "Authentication failed"

- **Cause**: Wrong username/password
- **Solution**: Verify credentials in connection string

#### "buffering timed out"

- **Cause**: Network timeout
- **Solution**: Check internet connection and increase timeout values

### Prevention

1. **Always test with production environment locally**:

   ```bash
   NODE_ENV=production node test-connection.js
   ```

2. **Use environment-specific connection strings**:

   - Development: Local MongoDB
   - Production: MongoDB Atlas

3. **Monitor connection health**:

   - Regular health checks
   - Proper error logging

4. **Use connection pooling**:
   - Optimized for serverless environments
   - Reduced max connections for Vercel

### Quick Fix Checklist

- [ ] Environment variables set in Vercel
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] Connection string format is correct
- [ ] Username and password are correct
- [ ] MongoDB Atlas cluster is running (not paused)
- [ ] Test connection locally with production env vars
- [ ] Check Vercel function logs for errors
- [ ] Verify health endpoint returns connected status
