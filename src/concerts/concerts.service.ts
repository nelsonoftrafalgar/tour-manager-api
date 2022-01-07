import { ConflictException, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { v4 as uuid } from 'uuid'
import { Concert, ConcertDTO, NewConcertDTO } from './concerts.dto'

@Injectable()
export class ConcertsService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getConcerts(place?: string): Promise<Concert[]> {
    if (place) {
      return await this.filterConcerts(place)
    }

    return await this.knex
      .select(
        'concerts.concert_id',
        'concerts.concert_place',
        'bands.band_name',
        'bands.band_id',
        'tour_managers.tour_manager_name',
        'tour_managers.tour_manager_id'
      )
      .from('concerts')
      .innerJoin('bands', 'concerts.band_id', '=', 'bands.band_id')
      .innerJoin('tour_managers', 'concerts.tour_manager_id', '=', 'tour_managers.tour_manager_id')
      .groupBy(
        'concerts.concert_id',
        'bands.band_name',
        'tour_managers.tour_manager_name',
        'bands.band_id',
        'tour_managers.tour_manager_id'
      )
      .orderBy('concerts.created_at', 'desc')
      .limit(7)
  }

  async filterConcerts(place: string): Promise<Concert[]> {
    return await this.knex
      .select(
        'concerts.concert_id',
        'concerts.concert_place',
        'bands.band_name',
        'bands.band_id',
        'tour_managers.tour_manager_name',
        'tour_managers.tour_manager_id'
      )
      .from('concerts')
      .innerJoin('bands', 'concerts.band_id', '=', 'bands.band_id')
      .innerJoin('tour_managers', 'concerts.tour_manager_id', '=', 'tour_managers.tour_manager_id')
      .where('concerts.concert_place', 'ilike', `%${place}%`)
  }

  async getConcertsByBandId(band_id: string): Promise<Concert[]> {
    return await this.knex
      .select(
        'concerts.concert_id',
        'concerts.concert_place',
        'bands.band_name',
        'bands.band_id',
        'tour_managers.tour_manager_name',
        'tour_managers.tour_manager_id'
      )
      .from('concerts')
      .innerJoin('bands', 'concerts.band_id', '=', 'bands.band_id')
      .innerJoin('tour_managers', 'concerts.tour_manager_id', '=', 'tour_managers.tour_manager_id')
      .where('bands.band_id', '=', band_id)
  }

  async createConcert(data: NewConcertDTO): Promise<Concert[]> {
    await this.preventDuplicates(data)
    return await this.knex('concerts').insert(
      {
        concert_id: uuid(),
        created_at: this.knex.fn.now(),
        updated_at: this.knex.fn.now(),
        concert_date: data.concert_date,
        concert_place: data.concert_place,
        band_id: data.band_id,
        tour_manager_id: data.tour_manager_id,
      },
      '*'
    )
  }

  async updateConcert(data: ConcertDTO): Promise<Concert[]> {
    await this.preventDuplicates(data)
    return await this.knex('concerts').where('concert_id', data.concert_id).update(
      {
        updated_at: this.knex.fn.now(),
        concert_date: data.concert_date,
        concert_place: data.concert_place,
        band_id: data.band_id,
        tour_manager_id: data.tour_manager_id,
      },
      '*'
    )
  }

  async preventDuplicates(data: NewConcertDTO | ConcertDTO) {
    const duplicates = await this.knex.select('*').from('concerts').where({
      concert_date: data.concert_date,
      concert_place: data.concert_place,
      band_id: data.band_id,
      tour_manager_id: data.tour_manager_id,
    })

    if (duplicates.length > 0) {
      throw new ConflictException()
    }
  }
}
