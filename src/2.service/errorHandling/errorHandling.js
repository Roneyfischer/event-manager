
function errorHandling (error) {

    const errorMessage = (errorHandling.errorMessage.replace(/ /, "_")).replace(/(,)/, "_")


}

const errorList = {

    generalErrorReturn (errorMessage) {
        return errorMessage
    }
}

export default errorHandling