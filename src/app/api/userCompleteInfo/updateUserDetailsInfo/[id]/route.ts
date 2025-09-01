import dbConnect from "@/src/app/lib/db";
import userDetailsModel from "@/src/app/models/userDetails.model";
import { NextResponse } from "next/server";

export async function PUT(request:Request, context: {params: Promise<{id: string}>}){
    await dbConnect();
    try {
        const {id} = await context.params;
    const {firstName,
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
      gitHubLink,} = await request.json();
      const updateUserDetails = await userDetailsModel.findByIdAndUpdate(id,{firstName,
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
      gitHubLink},{new:true});

      if (!updateUserDetails) {
        return NextResponse.json({
        success:false,
        message:"User details Not Exist",
      })
      }
      return NextResponse.json({
        success:true,
        message:"Update successfully",
        updateUserDetails
      })
    } catch (error) {
        return NextResponse.json({
        success:false,
        message:"Err in Updating User",
      })
    }
}