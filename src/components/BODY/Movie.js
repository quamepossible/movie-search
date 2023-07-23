import React, {useContext} from "react";
import styles from "./Body.module.css";
import { PageNumberCtx } from "../../stores/pagination/page-number";
import defaultImg from "../../assets/not-found.jpg";

const Movie = (props) => {
  const ClickedMovieCtx = useContext(PageNumberCtx);
    const {setClickedMovie} = ClickedMovieCtx;
  
  const imgUrl = props.imgSrc
    ? `http://image.tmdb.org/t/p/w500${props.imgSrc}`
    : defaultImg;
  return (
    <div className={styles["hold-each-movie"]}>
      <img src={imgUrl} alt="the-mother" className={styles["each-movie"]} onClick={() => {
        props.whenClicked(true);
        setClickedMovie({
          title: props.title,
          overview: props.overview,
          vote_average: props.rating,
          poster_path: props.imgSrc,
          year: props.year
        })
        }} />
      <div className={styles["movie-details"]}>
        <p className={styles["movie-title"]}>{props.title}</p>
        <p className={styles["movie-info"]}>
          <span className={styles["movie-year"]}>{props.year}</span>{" "}
          <span className={styles.star}>
            <ion-icon
              className="center"
              name="star"
              style={{ color: "yellow" }}
            ></ion-icon>
          </span>
          <span className={styles["movie-rating"]}>
            {props.rating.toFixed(1)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Movie;
