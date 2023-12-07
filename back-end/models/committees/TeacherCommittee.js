"use strict";

// [Committee Members]
export default (sequelize, DataTypes, Op) => {
    const TeacherCommittee = sequelize.define("TeacherCommittees", {
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
    });

    return TeacherCommittee;
};
