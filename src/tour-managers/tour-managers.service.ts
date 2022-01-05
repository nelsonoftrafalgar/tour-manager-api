import { Injectable } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import { TourManager } from './tour-managers.dto'

@Injectable()
export class TourManagersService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getTourManagers(name?: string): Promise<TourManager[]> {
    if (name) {
      return await this.filterTourManagers(name)
    }

    return await this.knex.select('*').from('tour_managers')
  }

  async filterTourManagers(name: string): Promise<TourManager[]> {
    return this.knex.select('*').from('tour_managers').where('tour_manager_name', 'ilike', `%${name}%`)
  }
}
