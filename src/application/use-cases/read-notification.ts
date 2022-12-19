import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";



interface ReadNotificatioRequest {
  notificationId: string;
}

type ReadNotificatioResponse = void;

@Injectable()
export class ReadNotification {
  constructor(
    private notificatinosRepository: NotificationsRepository) { }

  async execute(request: ReadNotificatioRequest): Promise<ReadNotificatioResponse> {
    const { notificationId } = request;

    const notification = await this.notificatinosRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificatinosRepository.save(notification);

  }
}