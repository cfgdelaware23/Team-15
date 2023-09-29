class HttpError extends Error {

    constructor(message,errorCode){
        super(message); //forward to error
        this.code = errorCode;
    }


};


module.exports = HttpError