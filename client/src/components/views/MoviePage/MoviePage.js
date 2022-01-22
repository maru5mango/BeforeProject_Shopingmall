import React, { useEffect, useState, useRef } from "react";
import { Typography, Row } from "antd";
import { IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from "../../../config";
import MainImage from "./Sections/MainImage";
import GridCard from "../../commons/GridCards";
import { getMovie } from "../../../data/API/callAPI";
import useScroll from "../../../hooks/useScroll";
const { Title } = Typography;

// 무한 Scroll을 구현하는 다른 방법을 쓰는 것이 더 나을 듯.
function MoviePage() {
  const buttonRef = useRef(null);
  const page = useRef(1);
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);

  const y = useScroll();

  useEffect(() => {
    handleScroll(y);
  }, [y]);

  const getData = async () => {
    const { results } = await getMovie(page.current);
    setMovies([...Movies, ...results]);
    setMainMovieImage(MainMovieImage || results[0]);
    setLoading(false);
  };

  const loadMoreItems = () => {
    setLoading(true);
    page.current += 1;
    getData();
  };

  const handleScroll = (y) => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const html = document.documentElement;
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= html.scrollHeight - 1) buttonRef.current.click();
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title level={2}> Movies by latest </Title>
        <hr />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <GridCard
                key={`MoviePoster_${index}`}
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : null
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            ))}
        </Row>
        {Loading && <div>Loading...</div>}
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
