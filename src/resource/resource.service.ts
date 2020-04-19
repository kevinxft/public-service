import { Injectable, Res, HttpException, HttpStatus } from '@nestjs/common'
import { getRepository, EntityManager, DeleteResult } from 'typeorm'
import { getEntity } from './model'

@Injectable()
export class ResourceService {
  constructor(private readonly manager: EntityManager) {}
  async list(resource: string, query: any): Promise<any> {
    const { perPage = 10, page = 1, sort, filter } = query
    const entity = getEntity(resource)
    const qb = await getRepository(entity).createQueryBuilder()

    if (filter !== '{}') {
      const _filter = JSON.parse(filter)
      Object.keys(_filter).forEach((key, index) => {
        const searchStr = _filter[key]
        const searchParam = { [key]: searchStr }
        if (!searchStr) {
          return
        }
        const searchWay =
          searchStr[0] === '%' || searchStr[searchStr.length - 1] === '%'
            ? 'LIKE'
            : '='
        const where = index === 0 ? 'where' : 'andWhere'
        qb[where](`${key} ${searchWay} :${key}`, searchParam)
      })
    }

    if (sort) {
      const [field, orderWay] = JSON.parse(sort)
      qb.orderBy(field, orderWay)
    }

    const total = await qb.getCount()

    qb.skip((page - 1) * perPage)
    qb.take(perPage)
    const data = await qb.getMany()
    return {
      data,
      total,
    }
  }

  async get(resource: string, id: number): Promise<any> {
    const Entity = getEntity(resource)
    const data = await this.manager.findOne(Entity, id)
    return {
      data,
    }
  }

  async update(resource: string, body: any) {
    const { id, updated, created, ...rest } = body
    const entity = getEntity(resource)
    const data = await getRepository(entity)
      .createQueryBuilder()
      .update(entity)
      .set(rest)
      .where('id = :id', { id })
      .execute()
    return {
      data,
    }
  }

  async create(resource: string, body: any): Promise<any> {
    const Entity = getEntity(resource)
    const newBody = new Entity()
    Object.keys(body).forEach(key => {
      newBody[key] = body[key]
    })
    try {
      const data = await this.manager.save(newBody)
      return {
        data,
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: error.toString(),
        },
        400,
      )
    }
  }

  async deleteOne(resource: string, id: number): Promise<any> {
    const entity = getEntity(resource)
    const data = await getRepository(entity)
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute()
    return {
      data,
    }
  }

  async deleteMany(resource: string, params: any): Promise<any> {
    const entity = getEntity(resource)
    const data = await getRepository(entity)
      .createQueryBuilder()
      .delete()
      .where(`id IN (:...ids)`, JSON.parse(params.filter))
      .execute()
    return {
      data,
    }
  }
}
