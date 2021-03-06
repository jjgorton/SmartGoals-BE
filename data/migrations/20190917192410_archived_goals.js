exports.up = function(knex) {
	return knex.schema.createTable('archived_goals', (tbl) => {
		tbl.increments();

		tbl.string('name', 128).notNullable();

		tbl.text('description');

		tbl.string('category');

		tbl.integer('est_time'); //seconds?

		tbl.datetime('due');

		tbl.boolean('completed').notNullable().defaultTo(false); //string or 0?

		tbl
			.integer('workspace_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('workspaces')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('created_at').notNullable();

		tbl.timestamp('archived_at').notNullable().defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('archived_goals');
};
