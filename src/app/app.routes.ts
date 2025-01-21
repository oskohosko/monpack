import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LayoutComponent } from './layout/layout.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard } from './auth.guard';
import { TranslateComponent } from './translate/translate.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { GenAiComponent } from './gen-ai/gen-ai.component';

// Here are our routes for the application
export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'signin', component: SigninComponent },
            { path: 'add-driver', component: AddDriverComponent, canActivate: [authGuard] },
            { path: 'add-package', component: AddPackageComponent, canActivate: [authGuard] },
            { path: 'delete-driver', component: DeleteDriverComponent, canActivate: [authGuard] },
            { path: 'delete-package', component: DeletePackageComponent, canActivate: [authGuard] },
            { path: 'list-drivers', component: ListDriversComponent, canActivate: [authGuard] },
            { path: 'list-packages', component: ListPackagesComponent, canActivate: [authGuard] },
            { path: 'update-driver', component: UpdateDriverComponent, canActivate: [authGuard] },
            { path: 'update-package', component: UpdatePackageComponent, canActivate: [authGuard] },
            { path: 'translate', component: TranslateComponent, canActivate: [authGuard] },
            { path: 'text-to-speech', component: TextToSpeechComponent, canActivate: [authGuard] },
            { path: 'gen-ai', component: GenAiComponent, canActivate: [authGuard] },
            { path: 'statistics', component: StatisticsComponent, canActivate: [authGuard] },
            { path: 'invalid-data', component: InvalidDataComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
