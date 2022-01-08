import { ConflictException, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { v4 as uuid } from 'uuid'
import { NewReportDTO, NewSalaryDTO, Salary, SalaryDTO } from './salaries.dto'

@Injectable()
export class SalariesService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async createSalary(data: NewSalaryDTO): Promise<Salary[]> {
    await this.preventDuplicates(data)
    return await this.knex('salaries').insert(
      {
        salary_id: uuid(),
        created_at: this.knex.fn.now(),
        updated_at: this.knex.fn.now(),
        amount: data.amount,
        band_id: data.band_id,
        concert_id: data.concert_id,
        tour_manager_id: data.tour_manager_id,
      },
      '*'
    )
  }

  async getReport(query: NewReportDTO): Promise<Salary[]> {
    return await this.knex
      .select(
        'salaries.salary_id',
        'salaries.amount',
        'concerts.concert_id',
        'concerts.concert_place',
        'bands.band_name',
        'bands.band_id',
        'tour_managers.tour_manager_name',
        'tour_managers.tour_manager_id'
      )
      .from('salaries')
      .innerJoin('bands', 'salaries.band_id', '=', 'bands.band_id')
      .innerJoin('concerts', 'salaries.concert_id', '=', 'concerts.concert_id')
      .innerJoin('tour_managers', 'salaries.tour_manager_id', '=', 'tour_managers.tour_manager_id')
      .modify(function (queryBuilder) {
        if (query.concert_id) {
          queryBuilder.where('salaries.concert_id', query.concert_id)
        }
        if (query.tour_manager_id) {
          queryBuilder.where('salaries.tour_manager_id', query.tour_manager_id)
        }
        if (query.band_id) {
          queryBuilder.where('salaries.band_id', query.band_id)
        }
      })
  }

  async deleteSalary(salary_id: string) {
    return await this.knex('salaries').where('salaries.salary_id', salary_id).del()
  }

  async updateSalary(data: SalaryDTO): Promise<Salary[]> {
    await this.preventDuplicates(data)
    return await this.knex('salaries')
      .where('salary_id', data.salary_id)
      .update({
        updated_at: this.knex.fn.now(),
        amount: data.amount,
        band_id: data.band_id,
        concert_id: data.concert_id,
        tour_manager_id: data.tour_manager_id,
      })
      .returning('*')
  }

  async preventDuplicates(data: SalaryDTO | NewSalaryDTO) {
    const duplicates = await this.knex.select('*').from('salaries').where({
      amount: data.amount,
      band_id: data.band_id,
      concert_id: data.concert_id,
      tour_manager_id: data.tour_manager_id,
    })

    if (duplicates.length > 0) {
      throw new ConflictException()
    }
  }
}
