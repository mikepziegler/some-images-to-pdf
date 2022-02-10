import * as path from 'path';

import imageToBase64 from "image-to-base64/image-to-base64.js";
import sizeOf from "image-size";

import {jsPDF} from "jspdf";

const A4Properties = {
    width: 210,
    height: 297
}

export async function convertImagesToPages(images) {

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

    return pdf;
}

export async function savePdf(pdf, name) {
    pdf.save(name + '.pdf')
}