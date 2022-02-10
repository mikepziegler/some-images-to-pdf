import moment from "moment";
import chalkAnimation from "chalk-animation"
import {createSpinner} from "nanospinner";

import {deleteImages, moveImages, readAllImages} from "./filemanipulator/filemanipulator.js";
import {convertImagesToPages, savePdf} from "./generator/generatePDF.js";
import {confirmDelete, selectDir} from "./cli-utils/prompts.js";

const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms))

export async function runOrchestrator(
    name = `generated-on-${moment().format('YYYY-MM-DD-HH-mm-ss')}`,
    moving = false, deleting = false, outputPath = false
) {

    const rainbow = chalkAnimation.rainbow("Welcome to Some-Images-To-PDF")

    await sleep();
    rainbow.stop();

    const spinner = createSpinner('Processing pictures...').start();

    try {
        if (deleting) {
            deleting = await confirmDelete();
            updateSpinner(spinner, 'Got Confirmation for deleting images after generation...');
        }

        let movingToPath = null;
        if (moving) {
            movingToPath = await selectDir('Where do you want to move the images?');
            updateSpinner(spinner, 'Got destination path for images to move...');
        }

        if (outputPath) {
            outputPath = await selectDir('Where do you want to output the generated PDF file?');
            updateSpinner(spinner, 'Got destination path for images to move...');
        }

        updateSpinner(spinner, 'Reading all images...');
        const images = await readAllImages(process.cwd());

        updateSpinner(spinner, 'Converting images to pages...');
        const pdf = await convertImagesToPages(images);

        updateSpinner(spinner, 'Saving generated pdf...');
        savePdf(pdf, outputPath === false ? name : `${outputPath.dir}/${name}`);

        if (moving && movingToPath !== null) {
            await moveImages(images, movingToPath.dir);
        }

        if (deleting.confirmation) {
            await deleteImages(images)
        }

        spinner.success({
            text: 'File has been generated'
        })
    } catch (err) {
        spinner.error({text: err.name});
        throw err;
    }
}


function updateSpinner(spinner, text) {
    spinner.update({
        text: text
    })
}