import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)

export async function confirmDelete() {
    return await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmation',
            message: 'Do you really want to delete the pictures?'
        }
    ]);
}

export async function selectDir(msg) {
    return await inquirer.prompt([{
        type: 'file-tree-selection',
        name: 'dir',
        message: msg,
        onlyShowDir: true
    }])
}