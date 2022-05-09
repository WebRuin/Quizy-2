import { writable } from 'svelte/store';

export const score = writable(0);
export const questionNumber = writable(1);
export const category = writable("...");
export const difficulty = writable("...");