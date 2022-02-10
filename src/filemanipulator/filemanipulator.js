import fs from "fs";
import fsx from 'fs-extra'
import path from "path";
import {ImageDeletingFailedError, ImageMovingFailedError, NoImagesFoundError} from "../errorHandler/errorHandler.js";

const fsPromises = fs.promises;

const imageExtensions = [
    '.jpg', '.jpeg',
    '.png', '.svg'
]

async function readDir(path) {
    return await fsPromises.readdir(path);
}

export async function readAllImages(dirPath) {
    const files = await readDir(dirPath);

    const images = files.filter(file => imageExtensions.includes(path.extname(file)));
    if (images.length === 0) {
        throw new NoImagesFoundError();
    }

    return images;
}

export async function moveImages(images, path) {

    console.log(images, path);

    try {
        for (let image of images) {
            await fsx.move(image, `${path}/${image}`);
        }
    } catch (e) {
        throw new ImageMovingFailedError();
    }

}


export async function deleteImages(images) {

    console.log(images);
    try {
        for (let image of images) {
            await fsx.remove(image);
            console.log('Success deleting ' + image);
        }
    } catch (e) {
        throw new ImageDeletingFailedError();
    }

}