import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModule } from './customer/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { RoleModule } from './role/role.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerModule,
    DashboardModule,
    OrderModule,
    ProductsModule,
    AuthorizeMenuModule,
    RoleModule,
    UserModule
  ]
})
export class ComponentsModule { }
