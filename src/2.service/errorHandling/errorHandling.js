function errorHandling(error) {
  console.log(error);
  let errorMessage;
  if (error.message) {
    errorMessage = error.message;
  }
  if (error.detail) {
    errorMessage = error.detail;
  } else {
    errorMessage = error;
  }

  return errorList["generalErrorReturn"](errorMessage);
}

const errorList = {
  generalErrorReturn(errorMessage) {
    console.log("errorHandling:    " + errorMessage);
    return errorMessage;
  },
};

export default errorHandling;
