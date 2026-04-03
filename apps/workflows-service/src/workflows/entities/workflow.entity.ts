import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Building } from 'apps/virtual-facility/src/buildings/entities/building.entity';
import { Types } from 'mongoose';

@Schema()
export class Workflow {
  @Prop()
  name: string;
  @Prop({ type: Types.ObjectId, ref: Building.name })
  buildingId: string;
}
export const WorkflowSchema = SchemaFactory.createForClass(Workflow);
