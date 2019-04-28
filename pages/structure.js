// Subject

let Subject = {
    Admins: [
        [authorid]: bool // true -> super
    ],

    Author: {
        displayName: String,
        id: String,
        photoURL: String
    },

    Color: String,
    Description: String,
    Locale: "es",
    Read: String,
    Saves: Number,
    // Sections: []
    Tags: [String],
    Title: String,
    Visits: Number,
    createdAt: String,
    id: String
}

let Section = {
    Author: {
        displayName: String,
        id: String,
        photoURL: String
    },

    Pages: [{
        AuthorId: String,
        AuthorName: String,
        Read: String,
        Title: String,
        Type: String,
        id: String
    }],

    Title: String,
    id: String
}

let Page = {
    Author: {
        displayName: String,
        id: String,
        photoURL: String
    },

    Comments: [],
    Content: {
        // Depende de la plantilla
    },
    Read: String,
    Title: String,
    Type: String,
    id: String
}

let newPage= {
    Author: {
        displayName: String,
        id: String,
        photoURL: String
    },
    Comments: [],
    Content: {

    },
    Read: String,
    Type: String,
    Father: String, // Traemos el padre, despues el subject si el padre no lo es
    Visits: Number,
    createdAt: Timestamp,
    id: String,
    url: String,
}

let newSubject = {
    Author: {
        displayName: String,
        id: String,
        photoURL: String
    },
    Admins: [ // Obligado a tenerlo en la raiz, a pesar de que los hijos no lo tengan
        [authorid]: bool // true -> super
    ],
    Comments: [],
    Content: {
        Description: String,
        Tags: String
    },
    Read: String,
    Type: "subject",
    Father: "",
    Visits: Number,
    createdAt: Timestamp,
    id: String,
    url: String,
}