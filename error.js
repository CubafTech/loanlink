// this is just an error handler to
// avoid displaying critical infor to the user


export const createError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message   
    return err
}