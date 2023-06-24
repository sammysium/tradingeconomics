import END_POINTS from "../config/EndPoints";
import { News } from "../models/News";
import HttpWrapper from "./HttpWrapper";

class ServiceNews {
    private static instance: ServiceNews;
    constructor() {
        if (!ServiceNews.instance) {
            ServiceNews.instance = this
        }
        return ServiceNews.instance
    }

    async getLatestNews(): Promise<News[]> {
        try {
            return HttpWrapper.get(END_POINTS().news)
        } catch (error) {
            throw error
        }
    }
}

export default new ServiceNews()