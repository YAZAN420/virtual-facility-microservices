import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ALARMS_SERVICE } from './constants';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AlarmsGeneratorService {
  constructor(
    @Inject(ALARMS_SERVICE) private readonly alarmService: ClientProxy,
  ) {}
  @Interval(10000)
  generateAlarm() {
    const alarmCreatedEvent = {
      name: 'Alarm #' + Math.floor(Math.random() * 1000) + 1,
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    this.alarmService.emit('alarms.created', alarmCreatedEvent);
  }
}
