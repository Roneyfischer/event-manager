const eventCreateDataValidation = (event) => {
  console.log("> [eventCreateDataValidation] Validating data")
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } = data;
    if (table, nameItenToSearch, valueItenToSearch, itenToReturn) {
      return { status: true, message: `field has been completed` };
    }
    throw { status: false, message: `All fields are mandatory` };
  };
  export default eventCreateDataValidation;
  