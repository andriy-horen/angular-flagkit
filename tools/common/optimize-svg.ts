import { PluginConfig, optimize } from 'svgo';
import { PluginInfo, XastElement, XastParent } from 'svgo/lib/types';

export interface OptimizeSvgOptions {
  removeViewBox: boolean;
  removeDimensions: boolean;
  prefixIds?: (node: XastElement, plugin: PluginInfo) => string;
  elementEnterVisitor?: (
    node: XastElement,
    parentNode: XastParent,
  ) => symbol | void;
}

const defaultOptions: OptimizeSvgOptions = {
  removeViewBox: true,
  removeDimensions: false,
};

export function optimizeSvg(svg: string, options = defaultOptions) {
  const plugins: PluginConfig[] = [
    {
      name: 'preset-default',
      params: {
        overrides: {
          ...(options.removeViewBox ? {} : { removeViewBox: false }),
        },
      },
    },
  ];

  if (options.removeDimensions) {
    plugins.push('removeDimensions');
  }

  if (options.prefixIds) {
    plugins.push({
      name: 'prefixIds',
      params: {
        delim: '',
        prefix: options.prefixIds,
      },
    });
  }

  if (options.elementEnterVisitor) {
    plugins.push({
      name: 'elementEnterVisitor',
      fn: () => ({
        element: {
          enter: options.elementEnterVisitor,
        },
      }),
    });
  }

  const optimizedSvg = optimize(svg, { plugins });

  return optimizedSvg;
}
