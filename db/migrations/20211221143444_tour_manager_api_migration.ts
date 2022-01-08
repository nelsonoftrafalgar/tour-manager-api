import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tour_managers', (table) => {
      table.uuid('tour_manager_id').notNullable().primary()
      table.timestamps(true, true)
      table.string('tour_manager_name', 250).notNullable()
    })
    .createTable('bands', (table) => {
      table.uuid('band_id').notNullable().primary()
      table.timestamps(true, true)
      table.string('band_name', 250).notNullable()
      table.string('band_frontman', 250).notNullable()
    })
    .createTable('concerts', (table) => {
      table.uuid('concert_id').notNullable().primary()
      table.timestamps(true, true)
      table.string('concert_date', 250).notNullable()
      table.string('concert_place', 250).notNullable()
      table.uuid('band_id').references('band_id').inTable('bands').notNullable()
      table.uuid('tour_manager_id').references('tour_manager_id').inTable('tour_managers').notNullable()
    })
    .createTable('salaries', (table) => {
      table.uuid('salary_id').notNullable().primary()
      table.timestamps(true, true)
      table.string('amount').notNullable()
      table.uuid('concert_id').references('concert_id').inTable('concerts').notNullable()
      table.uuid('band_id').references('band_id').inTable('bands').notNullable()
      table.uuid('tour_manager_id').references('tour_manager_id').inTable('tour_managers').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tour_managers').dropTable('bands').dropTable('concerts').dropTable('salaries')
}
