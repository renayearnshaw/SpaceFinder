import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { CfnUserPoolGroup, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import {
  IdentityPool,
  IdentityPoolProviderUrl,
  RoleMappingMatchType,
  UserPoolAuthenticationProvider,
} from 'aws-cdk-lib/aws-cognito-identitypool';
import { CfnRole, Effect, FederatedPrincipal, PolicyStatement, Role } from 'aws-cdk-lib/aws-iam';
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
    this.createIdentityPoolWithRoles();
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

  private createIdentityPoolWithRoles() {
    // Create an admin role with a generic principal, without conditions.
    // We'll lock it down when we have the identity pool id.
    const adminRole = new Role(this, 'CognitoSpaceAdminRole', {
      assumedBy: new FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {}, // Empty conditions for now
        'sts:AssumeRoleWithWebIdentity'
      ),
    });

    // Create an Identity Pool with two default roles (unauthenticated and authenticated)
    // and an admin role mapped to the admins group.
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
      // If the user is in the user pool's 'admins' group, they will be mapped to the admin role.
      roleMappings: [
        {
          // CloudFormation keys must be static strings and available at compile time
          mappingKey: 'adminsMapping',
          providerUrl: IdentityPoolProviderUrl.userPool(this.userPool, this.userPoolClient),
          rules: [
            {
              claim: 'cognito:groups',
              claimValue: 'admins',
              // Use CONTAINS to handle the ["admins"] array format
              matchType: RoleMappingMatchType.CONTAINS,
              mappedRole: adminRole,
            },
          ],
        },
      ],
    });

    // After the identityPool is created, we overwrite the role's trust policy
    // using the actual identityPoolId.
    if (adminRole.assumeRolePolicy) {
      (adminRole.node.defaultChild as CfnRole).assumeRolePolicyDocument = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { Federated: 'cognito-identity.amazonaws.com' },
            Action: 'sts:AssumeRoleWithWebIdentity',
            Condition: {
              StringEquals: {
                'cognito-identity.amazonaws.com:aud': this.identityPool.identityPoolId,
              },
              'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'authenticated' },
            },
          },
        ],
      };
    }

    // Add an inline policy to the admin role to allow listing all S3 buckets
    adminRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:ListAllMyBuckets'],
        resources: ['*'],
      })
    );
  }
}
