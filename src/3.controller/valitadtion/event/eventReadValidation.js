const eventCreateDataValidation = (event) => {
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } = data;
    if (table, nameItenToSearch, valueItenToSearch, itenToReturn) {
      return { status: true, message: `field has been completed` };
    }
    throw { status: false, message: `All fields are mandatory` };
  };
  export default eventCreateDataValidation;
  