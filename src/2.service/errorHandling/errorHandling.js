import chalk from "chalk";
function errorHandling(error) {
  console.log(error);
  // const errorMessage = error;

  if (error.message) {
    const errorMessage = error.message;
    return errorList["generalErrorReturn"](errorMessage);
  }
  if (error.detail) {
    const errorMessage = error.detail;
    return errorList["generalErrorReturn"](errorMessage);
  } else {
    const errorMessage = error;
    return errorList["generalErrorReturn"](errorMessage);
  }
}

const errorList = {
  generalErrorReturn: (errorMessage) => {
    console.log(chalk.red.bold.italic(errorMessage));
    return errorMessage;
  },
};

export default errorHandling;
