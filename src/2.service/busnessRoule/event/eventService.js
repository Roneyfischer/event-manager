const eventService = {
  firstSave: (data) => {
   
    //editar pra adicionar corretamente ao DB
    const name = data.name;
    const group = data.group;
    const category =data.category;
    const description =data.description;
    const createDate =data.createDate;
    const date = data.date;
    const author =data.author;
    const place =data.place;
    const maxCapacityPerson = data.maxCapacityPerson
    
    
   //const {id, _subscriberNumber, _subscribers} isso funciona?
    // const passEncrypted = await cryptoArgon2.encrypt(pass);

    const table = "events";
    //no DB deve ser tudo not null
     const fieldName = `"name", //deve ser uinique
    "group",
    "category",
    "description",
    "createDate",
    "date",
    "author",
    "place",
    "maxCapacityPerson"`;
    const fieldValue = [name,
    group,
    category,
    description,
    createDate,
    date,
    author,
    place,
    maxCapacityPerson];

    const returnAddDb = await dbMethod.add(table, fieldName, fieldValue));
    //pode retornar "_id _subscriberNumber, _subscribers" em uma read do DB, msa não precisa na etapa de criação.
    return await {
      status: true,
      message: returnAddDb.message,      
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
