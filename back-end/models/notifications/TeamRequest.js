"use strict";

export default (sequelize, DataTypes) => {
    const TeamRequest = sequelize.define("TeamRequests", {
        teamId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Teams",
                key: "teamId",
            },
        },
        teacherId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Teachers",
                key: "teacherId",
            },
        },
    });

    return TeamRequest;
};
