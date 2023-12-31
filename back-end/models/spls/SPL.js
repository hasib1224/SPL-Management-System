"use strict";

export default (sequelize, DataTypes) => {
    const SPL = sequelize.define("SPLs", {
        splId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        academicYear: {
            type: DataTypes.STRING(4),
            allowNull: false,
            validate: {
                is: /^[0-9]{4}$/,
            },
        },
        splName: {
            type: DataTypes.STRING(4),
            allowNull: false,
            validate: {
                isIn: [["spl1", "spl2", "spl3"]],
            },
        },
        splManager: {
            type: DataTypes.INTEGER,
            references: {
                model: "Teachers",
                key: "teacherId",
            },
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    });

    SPL.associate = (models) => {
        // Teacher - SPL [one to many]
        SPL.belongsTo(models.Teacher, {
            as: "SPLManager",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splManager",
        });

        // Student - SPL [many to many]
        SPL.belongsToMany(models.Student, {
            through: models.StudentSPL,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splId",
        });

        // SPL - Teacher [many to many]
        SPL.belongsToMany(models.Teacher, {
            as: "PresentationEvaluators",
            through: models.SPLEvaluator,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splId",
        });

        // SPL - SPLCommittee [one to one]
        SPL.hasOne(models.SPLCommittee, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splId",
        });

        // SPL - Project [one to many]
        SPL.hasMany(models.Project, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splId",
        });

        // SPL - Team [one to many]
        SPL.hasMany(models.Team, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splId",
        });

        // SPL - Presentation [one to many]
        SPL.hasMany(models.Presentation, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splId",
        });

        // SPL - Mark [one to many]
        SPL.hasMany(models.Mark, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splId",
        });
    };

    return SPL;
};
