/////////////////////////////////////////////{IMPORTING FILES}//////////////////////////////////////////////////////////////
const profileModel = require("../models/profileModel");
const { uploadFile } = require("../awsConfig/config");
const {
  isValid,
  isValidObjectId,
  isValidlength,
  isValidrequestBody,
  isValidName,
  isValidComapanyName,
  isValidIndianNumber,
  isValidEmail,
  isValidUrl,
  isValidSocialUrl,
} = require("../utils/validators");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const createProfile = async (req, res) => {
  try {
    if (!isValidrequestBody(req.body))
      return res
        .status(400)
        .json({ status: false, msg: "please provide profile details" });

    let {
      Name,
      Designation,
      companyName,
      contactNumber,
      email_Id,
      websiteUrl,
      socialUrls,
      companyLogo,
    } = req.body;

    if (!isValid(Name))
      return res
        .status(400)
        .json({ status: false, msg: "please provide name" });

    if (!isValidName(Name))
      return res.status(400).json({
        status: false,
        msg: "please provide valid name ! note-*-*-without any specail charsacter or numbers in bettwen",
      });

    if (!isValid(Designation))
      return res
        .status(400)
        .json({ status: false, msg: "please provide designation" });

    if (!isValidName(Designation))
      return res.status(400).json({
        status: false,
        msg: "please provide valid degisnation ! note-*-*-like ceo,clo,cfo,manager,team leader",
      });

    if (!isValid(companyName))
      return res
        .status(400)
        .json({ status: false, msg: "please provide company-name" });

    if (!isValidComapanyName(companyName))
      return res.status(400).json({
        status: false,
        msg: "please provide valid company name ! note-*-*-can include number and string",
      });

    let isCompanyNameUsed = await profileModel.findOne({ companyName });
    if (isCompanyNameUsed)
      return res
        .status(400)
        .json({ status: false, msg: `${companyName} already exists` });

    if (!isValid(contactNumber))
      return res
        .status(400)
        .json({ status: false, msg: "please provide contact-number" });

    if (!isValidIndianNumber(contactNumber))
      return res.status(400).json({
        status: false,
        msg: "please provide valid contact number ! note-*-*-can include +91 or 10 digits",
      });

    let isConatactNumberUsed = await profileModel.findOne({ contactNumber });
    if (isConatactNumberUsed)
      return res
        .status(400)
        .json({ status: false, msg: `${contactNumber} already exists` });

    if (!isValid(email_Id))
      return res
        .status(400)
        .json({ status: false, msg: "please provide email-address" });

    if (!isValidEmail(email_Id))
      return res
        .status(400)
        .json({ status: false, msg: "please provide valid email address" });

    let isEmailUsed = await profileModel.findOne({ email_Id });
    if (isEmailUsed)
      return res
        .status(400)
        .json({ status: false, msg: `${email_Id} already exists` });

    if (!isValid(websiteUrl))
      return res
        .status(400)
        .json({ status: false, msg: "please provide website-address" });

    if (!isValidUrl(websiteUrl))
      return res
        .status(400)
        .json({ status: false, msg: "please provide valid webiste address" });

    if (socialUrls) {
      let arr = socialUrls.split(",");
      for (let i = 0; i < arr.length; i++) {
        if (!isValidSocialUrl(arr[i]))
          return res.status(400).json({
            status: false,
            msg: `${arr[i]} is not a valid url address`,
          });
      }
    }

    if (!isValidrequestBody(req.files))
      return res
        .status(400)
        .json({ status: false, msg: "please provide company-logo" });

    companyLogo = await uploadFile(req.files[0]);

    const newProfile = {
      Name,
      Designation,
      companyName,
      contactNumber,
      email_Id,
      websiteUrl,
      socialUrls,
      companyLogo,
    };

    let createdProfile = await profileModel.create(newProfile);

    res.status(201).send({
      status: true,
      message: "profile created successfully",
      data: createdProfile,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getProfile = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id) && !isValidlength(req.params.id))
      return res
        .status(400)
        .json({ status: false, msg: "please invalid objectid" });

    let findProfile = await profileModel.findById(req.params.id);
    if (!findProfile)
      return res.status(400).json({ status: false, msg: "profile not found" });

    return res
      .status(200)
      .json({ status: false, msg: "profile found", data: findProfile });
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const updateProdfile = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id) && !isValidlength(req.params.id))
      return res
        .status(400)
        .json({ status: false, msg: "please invalid objectid" });

    let findProfile = await profileModel.findById(req.params.id);
    if (!findProfile)
      return res.status(400).json({ status: false, msg: "profile not found" });

    if (!isValidrequestBody(req.body))
      return res
        .status(400)
        .json({ status: false, msg: "please provide profile details" });

    let {
      Name,
      Designation,
      companyName,
      contactNumber,
      email_Id,
      websiteUrl,
      socialUrls,
      companyLogo,
    } = req.body;

    if (!isValid(Name))
      return res
        .status(400)
        .json({ status: false, msg: "please provide name" });

    if (!isValidName(Name))
      return res.status(400).json({
        status: false,
        msg: "please provide valid name ! note-*-*-without any specail charsacter or numbers in bettwen",
      });

    if (!isValid(Designation))
      return res
        .status(400)
        .json({ status: false, msg: "please provide designation" });

    if (!isValidName(Designation))
      return res.status(400).json({
        status: false,
        msg: "please provide valid degisnation ! note-*-*-like ceo,clo,cfo,manager,team leader",
      });

    if (!isValid(companyName))
      return res
        .status(400)
        .json({ status: false, msg: "please provide company-name" });

    if (!isValidComapanyName(companyName))
      return res.status(400).json({
        status: false,
        msg: "please provide valid company name ! note-*-*-can include number and string",
      });

    let isCompanyNameUsed = await profileModel.findOne({ companyName });
    if (isCompanyNameUsed)
      return res
        .status(400)
        .json({ status: false, msg: `${companyName} already exists` });

    if (!isValid(contactNumber))
      return res
        .status(400)
        .json({ status: false, msg: "please provide contact-number" });

    if (!isValidIndianNumber(contactNumber))
      return res.status(400).json({
        status: false,
        msg: "please provide valid contact number ! note-*-*-can include +91 or 10 digits",
      });

    let isConatactNumberUsed = await profileModel.findOne({ contactNumber });
    if (isConatactNumberUsed)
      return res
        .status(400)
        .json({ status: false, msg: `${contactNumber} already exists` });

    if (!isValid(email_Id))
      return res
        .status(400)
        .json({ status: false, msg: "please provide email-address" });

    if (!isValidEmail(email_Id))
      return res
        .status(400)
        .json({ status: false, msg: "please provide valid email address" });

    let isEmailUsed = await profileModel.findOne({ email_Id });
    if (isEmailUsed)
      return res
        .status(400)
        .json({ status: false, msg: `${email_Id} already exists` });

    if (!isValid(websiteUrl))
      return res
        .status(400)
        .json({ status: false, msg: "please provide website-address" });

    if (!isValidUrl(websiteUrl))
      return res
        .status(400)
        .json({ status: false, msg: "please provide valid webiste address" });

    if (socialUrls) {
      let arr = socialUrls.split(",");
      for (let i = 0; i < arr.length; i++) {
        if (!isValidSocialUrl(arr[i]))
          return res.status(400).json({
            status: false,
            msg: `${arr[i]} is not a valid url address`,
          });
      }
    }

    if (!isValidrequestBody(req.files))
      return res
        .status(400)
        .json({ status: false, msg: "please provide company-logo" });

    companyLogo = await uploadFile(req.files[0]);

    let updatedProfile = await profileModel.findByIdAndUpdate(
      {_id:req.params.id},
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({
        status: false,
        msg: "profile updated successfully",
        data: updatedProfile,
      });
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const deleteProfile = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id) && !isValidlength(req.params.id))
      return res
        .status(400)
        .json({ status: false, msg: "please invalid objectid" });

    let findProfile = await profileModel.findById(req.params.id);
    if (!findProfile)
      return res.status(400).json({ status: false, msg: "profile not found" });

    let deletedProfile = await profileModel.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({
        status: false,
        msg: "profile deleted successfully",
        data: deletedProfile,
      });
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = { createProfile, getProfile, deleteProfile, updateProdfile };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
