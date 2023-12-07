"use strict";

export default (sequelize, DataTypes) => {
    const InterestedField = sequelize.define("InterestedFields", {
        fieldId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fieldName: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
            validate: {
                is: /^[ a-zA-Z()-]+$/,
            },
        },
    });

    InterestedField.associate = (models) => {
        // User - InterestedField [many to many]
        InterestedField.belongsToMany(models.User, {
            through: models.UserField,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "fieldId",
        });
    };

    return InterestedField;
};
