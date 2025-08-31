import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface Job extends Document {
  jobName: string;
  location: string;
  description: string;
  jobStatus: string;
  jobType: string;
  salary: string;
  experienceLevel: string;
  responsibilities: string;
  requirements: string;
  admin: Types.ObjectId; // reference to Admin
}

const jobSchema = new Schema<Job>(
  {
    jobName: {
      type: String,
      required: [true, "Job name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    jobStatus: {
      type: String,
      default: "open",
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
    },
    experienceLevel: {
      type: String,
      required: [true, "Experience level is required"],
    },
    responsibilities: {
      type: String,
      required: [true, "Responsibilities are required"],
    },
    requirements: {
      type: String,
      required: [true, "Requirements are required"],
    },

    // ✅ Reference to Admin
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin", 
      required: true,
    },
  },
  { timestamps: true }
);

const JobModel: Model<Job> =
  mongoose.models.Job || mongoose.model<Job>("Job", jobSchema);

export default JobModel;
