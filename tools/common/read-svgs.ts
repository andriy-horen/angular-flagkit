import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { SvgFile } from './types';

export async function readSourceSvg(globPath: string): Promise<SvgFile[]> {
  const filePaths = (await glob(globPath)).sort();
  const filePromises = filePaths.map((fpath) =>
    fs.readFile(fpath).then((data) => {
      // file name without extension
      const fileName = path.basename(fpath, path.extname(fpath));

      return {
        fileName,
        svg: data.toString('utf8'),
      };
    }),
  );

  const files = Promise.all<SvgFile>(filePromises);

  return files;
}
