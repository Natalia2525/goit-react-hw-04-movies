import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../Service/ApiMovies';

const Reviews = () => {
    const [reviews, setReviews] = useState();
    const { movieId } = useParams();
    useEffect(() => {
        fetchReviews(movieId).then(setReviews);
    }, [movieId]);

    return (
        <>
            {reviews && (
                <ul>
                    {reviews.map(({ id, author, content }) => (
                        <li key={id}>
                            <h2>{author}</h2>
                            <span>{content}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Reviews;
