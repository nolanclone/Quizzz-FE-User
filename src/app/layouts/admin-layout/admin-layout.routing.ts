import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/exam-list/exam-list.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/Examination/examination.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { RecordDetailComponent } from 'app/pages/record-detail/record-detail.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'record',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'exam-list',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'examination/:id',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'record-detail/:id', component: RecordDetailComponent}
];
