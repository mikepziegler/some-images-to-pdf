#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from "nanospinner";


console.log(chalk.bgGreen('hallo'))

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {

    const packageName = `Hallo`;
    figlet(packageName, (err, data) => {
        console.log(data)
    })

    /*
    const rainbowTitle = chalkAnimation.rainbow('')

    await sleep();
    rainbowTitle.stop();


    */

}

await welcome()