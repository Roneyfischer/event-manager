const eventCreateDataValidation = (event) => {
  if (
    (event.name,
    event.group,
    event.category,
    event.description,
    event.createDate,
    event.date,
    event.author,
    event.place,
    event.maxCapacityPerson)
  ) {
    return { status: true, message: `field has been completed` };
  }
  throw { status: false, message: `All fields are mandatory` };
};
export default eventCreateDataValidation;
