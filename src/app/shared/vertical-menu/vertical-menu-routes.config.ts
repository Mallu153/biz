import { PERMISSION_KEYS } from 'app/shared/config/constants/permission-keys';
import { DASHBOARD_ROUTE_MODULE } from '../routes/auth-const-routes';
import { RouteInfo } from './vertical-menu.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {
    path: DASHBOARD_ROUTE_MODULE.SYSTEM_ADMIN,
    title: "Dashboard",
    icon: "ft-home",
    class: "",
    badge: "",
    badgeClass: "",
    isExternalLink: false,
    permissionKey: PERMISSION_KEYS.DASHBOARD.ESERVICE_ES_SYSTEM_ADMIN,
    submenu: [],
  },
  /*  {
     path: '', title: 'Menu Levels', icon: 'ft-align-left', class: 'has-sub', badge: '3', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
     submenu: [
         { path: '/YOUR-ROUTE-PATH', title: 'Second Level', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
         {
             path: '', title: 'Second Level Child', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
             submenu: [
                 { path: '/YOUR-ROUTE-PATH', title: 'Third Level 1.1', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                 { path: '/YOUR-ROUTE-PATH', title: 'Third Level 1.2', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
             ]
         },
     ]
   }, */
  {
    path: '/customer/customer-profiles',
    title: 'Customer Profile',
    icon: 'ft-user',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    permissionKey: PERMISSION_KEYS.PERSON.PERSON_MENU_HEADER,
    submenu: [ ]
  },
];


