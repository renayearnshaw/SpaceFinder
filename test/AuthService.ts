// You need to set these environment variables for the lambda function to run locally using ts-node

import { Amplify } from 'aws-amplify';
import { fetchAuthSession, signIn } from 'aws-amplify/auth';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-west-1_akdRDBmbc',
      userPoolClientId: '60agjoa30tt8gi1kc8q7fgks2h',
    },
  },
});

// Sign a user into Cognito - the user must have been created externally of the app
// within the AWS Cognito User Pool specified above
export class AuthService {
  public async login(username: string, password: string) {
    const signInResult = await signIn({
      username,
      password,
      options: {
        authFlowType: 'USER_PASSWORD_AUTH',
      },
    });
    return signInResult;
  }

  // ** Call only after login **
  // Establilsh an authenticated session for the logged in user and 
  // retrieve the JWT ID token issued by Cognito.
  // This token represents the user’s authenticated identity
  public async getIdToken() {
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
  }
}
