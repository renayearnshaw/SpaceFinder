import { Fn, Stack } from "aws-cdk-lib";

// Uses CloudFormation intrinsic functions to extract a unique suffix from the stack id of a CloudFormation stack
// Example stack id: arn:aws:cloudformation:us-east-1:123456789012:stack/MyStackName/abcd1234-de56-7890-fgh1-23456789ijkl
// Breakdown of this is arn:aws:cloudformation:region:account:stack/STACK_NAME/UNIQUE-ID
// We want to get the suffix from the UNIQUE-ID, which is 23456789ijkl
export function getSuffixFromStack(stack: Stack){
    // Select the 2nd element of the array split by '/', which is the UNIQUE-ID
    const shortStackId = Fn.select(2, Fn.split('/', stack.stackId));
    // Select the 4th element of the array split by '-', which is the suffix
    const suffix = Fn.select(4, Fn.split('-', shortStackId));
    return suffix;
}