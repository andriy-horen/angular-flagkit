import { camelCase, isString, snakeCase } from 'lodash';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { optimizeSvg } from './common/optimize-svg';
import { readSourceSvg } from './common/read-svgs';
import {
  createFlagUnionTypeAlias,
  createFlagVariableDeclaration,
  printTsNode,
} from './common/ts-factories';

const config = {
  flagUnionType: 'FlagName',
  widthCssProperty: '--ngx-flag-width',
  heightCssProperty: '--ngx-flag-height',
  widthDefaultValue: '21px',
  heightDefaultValue: '15px',
};

function getArgs(): { src: string; out: string } {
  const { values: args } = parseArgs({
    args: process.argv.slice(2),
    options: {
      src: {
        type: 'string',
      },
      out: {
        type: 'string',
      },
    },
  });

  assert.strictEqual(
    isString(args.src),
    true,
    `Expected 'src' argument to be svg sources path`,
  );
  assert.strictEqual(
    isString(args.out),
    true,
    `Expected 'out' argument to be output directory path`,
  );

  return { src: args.src!, out: args.out! };
}

(async () => {
  const args = getArgs();

  const flagNames = new Set<string>();
  const flags: string[] = [];

  const svgFiles = await readSourceSvg(args.src);
  for (const { fileName, svg } of svgFiles) {
    const flag = `${camelCase(fileName)}Flag`;
    flagNames.add(flag);

    const optimizedSvg = optimizeSvg(svg, {
      removeViewBox: false, // keep viewBox attribute in order to scale a svg
      removeDimensions: true, // remove width & height attributes,
      prefixIds: () => `flagkit_${snakeCase(fileName)}_`, // add a namespace to ensure ids do not collide,
      elementEnterVisitor: (node) => {
        if (node.name === 'svg') {
          node.attributes.style = `width:var(${config.widthCssProperty},${config.widthDefaultValue});height:var(${config.heightCssProperty},${config.heightDefaultValue});`;
        }
      },
    });

    const flagDeclaration = printTsNode(
      createFlagVariableDeclaration(flag, optimizedSvg.data),
    );
    flags.push(flagDeclaration);
  }

  const flagUnionType = printTsNode(
    createFlagUnionTypeAlias([...flagNames], config.flagUnionType),
  );

  if (!existsSync(args.out)) {
    await fs.mkdir(args.out, { recursive: true });
  }

  await fs.writeFile(path.join(args.out, 'flags.ts'), flags.join('\n'));
  await fs.writeFile(path.join(args.out, 'flagName.ts'), flagUnionType);

  console.log(`✅ Generated ts files with inlined svg in "${args.out}"`);
})();
