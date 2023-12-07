"use strict";

export default (sequelize, DataTypes) => {
    const StudentSupervisor = sequelize.define("StudentSupervisors", {
        teacherId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Teachers",
                key: "teacherId",
            },
        },
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Students",
                key: "studentId",
            },
        },
        splId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "SPLs",
                key: "splId",
            },
        },
    });

    StudentSupervisor.associate = (models) => {};

    return StudentSupervisor;
};
