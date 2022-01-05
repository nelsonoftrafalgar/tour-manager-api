import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tour_managers', (table) => {
    table.uuid('tour_manager_id').notNullable().primary()
    table.timestamps(true, true)
    table.string('tour_manager_name', 250).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tour_managers')
}
