
exports.up = function(knex) {
    return knex.schema.createTable("users", function(table){
        table.increments();
        table.string("username", 20).notNullable().unique();
        table.string("email", 50).notNullable().unique();
        table.string("timezone",30).notNullable();
        table.string("password_digest").notNullable();
        table.timestamps();
    });  
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
