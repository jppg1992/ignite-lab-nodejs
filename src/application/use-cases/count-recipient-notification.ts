import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";



interface CountRecipentNotificatiosRequest {
  recipientId: string;
};

interface CountRecipentNotificatiosResponse {
  count: number;
};

@Injectable()
export class CountRecipentNotificatios {
  constructor(private notificatiosRepository: NotificationsRepository) { }

  async execute
    (request: CountRecipentNotificatiosRequest,
    ): Promise<CountRecipentNotificatiosResponse> {

    const { recipientId } = request;

    const count = await this.notificatiosRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };

  }
}