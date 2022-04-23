export class Request {
    constructor() {
        this.headers = {
            "Authorization": 'Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1',
            "Content-Type": 'application/json'
        }
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.headers

        });
        const responseData = await response.json();
        return responseData;
    }
}