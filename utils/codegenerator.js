export const generateCode = (req, res, next) => {
    const result = Math.floor((Math.random() * 100000000) + 1);
    return (result)
//     next()
    
}