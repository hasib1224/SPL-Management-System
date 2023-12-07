"use strict";

export default (sequelize, DataTypes) => {
    const CommitteeRequest = sequelize.define("CommitteeRequests", {
        committeeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "SPLCommittees",
                key: "committeeId",
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
        studentId: { // For team???
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Students",
                key: "studentId",
            },
        },
    });

    return CommitteeRequest;
};
