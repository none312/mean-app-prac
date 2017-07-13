var Contact = require('../models/contacts');

module.exports = function(router) {

    //Route for adding new contact
    router.post('/contacts', function(req, res) {
        var contact = new Contact();
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.number = req.body.number;
        if (req.body.name == null || req.body.name == '' || req.body.email == null || req.body.email == '' || req.body.number == null || req.body.number == '') {
            res.send("Ensure name, email, and phone number are provided");
        } else {
            contact.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("New contact created");
                }
            });
        }
    });

    //Get all contacts
    router.get('/contacts', function(req, res) {
        Contact.find(function(err, contacts) {
            if (err)
                res.send(err);

            res.json(contacts);
        });
    });

router.route('/contacts/:contact_id')
    // get contact by its ID
    .get(function(req, res) {
        Contact.findById(req.params.contact_id, function(err, contact) {
            if (err)
                res.send(err);
            res.json(contact);
        });
    })

    // update the bear with this id
    .put(function(req, res) {
        Contact.findById(req.params.contact_id, function(err, contact) {

            if (err)
                res.send(err);

            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.number = req.body.number;

            contact.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Contact updated!' });
            });

        });
    })
    return router;
};
