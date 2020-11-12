module.exports = async function (context, mytrigger, input, input1) {
    {
        context.log("JavaScript trigger function processed a request.");
        return {
            body: "Hello, World!"
        };
    }

}