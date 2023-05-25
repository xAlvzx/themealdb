import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RecipeDetailsScreen = ({ navigation }) => {
  const meal = navigation.getParam("meal", {});

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ color: "black" }}>{meal.strMeal}</Text>
        <Text style={{ color: "black" }}>Category: {meal.strCategory}</Text>
        <Text style={{ color: "black" }}>Area: {meal.strArea}</Text>
        <Text style={{ color: "black" }}>
          Ingredients: {meal.strIngredient1}, {meal.strIngredient2},{" "}
          {meal.strIngredient3}, ...
        </Text>
        <Text style={{ color: "black" }}>
          Instructions: {meal.strInstructions}
        </Text>
      </View>
    </ScrollView>
  );
};

const RecipeListScreen = ({ navigation }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {data ? (
          data.meals.map((meal: any) => (
            <TouchableOpacity
              key={meal.idMeal}
              style={{ marginBottom: 20 }}
              onPress={() => navigation.navigate("RecipeDetails", { meal })}
            >
              <Image
                source={{ uri: meal.strMealThumb }}
                style={{ width: 200, height: 200 }}
              />
              <Text style={{ color: "black" }}>{meal.strMeal}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: "black" }}>Cargando datos...</Text>
        )}
        {error && <Text style={{ color: "black" }}>Error: {error}</Text>}
      </View>
    </ScrollView>
  );
};

const AppNavigator = createStackNavigator(
  {
    RecipeList: {
      screen: RecipeListScreen,
      navigationOptions: {
        title: "Lista de Recetas",
      },
    },
    RecipeDetails: {
      screen: RecipeDetailsScreen,
      navigationOptions: {
        title: "Detalles de la Receta",
      },
    },
  },
  {
    initialRouteName: "RecipeList",
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return <AppContainer />;
};

export default App;
