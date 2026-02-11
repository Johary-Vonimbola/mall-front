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
import { ProductCategoryFormComponent } from './pages/product-management/product-category-form/product-category-form.component';
import { ProductCategoryListComponent } from './pages/product-management/product-category-list/product-category-list.component';
import { ProductCategoryUpdateComponent } from './pages/product-management/product-category-update/product-category-update.component';
import { ProductFormComponent } from './pages/product-management/product-form/product-form.component';
import { UomFormComponent } from './pages/uom-management/uom-form/uom-form.component';
import { UomListComponent } from './pages/uom-management/uom-list/uom-list.component';
import { UomUpdateFormComponent } from './pages/uom-management/uom-update/uom-update.component';
import { ProductListComponent } from './pages/product-management/product-list/product-list.component';
import { ProductUpdateFormComponent } from './pages/product-management/product-update/product-update.component';

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
            },
            {
                path: 'shop-category-modif/:id',
                component: ShopCategoryModifComponent
            },
            {
                path: 'uom-form',
                component: UomFormComponent
            },
            {
                path: 'uoms',
                component: UomListComponent
            },
            {
                path: 'uom-update/:id',
                component: UomUpdateFormComponent
            }
        ]
    },
    {
        path: 'admin-shop',
        component: FullComponent,
        children: [
            {
                path: 'product-category',
                component: ProductCategoryFormComponent
            },
            {
                path: 'product-categories-list',
                component: ProductCategoryListComponent
            },
            {
                path: 'product-category-update/:id',
                component: ProductCategoryUpdateComponent
            },
            {
                path: 'product-form',
                component: ProductFormComponent
            },
            {
                path: 'products',
                component: ProductListComponent
            },
            {
                path: 'product-update/:id',
                component: ProductUpdateFormComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
