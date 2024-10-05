const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/backend'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      additionalEntryPoints: [
        {
          entryName: 'migrate',
          entryPath: 'apps/backend/src/db/scripts/migrate.ts',
        },
        {
          entryName: 'refresh-schema',
          entryPath: 'apps/backend/src/db/scripts/refresh-schema.ts',
        },
        {
          entryName: 'seed',
          entryPath: 'apps/backend/src/db/scripts/seed.ts',
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '.env*',
          to: '[name][ext]',
        },
      ],
    }),
  ],
};
