import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,

  //collect coverage
  collectCoverage: false, // enables coverage
  coverageDirectory: "coverage", // specifies the output directory for the coverage reports
  collectCoverageFrom : [
    'rootDir>/src/**/*.ts' //specifies the files to include in the coverage
  ]

};

export default config;