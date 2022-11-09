const eventCreateDataValidation = (event) => {

  if (
    (event._singularEvent,
    event._singularGroup,
    event._singularCategory,
    event._description,
    event._createDate,
    event._date,
    event.singularUserId,
    event._place,
    event._maxCapacityPerson)
  ) {
    console.log("> [eventCreateDataValidation] Data has been validated");
    return { status: true, message: `field has been completed` };
  }
  throw { status: false, message: `All fields are mandatory` };
};
export default eventCreateDataValidation;
