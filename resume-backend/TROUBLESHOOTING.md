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

#### "buffering timed out" or "Socket 'secureConnect' timed out"

- **Cause**: Network timeout or MongoDB Atlas connectivity issues
- **Solution**: 
  - Check MongoDB Atlas cluster is not paused
  - Add `0.0.0.0/0` to IP Access List in MongoDB Atlas
  - Increase timeout values in connection options
  - Check if your MongoDB Atlas cluster is in a different region
  - Try using a different network or VPN

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

### For Socket Timeout Issues (Your Current Problem)

If you're getting `Socket 'secureConnect' timed out` errors:

1. **Check MongoDB Atlas Cluster Status**:
   - Go to MongoDB Atlas dashboard
   - Ensure your cluster is not paused
   - Check if cluster is in maintenance mode

2. **Update IP Access List**:
   - Go to Network Access in MongoDB Atlas
   - Add `0.0.0.0/0` to allow all IPs
   - Or add Vercel's IP ranges if you prefer

3. **Test Connection String**:
   ```bash
   node test-mongo-atlas.js
   ```

4. **Check Connection String Format**:
   - Should start with `mongodb+srv://`
   - Include `retryWrites=true&w=majority`
   - URL-encode special characters in password

5. **Try Alternative Solutions**:
   - Use a different MongoDB Atlas cluster region
   - Check if your network has firewall restrictions
   - Try connecting from a different network

### For Login-Specific Issues (Your Current Problem)

If other routes work but login fails with "Database not connected":

1. **Root Cause**: Redundant database connection checks in login routes
2. **Solution**: Removed redundant checks from login routes
3. **Test**: Deploy the updated code and try login again

**What was fixed**:
- Removed `mongoose.connection.readyState` checks from login routes
- Middleware now handles all database connection management
- Login routes rely on middleware for connection state

**Test the fix**:
```bash
node test-login-fix.js
```
