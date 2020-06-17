module.exports = function(sequelize , DataTypes){

    const Utilisateur = sequelize.define('Utilisateur' , {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement : true
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false
        },
        mot_de_passe: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
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
        }
    }, {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });
    Utilisateur.associate = _association;
    return Utilisateur;
  };

  function _association(models){
    models.Utilisateur.hasMany(models.Animal);
    models.Utilisateur.hasMany(models.Logement);
  };
