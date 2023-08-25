import { writable } from 'svelte/store';

export const TogglableStartMenu  = writable(false);

export const CurrentTime = writable("")
export const CurrentDate = writable("");