import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [

  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('../../customer-profile/customer-profile.module').then(m => m.CustomerProfileModule)
  },

];
