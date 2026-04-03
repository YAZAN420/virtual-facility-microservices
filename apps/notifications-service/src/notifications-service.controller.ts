import { Controller } from '@nestjs/common';
import { NotificationsServiceService } from './notifications-service.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Channel, Message } from 'amqplib';

@Controller()
export class NotificationsServiceController {
  constructor(
    private readonly notificationsServiceService: NotificationsServiceService,
  ) {}

  @EventPattern('notifications.send')
  sendNotification(@Payload() data: unknown, @Ctx() context: RmqContext) {
    console.log(
      `Sending notification about the alarm: ${JSON.stringify(data)}`,
    );
    const channel = context.getChannelRef() as Channel;
    const originalMsg = context.getMessage() as Message;
    if (originalMsg.fields.redelivered) {
      console.log(
        `Message was already redelivered. Acknowledging the message and discarding it.`,
      );
      return channel.ack(originalMsg);
    }
    channel.nack(originalMsg);
  }
}
