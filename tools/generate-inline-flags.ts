import { glob } from 'glob';
import { snakeCase } from 'lodash';
import { readFile, writeFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { optimize } from 'svgo';
import ts from 'typescript';

export const FLAG_ASSETS_DIR = './assets/svg';

function createFlagDeclaration(flagName: string, svg: string): ts.Node {
  return ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(snakeCase(flagName).toUpperCase()),
          undefined,
          undefined,
          ts.factory.createNoSubstitutionTemplateLiteral(svg.trim())
        ),
      ],
      ts.NodeFlags.Const
    )
  );
}

(async () => {
  const printer = ts.createPrinter();
  const sourceFile = ts.createSourceFile(
    'flags.ts',
    '',
    ts.ScriptTarget.ESNext
  );

  const filePaths = await glob('./assets/svg/*.svg');

  const output: string[] = [];

  for (const filePath of filePaths) {
    const file = await readFile(filePath);
    const fileName = basename(filePath, extname(filePath));

    const svg = optimize(file.toString());

    const node = createFlagDeclaration(fileName, svg.data);
    const content = printer.printNode(
      ts.EmitHint.Unspecified,
      node,
      sourceFile
    );

    output.push(content);
  }

  await writeFile('./tools/flags.ts', output.join('\n'));
})();
