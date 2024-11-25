import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // "^.+\\.svg$": "jest-transformer-svg", // if this is needed later
  }
};

export default config;
