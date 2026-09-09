import * as commentJson from 'comment-json';
import execa from 'execa';
import fs from 'fs';
import path from 'path';
import * as prettier from 'prettier';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';

import { MonorepoFiles } from './constants.js';
import * as fsUtils from './fs-utils.js';
import type { PackageData } from './utils.js';
import { finalizeAndWriteData, readMonorepoFiles } from './utils.js';

// `utils.ts` imports `promises` as a named export, while this file uses the
// default export. Both must point at the same object, so assertions here see
// the calls made there.
vi.mock('fs', () => {
  const promises = {
    mkdir: vi.fn(),
    readFile: vi.fn(),
    writeFile: vi.fn(),
    stat: vi.fn(),
  };

  return { default: { promises }, promises };
});

vi.mock('execa', () => ({ default: vi.fn() }));

vi.mock('prettier', () => ({
  format: vi.fn(),
}));

vi.mock('./fs-utils.js', () => ({
  readAllFiles: vi.fn(),
  writeFiles: vi.fn(),
}));

describe('create-package/utils', () => {
  describe('readMonorepoFiles', () => {
    const tsConfig = JSON.stringify({
      references: [{ path: '../packages/foo' }],
    });
    const tsConfigBuild = JSON.stringify({
      references: [{ path: '../packages/foo' }],
    });
    const tsConfigLint = JSON.stringify({
      references: [{ path: '../packages/foo' }],
    });
    const packageJson = JSON.stringify({
      engines: { node: '>=18.0.0' },
    });

    it('should read the expected monorepo files', async () => {
      vi.mocked(fs.promises.readFile).mockImplementation(async (filePath) => {
        // `readFile` also accepts file handles, but this mock is only ever
        // called with paths.
        const fileName = path.basename(filePath as string);

        switch (fileName) {
          case MonorepoFiles.TsConfig:
            return tsConfig;
          case MonorepoFiles.TsConfigBuild:
            return tsConfigBuild;
          case MonorepoFiles.TsConfigLint:
            return tsConfigLint;
          case MonorepoFiles.PackageJson:
            return packageJson;
          default:
            throw new Error(`Unexpected file: ${fileName}`);
        }
      });

      const monorepoFileData = await readMonorepoFiles();

      expect(monorepoFileData).toStrictEqual({
        tsConfig: commentJson.parse(tsConfig),
        tsConfigBuild: commentJson.parse(tsConfigBuild),
        tsConfigLint: commentJson.parse(tsConfigLint),
        nodeVersions: '>=18.0.0',
      });
    });
  });

  describe('finalizeAndWriteData', () => {
    it('should write the expected files', async () => {
      const packageData: PackageData = {
        name: '@metamask/foo',
        description: 'A foo package.',
        directoryName: 'foo',
        nodeVersions: '>=18.0.0',
        currentYear: '2023',
      };

      const monorepoFileData = {
        tsConfig: {
          references: [{ path: './packages/bar' }],
        },
        tsConfigBuild: {
          references: [{ path: './packages/bar' }],
        },
        tsConfigLint: {
          references: [{ path: './packages/bar' }],
        },
        nodeVersions: '>=18.0.0',
      };

      vi.mocked(fs.promises.stat).mockImplementation(() => {
        const error = new Error('already exists');
        // @ts-expect-error This property is not part of the Error type
        error.code = 'ENOENT';
        throw error;
      });

      vi.mocked(fsUtils.readAllFiles).mockResolvedValueOnce({
        'src/index.ts': 'export default 42;',
        'src/index.test.ts': 'export default 42;',
        'mock1.file':
          'CURRENT_YEAR NODE_VERSIONS PACKAGE_NAME PACKAGE_DESCRIPTION PACKAGE_DIRECTORY_NAME',
        'mock2.file': 'CURRENT_YEAR NODE_VERSIONS PACKAGE_NAME',
        'mock3.file': 'PACKAGE_DESCRIPTION PACKAGE_DIRECTORY_NAME',
      });

      (prettier.format as Mock).mockImplementation((input) => input);

      await finalizeAndWriteData(packageData, monorepoFileData);

      // processTemplateFiles and writeFiles
      expect(fsUtils.readAllFiles).toHaveBeenCalledTimes(1);
      expect(fsUtils.readAllFiles).toHaveBeenCalledWith(
        expect.stringMatching(/\/package-template$/u),
      );

      expect(fsUtils.writeFiles).toHaveBeenCalledTimes(1);
      expect(fsUtils.writeFiles).toHaveBeenCalledWith(
        expect.stringMatching(/packages\/foo$/u),
        {
          'src/index.ts': 'export default 42;',
          'src/index.test.ts': 'export default 42;',
          'mock1.file': '2023 >=18.0.0 @metamask/foo A foo package. foo',
          'mock2.file': '2023 >=18.0.0 @metamask/foo',
          'mock3.file': 'A foo package. foo',
        },
      );

      // Writing monorepo files
      expect(fs.promises.writeFile).toHaveBeenCalledTimes(3);
      expect(prettier.format).toHaveBeenCalledTimes(3);
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringMatching(/tsconfig\.json$/u),
        JSON.stringify(
          {
            references: [
              { path: './packages/bar' },
              { path: './packages/foo' },
            ],
          },
          null,
          2,
        ),
      );
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringMatching(/tsconfig\.build\.json$/u),
        JSON.stringify(
          {
            references: [
              { path: './packages/bar' },
              { path: './packages/foo/tsconfig.build.json' },
            ],
          },
          null,
          2,
        ),
      );
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringMatching(/tsconfig\.lint\.json$/u),
        JSON.stringify(
          {
            references: [
              { path: './packages/bar' },
              { path: './packages/foo/tsconfig.lint.json' },
            ],
          },
          null,
          2,
        ),
      );

      // Postprocessing
      expect(execa).toHaveBeenCalledTimes(2);
      expect(execa).toHaveBeenCalledWith('yarn', ['install'], {
        cwd: expect.any(String),
      });
      expect(execa).toHaveBeenCalledWith('yarn', ['readme-content:update'], {
        cwd: expect.any(String),
      });
    });

    it('throws if the package directory already exists', async () => {
      const packageData: PackageData = {
        name: '@metamask/foo',
        description: 'A foo package.',
        directoryName: 'foo',
        nodeVersions: '20.0.0',
        currentYear: '2023',
      };

      const monorepoFileData = {
        tsConfig: {
          references: [{ path: './packages/bar' }],
        },
        tsConfigBuild: {
          references: [{ path: './packages/bar' }],
        },
        tsConfigLint: {
          references: [{ path: './packages/bar' }],
        },
        nodeVersions: '20.0.0',
      };

      // The package directory resolving means it already exists.
      vi.mocked(fs.promises.stat).mockResolvedValueOnce({} as fs.Stats);

      await expect(
        finalizeAndWriteData(packageData, monorepoFileData),
      ).rejects.toThrow(/^The package directory already exists:/u);

      expect(fs.promises.mkdir).not.toHaveBeenCalled();
      expect(fs.promises.writeFile).not.toHaveBeenCalled();
    });
  });
});
