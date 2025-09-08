import dbConnect from "@/src/app/lib/db";
import userDetailsModel from "@/src/app/models/userDetails.model";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
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

    const requiredFields = [
      "firstName",
      "lastName",
      "religion",
      "contactNumber",
      "instituteType",
      "dateOfAdmission",
      "programDiscipline",
      "universityName",
      "dateOfBirth",
      "domicle",
      "familyIncome",
      "passportNumber",
      "profileImage",
      "countryName",
      "province",
      "district",
      "city",
      "fullAddress",
      "programLevel",
      "instituteName",
      "schoolDiscipline",
      "schoolObtaintedMarks",
      "schoolTotalMarks",
      "percentageOfMarks",
      "secondaryProgramLevel",
      "secondaryInstituteName",
      "secondaryDiscipline",
      "secondaryObtaintedMarks",
      "secondaryTotalMarks",
      "secondaryPercentageOfMarks",
      "UniversityprogramLevel",
      "UniversityinstituteName",
      "UniversityschoolDiscipline",
      "UniversityschoolObtaintedMarks",
      "UniversityschoolTotalMarks",
      "UniversitypercentageOfMarks",
      "projectTitle",
      "projectDescription",
      "technologiesUsed",
      "liveUrl",
      "linkdinUrl",
      "gitHubLink",
    ];

    const hasMissingFields = requiredFields.some(
      (field) => !singleUserDetails[field]
    );

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
