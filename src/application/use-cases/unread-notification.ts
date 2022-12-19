import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";



interface UnreadNotificatioRequest {
  notificationId: string;
}

type UnreadNotificatioResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(
    private notificatiosRepository: NotificationsRepository) { }

  async execute(request: UnreadNotificatioRequest): Promise<UnreadNotificatioResponse> {
    const { notificationId } = request;

    const notification = await this.notificatiosRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificatiosRepository.save(notification);

  }
}