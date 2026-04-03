import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Building {
  @Prop()
  name: string;
}
export const BuildingSchema = SchemaFactory.createForClass(Building);
