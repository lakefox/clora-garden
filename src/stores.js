import { readable, writable } from 'svelte/store';

export const selectedMenuOption = writable(0);

export const menuOptions = readable([
    {
        name: "Dashboard",
        icon: "<i class='bx bxs-dashboard'></i>"
    },
    {
        name: "Add Machine",
        icon: "<i class='bx bx-plus-medical' ></i>"
    },
    {
        name: "Account",
        icon: '<i class="bx bxs-user-account"></i>'
    }
]);

export const gardens = writable([

]);