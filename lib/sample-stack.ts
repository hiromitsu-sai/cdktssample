import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { CommonResourceStack } from './common-resource-stack';

export class SampleStack extends Stack {
  private readonly sampleLambda: lambda.DockerImageFunction;

  constructor(scope: Construct, id: string, commonResource: CommonResourceStack, props?: StackProps) {
    super(scope, id, props);
    this.sampleLambda = this.createSampleLambda(commonResource);
  }

  private createSampleLambda(commonResource: CommonResourceStack): lambda.DockerImageFunction {
    const name = `${this.stackName}-sample`;
    const code = lambda.DockerImageCode.fromImageAsset('.', {
      cmd: ['lambda.foo.handler'],
    });

    return new lambda.DockerImageFunction(this, name.toLowerCase(), {
      functionName: name,
      code,
      environment: {
        LOG_LEVEL: commonResource.loglevel,
        BUCKET_NAME: commonResource.sampleBucket.bucketName,  // S3バケット名 をCommonResourceから参照して環境変数として与える
      },
      timeout: Duration.seconds(60),
      memorySize: 256,
      retryAttempts: 0,
    });
  }

}
