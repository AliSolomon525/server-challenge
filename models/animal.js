module.exports = function(sequelize, DataTypes){
  return sequelize.define('animal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    legNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    predator: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}

//anytime you make a change to a column/model you have to drop the table in postgres and make a new table
//postgres > right click table > delet/drop > drop