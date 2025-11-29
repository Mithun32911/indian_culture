/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const UserProgressContext = createContext();

export function UserProgressProvider({ children }) {
  const [culturalEventsAttended, setCulturalEventsAttended] = useState(0);
  const [traditionsExplored, setTraditionsExplored] = useState(0);
  const [heritagesAttended, setHeritagesAttended] = useState(0);
  const [monumentsVisited, setMonumentsVisited] = useState(0);
  const [learningModulesCompleted, setLearningModulesCompleted] = useState(0);
  const [favorites, setFavorites] = useState([]); // { id, type, name }

  const incrementCulturalEvents = () => {
    setCulturalEventsAttended((prev) => prev + 1);
  };

  const incrementTraditionsExplored = () => {
    setTraditionsExplored((prev) => prev + 1);
  };

  const incrementHeritagesAttended = () => {
    setHeritagesAttended((prev) => prev + 1);
  };

  const incrementMonumentsVisited = () => {
    setMonumentsVisited((prev) => prev + 1);
  };

  const incrementLearningModulesCompleted = () => {
    setLearningModulesCompleted((prev) => prev + 1);
  };

  const addFavorite = (item) => {
    setFavorites(prev => {
      if (!prev.some(f => f.id === item.id && f.type === item.type)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFavorite = (item) => {
    setFavorites(prev => prev.filter(f => !(f.id === item.id && f.type === item.type)));
  };

  const isFavorite = (item) => {
    return favorites.some(f => f.id === item.id && f.type === item.type);
  };

  return (
    <UserProgressContext.Provider value={{
      culturalEventsAttended,
      incrementCulturalEvents,
      traditionsExplored,
      incrementTraditionsExplored,
      heritagesAttended,
      incrementHeritagesAttended,
  monumentsVisited,
  incrementMonumentsVisited,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
      learningModulesCompleted,
      incrementLearningModulesCompleted
    }}>
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  return useContext(UserProgressContext);
}
