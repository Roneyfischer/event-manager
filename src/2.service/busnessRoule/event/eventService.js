const eventService = {
  firstSave: (data) => {
    const { eventName, eventId } = data;

    //editar pra adicionar corretamente ao DB
    // const { singularUser, cpf, email, pass } = await reqBody;
    // const passEncrypted = await cryptoArgon2.encrypt(pass);

    // const table = "users";
    // const fieldName = `"singularUser", "cpf", "email", "pass"`;
    // const fieldValue = [singularUser, cpf, email, passEncrypted];

    // return (await dbMethod.add(table, fieldName, fieldValue)).message;

    return {
      status: true,
      message: "ok",
      id: "id",
      subscriberNumber: "subscriberNumber",
      subscribers: "subscribers",
    };
  },
  //    read = (data) => {
  //      { eventName, eventId } = data;
  //   };

  //    subscribre = (data) => {
  //      { userCpf, pass } = data;
  //   };

  //    unsubscribre = (data) => {
  //      { userCpf, pass } = data;
  //   };

  //    cancel = (data) => {
  //      { userCpf, pass } = data;
  //   };

  //    delet = (data) => {
  //      { userCpf, pass } = data;
  //   };

  //    eventName = (data) => {
  //     this.eventName;
  //   };
  //    eventGroup = (data) => {
  //     this.eventGroup;
  //   };
  //    eventCategory = (data) => {
  //     this.eventCategory;
  //   };
  //    eventDescription = (data) => {
  //     this.eventDescription;
  //   };
  //    eventCreateDate = (data) => {
  //     this.eventCreateDate;
  //   };
  //    eventDate = (data) => {
  //     this.eventDate;
  //   };
  //    eventAuthor = (data) => {
  //     this.eventAuthor;
  //   };
  //    eventPlace = (data) => {
  //     this.eventPlace;
  //   };
  //    maxCapacityPersonEvent = (data) => {
  //     this.maxCapacityPersonEvent;
  //   };
};

export default eventService;
