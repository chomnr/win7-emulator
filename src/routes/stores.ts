import { writable, type Writable } from 'svelte/store';
import type { ComputerProgram } from '../programs';
import { CommandStatus, type ConsoleCommand } from '../commands';

export const TogglableStartMenu = writable(false);

export const CurrentTime = writable('');
export const CurrentDate = writable('');

// Keeps track of the CMD content quantity.
export const CmdContentTracker = writable(1);

// Keep track of websocket connection for BruteExpoe Application
export const IsConnectedToBruteExpose = writable(false);

export interface IProgramManager {
    processes: ComputerProgram[];
    using: ComputerProgram | undefined;
    last: ComputerProgram | undefined;
}

/// Program Store
const ProgramStore = () => {
    const ProgramManager: IProgramManager = {
        processes: [],
        using: undefined,
        last: undefined,
    };

    const { subscribe, set, update } = writable(ProgramManager);

    return {
        subscribe,
        SetUsing: (program: ComputerProgram | undefined) =>
            update(({ using, ...updater }) => ({
                ...updater,
                using: program,
            })),
        SetLast: (lastProgram: ComputerProgram | undefined) =>
            update(({ last, ...updater }) => ({
                ...updater,
                last: lastProgram,
            })),
        AddProcess: (program: ComputerProgram) =>
            update(({ processes, ...updater }) => {
                if (processes.includes(program)) {
                    return { ...updater, processes: [...processes], using: program };
                } else {
                    return { ...updater, processes: [...processes, program], using: program };
                }
            }),
        CloseProcess: (program: ComputerProgram) =>
            update(({ processes, ...updater }) => ({
                ...updater,
                processes: processes.filter((remove) => remove !== program),
            })),
    };
};

// CommandStore (manages commands from the cmd)

export interface ICommandExecution {
    command: ConsoleCommand;
    status: CommandStatus;
}

export interface ICommandManager {
    execution: ICommandExecution | undefined;
    commands: ConsoleCommand[];
}

const CommandStore = () => {
    const CommandManager: ICommandManager = {
        execution: undefined,
        commands: [],
    };

    const { subscribe, set, update } = writable(CommandManager);
    return {
        subscribe,
        RegisterCommand: (program: ConsoleCommand) =>
            update(({ commands, ...updater }) => {
                if (commands.includes(program)) {
                    return { ...updater, commands: [...commands] }; // can remove.
                } else {
                    return { ...updater, commands: [...commands, program] };
                }
            }),
        SetExecution: (
            command: ConsoleCommand,
            status: CommandStatus, // could change to set.
        ) =>
            update(({ execution, ...updater }) => {
                return {
                    ...updater,
                    execution: { command: command, status: status },
                };
            }),
        UpdateExecutionStatus: (
            status: CommandStatus, // could change to set.
        ) =>
            update(({ execution, ...updater }) => {
                if (execution?.status == CommandStatus.FAILED && status == CommandStatus.FINISHED) {
                    return {
                        ...updater,
                        execution: {
                            command: execution.command,
                            status: CommandStatus.FAILED,
                        },
                    };
                }
                return {
                    ...updater,
                    execution: {
                        command: execution.command,
                        status: status,
                    },
                };
            }),
    };
};

export const CommandManager = CommandStore();
export const TaskManager = ProgramStore();
