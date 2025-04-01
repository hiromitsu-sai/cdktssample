#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Environment } from 'aws-cdk-lib';
import * as dotenv from "dotenv";
import 'source-map-support/register';
import { CommonResourceStack } from '../lib/common-resource-stack';
import { SampleStack } from '../lib/sample-stack';

dotenv.config({ path: './cdk.env' });
if (process.env.APP_NAME == undefined || process.env.APP_NAME.length == 0) {
  throw new Error("Please set valiables to cdk.env file");
}
const app = new cdk.App();
const VALID_STAGES = ["dev", "prod"];
const stage = app.node.tryGetContext("env");
if (!VALID_STAGES.includes(stage)) {
  throw new Error("Please specify the context. i.e. `--context env=dev|prod`");
}
const env: Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
const appName = process.env.APP_NAME || "sampleapp";
const common = new CommonResourceStack(app, `${appName}-CommonResourceStack-${stage}`, {
  contextJson: process.env,
  env: env,
  stage: stage,
  appName: appName,
  logLevel: process.env.LOGLEVEL || "DEBUG",
});
const follow = new SampleStack(app, `${appName}-FollowFlowStack-${stage}`, common, { env });

app.synth();
