export const useCategories = () => {
  return [
    { id: 1, name: "Videogames and tech", icon: "🎮" },
    { id: 2, name: "Books and comics", icon: "📚" },
    { id: 3, name: "Travel", icon: "✈️" },
    { id: 4, name: "For home and liveness", icon: "🏠" },
    { id: 5, name: "Fashion and style", icon: "👗" },
    { id: 6, name: "Other", icon: "⭐" },
  ];
};
export const useCategory = (id: number) => {
  const categories = useCategories();
  return categories.find((c) => c.id === id);
};
