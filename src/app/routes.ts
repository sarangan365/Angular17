import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { ThankComponent } from './thank/thank.component';

const routeConfig: Routes = [
   {
      path: '',
      component: HomeComponent,
      title: 'Home page'
   },
   {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details'
   },
   {
      path: 'thank',
      component: ThankComponent,
      title: 'Thank You'
   }
];

export default routeConfig;