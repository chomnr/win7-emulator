import { writable, type Writable } from 'svelte/store';
import type { ComputerProgram } from '../programs';
import type { CommandStatus, ConsoleCommand } from '../commands';

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
    command: ComputerProgram;
    status: CommandStatus;
}

export interface ICommandManager {
    executions: ICommandExecution[];
    commands: ConsoleCommand[];
}

const CommandStore = () => {
    const CommandManager: ICommandManager = {
        executions: [],
        commands: [],
    };

    const { subscribe, update } = writable(CommandManager);

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
        AddExecution: (execution: ICommandExecution) =>
            update(({ executions, ...updater }) => {
                return { ...updater, executions: [...executions, execution] };
            }),
    };
};

export const CommandManager = CommandStore();
export const TaskManager = ProgramStore();
