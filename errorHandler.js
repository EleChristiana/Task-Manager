const errorHandler = (error, request, response, next) =>
    {
        if(error){
            console.log(error);
        if(error.message)
            {
                response.status(400).json(
                    {
                        status: "Failed",
                        message: error.message
                    })
            }else
            {
                response.status(400).json(
                    {
                        status: "Failed",
                        message: error
                    })
            }
            return;

        }else
        {
            next()
        }
    }



    module.exports= errorHandler;