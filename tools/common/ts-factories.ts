import ts from 'typescript';

export function createFlagVariableDeclaration(
  name: string,
  svg: string,
): ts.Node {
  return ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(name),
          undefined,
          undefined,
          ts.factory.createNoSubstitutionTemplateLiteral(svg.trim()),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
}

export function createFlagUnionTypeAlias(
  flagTypes: string[],
  unionTypeName: string,
) {
  const unionTypeRef = ts.factory.createUnionTypeNode(
    flagTypes.map((ftype) =>
      ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(ftype)),
    ),
  );

  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier(unionTypeName),
    undefined,
    unionTypeRef,
  );
}

export function printTsNode(node: ts.Node) {
  const sourceFile = ts.createSourceFile(
    'source.ts',
    '',
    ts.ScriptTarget.ESNext,
  );
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const content = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);

  return content;
}
