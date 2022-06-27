import {babel} from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'scales/scales-grade8.ts',
    output: {
        file: 'lib/scales-grade8.js'
    },
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        typescript()
    ]
};
