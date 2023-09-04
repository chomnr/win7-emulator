import { writable } from 'svelte/store';
import type { ComputerProgram } from '../programs';

export const TogglableStartMenu = writable(false);

export const CurrentTime = writable('');
export const CurrentDate = writable('');

export const ActiveWindows = writable<ComputerProgram[]>([]);
export const CurrentWindow = writable<ComputerProgram>();

export interface IProgramManager {
    processes: ComputerProgram[];
    using: ComputerProgram | undefined;
    last: ComputerProgram | undefined;
}

const ProgramStore = () => {
    const ProgramManger: IProgramManager = {
        processes: [],
        using: undefined,
        last: undefined,
    };

    const { subscribe, set, update } = writable(ProgramManger);

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

export const TaskManager = ProgramStore();
