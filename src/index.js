#!/usr/bin/env node

import {Command} from "commander";
import convertImagesToPDF from "./generatePDF.js";

const program = new Command();

program
    .name('some-images-to-pdf')
    .version('0.2.0')

program
    .argument("[output]")
    .action((output) => {
        convertImagesToPDF(output)
            .catch((err) => {
                console.log(err)
            })
    })

program.parse()
