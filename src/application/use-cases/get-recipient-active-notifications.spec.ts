
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientActiveNotificatios } from "./get-recipient-active-notifications";


describe('Get recipient Active Notifications', () => {
  it('should be able to get recipient active notifications', async () => {

    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientActiveNotifications = new GetRecipientActiveNotificatios(notificationsRepository);



    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }));


    const { notifications } = await getRecipientActiveNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'recipient-1' }),
      expect.objectContaining({ recipientId: 'recipient-1' }),
    ]))
  });
});



