const eventCreateDataValidation = (event) => {

  if (
    (event.singularEvent,
    event.singularGroup,
    event.singularCategory,
    event.description, 
    event.date,
    event.singularUserId,
    event.place,
    event.maxCapacityPerson)
  ) {
    console.log("> [eventCreateDataValidation] Data has been validated");
    return { status: true, message: `field has been completed` };
  }
  throw { status: false, message: `All fields are mandatory` };
};
export default eventCreateDataValidation;
