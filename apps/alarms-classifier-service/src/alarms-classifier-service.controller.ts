import { Controller } from '@nestjs/common';
import { AlarmsClassifierServiceService } from './alarms-classifier-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsClassifierServiceController {
  constructor(
    private readonly alarmsClassifierServiceService: AlarmsClassifierServiceService,
  ) {}
  @MessagePattern('alarm.classify')
  classifyAlarm(@Payload() data: unknown) {
    console.log(
      `Received new "alarm.classify" message: ${JSON.stringify(data)}`,
    );
    return {
      category: ['cirtical', 'non-critical', 'invalid'][
        Math.floor(Math.random() * 3)
      ],
    };
  }
}
