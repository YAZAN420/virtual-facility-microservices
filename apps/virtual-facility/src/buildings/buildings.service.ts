import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Building } from './entities/building.entity';
import { Model, Types } from 'mongoose';
import { WORKFLOWS_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateWorkflowDto } from '@app/workflows';
import { Workflow } from 'apps/workflows-service/src/workflows/entities/workflow.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectModel(Building.name) private readonly buildingModel: Model<Building>,
    @Inject(WORKFLOWS_SERVICE) private readonly workflowsService: ClientProxy,
  ) {}

  async create(createBuildingDto: CreateBuildingDto) {
    const building = await this.buildingModel.create(createBuildingDto);
    await this.createWorkflow(building._id);
    return building;
  }

  findAll() {
    return this.buildingModel.find().exec();
  }

  async findOne(id: string) {
    const building = await this.buildingModel.findById(id).exec();
    if (!building) {
      throw new Error('Building not found');
    }
    return building;
  }

  async update(id: string, updateBuildingDto: UpdateBuildingDto) {
    const existingBuilding = await this.buildingModel
      .findByIdAndUpdate(id, updateBuildingDto, { new: true })
      .exec();

    if (!existingBuilding) {
      throw new NotFoundException(`Building with ID #${id} not found`);
    }
    return existingBuilding;
  }

  async remove(id: string) {
    return this.buildingModel.findByIdAndDelete(id).exec();
  }

  async createWorkflow(buildingId: Types.ObjectId) {
    const newWorkFlow = await lastValueFrom(
      this.workflowsService.send<Workflow, CreateWorkflowDto>(
        'workflows.create',
        {
          name: 'My Workflow',
          buildingId: buildingId.toString(),
        },
      ),
    );
    console.log(newWorkFlow);
    return newWorkFlow;
  }
}
