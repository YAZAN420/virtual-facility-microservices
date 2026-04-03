import { Injectable, NotFoundException } from '@nestjs/common';
import { Workflow } from './entities/workflow.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkflowDto, UpdateWorkflowDto } from '@app/workflows';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectModel(Workflow.name) private workflowModel: Model<Workflow>,
  ) {}
  async create(createWorkflowDto: CreateWorkflowDto) {
    const workflow = await this.workflowModel.create(createWorkflowDto);
    return workflow;
  }

  findAll() {
    return this.workflowModel.find().exec();
  }

  findOne(id: string) {
    return this.workflowModel.findById(id).exec();
  }

  async update(id: string, updateWorkflowDto: UpdateWorkflowDto) {
    const workflow = await this.workflowModel
      .findByIdAndUpdate(id, updateWorkflowDto, { new: true })
      .exec();
    if (!workflow) throw new NotFoundException('Workflow not found');
    return workflow;
  }

  async remove(id: string) {
    return this.workflowModel.findByIdAndDelete(id).exec();
  }
}
