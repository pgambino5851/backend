
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('users', tbl => { //users table schema, must be made before category
        
        tbl.increments(); 

        tbl.string('name', 255).notNullable()
        tbl.string('email', 255).unique()
        tbl.string('password', 128).notNullable()
        tbl.timestamps(true, true); 
    })
    .createTable('category', tbl => {
      tbl.increments();
      tbl.string('name', 128)
      tbl.string('color', 128);
     
      tbl
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    })
    .createTable('tasks', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable();
      // tbl.boolean('completed'); optional since we have another table to check whether this particular task has been completed
      tbl
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('category')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('days_complete', tbl => {
      tbl
        .integer('task_id')
        .unsigned()
        .references('id')
        .inTable('tasks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      tbl.date('day');
      tbl.boolean('completed')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('category')
  .dropTableIfExists('tasks')
  .dropTableIfExists('days_complete')
};
