import { useEffect } from "react";

import Landing from "./Landing";
import { Recipe } from "../../interfaces/RecipeInterface";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import Lentil from "../../assets/styles/images/Lentil-Soup.jpg";
import { Col, Container, Row } from "react-bootstrap";
const Home = () => {
  const { recipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <>
      {/* <section className='bg-white dark:bg-gray-900 mb-5'>
        <Landing />
        <div className='grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3 '>
          {recipes && recipes?.length === 0 && (
            <div className='flex justify-center items-center'>
              <h1 className='text-2xl text-gray-500'>No recipes found</h1>
            </div>
          )}
           
          {recipes &&
            recipes?.length > 0 &&
            recipes?.map((recipe: Recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
        </div>
      </section> */}
      <section className='page-top-recipe'>
        <Container>
          <Row>
            <Col lg={6} className='order-lg-1'>
            {/* <div className='col-lg-6 order-lg-2'> */}
              <div className='pt-recipe-item large-item'>
                <img src={Lentil} alt='' />

                <div className='pt-recipe-text'>
                  <span>March 10, 2019</span>
                  <h3>Cannellini Aglio e Olio with Salmon</h3>
                </div>
              </div>
              </Col>
            <div className='col-lg-3 col-md-6 order-lg-1'>
              <div className='pt-recipe-item'>
                <img src={Lentil} alt='' />
                {/* <div className="pt-recipe-img set-bg" data-setbg="img/recipe-1.jpg">
           </div> */}
                <div className='pt-recipe-text'>
                  <h4>Raw Vegan Carrot Cake Bites with Avocado</h4>
                </div>
              </div>
              <div className='pt-recipe-item'>
                <img src={Lentil} alt='' />

                <div className='pt-recipe-text'>
                  <h4>One Pot Weeknight Lasagna Soup Recipe</h4>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 order-lg-3'>
              <div className='pt-recipe-item'>
                <img src={Lentil} alt='' />

                <div className='pt-recipe-text'>
                  <h4>Beef Burger with French Fries and Salad</h4>
                </div>
              </div>
              <div className='pt-recipe-item'>
                <img src={Lentil} alt='' />

                <div className='pt-recipe-text'>
                  <h4>Raspberry Pancakes with Honey and Butter</h4>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
