"use strict";

export default (sequelize, DataTypes, Op) => {
    const UserField = sequelize.define("UserFields", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "userId",
            },
        },
        fieldId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "InterestedFields",
                key: "fieldId",
            },
        },
    });

    return UserField;
};
