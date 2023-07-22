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
      {/* <section className='page-top-recipe'>
        <Container>
          <Row>
             
             
            <Col md={3}>
              <div className='page-top-recipe__image'>
                <img src={Lentil} alt='' />
              </div>
            </Col>
            <Col md={6}>
              <div className='page-top-recipe__image'>
                <img src={Lentil} alt='' />
              </div>
            </Col>
            <Col md={3}>
              <div className='page-top-recipe__image'>
                <img src={Lentil} alt='' />
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
      {/* <Container>
        <div className='mt-0 mt-md-4'>
          <div className='row g-0'>
            <div className='col-lg-7'>
              <img src={Lentil} height={100} alt='Menu' />
            </div>
            <div className='col-lg-5'>
              <div className='p-4 p-md-5 d-flex flex-column justify-content-center h-100 '>
                lortm
                <h4 className='my-3'>Mighty Super Cheesecake</h4>
                <p className='big pr-0 pr-md-5 pb-3 pb-sm-5 pb-lg-0'>
                  Look no further for a creamy and ultra smooth classic
                  cheesecake recipe! no one can deny its simple decadence.
                </p>
                <a href='#0' className='circle circle-lg tstbite-arrow'></a>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
    </>
  );
};

export default Home;
