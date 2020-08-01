exports.up = function(knex) {
    return knex.schema.createTable("questions", function(table){
        table.increments();
        table.string("question").notNullable();
        table.string("option1").notNullable();
        table.string("option2").notNullable();
        table.string("option3").notNullable();
        table.string("option4").notNullable();
        table.json("correct_answer").notNullable();
        table.string("type").notNullable();
        table.string("difficulty_level").notNullable();
        table.integer("created_by").unsigned().references("id").inTable("users");
        table.integer("updated_by").unsigned().references("id").inTable("users");
        table.timestamps();
    });  
};

exports.down = function(knex) {
  return knex.schema.dropTable("questions");
};