import mongoose , {Schema, Document} from "mongoose";

export interface Admin extends Document {
  userName: string;
  email: string;
  password: string; // hashed password
  mobile: string; // full phone number with country code
  countryCode: string; // e.g. +61
  otp?: string;
  otpExpiry?: Date;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
}

const adminSchema: Schema<Admin> = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      trim: true,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiry: {
      type: Date,
    },
  },{timestamps:true});

const adminModel = (mongoose.models.Admin as mongoose.Model<Admin>)|| (mongoose.model("Admin", adminSchema))

export default adminModel;