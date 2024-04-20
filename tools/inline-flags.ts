import { glob } from 'glob';
import { isString, snakeCase } from 'lodash';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { optimize } from 'svgo';
import ts from 'typescript';

const FLAG_UNION_NAME = 'FlagType';
type FlagSvg = { name: string; svg: string };

function createFlagVariableDeclaration({ name, svg }: FlagSvg): ts.Node {
  return ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(name),
          undefined,
          undefined,
          ts.factory.createNoSubstitutionTemplateLiteral(svg.trim())
        ),
      ],
      ts.NodeFlags.Const
    )
  );
}

function createFlagUnionTypeAlias(flagTypes: string[], unionTypeName: string) {
  const unionTypeRef = ts.factory.createUnionTypeNode(
    flagTypes.map((ftype) =>
      ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(ftype))
    )
  );

  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier(unionTypeName),
    undefined,
    unionTypeRef
  );
}

async function readSourceSvg(globPath: string) {
  const filePaths = await glob(globPath);
  const filePromises = filePaths.map((fpath) =>
    fs.readFile(fpath).then((data) => {
      const fileName = path.basename(fpath, path.extname(fpath));
      const name = snakeCase(fileName).toUpperCase();

      return {
        name,
        svg: data.toString('utf8'),
      };
    })
  );

  const files = Promise.all<FlagSvg>(filePromises);
  return files;
}

function printTsNode(node: ts.Node) {
  const sourceFile = ts.createSourceFile(
    'source.ts',
    '',
    ts.ScriptTarget.ESNext
  );
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const content = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);

  return content;
}

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
    `Expected 'src' argument to be svg sources path`
  );
  assert.strictEqual(
    isString(args.out),
    true,
    `Expected 'out' argument to be output directory path`
  );

  return { src: args.src!, out: args.out! };
}

(async () => {
  const args = getArgs();

  const flagNames = new Set<string>();
  const flags: string[] = [];

  const svgFiles = await readSourceSvg(args.src);
  for (const { name, svg } of svgFiles) {
    flagNames.add(name);
    const optimizedSvg = optimize(svg);
    const flagDeclaration = printTsNode(
      createFlagVariableDeclaration({
        name,
        svg: optimizedSvg.data,
      })
    );
    flags.push(flagDeclaration);
  }

  const flagUnionType = printTsNode(
    createFlagUnionTypeAlias([...flagNames], FLAG_UNION_NAME)
  );

  if (!existsSync(args.out)) {
    await fs.mkdir(args.out, { recursive: true });
  }

  await fs.writeFile(path.join(args.out, 'flags.ts'), flags.join('\n'));
  await fs.writeFile(path.join(args.out, 'flagType.ts'), flagUnionType);

  console.log(`✅ Generated ts files with inlined svg in "${args.out}"`);
})();