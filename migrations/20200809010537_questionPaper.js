exports.up = function(knex) {
    return knex.schema.createTable("question_papers", function(table){
        table.increments();
        table.string("name", 20).notNullable();
        table.string("subject", 20).notNullable();
        table.json("questions").notNullable();
        table.integer("user").unsigned().references("id").inTable("users");
        table.timestamps();
    });  
};

exports.down = function(knex) {
  return knex.schema.dropTable("question_papers");
};