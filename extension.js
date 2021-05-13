// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const editJsonFile = require(`edit-json-file`)
const Timer = require('tiny-timer');
const file = editJsonFile(`./.vscode/settings.json`);//`vscode.workspace.workspaceFolders/`+
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
var pomodoro_active
var color

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//const file = editJsonFile(`/Users/g3n6i/project/.vscode/settings.json`);
	console.log('Congratulations, your extension "pomodoro-timer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pomodoro-timer.pomodoro-start', function () {
		// The code you place here will be executed every time your command is executed
		pomodoro_active = true;

		console.log(JSON.stringify(file))
		// console.log(getCurrentFolder())
		//console.log(file)

		// var workspace = vscode.workspace.workspaceFolders[0].uri.path
		// console.log(workspace)
		console.log('timer start')
		setTimeout(onDone, 5000);
		update();
		// Display a message box to the user
		// vscode.window.showInformationMessage('You’ve completed another Pomodoro. Reward yourself with a break.');
	});

	context.subscriptions.push(disposable);
}

function onDone(){
	pomodoro_active = false; 
	console.log('timer complete'); 
	vscode.window.showInformationMessage('You’ve completed another Pomodoro. Reward yourself with a break.');
	update()
}

function update(){
	if (pomodoro_active) color = "#3377DD";
	else color = "#333333";
	// file.set("workbench\\.colorCustomizations", {
	// 	"titleBar.activeBackground": color
	// });
	// file.save()
}

function getCurrentFolder(){
	return new Promise(async (resolve, reject) => {
		await vscode.commands.executeCommand('workbench.view.explorer').then( async () => {
			await vscode.commands.executeCommand('copyFilePath').then(async () => {
				try {
					await vscode.env.clipboard.readText().then((copyPath) => {
						try {
							if (fs.existsSync(copyPath)) {
								resolve(copyPath);
								return copyPath;
							}
						} catch (err) {
							reject(err);
							return undefined;
						}
					});
				} catch (err) {
					reject(err);
					return undefined;
				}
			});
		});
	});
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
