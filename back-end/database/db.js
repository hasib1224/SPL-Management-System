"use strict";

import { Sequelize, Op, DataTypes } from "sequelize";
import { dbConfig } from "../config/database-config.js";

// create sequelize instance
const sequelize = new Sequelize(dbConfig.database_name, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    define: {
        freezeTableName: true,
    },
    logging: false,
});

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

// db scaffolding
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

// all models would stored here
db.models = {};

// users
import User from "../models/users/User.js";
import Teacher from "../models/users/Teacher.js";
import Student from "../models/users/Student.js";
import StudentSupervisor from "../models/users/StudentSupervisor.js";

// 1. spls
import SPL from "../models/spls/SPL.js";
import StudentSPL from "../models/spls/StudentSPL.js";
import SPLEvaluator from "../models/spls/SPLEvaluator.js";

// 2. committees
import SPLCommittee from "../models/committees/SPLCommittee.js";
import TeacherCommittee from "../models/committees/TeacherCommittee.js";

// 3. teams
import Team from "../models/teams/Team.js";
import StudentTeam from "../models/teams/StudentTeam.js";

// 4. projects
import Project from "../models/projects/Project.js";
import StudentProject from "../models/projects/StudentProject.js";

// 5. notifications
import Notification from "../models/notifications/Notification.js";
import UserNotification from "../models/notifications/UserNotification.js";
import StudentRequest from "../models/notifications/StudentRequest.js";
import TeamRequest from "../models/notifications/TeamRequest.js";

// 6. fields
import InterestedField from "../models/fields/InterestedField.js";
import UserField from "../models/fields/UserField.js";

// 7. marks
import Presentation from "../models/marks/Presentation.js";
import Mark from "../models/marks/Mark.js";
import PresentationMark from "../models/marks/PresentationMark.js";
import ContinuousMark from "../models/marks/ContinuousMark.js";

// users
db.models.User = User(sequelize, DataTypes, Op);
db.models.Teacher = Teacher(sequelize, DataTypes, Op);
db.models.Student = Student(sequelize, DataTypes, Op);
db.models.StudentSupervisor = StudentSupervisor(sequelize, DataTypes, Op);

// 1. spls
db.models.SPL = SPL(sequelize, DataTypes, Op);
db.models.StudentSPL = StudentSPL(sequelize, DataTypes, Op);
db.models.SPLEvaluator = SPLEvaluator(sequelize, DataTypes, Op);

// 2. committees
db.models.SPLCommittee = SPLCommittee(sequelize, DataTypes, Op);
db.models.TeacherCommittee = TeacherCommittee(sequelize, DataTypes, Op);

// 3. teams
db.models.Team = Team(sequelize, DataTypes, Op);
db.models.StudentTeam = StudentTeam(sequelize, DataTypes, Op);

// 4. projects
db.models.Project = Project(sequelize, DataTypes, Op);
db.models.StudentProject = StudentProject(sequelize, DataTypes, Op);

// 5. notifications
db.models.Notification = Notification(sequelize, DataTypes, Op);
db.models.UserNotification = UserNotification(sequelize, DataTypes, Op);
db.models.StudentRequest = StudentRequest(sequelize, DataTypes, Op);
db.models.TeamRequest = TeamRequest(sequelize, DataTypes, Op);

// 6. fields
db.models.InterestedField = InterestedField(sequelize, DataTypes, Op);
db.models.UserField = UserField(sequelize, DataTypes, Op);

// 7. marks
db.models.Presentation = Presentation(sequelize, DataTypes, Op);
db.models.Mark = Mark(sequelize, DataTypes, Op);
db.models.PresentationMark = PresentationMark(sequelize, DataTypes, Op);
db.models.ContinuousMark = ContinuousMark(sequelize, DataTypes, Op, Sequelize);

// initialize associations
Object.entries(db.models).forEach(([name, model]) => {
    if (model.associate) {
        model.associate(db.models);
    }
});

console.log("Number of table: ", Object.keys(db.models).length);

sequelize.sync();

// drop all tables
// sequelize.drop({ force: true });


const { models } = db;
export { db, Op, Sequelize, sequelize, models };
