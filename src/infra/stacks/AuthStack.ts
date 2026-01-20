import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { CfnUserPoolGroup, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { IdentityPool, UserPoolAuthenticationProvider } from 'aws-cdk-lib/aws-cognito-identitypool';
import { Construct } from 'constructs';

export class AuthStack extends Stack {
  public userPool: UserPool;
  private userPoolClient: UserPoolClient;
  private identityPool: IdentityPool;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createUserPool();
    this.createUserPoolClient();
    this.createAdminsGroup();
    this.createIdentityPool();
  }

  private createUserPool() {
    this.userPool = new UserPool(this, 'SpaceUserPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        username: true,
      },
    });

    new CfnOutput(this, 'SpaceUserPoolId', {
      value: this.userPool.userPoolId,
    });
  }

  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient', {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
    });
    new CfnOutput(this, 'SpaceUserPoolClientId', { value: this.userPoolClient.userPoolClientId });
  }

  private createAdminsGroup() {
    new CfnUserPoolGroup(this, 'SpaceAdmins', {
      groupName: 'admins',
      userPoolId: this.userPool.userPoolId,
    });
  }

  private createIdentityPool() {
    // Create an Identity Pool with two default roles: unauthenticated and authenticated
    this.identityPool = new IdentityPool(this, 'SpaceIdentityPool', {
      identityPoolName: 'SpaceIdentityPool',
      allowUnauthenticatedIdentities: true, // Optional: default is false
      authenticationProviders: {
        userPools: [
          new UserPoolAuthenticationProvider({
            userPool: this.userPool,
            userPoolClient: this.userPoolClient,
          }),
        ],
      },
    });
  }
}
