import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipentNotificatios } from '@application/use-cases/count-recipient-notification';
import { GetRecipientActiveNotificatios } from '@application/use-cases/get-recipient-active-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { GetRecipientReadNotificatios } from '@application/use-cases/get-recipient-read-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipentNotificatios,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    GetRecipientReadNotificatios,
    GetRecipientActiveNotificatios,
  ],
})
export class HttpModule { }
