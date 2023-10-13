// Handles commands that are executed inside the cmd.

import { delay } from './helper';
import { ProgramFilter } from './programs';
import { CmdContentTracker, CommandManager, TaskManager, WebsiteStage } from './routes/stores';
import { get } from 'svelte/store';

export enum CommandStatus {
    PENDING,
    FAILED,
    FINISHED,
}

export class ConsoleCommand {
    private command: string;
    private callback: (event: CommandEvent) => void;

    constructor(command: string, callback: (event: CommandEvent) => void) {
        this.command = command;
        this.callback = callback;
    }

    /**
     * Return the name of the command.
     *
     * @returns {string}
     */
    GetCommand(): string {
        return this.command;
    }

    /**
     * Get the callback from the command.
     */
    GetCallBack() {
        this.callback(new CommandEvent(this));
    }
}

class ConsoleCommandFilter {
    /**
     * Check if a command exists.
     * @param command
     * @returns
     */
    static Exist(command: string): Boolean {
        return commands.some((x) => x.GetCommand() == command);
    }

    /**
     * Find a command based on the command name
     * @param command
     * @returns ConsoleCommand
     */

    static Find(command: string): ConsoleCommand | undefined {
        return commands.find((x) => x.GetCommand().toLowerCase() == command.toLowerCase());
    }
}

export class CommandEvent {
    private input: HTMLElement | null;
    private result: HTMLElement | null;
    private command: ConsoleCommand;

    constructor(command: ConsoleCommand) {
        this.command = command;
        this.input = document.getElementById('cmd_input_' + (get(CmdContentTracker) - 1));
        this.result = document.getElementById('cmd_results_' + (get(CmdContentTracker) - 1));
    }

    /**
     * Display a message on the result.
     * @param appendWhat the text you want to add to the cmd_results
     */
    Append(appendWhat: string) {
        if (this.result != null) {
            this.result.innerHTML += appendWhat + '<br>';
        } else {
            console.log('element does not exist.');
        }
    }

    /**
     * Set command execution state to pending.
     */
    Pending() {
        CommandManager.SetExecution(this.command, CommandStatus.PENDING);
        this.input.disabled = true;
    }

    /**
     * Set command execution state to failed.
     */
    Failed() {
        CommandManager.SetExecution(this.command, CommandStatus.FAILED);
        CmdContentTracker.set(get(CmdContentTracker) + 1);
        this.input.focus();
        this.input.disabled = true;
    }

    /**
     * Called after everything is done. (creates a new input)
     */
    Finished() {
        let status: CommandStatus = get(CommandManager).execution.status;
        if (status != CommandStatus.FAILED) {
            CommandManager.UpdateExecutionStatus(CommandStatus.FINISHED);
            CmdContentTracker.set(get(CmdContentTracker) + 1);
            this.input.focus();
        }
        this.input.disabled = true;
    }
}

export class ConsoleCommandHelper {
    /*
     * Run a command and return its result.
     * @param command the command you want to run
     */

    static RunCommand(target: string) {
        if (ConsoleCommandFilter.Exist(target)) {
            var command = ConsoleCommandFilter.Find(target);
            command?.GetCallBack();
        } else {
            this.ForceOutput(
                "'" +
                    target +
                    "' is not recognized as an internal or external command, operable program or batch file.",
            );
        }
    }

    /**
     * Restart the input. does not clear. BUT RESTART.
     */
    private static RestartInput() {
        let input = document.getElementById('cmd_input_' + (get(CmdContentTracker) - 1));
        input.disabled = true;
        CmdContentTracker.set(get(CmdContentTracker) + 1);
        input.focus();
    }

    /**
     * Forces an output to the cmd.
     * @param string
     * @param message
     */
    private static ForceOutput(message: string) {
        var results = document.getElementById('cmd_results_' + (get(CmdContentTracker) - 1));
        results.innerHTML += message;
        this.RestartInput();
    }
}

// all the commands.
export const commands: ConsoleCommand[] = [
    new ConsoleCommand('help interface', (e) => {
        //injectx ie9 interface <-- good command name
        e.Pending();
        e.Append(
            'Tells cmd.exe what interface the webpage should display. Internet Explorer must be opened and unlocked in order to execute<br>',
        );
        e.Append('\n INTERFACE [ABOUT | TEST | TEST2]');
        e.Append('');
        e.Append('\n INTERFACE must have a parameter specified in order to work.\n');
        e.Append('');
        e.Finished();
    }),

    new ConsoleCommand('ovrs authenticate', async (e) => {
        let infoTag = "<span style='color: #0099cc'>[INFO]</span>";
        let successTag = "<span style='color: #00cc66'>[SUCCESS]</span>";
        let failedTag = "<span style='color: #cc0000'>[FAILED]</span>";

        if (get(WebsiteStage) == 3) {
            e.Append('<br>' + infoTag + ' Access has already been granted.');
            e.Finished();
            return;
        }

        let processes = get(TaskManager).processes;
        let ie9 = ProgramFilter.Find('ie9');
        let cmd = ProgramFilter.Find('cmd');

        e.Pending();
        WebsiteStage.set(1);
        e.Append('<br>' + infoTag + ' Welcome to Overseer GuardianX');
        e.Append('' + infoTag + ' Please enter your access key to proceed:');
        e.Append('<br>> Enter Access Key: **********');

        await delay(800);

        e.Append('<br>' + infoTag + ' Validating Access Key...');
        e.Append('' + successTag + ' Access key verified. Initiating GuardianX.');

        e.Append('<br>-- Initiate Access Request --<br>');
        e.Append('' + infoTag + ' To proceed, please provide the website address you want to access:');
        e.Append('> Enter Website Address: https://zeljko.me/<br>');
        e.Append('' + infoTag + ' Analyzing the target website...');
        await delay(1600);

        processes = get(TaskManager).processes;

        if (!processes.includes(ie9)) {
            e.Append('' + failedTag + ' failed to analyze target website.<br>');
            e.Failed();
            WebsiteStage.set(0);
            return;
        }

        e.Append('<br>-- Requesting Overseer Authorization --<br>');
        e.Append('' + infoTag + ' Connecting to Overseer Security Servers...');
        e.Append('' + successTag + ' Connection established.<br>');
        e.Append('' + infoTag + ' Requesting authorized access to https://zeljko.me/...');

        await delay(2000);

        e.Append('<br>-- Requesting Overseer Authorization --<br>');
        e.Append('' + infoTag + ' Connecting to Overseer Security Servers...<br>');
        e.Append('' + successTag + ' Authorization granted by Overseer.');
        await delay(2000);

        e.Append('<br>-- Overseer Verification --<br>');
        e.Append('' + infoTag + ' Waiting for Overseer system response...<br>');
        e.Append('' + successTag + ' Authorization granted by Overseer.');
        await delay(1500);

        e.Append('<br>-- Accessing the Website --<br>');
        e.Append('' + infoTag + ' Initiating access to https://zeljko.me/...<br>');

        await delay(3000);

        processes = get(TaskManager).processes;
        if (processes.includes(ie9)) {
            e.Append('' + successTag + ' Website access granted.<br>');
            e.Finished();
            if (!processes.includes(cmd)) {
                WebsiteStage.set(2);
                e.Failed();
            } else {
                WebsiteStage.set(3);
            }
        } else {
            e.Append('' + failedTag + ' Website access was not granted.<br>');
            e.Failed();
            WebsiteStage.set(0);
        }
    }),
];
