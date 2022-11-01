function errorHandling(error) {
  const errorMessage = error.replace(/ /, "_");
  const errorMessageReplaced = errorMessage.replace(/(,)/, "_");
  return errorList["generalErrorReturn"](errorMessage);
}

const errorList = {
  generalErrorReturn(errorMessage) {
    console.log("errorHandling:    " + errorMessage);
    return errorMessage;
  },
};

export default errorHandling;
