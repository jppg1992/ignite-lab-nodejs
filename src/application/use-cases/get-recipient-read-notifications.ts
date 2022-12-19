import { Notification } from "@application/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";



interface GetRecipientReadNotificatiosRequest {
  recipientId: string;
};

interface GetRecipientReadNotificatiosResponse {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientReadNotificatios {
  constructor(private notificatiosRepository: NotificationsRepository) { }

  async execute
    (request: GetRecipientReadNotificatiosRequest,
    ): Promise<GetRecipientReadNotificatiosResponse> {

    const { recipientId } = request;

    const notifications = await this.notificatiosRepository.findManyReadByRecipientId(
      recipientId,
    );

    return {
      notifications,
    };

  }
}