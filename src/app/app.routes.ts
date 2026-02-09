import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { ShopListComponent } from './pages/shop-management/shop-list/shop-list.component';
import { ShopFormComponent } from './pages/shop-management/shop-form/shop-form.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ClientComponent } from './layouts/client/client.component';
import { ShopCategoryListComponent } from './pages/shop-management/shop-category-list/shop-category-list.component';
import { ShopCategoryFormComponent } from './pages/shop-management/shop-category-form/shop-category-form.component';
import { DashboardAdminComponent } from './pages/dashboard/dashboard-admin/dashboard-admin.component';
import { ShopRentFormComponent } from './pages/shop-rent/shop-rent-form/shop-rent-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },{
        path: '',
        component: ClientComponent,
        children: [
            {
                path: 'shops',
                component: ShopListComponent
            }
        ]
    },{
        path: '',
        component: BlankComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    },
    {
        path: 'admin',
        component: FullComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardAdminComponent
            },
            {
                path: 'shops',
                component: ShopListComponent
            },
            {
                path: 'shops-form',
                component: ShopFormComponent
            },
            {
                path: 'shopCategories',
                component: ShopCategoryListComponent
            },
            {
                path: 'shopCategories-form',
                component: ShopCategoryFormComponent
            },
            {
                path: 'shop-rent-form',
                component: ShopRentFormComponent
            }
        ]
    },{
        path: '**',
        component: NotFoundComponent
    }
];
