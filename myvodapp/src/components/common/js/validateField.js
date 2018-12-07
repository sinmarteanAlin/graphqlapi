const validateField = (fieldName, regex) => {
    let result;
    regex.test(fieldName) ? result = true : result = false;
    return result;
};

export default validateField;
