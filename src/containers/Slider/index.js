import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);
    const byDateDesc = data?.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    );

    const nextCard = () => {
        setIndex(
            (prevIndex) =>
                prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
            //Cette fonction met à jour l'index de l'image suivante à afficher.Si l'index actuel est inférieur à la longueur du tableau byDateDesc moins 1, l'index est incrémenté de 1. Sinon, l'index est réinitialisé à 0 pour revenir au début du slider//
        );
    };

    useEffect(() => {
        // Démarre un intervalle pour changer automatiquement les images toutes les 5 secondes
        const intervalId = setInterval(nextCard, 5000);
        // Nettoie l'intervalle lorsque le composant est démonté ou lorsque les dépendances changent
        return () => clearInterval(intervalId);
    }, [index, byDateDesc]);

    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <div key={event.title}>
                    <div
                        className={`SlideCard SlideCard--${
                            index === idx ? "display" : "hide"
                        }`}
                    >
                        <img src={event.cover} alt="forum" />
                        <div className="SlideCard__descriptionContainer">
                            <div className="SlideCard__description">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div>{getMonth(new Date(event.date))}</div>
                            </div>
                        </div>
                    </div>
                    <div className="SlideCard__paginationContainer">
                        <div className="SlideCard__pagination">
                            {byDateDesc.map((_, radioIdx) => (
                                <input
                                    key={`${event.id}`}
                                    type="radio"
                                    name="radio-button"
                                    checked={idx === radioIdx}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Slider;
