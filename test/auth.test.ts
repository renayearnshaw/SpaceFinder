import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import { AuthService } from './AuthService';

async function testAuth() {
  const authService = new AuthService();

  // Log the user in and retrieve a JWT ID token
  await authService.login('USER-NAME', 'PASSWORD');

  // const idToken = await authService.getIdToken();
  // console.log(idToken);

  // Get temporary AWS credentials for the user
  const temporaryCredentials = await authService.getTemporaryCredentials();
  // List all S3 buckets - the credentials should allow this because the user is in the admins group
  const buckets = await listBuckets(temporaryCredentials);
  console.log(buckets);
}

async function listBuckets(credentials: any) {
  const s3 = new S3Client({
    credentials,
  });
  const result = await s3.send(new ListBucketsCommand({}));
  return result;
}

testAuth();
