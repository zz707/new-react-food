import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {getMealById} from "../api";
import {Preloader} from "../components/Preloader";

function Recipe() {
    const [recipe, setRecipe] = useState({});
    const {id} = useParams();
    const {goBack} = useHistory();

    useEffect(() => {
        getMealById(id).then((data) => setRecipe(data.meals[0]));
    }, [id]);

    return <>
        {!recipe.idMeal ? <Preloader/> : (<div className="recipe">
            <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
            />
            <h1>{recipe.strMeal}</h1>
            <h6>Category: {recipe.strCategory}</h6>
            {recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null}
            <p>{recipe.strInstructions}</p>

            <table className="centered">
                <thead>
                <tr>
                    <th>Ingredient</th>
                    <th>Measure</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.keys(recipe).map((key) => {
                        if (key.includes('Ingredient') && recipe[key]) {
                            return (
                                <tr key={key}>
                                    <td>{recipe[key]}</td>
                                    <td>
                                        {
                                            recipe[`strMeasure${key.slice(13)}`]
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    })
                }
                </tbody>
            </table>

            <div className="row">
                <h5>Video recipe</h5>
                <iframe
                    src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`}
                    title={id}
                    allowFullScreen
                />
            </div>
        </div>)

        }
        <button
            className="btn"
            onClick={goBack}
        >Go back
        </button>
    </>
}

export {Recipe}
