/* eslint-env node */

const sass = require('node-sass');
const path = require('path');
const globby = require('globby');
const { promisify } = require('util');
const _fs = require('fs');
const fs = _fs.promises;

const sassRender = promisify(sass.render);

const main = async (dir) => {
    const sassFiles = await globby([
        path.join(dir, '**', '*.scss'),
        `!${path.join(dir, '**', '_*.scss')}`
    ]);

    const sassOperations = sassFiles.map((file) => ({
        in: file,
        out: path.join(
            path.dirname(file),
            `${path.basename(file, '.scss')}.css`
        )
    }));

    const sassRenders = await Promise.all(
        sassOperations.map((file) =>
            sassRender({
                file: file.in
            }).then(async (res) => {
                await fs.writeFile(file.out, res.css);
                return file;
            })
        )
    );

    return sassRenders;
};

const modulesDir = path.resolve(__dirname, '..', 'src', 'modules');

main(modulesDir)
    .then((files) =>
        console.log(
            files
                .map((file) => `✅  Compiled ${file.in} -> ${file.out}`)
                .join('\n')
                .replace(new RegExp(modulesDir + '/', 'g'), '')
        )
    )
    .catch(console.error);
