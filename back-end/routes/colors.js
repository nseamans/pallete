const express = require('express');
const router = express.Router();
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// Load Palette model
const Palette = require('../models/Palette');

/** /test
 *  tests if routes in /colors are functional
 */
router.get('/test', (req, res) => {
    console.log("'Colors' Routes are functional");
    res.send("'Colors' Routes are functional");
});

/** /get_schemes
 * Gets the schemes requested by the search front end function. 
 */
router.post('/get_schemes', (req, res) => {
    const query = {
        Category: req.body.category,
        SubCategory: req.body.subcategory,
        MainColor: req.body.basecolor,
        Contrast: req.body.contrast
    };

    Palette.find(query).then(scheme => {
        res.json(scheme);
    });
});

// get_ui Route
router.get('/get_ui', (req, res) => {
    const query = {
        Category: "UI"
    }
    Palette.find(query).then(scheme => {
        res.json(scheme);
    });
});

// get_print route
router.get('/get_print', (req, res) => {
    const query = {
        Category: "PRINT"
    }
    Palette.find(query).then(scheme => {
        res.json(scheme);
    });
});

// get_art route
router.get('/get_art', (req, res) => {
    const query = {
        Category: "ART"
    }
    Palette.find(query).then(scheme => {
        res.json(scheme);
    });
});


// USER VERIFIED ROUTES
/*  Routes here require a bearer token for the user to access from the verifyToken 
    middlewear function. */

/** get_userschemes
 * Retrieves a json object containing all of the users schemes
 */
router.post('/get_userschemes', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({
                status: false,
                message: err
            });
        } else {
            const useremail = authData.user.email;
            const query = {
                email: sanitize(useremail)
            }
            Palette.find(query).then(scheme => {
                res.json(scheme);
            });
        };
    });
});

/** /submit_scheme
 *  Submit a color Scheme to the site.
 */
router.post('/create_scheme', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        let errors = [];
        const email = authData.user.email;
        const {
            Category,
            SubCategory,
            SchemeName,
            SchemeDescription,
            Contrast,
            BaseColor,
            Color1ID,
            Color2ID,
            Color3ID,
            Color4ID,
            Color5ID,
            Color6ID,
            Color7ID
        } = req.body;
        errors.push(testSchemeName(SchemeName),
            testDescription(SchemeDescription),
            testCategory(Category),
            testBaseColor(BaseColor),
            testColor(Color1ID, true),
            testColor(Color2ID, true),
            testColor(Color3ID, true),
            testColor(Color4ID, true),
            testColor(Color5ID, true),
            testColor(Color6ID, true),
            testColor(Color7ID, true));
        
        if (errors.includes(false)) {
            res.json({
                status: false,
                message: `Validation contains errors.`
            });
        };

        Palette.findOne({
            email: email,
            SchemeName: SchemeName
        }).then(scheme => {
            if (scheme) {
                res.json({
                    status: false,
                    message: `The theme ${SchemeName} already exists`
                });
            } else {
                const colorScheme = new Palette({
                    email: sanitize(email),
                    SchemeName: sanitize(SchemeName),
                    SchemeDescription: sanitize(SchemeDescription),
                    Category: sanitize(Category),
                    SubCategory: sanitize(SubCategory),
                    Contrast: sanitize(Contrast),
                    MainColor: sanitize(BaseColor),
                    Color1ID: sanitize(Color1ID),
                    Color2ID: sanitize(Color2ID),
                    Color3ID: sanitize(Color3ID),
                    Color4ID: sanitize(Color4ID),
                    Color5ID: sanitize(Color5ID),
                    Color6ID: sanitize(Color6ID),
                    Color7ID: sanitize(Color7ID)
                });
                /* function required to display and send error 
                   message for saving a color scheme. */
                function senderror(err) {
                    console.log(err);
                    res.json({
                        status: false,
                        message: `Error saving the color scheme`
                    });
                }
                colorScheme.save().then(scheme => {
                    res.json({
                        status: true,
                        message: `The scheme ${scheme.SchemeName} was created.`
                    });
                }).catch(err => senderror(err));
            };
        });
    });
});

/** /edit_scheme
 *  Submit a color Scheme to the site.
 */
