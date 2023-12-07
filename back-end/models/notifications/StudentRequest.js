"use strict";

export default (sequelize, DataTypes) => {
    const StudentRequest = sequelize.define("StudentRequests", {
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Students",
                key: "studentId",
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

    return StudentRequest;
};
