#!/usr/bin/env node

import {Command} from "commander";
import chalk from "chalk";
import {runOrchestrator} from "./orchestrator.js";

const program = new Command();

program
    .name('some-images-to-pdf')
    .version('0.3.0')

program
    .argument("[output]")
    .option('--m [path]', 'Moves images to a folder')
    .option('--d', 'Deletes all images')
    .option('--o [path]', 'Outputs path in this path')
    .action((output, options) => {

        if (options.m === true && options.d === true) {
            console.error(chalk.redBright('Options --m and --delete cant be executed at the same time'))
            process.exit(1)
        }

        runOrchestrator(output, options.m, options.d, options.o)
            .then(() => {
            })
            .catch((err) => {
                console.log(err)
            })

    })

program.parse()
