var mongoose=require('mongoose');
//Validation is Applied on every Field.
var recordSchema=mongoose.Schema({
    
    id: {
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        validate: {
            validator: function(text) {
                if (text !== null && text.length > 0)
                   return true;
            },
            message: 'FirstName is empty'
        }
    },
    lastname: {
        type: String,
        validate: {
            validator: function(text) {
                if (text !== null && text.length > 0)
                   return true;
            },
            message: 'LastName is empty'
        }

    },
    email: {
        type: String,
        pattern : "((?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.)+[A-Z]{2,63})",
        validate: {
            validator: function(text) {
                if (text !== null && text.length > 0)
                   return true;
            },
            message: 'Not valid Email'
        }

    },
    date: { 
        type: Date,
        pattern : "(19|20)[0-9]{2}[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])",
        validate: {
            validator: function(text) {
                if (text !== null && text.length > 0)
                   return true;
            },
            message: 'Not valid Date'
        }

    },
    Amount:{
        type:Number,
    }
});

module.exports=mongoose.model('tblWork',recordSchema);
