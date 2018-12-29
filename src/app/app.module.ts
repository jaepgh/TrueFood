import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthorizationService } from './services/authorization.service';
import { UserService } from './services/user.service';
import { AdminGuardService } from './services/admin-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    AngularFireModule.initializeApp(environment.fireConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
      {
        path: 'admin/products/new', component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminGuardService]
      },
      {
        path: 'admin/products/:id', component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminGuardService]
      },
      {
        path: 'admin/products', component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminGuardService]
      },
      {
        path: 'admin/orders', component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminGuardService]
      },
    ]),
    BrowserAnimationsModule
  ],
  providers: [AngularFireAuth, AuthorizationService, AuthGuardService,
    UserService, AdminGuardService, CategoryService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
