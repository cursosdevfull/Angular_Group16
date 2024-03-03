import "./style.css";

const promise = new Promise((resolve, reject) => {
  try {
    console.time("INICIO");
    const http = new XMLHttpRequest();
    http.open("get", "https://jsonplaceholder.typicode.com/users");
    http.onload = (response) => {
      console.timeEnd("INICIO");
      if (http.readyState === 4 && http.status === 200) {
        const users = JSON.parse(http.responseText);
        resolve(users);
      } else if (http.readyState === 4 && http.status !== 200) {
        reject({
          status: http.status,
          message: http.statusText,
        });
      }
    };

    http.send();
  } catch (error) {
    console.log("Ocurrió un error");
    reject(error);
  }
});

promise.then((result) => {
  console.table(result);
});

promise.catch((error) => {
  console.log(error);
});

/*
promise
  .then((result) => {
    console.table(result);
  })
  .catch((error) => {
    console.log(error);
  });
  */

/*
promise.then(
  (result) => {
    console.table(result)
  },
  (error) => {
    console.log(error)
  }
);
*/
