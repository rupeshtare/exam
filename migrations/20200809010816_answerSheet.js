exports.up = function(knex) {
    return knex.schema.createTable("answer_sheets", function(table){
        table.increments();
        table.integer("question_paper").unsigned().references("id").inTable("question_papers");
        table.integer("question").unsigned().references("id").inTable("questions");
        table.json("answer").notNullable();
        table.integer("user").unsigned().references("id").inTable("users");
        table.boolean("result").notNullable();
        table.timestamps();
    });  
};

exports.down = function(knex) {
  return knex.schema.dropTable("answer_sheets");
};