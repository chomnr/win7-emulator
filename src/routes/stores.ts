import { writable } from 'svelte/store';
import type { ComputerProgram } from '../programs';

export const TogglableStartMenu  = writable(false);

export const CurrentTime = writable("")
export const CurrentDate = writable("");

export const ActiveWindows = writable<ComputerProgram[]>([]);