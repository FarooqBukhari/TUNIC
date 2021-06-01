export const validateUserInfo = (name, email, password, confirmPassword) => {
    let messages = []
    if (!name) messages.push("Name cannot be empty");
    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) messages.push("Invalid Email");
    if (password !== confirmPassword) messages.push("Passwords do not match");
    if (password.length < 6) messages.push("Password should be greator than 6 characters");
    return messages;
}