import * as fs from 'fs';
import * as path from 'path';

import chalk from "chalk";
import imageToBase64 from "image-to-base64/image-to-base64.js";
import sizeOf from "image-size";

import {createSpinner} from "nanospinner";
import {jsPDF} from "jspdf";

import cliProgress from 'cli-progress'

const imageExtensions = [
    '.jpg', '.jpeg',
    '.png', '.svg'
]

const A4Properties = {
    width: 210,
    height: 297
}

export default async function convertImagesToPDF(name = 'generated') {

    console.log(chalk.yellowBright("Some images to one pdf"));

    fs.readdir(process.cwd(), async (err, files) => {

        const spinner = createSpinner('Processing pictures...').start();
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);

        if (err) {
            spinner.error({text: err});
            spinner.stop();
            throw new Error(err);
        }

        const images = files.filter(file => imageExtensions.includes(path.extname(file)))
        if (images.length === 0) {
            spinner.error({text: ''})
            spinner.stop();
            throw new Error(`No images in folder. Be sure that folder contains images/ files with those extensions: ${imageExtensions.join(' ')} `);
        }

        bar.start(images.length, 0)
        const pdf = new jsPDF();

        for (let [index, image] of images.entries()) {
            if (index > 0) pdf.addPage()

            const ext = path.extname(image).substring(1);
            const base64 = await imageToBase64(image);
            const dimensions = await sizeOf(image);

            const ratio = dimensions.height / dimensions.width;
            let width = A4Properties.width,
                height = ratio * A4Properties.width;

            pdf.addImage(base64, ext, 0, 0, width, height);

            bar.increment();
        }

        pdf.save(name + '.pdf')
        bar.stop();
        spinner.success({text: `${name}.pdf has been successfully generated.`});

    })
}