import axios from "axios";

const config = {
    headers:{
      "Access-Control-Allow-Origin": "*"
    }
  };

class HttpWrapepr {
    private static instance: HttpWrapepr;
    constructor() {
        if (!HttpWrapepr.instance) {
            HttpWrapepr.instance = this
        }
        return HttpWrapepr.instance
    }


    get = async (url: string) => {
        try {
          return (await axios.get(url)).data;
        } catch (error) {
          throw error;
        }
      };
}

export default new HttpWrapepr();