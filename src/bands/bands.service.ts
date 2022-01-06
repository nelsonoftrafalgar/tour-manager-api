import { ConflictException, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { v4 as uuid } from 'uuid'
import { Band, BandDTO, BandName, NewBandDTO } from './bands.dto'

@Injectable()
export class BandsService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getBands(name?: string): Promise<Band[]> {
    if (name) {
      return await this.filterBands(name)
    }
    return await this.knex.select('*').from('bands')
  }

  async filterBands(name: string): Promise<Band[]> {
    return await this.knex.select('*').from('bands').where('band_name', 'ilike', `%${name}%`)
  }

  async getBandById(band_id: string): Promise<Band[]> {
    return await this.knex.select('*').from('bands').where('bands.band_id', '=', band_id)
  }

  async createBand(data: NewBandDTO): Promise<Band[]> {
    await this.preventDuplicates(data)
    return await this.knex('bands').insert(
      {
        band_id: uuid(),
        created_at: this.knex.fn.now(),
        updated_at: this.knex.fn.now(),
        band_name: data.band_name,
        band_frontman: data.band_frontman,
      },
      '*'
    )
  }

  async updateBand(data: BandDTO): Promise<Band[]> {
    await this.preventDuplicates(data)
    return await this.knex('bands').where('band_id', data.band_id).update(
      {
        updated_at: this.knex.fn.now(),
        band_name: data.band_name,
        band_frontman: data.band_frontman,
      },
      '*'
    )
  }

  async preventDuplicates(data: NewBandDTO | BandDTO) {
    const duplicates = await this.knex.select('*').from('bands').where({
      band_name: data.band_name,
      band_frontman: data.band_frontman,
    })

    if (duplicates.length > 0) {
      throw new ConflictException()
    }
  }

  async getAllBandNames(): Promise<BandName[]> {
    return await this.knex.select('band_id', 'band_name').from('bands')
  }
}
