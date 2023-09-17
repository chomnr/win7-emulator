// Handles commands that are executed inside the cmd.

import { ProgramFilter } from './programs';
import { CmdContentTracker, CommandManager } from './routes/stores';
import { get } from 'svelte/store';

export enum CommandStatus {
    PENDING,
    FAILED,
    ACCEPTED,
}

export class ConsoleCommand {
    private command: string;
    private callback: (event: CommandEvent) => {};

    constructor(command: string, callback: (event: CommandEvent) => {}) {
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
        this.callback(new CommandEvent());
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
    private result: HTMLElement | null;

    constructor() {
        this.result = document.getElementById('cmd_results_' + (get(CmdContentTracker) - 1));
        console.log(this.result);
    }

    Append(appendWhat: string) {
        if (this.result != null) {
            console.log(appendWhat);
            this.result.innerHTML += appendWhat;
        } else {
            console.log('element does not exist.');
        }
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
     * Forces an output to the cmd.
     * @param string
     * @param message
     */
    private static ForceOutput(message: string) {
        var results = document.getElementById('cmd_results_' + (get(CmdContentTracker) - 1));
        results.innerHTML += message;
    }
}

// all the commands.
export const commands: ConsoleCommand[] = [
    new ConsoleCommand('ping', (e) => {
        e.Append('hellot here!<br>');
        return CommandStatus.PENDING;
    }),
    new ConsoleCommand('foolme', (e) => {
        e.Append('FOOL DUDE!<br>');
        return CommandStatus.PENDING;
    }),
];
