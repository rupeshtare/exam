exports.up = function(knex) {
    return knex.schema.createTable("exams", function(table){
        table.increments();
        table.integer("question").unsigned().references("id").inTable("questions");
        table.json("answer").notNullable();
        table.integer("user").unsigned().references("id").inTable("users");
        table.boolean("result").notNullable();
        table.timestamps();
    });  
};

exports.down = function(knex) {
  return knex.schema.dropTable("exams");
};