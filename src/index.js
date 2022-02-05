#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

import {jsPDF} from 'jspdf';
import imageToBase64 from "image-to-base64/image-to-base64.js";
import chalk from "chalk";
import {createSpinner} from "nanospinner";

import sizeOf from 'image-size';

const imageExtensions = [
    '.jpg', '.jpeg',
    '.png', '.svg'
]

const A4Properties = {
    width: 210,
    height: 297
}

async function convertImagesToPDF(name = 'generated') {

    console.log(chalk.yellowBright("Some images to one pdf"));
    const spinner = createSpinner('Processing pictures...').start();

    fs.readdir(process.cwd(), async (err, files) => {

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

        }

        pdf.save(name + '.pdf')
        spinner.success({text: `PDF has been successfully generated.`});
    })
}

await convertImagesToPDF()
    .catch((err) => {
        console.log(err)
    })
