import './Mv.css';
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react';

function MvList() {

  const [mv, setMv] = useState([]);
  const dRef = useRef();

  const mvLoad = (d) => {
    const url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=' + d;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        let temp = data.boxOfficeResult.dailyBoxOfficeList
        setMv(temp.map((m) =>
          <Link to={'/MvItem/' + m.movieCd}>
            <li key={m.movieCd} className='mvLi'>
              <span className='rank'>{m.rank}</span>
              <span className='movieNm'>{m.movieNm}</span>
            </li>
          </Link>))
      })
      .catch ((err) => { console.log(err) })
};

useEffect(() => {
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let dateFormat = yesterday.getFullYear()
    + '-' + ((yesterday.getMonth() + 1) < 9 ? "0" + (yesterday.getMonth() + 1) : (yesterday.getMonth() + 1))
    + '-' + (yesterday.getDate() < 9 ? "0" + yesterday.getDate() : yesterday.getDate());

  let dayDefault = dateFormat.replaceAll('-', '');
  console.log(dayDefault);
  mvLoad(dayDefault);
}, []);

const handleDay = (e) => {
  e.preventDefault();
  let day = dRef.current.value.replaceAll('-', '');
  mvLoad(day);

};

return (
  <>
    <h1>박스오피스</h1>
    <div className='mvDiv'>
      <form className='mvForm' name='mvName'>
        <input type='date' ref={dRef} name='d' onChange={handleDay} />
      </form>
    </div>
    <div className='mainDiv'>
      <ul className='mvUl'>
        {mv}
      </ul>
    </div>
  </>
);
}

export default MvList;