const NFC   = {

    run : (data = false) => {
        var status = true;
        var message = "";

        if(data){
            data.reverse().forEach(function(v) {
                if (v.value === "" || v.value === null) {
                    status = false;
                    message = v.message;
                }
            });

            var result = {
                status: status,
                message: message
            };
        }

        return result;
    }

}