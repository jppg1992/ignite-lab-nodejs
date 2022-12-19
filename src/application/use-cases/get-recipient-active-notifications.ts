import { Notification } from "@application/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";



interface GetRecipientActiveNotificatiosRequest {
  recipientId: string;
};

interface GetRecipientActiveNotificatiosResponse {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientActiveNotificatios {
  constructor(private notificatiosRepository: NotificationsRepository) { }

  async execute
    (request: GetRecipientActiveNotificatiosRequest,
    ): Promise<GetRecipientActiveNotificatiosResponse> {

    const { recipientId } = request;

    const notifications = await this.notificatiosRepository.findManyActiveByRecipientId(
      recipientId,
    );

    return {
      notifications,
    };

  }
}