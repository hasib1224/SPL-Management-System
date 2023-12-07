"use strict";

export default (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teachers", {
        teacherId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "userId",
            },
        },
        designation: {
            type: DataTypes.STRING(30),
        },
        rank: {
            type: DataTypes.INTEGER,
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: "Teacher is available to be supervisor or not",
        },
    });

    Teacher.associate = (models) => {
        // User - Teacher [one to one]
        Teacher.belongsTo(models.User, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "teacherId",
        });

        // As SPLManager
        // Teacher - SPL [one to many]
        Teacher.hasMany(models.SPL, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splManager",
        });

        // As Supervisor
        // Student - Teacher [many to many]
        Teacher.belongsToMany(models.Student, {
            through: models.StudentSupervisor,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "teacherId",
        });

        // As Presentation Evaluator
        // SPL - Teacher [many to many]
        Teacher.belongsToMany(models.SPL, {
            as: "PresentationEvaluatorOf",
            through: models.SPLEvaluator,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "teacherId",
        });

        // As Committee Head
        // Teacher - SPLCommittee [one to many]
        Teacher.hasMany(models.SPLCommittee, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "committeeHead",
        });

        // As CommitteeMember
        // Teacher - SPLCommittee [many to many]
        Teacher.belongsToMany(models.SPLCommittee, {
            as: "CommitteeMemberOf",
            through: models.TeacherCommittee,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "teacherId",
        });

        // As Supervisor
        // Teacher - Project [one to many]
        Teacher.hasMany(models.Project, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "supervisorId",
        });

        // As PresentationEvaluator
        // Teacher - PresentationMark [one to many]
        Teacher.hasMany(models.PresentationMark, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "teacherId",
        });

        // As Request Receiver
        // Student - Teacher [many to many]
        Teacher.belongsToMany(models.Student, {
            as: "RequestedByStudents",
            through: models.StudentRequest,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "teacherId",
        });

        // As Request Receiver
        // Team - Teacher [many to many]
        Teacher.belongsToMany(models.Team, {
            as: "RequestedByTeams",
            through: models.TeamRequest,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "teacherId",
        });
    };

    return Teacher;
};
