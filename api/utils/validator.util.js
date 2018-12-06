module.exports = {
    validateUsername: (value) => {
        if (!value) {
            return 'Username is not specified!';
        }

        if (typeof value !== 'string') {
            return 'Incorrect username!';
        }

        if (value.length < 5) {
            return 'Username should contain at least 5 characters!';
        }

        return false;
    },

    validateEmailAddress: (value) => {
        if (!value) {
            return 'Email address is not specified!';
        }
        
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(value).toLowerCase())) {
            return 'Incorrect Email address!';
        }
        
        return false;
    },

    validatePassword: (value) => {
        if (!value) {
            return 'Password is not specified!';
        }

        if (typeof value !== 'string') {
            return 'Incorrect password!';
        }

        if (value.length < 5) {
            return 'Password should contain at least 5 characters!';
        }

        return false;
    },

    validateRePassword: (value) => {
        if (!value) {
            return 'Password confirmation is not specified!';
        }

        if (typeof value !== 'string') {
            return 'Incorrect confirmation password!';
        }

        if (value.length < 5) {
            return 'Confirmation Password should contain at least 5 characters!';
        }

        return false;
    }
};