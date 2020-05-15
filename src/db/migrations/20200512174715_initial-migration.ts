import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id');
        table.string('discordID').notNullable().unique();
        table.float('balance').defaultTo(0);
        table
            .string('lastCheckIn')
            .defaultTo((Date.now() - 1000 * 60 * 60 * 24).toString());
        table.integer('experience').notNullable().defaultTo(0);
        table.integer('statPoints').notNullable().defaultTo(10);
        table.integer('strength').notNullable().defaultTo(1);
        table.integer('agility').notNullable().defaultTo(1);
        table.integer('defense').notNullable().defaultTo(1);
        table.integer('magic').notNullable().defaultTo(1);
        table.integer('range').notNullable().defaultTo(1);
        table.integer('hitpoints').notNullable().defaultTo(1);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('users');
}
