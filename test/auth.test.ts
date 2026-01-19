import { AuthService } from './AuthService';

async function testAuth() {
  const authService = new AuthService();

  // Log the user in and retrieve a JWT ID token
  await authService.login('barneyearnshaw', 'o%z0&jOO2p@1H2J');

  const idToken = await authService.getIdToken();
  console.log(idToken);
}

testAuth();
