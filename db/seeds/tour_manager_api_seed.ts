import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('tour_managers').del()
  await knex('bands').del()
  await knex('concerts').del()
  await knex('tour_managers').insert([
    {
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      tour_manager_name: 'Sam Cutler',
    },
    {
      tour_manager_id: '8074596c-3a5d-40d1-823b-ad595bb39be8',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      tour_manager_name: 'Mal Evans',
    },
    {
      tour_manager_id: 'c55f9488-8e4b-48c9-a75f-99faf2e77f1b',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      tour_manager_name: 'Richard Cole',
    },
    {
      tour_manager_id: '5b23ace0-b302-4df4-91da-1c9d56c1332c',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      tour_manager_name: 'Albert Chapman',
    },
    {
      tour_manager_id: 'a7619785-2b6b-4441-aa27-7558cf7cadcd',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      tour_manager_name: 'Colin Hart',
    },
  ])
  await knex('bands').insert([
    {
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      band_name: 'The Rolling Stones',
      band_frontman: 'Mick Jagger',
    },
    {
      band_id: 'c45757a0-7fd4-40e4-9483-e34a01bc1ccc',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      band_name: 'The Beatles',
      band_frontman: 'John Lennon',
    },
    {
      band_id: '557ac722-fca4-47b0-b004-5bfabb145a22',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      band_name: 'Led Zeppelin',
      band_frontman: 'Robert Plant',
    },
    {
      band_id: '3e3d8eee-dc3a-422f-9658-b08f61b84d1d',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      band_name: 'Black Sabbath',
      band_frontman: 'Ozzy Osbourne',
    },
    {
      band_id: '22c9a810-9160-4f54-a846-407895c207bf',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      band_name: 'Deep Purple',
      band_frontman: 'Ian Gillan',
    },
  ])
  await knex('concerts').insert([
    {
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      concert_date: '2021-03-06T17:30:05.519Z',
      concert_place: 'Oslo',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
    },
    {
      concert_id: '125d1ce0-3c00-4944-90d2-6e704e2e2ae0',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      concert_date: '2022-01-06T17:30:05.519Z',
      concert_place: 'London',
      band_id: 'c45757a0-7fd4-40e4-9483-e34a01bc1ccc',
      tour_manager_id: '8074596c-3a5d-40d1-823b-ad595bb39be8',
    },
    {
      concert_id: 'fde309ae-2f7c-4473-8f0f-f99f6166a98a',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      concert_date: '2020-01-06T17:30:05.519Z',
      concert_place: 'Paris',
      band_id: '557ac722-fca4-47b0-b004-5bfabb145a22',
      tour_manager_id: 'c55f9488-8e4b-48c9-a75f-99faf2e77f1b',
    },
    {
      concert_id: '451765f4-ef5d-4edb-ba78-dd741a2418dd',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      concert_date: '2020-05-06T17:30:05.519Z',
      concert_place: 'Berlin',
      band_id: '3e3d8eee-dc3a-422f-9658-b08f61b84d1d',
      tour_manager_id: '5b23ace0-b302-4df4-91da-1c9d56c1332c',
    },
  ])
}
