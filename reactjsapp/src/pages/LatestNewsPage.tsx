import { useEffect, useState } from "react"
import { News } from "../models/News"
import ServiceNews from "../network/ServiceNews"
import NewsBlock from "../components/NewsBlock/NewsBlock"
import Layout from "../components/Layout"

const LatestNewsPage = () => {
    const [latestNews, setNews] = useState<News[]>([])
  
    useEffect(()=>{
      ServiceNews.getLatestNews().then(news=>{
        setNews(news)
      }).catch(e=>{
        setNews([])
      })
    }, [])

    return (      
       <Layout>
        {latestNews.map((d, key) => (
        <NewsBlock
          key={d.id.toString()}
          newsDetail={d}
        />
      ))}
       </Layout>
      )

}

export default LatestNewsPage;