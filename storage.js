import firebase from "./firebase"

const storage = firebase.storage()

firebase.storage().ref().constructor.prototype.putFiles = function (files) {
    console.log(files)
    var ref = this;
    return Promise.all(files.map(function (file) {
        return ref.child(file.name).put(file);
    }));
}

export default storage
