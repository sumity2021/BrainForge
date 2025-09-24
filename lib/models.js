import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  subject: {
    type: String,
    required: true,
    enum: ["dsa", "cpp", "sql", "oops", "java", "os", "dbms", "cn"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswerId: {
    type: Number,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
});

const challengeQuotaSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  challengesGenerated: {
    type: Number,
    default: 0,
  },
  lastResetDate: {
    type: Date,
    default: Date.now,
  },
});

export const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema);
export const ChallengeQuota =
  mongoose.models.ChallengeQuota ||
  mongoose.model("ChallengeQuota", challengeQuotaSchema);
