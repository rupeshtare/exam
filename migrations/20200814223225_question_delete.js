exports.up = function (knex) {
    return knex.schema.table('questions', function (table) {
        table.boolean('deleted').notNull().defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table('questions', function (table) {
        table.dropColumn('deleted');
    });
};