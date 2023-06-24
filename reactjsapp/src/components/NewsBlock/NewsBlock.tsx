import { News } from "../../models/News";

interface IProp {
    newsDetail: News
}

const NewsBlock =( {newsDetail}: IProp) => {
    if (newsDetail.title === "") return <></>

    return (<div className="bg-white overflow-hidden border-b-4 border-blue-500 w-100%">
    <div className="p-4 md:p-6">
      <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">News</p>
      <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">{newsDetail.title}</h3>
      <p className="leading-none">{newsDetail.description}</p>
      <div className="text-sm flex items-center mt-4">
        <p className="leading-none">{newsDetail.date}</p>
      </div>
    </div>
  </div>)
}

export default NewsBlock;