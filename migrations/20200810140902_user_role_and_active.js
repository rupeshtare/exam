exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
        table.string('role', 1).notNull().defaultTo('S');
        table.boolean('is_active').notNull().defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('role');
        table.dropColumn('is_active');
    });
};