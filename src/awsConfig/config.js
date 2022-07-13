const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: `${process.env.KEY_ID}`,
  secretAccessKey: `${process.env.SECRET_KEY}`,
  region: "ap-south-1",
});

let uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });
    var uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "assignment/propel" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) return reject({ error: err });
      console.log(data);
      console.log(`File uploaded successfully. ${data.Location}`);
      return resolve(data.Location);
    });
  });
};

module.exports = { uploadFile };
