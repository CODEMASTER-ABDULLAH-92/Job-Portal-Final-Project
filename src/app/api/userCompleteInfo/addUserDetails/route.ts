import dbConnect from "@/src/app/lib/db";
import userDetailsModel from "@/src/app/models/userDetails.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request: Request) {
  await dbConnect();

  try {
    const {
      firstName,
      lastName,
      religion,
      contactNumber,

      instituteType,
      dateOfAdmission,
      programDiscipline,
      universityName,
      dateOfBirth,
      domicle,
      familyIncome,
      passportNumber,
      //   profileImage,

      countryName,
      province,
      district,
      city,
      fullAddress,

      programLevel,
      instituteName,
      schoolDiscipline,
      schoolObtaintedMarks,
      schoolTotalMarks,
      percentageOfMarks,

      secondaryProgramLevel,
      secondaryInstituteName,
      secondaryDiscipline,
      secondaryObtaintedMarks,
      secondaryTotalMarks,
      secondaryPercentageOfMarks,

      UniversityprogramLevel,
      UniversityinstituteName,
      UniversityschoolDiscipline,
      UniversityschoolObtaintedMarks,
      UniversityschoolTotalMarks,
      UniversitypercentageOfMarks,

      projectTitle,
      projectDescription,
      technologiesUsed,
      liveUrl,
      linkdinUrl,
      gitHubLink,
    } = await request.json();

    // ✅ Personal Info
    {
      if (!firstName) {
        return NextResponse.json(
          { success: false, message: "First name is required" },
          { status: 400 }
        );
      }
      if (!lastName) {
        return NextResponse.json(
          { success: false, message: "Last name is required" },
          { status: 400 }
        );
      }
      if (!religion) {
        return NextResponse.json(
          { success: false, message: "Religion is required" },
          { status: 400 }
        );
      }
      if (!contactNumber) {
        return NextResponse.json(
          { success: false, message: "Contact number is required" },
          { status: 400 }
        );
      }

      // ✅ Academic Details
      if (!instituteType) {
        return NextResponse.json(
          { success: false, message: "Institute type is required" },
          { status: 400 }
        );
      }
      if (!dateOfAdmission) {
        return NextResponse.json(
          { success: false, message: "Date of admission is required" },
          { status: 400 }
        );
      }
      if (!programDiscipline) {
        return NextResponse.json(
          { success: false, message: "Program discipline is required" },
          { status: 400 }
        );
      }
      if (!universityName) {
        return NextResponse.json(
          { success: false, message: "University name is required" },
          { status: 400 }
        );
      }
      if (!dateOfBirth) {
        return NextResponse.json(
          { success: false, message: "Date of birth is required" },
          { status: 400 }
        );
      }
      if (!domicle) {
        return NextResponse.json(
          { success: false, message: "Domicle is required" },
          { status: 400 }
        );
      }
      if (!familyIncome) {
        return NextResponse.json(
          { success: false, message: "Family income is required" },
          { status: 400 }
        );
      }
      if (!passportNumber) {
        return NextResponse.json(
          { success: false, message: "Passport number is required" },
          { status: 400 }
        );
      }

      // ✅ Address
      if (!countryName) {
        return NextResponse.json(
          { success: false, message: "Country name is required" },
          { status: 400 }
        );
      }
      if (!province) {
        return NextResponse.json(
          { success: false, message: "Province is required" },
          { status: 400 }
        );
      }
      if (!district) {
        return NextResponse.json(
          { success: false, message: "District is required" },
          { status: 400 }
        );
      }
      if (!city) {
        return NextResponse.json(
          { success: false, message: "City is required" },
          { status: 400 }
        );
      }
      if (!fullAddress) {
        return NextResponse.json(
          { success: false, message: "Full address is required" },
          { status: 400 }
        );
      }

      // ✅ Matric
      if (!programLevel) {
        return NextResponse.json(
          { success: false, message: "Matric program level is required" },
          { status: 400 }
        );
      }
      if (!instituteName) {
        return NextResponse.json(
          { success: false, message: "Matric institute name is required" },
          { status: 400 }
        );
      }
      if (!schoolDiscipline) {
        return NextResponse.json(
          { success: false, message: "Matric discipline is required" },
          { status: 400 }
        );
      }
      if (!schoolObtaintedMarks) {
        return NextResponse.json(
          { success: false, message: "Matric obtained marks are required" },
          { status: 400 }
        );
      }
      if (!schoolTotalMarks) {
        return NextResponse.json(
          { success: false, message: "Matric total marks are required" },
          { status: 400 }
        );
      }
      if (!percentageOfMarks) {
        return NextResponse.json(
          { success: false, message: "Matric percentage is required" },
          { status: 400 }
        );
      }

      // ✅ Higher Secondary
      if (!secondaryProgramLevel) {
        return NextResponse.json(
          { success: false, message: "Intermediate program level is required" },
          { status: 400 }
        );
      }
      if (!secondaryInstituteName) {
        return NextResponse.json(
          {
            success: false,
            message: "Intermediate institute name is required",
          },
          { status: 400 }
        );
      }
      if (!secondaryDiscipline) {
        return NextResponse.json(
          { success: false, message: "Intermediate discipline is required" },
          { status: 400 }
        );
      }
      if (!secondaryObtaintedMarks) {
        return NextResponse.json(
          {
            success: false,
            message: "Intermediate obtained marks are required",
          },
          { status: 400 }
        );
      }
      if (!secondaryTotalMarks) {
        return NextResponse.json(
          { success: false, message: "Intermediate total marks are required" },
          { status: 400 }
        );
      }
      if (!secondaryPercentageOfMarks) {
        return NextResponse.json(
          { success: false, message: "Intermediate percentage is required" },
          { status: 400 }
        );
      }

      // ✅ University
      if (!UniversityprogramLevel) {
        return NextResponse.json(
          { success: false, message: "University program level is required" },
          { status: 400 }
        );
      }
      if (!UniversityinstituteName) {
        return NextResponse.json(
          { success: false, message: "University institute name is required" },
          { status: 400 }
        );
      }
      if (!UniversityschoolDiscipline) {
        return NextResponse.json(
          { success: false, message: "University discipline is required" },
          { status: 400 }
        );
      }
      if (!UniversityschoolObtaintedMarks) {
        return NextResponse.json(
          { success: false, message: "University obtained marks are required" },
          { status: 400 }
        );
      }
      if (!UniversityschoolTotalMarks) {
        return NextResponse.json(
          { success: false, message: "University total marks are required" },
          { status: 400 }
        );
      }
      if (!UniversitypercentageOfMarks) {
        return NextResponse.json(
          { success: false, message: "University percentage is required" },
          { status: 400 }
        );
      }

      // ✅ Projects
      if (!projectTitle) {
        return NextResponse.json(
          { success: false, message: "Project title is required" },
          { status: 400 }
        );
      }
      if (!projectDescription) {
        return NextResponse.json(
          { success: false, message: "Project description is required" },
          { status: 400 }
        );
      }
      if (!technologiesUsed) {
        return NextResponse.json(
          { success: false, message: "Technologies used are required" },
          { status: 400 }
        );
      }
      if (!liveUrl) {
        return NextResponse.json(
          { success: false, message: "Live URL is required" },
          { status: 400 }
        );
      }
      if (!linkdinUrl) {
        return NextResponse.json(
          { success: false, message: "LinkedIn URL is required" },
          { status: 400 }
        );
      }
      if (!gitHubLink) {
        return NextResponse.json(
          { success: false, message: "GitHub link is required" },
          { status: 400 }
        );
      }
    }

    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;
    const newUserDetails = new userDetailsModel({
      firstName,
      lastName,
      religion,
      contactNumber,

      instituteType,
      dateOfAdmission,
      programDiscipline,
      universityName,
      dateOfBirth,
      domicle,
      familyIncome,
      passportNumber,
      //   profileImage,

      countryName,
      province,
      district,
      city,
      fullAddress,

      programLevel,
      instituteName,
      schoolDiscipline,
      schoolObtaintedMarks,
      schoolTotalMarks,
      percentageOfMarks,

      secondaryProgramLevel,
      secondaryInstituteName,
      secondaryDiscipline,
      secondaryObtaintedMarks,
      secondaryTotalMarks,
      secondaryPercentageOfMarks,

      UniversityprogramLevel,
      UniversityinstituteName,
      UniversityschoolDiscipline,
      UniversityschoolObtaintedMarks,
      UniversityschoolTotalMarks,
      UniversitypercentageOfMarks,

      projectTitle,
      projectDescription,
      technologiesUsed,
      liveUrl,
      linkdinUrl,
      gitHubLink,
    });
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Now verify the token
    let decoded: any;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }
    await newUserDetails.save();

    return NextResponse.json({
      success: true,
      message: "Adding the user details successfully",
    });
  } catch (error) {
    console.error("Err in adding details", error);
    return NextResponse.json({
      success: false,
      message: "Err in adding User Details",
    });
  }
}
