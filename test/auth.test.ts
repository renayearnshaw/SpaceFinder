import { AuthService } from './AuthService';

async function testAuth() {
  const authService = new AuthService();

  // Log the user in and retrieve a JWT ID token
  await authService.login('USER-NAME', 'PASSWORD');

  const idToken = await authService.getIdToken();
  console.log(idToken);
}

testAuth();
