import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const LoginUser = async (req,res) => {
  try {
    const {password,email} = req.body;
    
    if ( !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const isUserExist = await userModel.findOne({email});
    if (!isUserExist) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password,isUserExist.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({_id:isUserExist._id},process.env.JWT_SECRET, {expiresIn:"7d"});

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return response
    return res.status(201).json({
      success: true,
      message:res.message,
      token,
      isUserExist: {
        id:isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
      },
    });
  } catch (error) {
    console.error("Logged IN Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}




