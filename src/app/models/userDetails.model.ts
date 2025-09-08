import mongoose, { Schema, Document } from "mongoose";

interface UserDetails extends Document {
  // Personal Info
  userId:string;
  firstName: string;
  lastName: string;
  religion: string;
  contactNumber: string;

  // Academic Details
  instituteType: string;
  required: true,
  dateOfAdmission: Date;
  programDiscipline: string;
  universityName: string;
  dateOfBirth: Date;
  domicle: string;
  familyIncome: string;
  passportNumber: string;
  profileImage: string;

  // Address
  countryName: string;
  province: string;
  district: string;
  city: string;
  fullAddress: string;

  // Matric
  programLevel: string;
  instituteName: string;
  schoolDiscipline: string;
  schoolObtaintedMarks: string;
  schoolTotalMarks: string;
  percentageOfMarks: string;

  // Higher Secondary
  secondaryProgramLevel: string;
  secondaryInstituteName: string;
  secondaryDiscipline: string;
  secondaryObtaintedMarks: string;
  secondaryTotalMarks: string;
  secondaryPercentageOfMarks: string;

  // University
  UniversityprogramLevel: string;
  UniversityinstituteName: string;
  UniversityschoolDiscipline: string;
  UniversityschoolObtaintedMarks: string;
  UniversityschoolTotalMarks: string;
  UniversitypercentageOfMarks: string;

  // Project
  projectTitle: string;
  projectDescription: string;
  technologiesUsed: string;
  liveUrl: string;
  linkdinUrl: string;
  gitHubLink: string;
}

const userDetailsSchema = new Schema<UserDetails>(
  {
     userId: {
      type: String,
      unique: true, // 🔹 one document per user
    },
    // Personal Info
    firstName: { type: String 
     },
    lastName: { type: String 
    },
    religion: { type: String 
    },
    contactNumber: { type: String 
    },

    // Academic Details
    instituteType: { type: String 
    },
    dateOfAdmission: { type: Date, required:true},
    programDiscipline: { type: String 
    },
    universityName: { type: String 
    },
    dateOfBirth: { type: Date, required:true},
    domicle: { type: String 
    },
    familyIncome: { type: String 
    },
    passportNumber: { type: String 
    },
    profileImage: { type: String 
    },

    // Address
    countryName: { type: String 
    },
    province: { type: String 
    },
    district: { type: String 
    },
    city: { type: String 
    },
    fullAddress: { type: String 
    },

    // Matric
    programLevel: { type: String 
    },
    instituteName: { type: String 
    },
    schoolDiscipline: { type: String 
    },
    schoolObtaintedMarks: { type: String 
    },
    schoolTotalMarks: { type: String 
    },
    percentageOfMarks: { type: String 
    },

    // Higher Secondary
    secondaryProgramLevel: { type: String 
    },
    secondaryInstituteName: { type: String 
    },
    secondaryDiscipline: { type: String 
    },
    secondaryObtaintedMarks: { type: String 
    },
    secondaryTotalMarks: { type: String 
    },
    secondaryPercentageOfMarks: { type: String 
    },

    // University
    UniversityprogramLevel: { type: String 
    },
    UniversityinstituteName: { type: String 
    },
    UniversityschoolDiscipline: { type: String 
    },
    UniversityschoolObtaintedMarks: { type: String 
    },
    UniversityschoolTotalMarks: { type: String 
    },
    UniversitypercentageOfMarks: { type: String 
    },

    // Project
    projectTitle: { type: String 
    },
    projectDescription: { type: String 
    },
    technologiesUsed: { type: String 
    },
    liveUrl: { type: String 
    },
    linkdinUrl: { type: String 
    },
    gitHubLink: { type: String 
    },
  },
  { timestamps: true }
);

const userDetailsModel =
  (mongoose.models.UserDetails as mongoose.Model<UserDetails>) ||
  mongoose.model<UserDetails>("UserDetails", userDetailsSchema);

export default userDetailsModel;
