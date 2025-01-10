class ApiResponse {
    constructor(statuscode, data, message = "Success") {
      (this.statuscode = statuscode),
        (this.message = message),
        (this.data = data),
        (this.success = statuscode < 400);
    }
  }
  export default { ApiResponse };
  