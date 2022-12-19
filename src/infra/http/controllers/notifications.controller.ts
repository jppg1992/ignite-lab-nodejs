

import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipentNotificatios } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { GetRecipientReadNotificatios } from '@application/use-cases/get-recipient-read-notifications';
import { GetRecipientActiveNotificatios } from '@application/use-cases/get-recipient-active-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipentNotificatios,
    private getRecipientNotifications: GetRecipientNotifications,
    private getRecipientReadNotificatios: GetRecipientReadNotificatios,
    private getRecipientActiveNotificatios: GetRecipientActiveNotificatios,
  ) { }


  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  };

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string,) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    }

  };

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string,) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    }

  };

  @Get('read/from/:recipientId')
  async getReadFromRecipient(@Param('recipientId') recipientId: string,) {
    const { notifications } = await this.getRecipientReadNotificatios.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    }

  };

  @Get('active/from/:recipientId')
  async getActiveFromRecipient(@Param('recipientId') recipientId: string,) {
    const { notifications } = await this.getRecipientActiveNotificatios.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    }

  };

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    })
  };

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    })
  };


  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHttp(notification)
    };
  }
}

