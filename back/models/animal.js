module.exports = function(sequelize , DataTypes){

    const Animal = sequelize.define('Animal' , {

        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement : true
        },
        nom: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type_animal: {
          type: DataTypes.STRING,
          allowNull: false
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date_de_naissance: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        photo_url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });
    Animal.associate = _association;
    return Animal;
  };

  function _association(models){
    models.Animal.belongsTo(models.Utilisateur);
    models.Animal.belongsTo(models.Logement);
  };
