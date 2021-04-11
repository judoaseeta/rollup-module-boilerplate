import { config } from 'dotenv';
import json from '@rollup/plugin-json';
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
import pluginTypescript from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import * as path from "path";
import { 
    name,  
    version,
    license,
    author,
    module as pkgModule,
    devDependencies,
    dependencies,
    main
} from './package.json';

config();

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.scss','.css'];
const moduleName = name.replace(/^@.*\//, "");
const inputFileName = process.env.ENTRY;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${version}
   * Released under the ${license} license.
   */
`;
export default [
    // ES
    {
      input: inputFileName,
      output: [
        {
          file: pkgModule,
          format: "es",
          sourcemap: true,
          banner,
          exports: "named",
        },
      ],
      external: [
        ...Object.keys(dependencies || {}),
        ...Object.keys(devDependencies || {}),
      ],
      plugins: [
        json(),
        pluginTypescript({
          tsconfig: 'tsconfig.json'
        }),
        pluginNodeResolve(),
        pluginCommonjs(),
        babel({
          babelHelpers: "bundled",
          configFile: path.resolve(__dirname, ".babelrc.js"),
          extensions
        }),
        terser()
      ],
    },
  
    // CommonJS
    {
      input: inputFileName,
      output: [
        {
          file: main,
          format: "cjs",
          sourcemap: true,
          banner,
          exports: "default",
        },
      ],
      external: [
        ...Object.keys(dependencies || {}),
        ...Object.keys(devDependencies || {}),
      ],
      plugins: [
        json(),
        pluginNodeResolve(),
        pluginTypescript({
          tsconfig: 'tsconfig.json'
        }),
        pluginCommonjs(),
        babel({
          babelHelpers: "bundled",
          configFile: path.resolve(__dirname, ".babelrc.js"),
          extensions
        }),
        terser()
      ],
    },
  ];