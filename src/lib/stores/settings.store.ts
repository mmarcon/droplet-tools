import { writable } from 'svelte/store'
import { browser } from '$app/environment';


type Settings = {
  doToken: string,
  defaultRootPassword?: string
}

let settingsObj: Settings = {
  doToken: ''
};

if (browser) {
  settingsObj = JSON.parse(localStorage.getItem('settings') || '{}');
}

export const settings = writable<Settings>(settingsObj);

if (browser) {
  settings.subscribe((value) => localStorage.settings = JSON.stringify(value));
}