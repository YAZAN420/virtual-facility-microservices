import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { NATS_MESSAGE_BROKER, NOTIFICATIOS_SERVICE } from './constants';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AlarmsServiceController {
  constructor(
    @Inject(NATS_MESSAGE_BROKER)
    private readonly natsMessageBroker: ClientProxy,
    @Inject(NOTIFICATIOS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  @EventPattern('alarms.created')
  async create(@Payload() data: { name: string; buildingId: string }) {
    console.log(`Received new "alarm.created" event: ${JSON.stringify(data)}`);
    const alarmClassification: { category: string } = await lastValueFrom(
      this.natsMessageBroker.send('alarm.classify', data),
    );
    console.log(
      `Alarm "${data.name}" classified as ${alarmClassification.category}`,
    );
    const notify$ = this.notificationsService.emit('notifications.send', {
      alarm: data,
      category: alarmClassification.category,
    });
    await lastValueFrom(notify$);
    console.log(
      `Dispatched "notifications.send" event for alarm "${data.name}`,
    );
  }
}
