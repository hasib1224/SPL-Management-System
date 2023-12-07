"use strict";

// Presentation Evaluator of SPL
export default (sequelize, DataTypes) => {
    const SPLEvaluator = sequelize.define("SPLEvaluators", {
        splId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "SPLs",
                key: "splId",
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

    return SPLEvaluator;
};
