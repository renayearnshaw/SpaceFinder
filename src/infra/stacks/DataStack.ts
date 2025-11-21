import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../utils/utils';

export class DataStack extends Stack {

  public readonly spacesTable: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.spacesTable = new Table(this, 'SpacesTable', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      tableName: `SpaceTable-${getSuffixFromStack(this)}`,
    });
  }
}
