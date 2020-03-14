module.exports = function(sequelize , DataTypes){

    const Logement = sequelize.define('Logement' , {

        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement : true
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        adresse: {
          type: DataTypes.STRING,
          allowNull: false
        },
          code_postal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_debut: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_fin: {
            type: DataTypes.DATE,
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
    Logement.associate = _association;
    return Logement;
  };

  function _association(models){
    models.Logement.hasMany(models.Animal);
    models.Logement.belongsTo(models.Utilisateur);
  };
