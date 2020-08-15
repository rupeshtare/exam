exports.up = function (knex) {
    return knex.schema.table('question_papers', function (table) {
        table.boolean('locked').notNull().defaultTo(true);
        table.boolean('deleted').notNull().defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table('question_papers', function (table) {
        table.dropColumn('locked');
        table.dropColumn('deleted');
    });
};