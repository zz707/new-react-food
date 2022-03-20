import {Meal} from "./Meal";

function MealList(props) {
    const {meals} = props;

    return (
        <div className="list">
            {meals.map((meal) => (
                <Meal key={meal.idMeal} {...meal}/>
            ))}
        </div>
    )
}

export {MealList}
