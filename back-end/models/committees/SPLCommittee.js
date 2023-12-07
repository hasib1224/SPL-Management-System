"use strict";

export default (sequelize, DataTypes, Op) => {
    const SPLCommittee = sequelize.define("SPLCommittees", {
        committeeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        splId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "SPLs",
                key: "splId",
            },
        },
        committeeHead: {
            type: DataTypes.INTEGER,
            references: {
                model: "Teachers",
                key: "teacherId",
            },
        },
    });

    SPLCommittee.associate = (models) => {
        // Teacher - SPLCommittee [one to many]
        SPLCommittee.belongsTo(models.Teacher, {
            as: "CommitteeHead",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "committeeHead",
        });

        // Teacher - SPLCommittee [many to many]
        SPLCommittee.belongsToMany(models.Teacher, {
            as: "CommitteeMembers",
            through: models.TeacherCommittee,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "committeeId",
        });

        // SPL - SPLCommittee [one to one]
        SPLCommittee.belongsTo(models.SPL, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "splId",
        });
    };

    return SPLCommittee;
};
