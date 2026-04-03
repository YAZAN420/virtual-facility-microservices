/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  name: string;
  @IsString()
  buildingId: string;
}
