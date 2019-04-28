import db from '@/db'

var get = function(collection, doc) {
    return db.collection(collection).doc(doc).get()
}

var set = function(collection, doc, value) {
  return db.collection(collection).doc(doc).set(value, {merge: true})
}

var remove = function(collection, doc) {
  return db.collection(collection).doc(doc).delete()
}

var inc = function (collection, doc, element) {
  const ref = db.collection(collection).doc(doc)

  return db.runTransaction((t) => {
    return t.get(ref).then((tdoc) => {
      // tdoc doesn't exist; can't update
      if (!tdoc.exists) return;
      // update the users array after getting it from Firestore.
      var el = tdoc.get(element)
      el += 1

      t.set(ref, {
        [element]: el
      }, {
        merge: true
      });
    });
  });
}

var editElement = function(idFather, id, type, value) {
  //value.idFather, value.id, 'Read', value.Read

  const pageRef = db.collection('pages').doc(idFather)

  return db.runTransaction((t) => {
    return t.get(pageRef).then((doc) => {
      if (!doc.exists) return;

      var newElementsArray = doc.get('Content').Elements

      newElementsArray.forEach((el) => {
        if (el.id == id) {
          el[type] = value
        }
      })

      t.set(userRef, {
        Content: {
          Elements: newElementsArray
        }
      }, {
        merge: true
      });


    })
  })

}

var updatePublication = function (collection, value, elements) {
  const userRef = db.collection(collection).doc(value.authorId)

  return db.runTransaction((t) => {
    return t.get(userRef).then((doc) => {
      // doc doesn't exist; can't update
      if (!doc.exists) return;
      // update the users array after getting it from Firestore.
      var newPublicationsArray = doc.get('publications')
      var index = newPublicationsArray.findIndex(x => {
        return x.id == value.subjectId
      })

      for (let i = 0; i < elements.length; i++) {
        newPublicationsArray[index][elements[i]] = value[elements[i]]
      }

      // newPublicationsArray[index].Description = value.Description
      t.set(userRef, {
        publications: newPublicationsArray
      }, {
        merge: true
      });
    });
  });
}

var push = function(collection, doc, el, value) {
  const ref = db.collection(collection).doc(doc)

  return db.runTransaction((t) => {
    // TODO: Investigar como devolver el array correctamente
    return t.get(ref).then((tdoc) => {
      // tdoc doesn't exist; can't update
      if (!tdoc.exists) return;
      // update the users array after getting it from Firestore.
      var newArray = tdoc.get('Content')[el];

      newArray.push(value)
      
      t.set(ref, {
        Content: {
          [el]: newArray
        }
      }, {
        merge: true
      });
      
      return Promise.resolve(newArray)
    });
  });
}

var pull = function(collection, doc, el, value) {
  const ref = db.collection(collection).doc(doc)

  return db.runTransaction((t) => {
    return t.get(ref).then((tdoc) => {
      // tdoc doesn't exist; can't update
      if (!tdoc.exists) return;
      // update the users array after getting it from Firestore.
      var newArray = tdoc.get('Content')[el];
      const index = newArray.findIndex(saved => {
        return saved.id == value
      })

      newArray.splice(index, 1)

      t.set(ref, {
        Content: {
          [el]: newArray
        }
      }, {
        merge: true
      });

      return Promise.resolve(newArray)
    });
  });
}

var unshift = function(collection, doc, el, value) {
    const ref = db.collection(collection).doc(doc);


    return db.runTransaction((t) => {
        return t.get(ref).then((tdoc) => {
        // tdoc doesn't exist; can't update
        if (!tdoc.exists) return;
        // update the users array after getting it from Firestore.

        var newArray = tdoc.get(el);
        newArray.unshift(value)

        t.set(ref, {
            [el]: newArray
        }, {
            merge: true
        })

        return Promise.resolve(newArray)

        });

    }).catch();
}

var where = function(collection, ...conditions) {
  return db.collection(collection).where(conditions[0], conditions[1], conditions[2])
}

var ref = function(collection, doc) {
  return db.collection(collection).doc(doc)
}

var collection = function(col) {
  return db.collection(col)
}

var checkTitle = async function(collection, id) {
  var doc = await get(collection, id)
  console.log("Check: ", doc.exists)
  return doc.exists
}


export {
  get,
  set,
  remove,
  inc,
  updatePublication,
  editElement,
  unshift,
  push,
  pull,
  where,
  ref,
  collection,
  checkTitle
}