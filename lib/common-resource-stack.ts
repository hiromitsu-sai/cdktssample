import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface CommonResourceStackProps extends cdk.StackProps {
  contextJson: any;
  stage: string;
  appName: string;
  logLevel: string;
}

export class CommonResourceStack extends cdk.Stack {
  public readonly stage: string;
  public readonly envVars: any;
  public readonly awsAccount: string;
  public readonly appName: string;
  public readonly loglevel: string;
  public readonly sampleBucket: s3.IBucket;

  constructor(scope: Construct, id: string, props: CommonResourceStackProps) {
    super(scope, id, props);

    this.stage = props.stage;
    this.envVars = props.contextJson;
    this.awsAccount = cdk.Stack.of(this).account;
    this.appName = props.appName;
    this.loglevel = props.logLevel;

    // リソースの作成
    this.loglevel = props.contextJson.log_level;
    this.sampleBucket = this.createSampleBucket();
  }

  private createSampleBucket(): s3.IBucket {
    const sampleBucketId = `${this.appName}-samplebucket-${this.stage}-${this.awsAccount}`.toLowerCase();
    return new s3.Bucket(this, sampleBucketId, { bucketName: sampleBucketId });
  }

}
