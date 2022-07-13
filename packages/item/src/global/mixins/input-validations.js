const inputValidations = {

    methods: {
         numericCheck(event) {
            // to avoid default behaviour of input field of type number
            ["e", "E", "+", "-"].includes(event.key) && event.preventDefault();
        }
    }
}

export default inputValidations
