#!/usr/bin/env node

/*
import { createSpinner } from "nanospinner";
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import * as fs from 'fs-extra'
*/

//import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';

//import { jsPDF } from 'jspdf';

/*

var getImageFromUrl = (url, callback) => {

}
*/

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))


async function welcome() {

    const packageName = `Some images to one pdf`;
    await figlet(packageName, (err, data) => {
        console.log(gradient.pastel.multiline(data))
        sleep();
        console.log(gradient.rainbow(process.cwd()));
    })

    /*
    const doc = new jsPDF();
    doc.addPage()
     */

}

await welcome()