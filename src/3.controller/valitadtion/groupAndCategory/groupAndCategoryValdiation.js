const groupAndCategoryValdiation = async (reqBody) => {
  console.log("> [groupAndCategoryValdiation] Validating data")

    const {singularUser, singularData} = reqBody

    if (singularUser, singularData) {
      
      console.log("> [groupAndCategoryValdiation] Data has been validated")

        return { status: true, message: `field has been completed` };
      }
      throw { status: false, message: `All fields are mandatory` };
};

export default groupAndCategoryValdiation;
