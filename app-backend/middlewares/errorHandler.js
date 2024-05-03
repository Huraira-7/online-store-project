import pkg  from 'joi';
const {ValidationError} = pkg;

const errorHandler = (error, req, res, next) => {
    
    let status = 500;                                     // default error status
    let data = {    message: 'Internal Server Error'   }  // default error message

    if (error instanceof ValidationError){
        status = 401;
        data.message = error.message;
        return res.status(status).json(data);
    }

    if (error.status)  {    status = error.status;   }

    if (error.message) {    data.message = error.message;  }

    return res.status(status).json(data);
}

export default errorHandler;