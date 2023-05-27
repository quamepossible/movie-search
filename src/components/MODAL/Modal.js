import React from 'react';
import useFetchHook from '../../Hooks/fetch-hook';

import styles from './Modal.module.css';

const Modal = () => {
    const getMovies = useFetchHook('https://api.themoviedb.org/3/discover/movie?include_adult=true&release_date.gte=2023');
    console.log(getMovies);
}

export default Modal