
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipentNotificatios } from "./count-recipient-notification";


describe('Count recipients Notifications', () => {
  it('should be able to count recipient notifications', async () => {

    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipentNotificatios(notificationsRepository);



    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }));


    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});



