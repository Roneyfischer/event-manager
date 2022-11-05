const eventCreateDataValidation = (event) => {
  console.log("> [eventCreateDataValidation] Validating data")
  if (
    (event.singularEvent,
    event.singularGroup,
    event.singularCategory,
    event.description,
    event.createDate,
    event.date,
    event.singularUser,
    event.place,
    event.maxCapacityPerson)
  ) {
    console.log("> [eventCreateDataValidation] Data has been validated")
    return { status: true, message: `field has been completed` };
  }
  throw { status: false, message: `All fields are mandatory` };
};
export default eventCreateDataValidation;
