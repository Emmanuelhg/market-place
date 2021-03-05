import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BecomeAVendorComponent } from './pages/become-a-vendor/become-a-vendor.component';
import { SelecctionCajaComponent } from './pages/selecction-caja/selecction-caja.component';
import { SelecctionPasoDosComponent } from './pages/selecction-paso-dos/selecction-paso-dos.component';
import { SelecctionPasoTresComponent } from './pages/selecction-paso-tres/selecction-paso-tres.component';
import { DoneComponent } from './pages/done/done.component';
import { FrequentlyAskedQuestionsComponent } from './pages/frequently-asked-questions/frequently-asked-questions.component';
import { OurStoryComponent } from './pages/our-story/our-story.component';
import { GetInTouchComponent } from './pages/get-in-touch/get-in-touch.component';
import { TermsComponent } from './pages/terms/terms.component';
import { EmptyComponent } from './pages/empty/empty.component';


import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

	{path: '', component: HomeComponent },
	{path: 'products/:param', component: ProductsComponent },
	{path: 'product/:param', component: ProductComponent },
	{path: 'search/:param', component: SearchComponent },
	{path: 'login', component: LoginComponent },
	{path: 'register', component: RegisterComponent },
	{path: 'account', component: AccountComponent, canActivate: [ AuthGuard ]},
	{path: 'account/:param', component: AccountComponent, canActivate: [ AuthGuard ]},
	{path: 'shopping-cart', component: ShoppingCartComponent  },
	{path: 'checkout', component: CheckoutComponent,  canActivate: [ AuthGuard ]},
	{path: 'become-a-vendor', component: BecomeAVendorComponent},
	{path: 'selecction-caja', component: SelecctionCajaComponent},
	{path: 'selecction-paso-dos/:id,:param', component: SelecctionPasoDosComponent},
	{path: 'selecction-paso-tres/:id', component: SelecctionPasoTresComponent},
	{path: 'done/:id', component: DoneComponent},
	{path: 'frequently-asked-questions', component: FrequentlyAskedQuestionsComponent},
	{path: 'our-story', component: OurStoryComponent},
	{path: 'get-in-touch', component: GetInTouchComponent},
	{path: 'terms', component: TermsComponent},
	{path: 'empty', component: EmptyComponent},
	{path: '**', pathMatch:'full', component: Error404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
