import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

const config = [
  {
    input: 'src/main.ts',
    external: [],
    plugins: [typescript()],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
  {
    input: './dist/src/main.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [
      dts(),
      del({ targets: ['dist/src', 'dist/test/'], hook: 'buildEnd' }),
    ],
  },
];

export default config;
