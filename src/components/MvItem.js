import './Mv.css';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function MvItem() {

  const movieCd = useParams().movieCd;

  const [mv, setMv] = useState();

  const category = {
    movieNm: '영화명',
    openDt: '개봉일',
    prdtStatNm: '제작상태',
    watchGradeNm: '관람등급',
    showTm: '상영시간',
    nationNm: '제작국가',
    directors: '감독',
    genreNm: '장르',
    companyNm: '배급사',
  };

  useEffect(() => {
    let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=' + movieCd;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        let temp = data.movieInfoResult.movieInfo;
        setMv(
          <>
            <ul className='infoUl'>
              <li className='infoNm'>
                {temp.movieNm}
              </li>
              <li key={movieCd} className='infoLi'>
            <span className='kspan'>{category.openDt}</span>
                <span className='vspan'>{temp.openDt}</span>
              </li>
              <li>
                <span className='kspan'>{category.prdtStatNm}</span>
                <span className='vspan'>{temp.prdtStatNm}</span>
              </li>
              <li>
            <span className='kspan'>{category.watchGradeNm}</span>
              <span className='vspan'>{temp.audits[0].watchGradeNm}</span>
              </li>
              <li>
                <span className='kspan'>{category.showTm}</span>
                <span className='vspan'>{temp.showTm}</span>
              </li>
              <li>
                <span className='kspan'>{category.nationNm}</span>
                <span className='vspan'>{temp.nations[0].nationNm}</span>
              </li>
              <li>
            <span className='kspan'>{category.directors}</span>
            <span className='vspan'>{temp.directors[0].peopleNm}</span>
              </li>
              <li>
                <span className='kspan'>{category.genreNm}</span>
                <span className='vspan'>{temp.genres[0].genreNm}</span>
              </li>
              <li>
                <span className='kspan'>{category.companyNm}</span>
                <span className='vspan'>{temp.companys[0].companyNm}</span>
              </li>
            </ul>
          </>
        )
      })
      .catch((err) => { console.log(err) })
  })

  return (
    <>
      <h1>영화상세</h1>
      <form>
        <button className="homeBt"><Link to='/'>Home</Link></button>
      </form>
      <div className='mvInfo'>
        {(movieCd === 'null') ?
          <p>영화코드를 찾을 수 없습니다.</p>
          : [mv]}
      </div>
    </>
  );
}

export default MvItem;