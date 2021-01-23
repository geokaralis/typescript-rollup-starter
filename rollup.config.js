import typescript from '@rollup/plugin-typescript';
import run from '@rollup/plugin-run';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const dev = process.env.ROLLUP_WATCH === 'true';
const prod = !dev;

const external = Object.keys(pkg.dependencies).concat(['path', 'fs', 'fs/promises', 'typescript']);

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({ sourceMap: false }),
    prod && terser(),
    dev && run()
  ],
  external,
  output: [
    { format: 'cjs', file: pkg.main, exports: 'auto' },
    prod && { format: 'esm', file: pkg.module }
  ]
};
