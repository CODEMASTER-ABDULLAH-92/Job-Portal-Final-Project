import { NextResponse } from "next/server";
import dbConnect from "@/src/app/lib/db";
import userDetailsModel from "@/src/app/models/userDetails.model";
import cloudinary from "@/src/app/lib/cloudinary";
export async function POST(request: Request) {
  await dbConnect();

  try {
    const formData = await request.formData();

    // 🔹 Get userId from formData (not from localStorage)
    const userId = formData.get("userId") as string;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }

    // 🔹 Extract fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const religion = formData.get("religion") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const instituteType = formData.get("instituteType") as string;
    const dateOfAdmission = formData.get("dateOfAdmission") as string;
    const programDiscipline = formData.get("programDiscipline") as string;
    const universityName = formData.get("universityName") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const domicle = formData.get("domicle") as string;
    const familyIncome = formData.get("familyIncome") as string;
    const passportNumber = formData.get("passportNumber") as string | null;
    const profileImage = formData.get("profileImage") as File | null;

    // 🔹 Address
    const countryName = formData.get("countryName") as string;
    const province = formData.get("province") as string;
    const district = formData.get("district") as string;
    const city = formData.get("city") as string;
    const fullAddress = formData.get("fullAddress") as string;

    // 🔹 School
    const programLevel = formData.get("programLevel") as string;
    const instituteName = formData.get("instituteName") as string;
    const schoolDiscipline = formData.get("schoolDiscipline") as string;
    const schoolObtaintedMarks = formData.get("schoolObtaintedMarks") as string;
    const schoolTotalMarks = formData.get("schoolTotalMarks") as string;
    const percentageOfMarks = formData.get("percentageOfMarks") as string;

    // 🔹 Secondary
    const secondaryProgramLevel = formData.get(
      "secondaryProgramLevel"
    ) as string;
    const secondaryInstituteName = formData.get(
      "secondaryInstituteName"
    ) as string;
    const secondaryDiscipline = formData.get("secondaryDiscipline") as string;
    const secondaryObtaintedMarks = formData.get(
      "secondaryObtaintedMarks"
    ) as string;
    const secondaryTotalMarks = formData.get("secondaryTotalMarks") as string;
    const secondaryPercentageOfMarks = formData.get(
      "secondaryPercentageOfMarks"
    ) as string;

    // 🔹 University
    const UniversityprogramLevel = formData.get(
      "UniversityprogramLevel"
    ) as string;
    const UniversityinstituteName = formData.get(
      "UniversityinstituteName"
    ) as string;
    const UniversityschoolDiscipline = formData.get(
      "UniversityschoolDiscipline"
    ) as string;
    const UniversityschoolObtaintedMarks = formData.get(
      "UniversityschoolObtaintedMarks"
    ) as string;
    const UniversityschoolTotalMarks = formData.get(
      "UniversityschoolTotalMarks"
    ) as string;
    const UniversitypercentageOfMarks = formData.get(
      "UniversitypercentageOfMarks"
    ) as string;

    // 🔹 Projects
    const projectTitle = formData.get("projectTitle") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const technologiesUsed = formData.get("technologiesUsed") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const linkdinUrl = formData.get("linkdinUrl") as string;
    const gitHubLink = formData.get("gitHubLink") as string;

    // 🔹 Upload Image to Cloudinary
    let imageUrl = null;
    if (profileImage) {
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      const base64Image = `data:${profileImage.type};base64,${buffer.toString(
        "base64"
      )}`;

      const uploadRes = await cloudinary.uploader.upload(base64Image, {
        folder: "user_profiles",
      });

      imageUrl = uploadRes.secure_url;
    }

    // 🔹 Build update object dynamically (only non-empty values)
    const updateData: any = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(religion && { religion }),
      ...(contactNumber && { contactNumber }),
      ...(instituteType && { instituteType }),
      ...(dateOfAdmission && { dateOfAdmission }),
      ...(programDiscipline && { programDiscipline }),
      ...(universityName && { universityName }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(domicle && { domicle }),
      ...(familyIncome && { familyIncome }),
      ...(passportNumber && { passportNumber }),
      ...(imageUrl && { profileImage: imageUrl }),

      // Address
      ...(countryName && { countryName }),
      ...(province && { province }),
      ...(district && { district }),
      ...(city && { city }),
      ...(fullAddress && { fullAddress }),

      // School
      ...(programLevel && { programLevel }),
      ...(instituteName && { instituteName }),
      ...(schoolDiscipline && { schoolDiscipline }),
      ...(schoolObtaintedMarks && { schoolObtaintedMarks }),
      ...(schoolTotalMarks && { schoolTotalMarks }),
      ...(percentageOfMarks && { percentageOfMarks }),

      // Secondary
      ...(secondaryProgramLevel && { secondaryProgramLevel }),
      ...(secondaryInstituteName && { secondaryInstituteName }),
      ...(secondaryDiscipline && { secondaryDiscipline }),
      ...(secondaryObtaintedMarks && { secondaryObtaintedMarks }),
      ...(secondaryTotalMarks && { secondaryTotalMarks }),
      ...(secondaryPercentageOfMarks && { secondaryPercentageOfMarks }),

      // University
      ...(UniversityprogramLevel && { UniversityprogramLevel }),
      ...(UniversityinstituteName && { UniversityinstituteName }),
      ...(UniversityschoolDiscipline && { UniversityschoolDiscipline }),
      ...(UniversityschoolObtaintedMarks && { UniversityschoolObtaintedMarks }),
      ...(UniversityschoolTotalMarks && { UniversityschoolTotalMarks }),
      ...(UniversitypercentageOfMarks && { UniversitypercentageOfMarks }),

      // Projects
      ...(projectTitle && { projectTitle }),
      ...(projectDescription && { projectDescription }),
      ...(technologiesUsed && { technologiesUsed }),
      ...(liveUrl && { liveUrl }),
      ...(linkdinUrl && { linkdinUrl }),
      ...(gitHubLink && { gitHubLink }),
    };
    // 🔹 Save or Update
    const user = await userDetailsModel.findOneAndUpdate(
      { userId }, // condition
      { $set: updateData }, // update only provided fields
      { new: true, upsert: true }
    );
    let allFields =
    !firstName || 
    !lastName || 
    !religion ||
    !contactNumber ||
    !instituteType ||
    !dateOfAdmission ||
    !programDiscipline ||
    !universityName ||
    !dateOfBirth ||
    !domicle ||
    !familyIncome ||
    !passportNumber ||
    !profileImage ||
    !countryName ||
    !province ||
    !district ||
    !city ||
    !fullAddress ||
    !programLevel ||
    !instituteName ||
    !schoolDiscipline ||
    !schoolObtaintedMarks ||
    !schoolTotalMarks ||
    !percentageOfMarks ||
    !secondaryProgramLevel ||
    !secondaryInstituteName ||
    !secondaryDiscipline ||
    !secondaryObtaintedMarks ||
    !secondaryTotalMarks ||
    !secondaryPercentageOfMarks ||
    !UniversityprogramLevel ||
    !UniversityinstituteName ||
    !UniversityschoolDiscipline ||
    !UniversityschoolObtaintedMarks ||
    !UniversityschoolTotalMarks ||
    !UniversitypercentageOfMarks ||
    !projectTitle ||
    !projectDescription ||
    !technologiesUsed ||
    !liveUrl ||
    !linkdinUrl ||
    !gitHubLink;
    let status: boolean;
    if (allFields) {
      status = false;
    }
    status = true
    return NextResponse.json({ success: true, user,status }, { status: 201 });
  } catch (error: any) {
    console.error("Err in adding details:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
