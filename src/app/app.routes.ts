import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => { return import('./fornt-end/fornt-end-routing.module').then(m => m.FrontEndRoutingModule);} },
    {path:'admin', loadChildren: () => { return import('./admin/admin.module').then(m => m.AdminModule);}}
];
