'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn ('Answers', 'QuestionId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Questions",
        key: "id"
      },
      onUpdate :'CASCADE',
      onDelete : 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn ('Answers', 'QuestionId')
  }
};
