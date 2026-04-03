import { Module } from '@nestjs/common';
import { WorkflowsModule } from './workflows/workflows.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    WorkflowsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class WorkflowsServiceModule {}
