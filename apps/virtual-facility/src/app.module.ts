import { Module } from '@nestjs/common';
import { BuildingsModule } from './buildings/buildings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    BuildingsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
