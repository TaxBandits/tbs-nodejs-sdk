const axios = require("axios"); /*Using axios to consume API service*/
const {
  publicAPIAuthentication,
} = require("../user/userController"); /*Importing publicAPIAuthentication from user controller for JWT token */

const listBusiness = async (req, res) => {
  try {
    // Getting JWT token by using oauth api function
    const jwtAccesstoken = await publicAPIAuthentication();
    if (jwtAccesstoken) {
      //Defining headers
      const config = {
        headers: {
          Authorization: `Bearer ${jwtAccesstoken}` /*Passing JWT token in Authorization */,
        },
      };

      //Reading Request body from the request
      const {
        Page,
        PageSize,
        TIN,
        TINType,
        FromDate,
        ToDate,
        SubmissionId,
        ReportNumber,
        ReportType,
      } = req.query;

      //Request BOIR List from Public API
      const reqQuery = `${Page ? `Page=${Page}&` : ""}${
        PageSize ? `PageSize=${PageSize}&` : ""
      }${TIN ? `TIN=${TIN}&` : ""}${TINType ? `TINType=${TINType}&` : ""}${
        FromDate ? `FromDate=${FromDate}&` : ""
      }${ToDate ? `ToDate=${ToDate}&` : ""}${
        SubmissionId ? `SubmissionId=${SubmissionId}&` : ""
      }${ReportNumber ? `ReportNumber=${ReportNumber}&` : ""}${
        ReportType ? `ReportType=${ReportType}&` : ""
      }`.slice(0, -1);

      const response = await axios.get(
        `${process.env.TBS_PUBLIC_API_BASE_URL}/BOIR/list?${reqQuery}`,
        config
      );

      if (response && response.status === 200) {
        res.status(200).send(response?.data);
      } else {
        res.status(400).send({});
      }
    } else {
      res.status(401).send({});
    }
  } catch (error) {
    res.status(400).send({});
  }
};

module.exports = {
  listBusiness,
};
