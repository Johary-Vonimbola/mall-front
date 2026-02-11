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
import { ShopCategoryModifComponent } from './pages/shop-management/shop-category-modif/shop-category-modif.component';
import { ShopModifComponent } from './pages/shop-management/shop-modif/shop-modif.component';
import { DashboardAdminComponent } from './pages/dashboard/dashboard-admin/dashboard-admin.component';
import { ShopRentFormComponent } from './pages/shop-rent/shop-rent-form/shop-rent-form.component';
import { ShopRentListComponent } from './pages/shop-rent/shop-rent-list/shop-rent-list.component';
import { ShopRentUpdateFormComponent } from './pages/shop-rent/shop-rent-update-form/shop-rent-update-form.component';
import { ShopListClientComponent } from './pages/shop-management/shop-list-client/shop-list-client.component';
import { ProductListComponent } from './pages/client/product-list/product-list.component';

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
                component: ShopListClientComponent
            },
            {
                path: 'shops/:id',
                component: ProductListComponent
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
                path: 'shop-form',
                component: ShopFormComponent
            },{
                path: 'shop-modif/:id',
                component: ShopModifComponent
            },
            {
                path: 'shop-categories',
                component: ShopCategoryListComponent
            },
            {
                path: 'shop-category-form',
                component: ShopCategoryFormComponent
            },
            {
                path: 'shop-rent-form',
                component: ShopRentFormComponent
            },
            {
                path: 'shop-rent-list',
                component: ShopRentListComponent
            },
            {
                path: 'shop-rent-update/:id',
                component: ShopRentUpdateFormComponent
            },{
                path: 'shop-category-modif/:id',
                component: ShopCategoryModifComponent
            }
        ]
    },{
        path: '**',
        component: NotFoundComponent
    }
];