router.post('/update_scheme', verifyToken, (req, res) => {
    let errors = [];
    const {
        SchemeDescription,
        SchemeName,
        Contrast,
        BaseColor,
        Color1ID,
        Color2ID,
        Color3ID,
        Color4ID,
        Color5ID,
        Color6ID,
        Color7ID
    } = req.body;

    errors.push(testSchemeName(SchemeName),
        testDescription(SchemeDescription),
        testBaseColor(BaseColor),
        testColor(Color1ID, true),
        testColor(Color2ID, true),
        testColor(Color3ID, true),
        testColor(Color4ID, true),
        testColor(Color5ID, true),
        testColor(Color6ID, true),
        testColor(Color7ID, true));
    if (errors.includes(false)) {
        res.json({
            status: false,
            message: `Validation contains errors.`
        });
    };
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({
                status: false,
                message: err
            });
        } else {
            const useremail = authData.user.email;
            const filter = {
                email: useremail,
                SchemeName: SchemeName
            };

            Palette.findOne(filter).then(scheme => {
                if (!scheme) {
                    res.json({
                        status: false,
                        message: `The theme ${SchemeName} does not exist`
                    });
                } else {
                    const update = {
                        email: sanitize(useremail),
                        SchemeName: scheme.SchemeName,
                        SchemeDescription: sanitize(SchemeDescription),
                        Contrast: Contrast,
                        MainColor: BaseColor,
                        Color1ID: sanitize(Color1ID),
                        Color2ID: sanitize(Color2ID),
                        Color3ID: sanitize(Color3ID),
                        Color4ID: sanitize(Color4ID),
                        Color5ID: sanitize(Color5ID),
                        Color6ID: sanitize(Color6ID),
                        Color7ID: sanitize(Color7ID)
                    };
                    Palette.findOne(filter)
                        .then(scheme => {
                            if (scheme) {
                                Palette.findOneAndUpdate(filter, update)
                                    .then(scheme => {
                                        console.log(`${SchemeName} UPDATED`);
                                        res.json({
                                            status: true,
                                            message: `The scheme ${SchemeName} was updated.`
                                        });
                                    })
                                    .catch(err => console.log(err));
                            } else {
                                console.log(`${SchemeName} NOT UPDATED`);
                                res.json({
                                    status: false,
                                    message: `The scheme ${SchemeName} was not able to be updated.`
                                });
                            }
                        }).catch(err => console.log(err));
                };
            });

        };
    });
});

router.post('/delete_scheme', verifyToken, (req, res) => {
    const filter = {
        _id: sanitize(req.body._id)
    };
    Palette.findOne(filter)
        .then(scheme => {
            if (scheme) {
                Palette.findOneAndDelete(filter)
                    .then(scheme => {
                        res.json({
                            status: true,
                            message: `The scheme was deleted.`,
                            info: scheme
                        });
                    })
                    .catch(err => console.log(err));
            } else {
                res.json({
                    status: false,
                    message: `The scheme does not exist`,
                    info: null
                });
            }
        })
        .catch(err => console.log(err));
});

// ---- FUNCTIONS ----

/** testSchemeName
 *  Tests the Scheme Names credentials
 * @param {*} name 
 * @returns 
 */
function testSchemeName(name) {
    if (name.length < 155 && name.length > 2) {
        return true;
    } else return false;
};

/** testDescription
 *  Tests the length of the description
 * @param {*} Description 
 */
function testDescription(description) {
    if (description.length < 1024) {
        return true;
    } else return false;
};

/** testColor
 *  Tests to see if a color matches the accepted CSS 
 *  hex patterns.
 * @param {string} color The hex pattern color
 * @param {boolean} required If the color is required
 */
function testColor(color, required) {
    const hexPattern = new RegExp('#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})');

    function hexlength(color) {
        if (color.length === 7 || color.length == 4) {
            return true;
        } else return false;
    }

    if (!_.isEqual(color.charAt(0), "#")) return false;

    if (required === true) {
        if (_.isString(color) && hexlength(color) === true) {
            if (hexPattern.test(color) === true) {
                return true;
            } else return false;
        } else return false;
    } else {
        if (_.isUndefined(color) || color === ``) return true;
        else {
            if (hexPattern.test(color) === true &&
                hexlength(color) === true) {
                return true;
            } else return false;
        };
    };
};

/** testCategory
 *  Tests if the the categories are exact.
 * @param {*} category 
 * @returns boolean
 */
function testCategory(category) {
    if (category === `UI`) {
        return true;
    } else if (category === `PRINT`) {
        return true;
    } else if (category === `ART`) {
        return true;
    } else return false;
};

/** testBaseColor 
 *  Tests if the base color is one of the following:
 *  PURPLE, BLUE, GREEN, YELLOW, ORANGE, RED
 * @param {*} basecolor 
 * @returns boolean
 */
function testBaseColor(basecolor) {
    if (basecolor === `PURPLE`) {
        return true;
    } else if (basecolor === `BLUE`) {
        return true;
    } else if (basecolor === `GREEN`) {
        return true;
    } else if (basecolor === `YELLOW`) {
        return true;
    } else if (basecolor === `ORANGE`) {
        return true;
    } else if (basecolor === `RED`) {
        return true;
    } else return false;
};

/** verifyToken
 *  Verifies a token sent through a header for a route
 */
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.json({
            status: false,
            message: `The user could not be authenticated.`
        });
    };
};

module.exports = router;