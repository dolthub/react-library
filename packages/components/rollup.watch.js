const rollup =require( "rollup");
const  {exec}  = require("child_process");
const resolve =require( "@rollup/plugin-node-resolve");
const commonjs =require( "@rollup/plugin-commonjs");
const typescript =require( "@rollup/plugin-typescript");
const { terser } =require( "rollup-plugin-terser");
const external =require( "rollup-plugin-peer-deps-external");
const { dts } =require( "rollup-plugin-dts");
const postcss =require( "rollup-plugin-postcss");
const packageJson = require("./package.json");
 
const watchOptions=[
    {
      input: "src/index.ts",
      output: [
        {
          file: packageJson.main,
          format: "cjs",
          sourcemap: true,
          name: "react-ts-lib",
        },
        {
          file: packageJson.module,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        external(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss({
          config: {
            path: "./postcss.config.js",
          },
          modules: {
            generateScopedName: "[folder]_[local]__[hash:base64:5]",
          },
          minimize: true,
          inject: {
            insertAt: "top",
          },
        }),
        terser(),
      ],
      // https://stackoverflow.com/questions/43556940/rollup-js-and-this-keyword-is-equivalent-to-undefined
      onwarn: function(warning, warn) {
        if (warning.code === 'THIS_IS_UNDEFINED') {
             return;
        }
         warn(warning);
    }
    },
    {
      input: "./types/index.d.ts",
      output: [{ file: "dist/index.d.ts", format: "esm" }],
      plugins: [dts()],
      external: [/\.css$/],
    },
  ];

  exec('yarn compile', (compileErr, compileStdout, compileStderr) => {
    if (compileErr) {
        console.error('Compilation error:', compileStderr);
        return; // Stop if compilation fails
    }
    console.log('Compilation completed:', compileStdout);

    const watcher = rollup.watch(watchOptions);

    watcher.on('event', event => {
        switch (event.code) {
            case 'START':
                console.log('The build started...');
                break;
            case 'BUNDLE_START':
                console.log(`Building ${event.input}...`);
                break;
            case 'BUNDLE_END':
                console.log(`Finished building ${event.input}.`);
                break;
            case 'END':
                console.log('Completed all builds.');
                exec('yalc publish', (err, stdout, stderr) => {
                    if (err) {
                        console.error('Error publishing to Yalc:', stderr);
                    } else {
                        console.log('Published to Yalc:', stdout);
                    }
                });
                break;
            case 'ERROR':
                console.error('Build error:', event.error);
                break;
            default:
                console.log(`Event: ${event.code}`);
                break;
        }
     
    });

    watcher.on('event', ({ result }) => {
        if (result) {
            result.close();
        }
    });
});
 