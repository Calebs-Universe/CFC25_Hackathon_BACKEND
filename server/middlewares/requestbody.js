function VALIDATE_REQUEST_BODY(request, response, next) {

    if (!request.body) { 

        response.status(400).json({ message: "Request's body is required !" }); 
    } else { next(); }
}

export default VALIDATE_REQUEST_BODY;