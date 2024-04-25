import { snakeCase } from 'lodash';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { optimizeSvg } from './common/optimize-svg';
import { readSourceSvg } from './common/read-svgs';
import { SvgFile } from './common/types';

const ASSETS_DIR = './projects/angular-flagkit-demo/src/assets';
const config = {
  sourcePackages: [
    {
      name: 'svg-country-flags',
      src: './node_modules/svg-country-flags/svg/*.svg',
      outDir: `${ASSETS_DIR}/svg-country-flags`,
    },
    {
      name: 'flag-icons',
      src: './node_modules/flag-icons/flags/4x3/*.svg',
      outDir: `${ASSETS_DIR}/flag-icons`,
    },
  ],
};

(async () => {
  for (const pkg of config.sourcePackages) {
    const svgs = await readSourceSvg(pkg.src);

    const optimizedSvg: SvgFile[] = svgs.map(({ fileName, svg }) => {
      const optimized = optimizeSvg(svg, {
        removeDimensions: true,
        removeViewBox: true,
        prefixIds: () => `${snakeCase(pkg.name)}_${snakeCase(fileName)}_`,
      });

      return { fileName, svg: optimized.data };
    });

    if (!existsSync(pkg.outDir)) {
      await fs.mkdir(pkg.outDir, { recursive: true });
    }

    const files = optimizedSvg.map(({ fileName, svg }) => {
      const outputPath = path.join(pkg.outDir, `${fileName}.svg`);

      return fs.writeFile(outputPath, svg);
    });

    await Promise.all(files);
    console.log(
      `✅ Optimized and copied ${svgs.length} files from "${pkg.name}"`,
    );
  }
})();
