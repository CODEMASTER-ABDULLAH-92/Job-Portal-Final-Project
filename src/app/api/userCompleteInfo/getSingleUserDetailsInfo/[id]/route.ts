import dbConnect from "@/src/app/lib/db";
import userDetailsModel from "@/src/app/models/userDetails.model";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const singleUserDetails = await userDetailsModel.findOne({ userId: id });

    if (!singleUserDetails) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const hasMissingFields =
      !singleUserDetails.firstName ||
      !singleUserDetails.lastName ||
      !singleUserDetails.religion ||
      !singleUserDetails.contactNumber ||
      !singleUserDetails.instituteType ||
      !singleUserDetails.dateOfAdmission ||
      !singleUserDetails.programDiscipline ||
      !singleUserDetails.universityName ||
      !singleUserDetails.dateOfBirth ||
      !singleUserDetails.domicle ||
      !singleUserDetails.familyIncome ||
      !singleUserDetails.passportNumber ||
      !singleUserDetails.profileImage ||
      !singleUserDetails.countryName ||
      !singleUserDetails.province ||
      !singleUserDetails.district ||
      !singleUserDetails.city ||
      !singleUserDetails.fullAddress ||
      !singleUserDetails.programLevel ||
      !singleUserDetails.instituteName ||
      !singleUserDetails.schoolDiscipline ||
      !singleUserDetails.schoolObtaintedMarks ||
      !singleUserDetails.schoolTotalMarks ||
      !singleUserDetails.percentageOfMarks ||
      !singleUserDetails.secondaryProgramLevel ||
      !singleUserDetails.secondaryInstituteName ||
      !singleUserDetails.secondaryDiscipline ||
      !singleUserDetails.secondaryObtaintedMarks ||
      !singleUserDetails.secondaryTotalMarks ||
      !singleUserDetails.secondaryPercentageOfMarks ||
      !singleUserDetails.UniversityprogramLevel ||
      !singleUserDetails.UniversityinstituteName ||
      !singleUserDetails.UniversityschoolDiscipline ||
      !singleUserDetails.UniversityschoolObtaintedMarks ||
      !singleUserDetails.UniversityschoolTotalMarks ||
      !singleUserDetails.UniversitypercentageOfMarks ||
      !singleUserDetails.projectTitle ||
      !singleUserDetails.projectDescription ||
      !singleUserDetails.technologiesUsed ||
      !singleUserDetails.liveUrl ||
      !singleUserDetails.linkdinUrl ||
      !singleUserDetails.gitHubLink;

    const status = !hasMissingFields;

    return NextResponse.json({
      success: true,
      message: "Getting single User successfully",
      singleUserDetails,
      status,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in getting user details" },
      { status: 500 }
    );
  }
}
