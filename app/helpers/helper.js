exports.response = (res, status, message, data) => {
    let response = {
        status: status,
    }

    if (message !== null) {
        response.message = message
    }

    if (data !== null) {
        response.data = data
    }

    return res.status(200).send(response)
}
