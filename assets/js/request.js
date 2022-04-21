export class Request {

 async get(url) {

  const response = await fetch(url);
  const responseData = await response.json();

  return responseData;

 }
 async post(url, data) {
  console.log(url);
  const response = await fetch(url, {
   method: "POST",
   body: JSON.stringify(data),
   headers: {
    "Content-type": "application/json",
    "Authorization": "Basic REd3cEIia3spV295VVc3G2FtVjNZbWx1"
   }
  });
  const responseData = await response.json();
  return responseData;
 }
}