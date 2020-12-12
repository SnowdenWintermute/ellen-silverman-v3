module.exports = (obj) => {
  return {
    ...obj, [Symbol.iterator]() {
      let index = 0; // use index to track properties 
      let properties = Object.keys(this); // get the properties of the object 
      let Done = false; // set to true when the loop is done 
      return { // return the next method, need for iterator 
        next: () => {
          Done = (index >= properties.length);
          // define the object you will return done state, value eg Lila ,key eg 
          //name
          let obj = {
            done: Done,
            value: this[properties[index]],
            key: properties[index]
          };
          index++; // increment index
          return obj;
        }
      };
    }
  }
}