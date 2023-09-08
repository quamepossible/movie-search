import React, { useContext } from "react";
import { PageNumberCtx } from "../../stores/pagination/page-number";
import styles from "./Modal.module.css";

const Modal = ({ overlayClicked }) => {
  const ClickedMovieCtx = useContext(PageNumberCtx);
  const { clickedMovie } = ClickedMovieCtx;
  const {
    title,
    overview,
    vote_average: rating,
    poster_path: photo,
    year
  } = clickedMovie;
  const imgSrc = `http://image.tmdb.org/t/p/w500${photo}`;
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => overlayClicked(false)}
      ></div>
      <div className={`${styles["overlay-content"]} center row`}>
        <div className={styles["left-content"]}>
          <img
            src={imgSrc}
            alt="dp"
            className={`${styles["display-photo"]} center`}
          />
          <span className={styles['close-modal']} onClick={()=>overlayClicked(false)}>
              <ion-icon name="close-outline" className="center"></ion-icon>
          </span>
        </div>
        <div
          className={styles["right-content"]}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${imgSrc})`,
          }}
        >
          <div className={`${styles["movie-content"]} center`}>
            <p>
              <span className={styles["info-head"]}>Title:</span>{" "}
              <span className={styles["info-data"]}>{title}</span>
            </p>
            <p>
              <span className={styles["info-head"]}>Released:</span>{" "}
              <span className={styles["info-data"]}>{year}</span>
            </p>
            <p className={styles["rating-field"]}>
              <span className={`${styles["info-head"]} head-rate`}>Rating:</span>{" "}
              <span className={`${styles["star"]}`}>
                <ion-icon
                  name="star"
                  style={{
                    color: "yellow",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                ></ion-icon>
              </span>
              <span className={styles["info-data"]}>{rating.toFixed(2)}</span>
            </p>
            <p>
              <span className={styles["overview"]}>Overview</span>
            </p>
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
