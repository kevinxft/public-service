import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ResourceService } from './resource.service'
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport'



@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @UseGuards(AuthGuard())
  @Get(':name/:id')
  async getOne(@Param('name') name, @Param('id') id): Promise<any> {
    return await this.resourceService.get(name, id)
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':name')
  async list(@Param('name') name, @Query() query: any): Promise<any> {
    return await this.resourceService.list(name, query)
  }

  @Post(':name')
  async create(@Param('name') name, @Body() body: any): Promise<any> {
    return await this.resourceService.create(name, body)
  }

  @Put(':name/:id')
  async update(@Param('name') name, @Body() body): Promise<any> {
    return await this.resourceService.update(name, body)
  }

  @Delete(':name')
  async deleteMany(@Param('name') name, @Query() query): Promise<any> {
    return await this.resourceService.deleteMany(name, query)
  }

  @Delete(':name/:id')
  async deleteOne(@Param('name') name, @Param('id') id): Promise<any> {
    return await this.resourceService.deleteOne(name, id)
  }
}
