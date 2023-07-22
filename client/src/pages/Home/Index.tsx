import { useEffect, useCallback } from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import Lentil from "../../assets/images/Lentil-Soup.jpg";
import food from "../../assets/images/hero-image.png";
import logo from "../../assets/styles/images/logo.png";
import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import Category from "../../Components/Category/Index";
import RecipeCard from "../../Components/RecipeCard/Index";
import Loader from "../../Components/Loader/Index";
import { subStringFunc } from "../../utils";

import { MdFavoriteBorder } from "react-icons/md";
const Home = () => {
  const { recipes, isLoading } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();
  const getRecipes = useCallback(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return (
    <>
      <Container>
        <div className=' '>
          <div className='row flex-lg-row-reverse align-items-center py-4 mb-4'>
            <div className='col-12 col-lg-6'>
              <img
                src={food}
                width={607}
                height={510}
                className='d-block mx-lg-auto img-fluid'
                loading='lazy'
                alt='Cooking With Node.js'
              />
            </div>
            <div className='col-12 col-lg-6'>
              <h1 className='display-5 fw-bold mb-3'>
                Huge selection of delicios recipe ideas
              </h1>
              <p className='lead'>
                Explore our huge selection of delicious recipe ideas including;
                easy desserts, delicious vegan and vegetarian dinner ideas,
                gorgeous pasta recipes, quick bakes, family-friendly meals and
                gluten-free recipes.
              </p>
              <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                <a
                  href='/explore-latest'
                  className='btn btn-primary btn-dark btn-lg px-4 me-md-2'
                >
                  Explore Latest
                </a>
                <a
                  href='/explore-random'
                  className='btn btn-outline-secondary btn-lg px-4 me-md-2'
                >
                  Show Random
                </a>
              </div>
            </div>
          </div>
          <h5 className='py-3 mb-0'>Popular Categories</h5>
          <div className='row'></div>

          <Category />

          <>
            <div className='row'>
              <div className='col-md-4 '>
                <figure className='my-3 '>
                  <a href='#0' className='rounded-top-6'>
                    <img src={Lentil} className='w-100' alt='Menu' />
                  </a>
                  <figcaption className='mt-2 px-3 px-lg-4'>
                    <div className='w-100 float-left'>
                      <div className='float-left'>start here</div>
                    </div>
                    <h6 className='font-weight-semibold inter-font f-size-20 mt-2 mb-4'>
                      <a href='#0' className='text-black d-block mt-1'>
                        Very Berry Healthy Summer Smoothie
                      </a>
                    </h6>
                  </figcaption>
                </figure>
              </div>
              <div className='col-md-4'>
                <figure className='my-3 '>
                  <a href='#0' className='rounded-top-6'>
                    <img src={Lentil} className='w-100' alt='Menu' />
                  </a>
                  <figcaption className='mt-2 px-3 px-lg-4'>
                    <div className='w-100 float-left'>
                      <div className='float-left'>start here</div>
                    </div>
                    <h6 className='font-weight-semibold inter-font f-size-20 mt-2 mb-4'>
                      <a href='#0' className='text-black d-block mt-1'>
                        Very Berry Healthy Summer Smoothie
                      </a>
                    </h6>
                  </figcaption>
                </figure>
              </div>
              <div className='col-md-4'>
                <figure className='my-3 '>
                  <a href='#0' className='rounded-top-6'>
                    <img src={Lentil} className='w-100' alt='Menu' />
                  </a>
                  <figcaption className='mt-2 px-3 px-lg-4'>
                    <div className='w-100 float-left'>
                      <div className='float-left'>start here</div>
                    </div>
                    <h6 className='font-weight-semibold inter-font f-size-20 mt-2 mb-4'>
                      <a href='#0' className='text-black d-block mt-1'>
                        Very Berry Healthy Summer Smoothie
                      </a>
                    </h6>
                  </figcaption>
                </figure>
              </div>
            </div>
          </>

          <hr />

          {recipes?.length < 1 && !isLoading && (
            <div className='flex justify-center items-center'>
              <h1 className='text-2xl text-gray-500'>No recipes found</h1>
            </div>
          )}
          {isLoading && <Loader />}
          <div className='row'>
            {recipes &&
              recipes?.map((recipe: Recipe) => (
                // <RecipeCard key={recipe._id} recipe={recipe} />
                <div className='py-5 team4'>
                  <div className='container'>
                    <div className='row justify-content-center mb-4'>
                      <div className='col-md-7 text-center'>
                        <h3 className='mb-3'>
                          Experienced &amp; Professional Team
                        </h3>
                        <h6 className='subtitle'>
                          You can relay on our amazing features list and also
                          our customer services will be great experience for you
                          without doubt and in no-time
                        </h6>
                      </div>
                    </div>
                    <div className='row'>
                      {/* column  */}
                      <div className='col-lg-3 mb-4'>
                        {/* Row */}
                        <div className='row'>
                          <div className='col-md-12'>
                            <img
                              src={recipe?.image}
                              alt='wrapkit'
                              className='img-fluid rounded'
                            />
                          </div>
                          <div className='col-md-12 text-center'>
                            <div className='pt-2'>
                              <h5 className='mt-4 font-weight-medium mb-0'>
                                {recipe?.name}
                              </h5>
                              <h6
                                className='subtitle mb-3'
                                dangerouslySetInnerHTML={{
                                  __html: subStringFunc(recipe?.instructions, 40),
                                }}
                              />

                              <p>
                                
                              </p>
                              <ul className='list-inline'>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <MdFavoriteBorder
                                      className='icon-social-facebook'
                                      size={20}
                                    />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <MdFavoriteBorder
                                      className='icon-social-facebook'
                                      size={20}
                                    />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                     <MdFavoriteBorder
                                      className='icon-social-facebook'
                                      size={20}
                                    />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <MdFavoriteBorder
                                      className='icon-social-facebook'
                                      size={20}
                                    />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* Row */}
                      </div>
                      {/* column  */}
                      {/* column  */}
                      <div className='col-lg-3 mb-4'>
                        {/* Row */}
                        <div className='row'>
                          <div className='col-md-12'>
                            <img
                              src='https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t2.jpg'
                              alt='wrapkit'
                              className='img-fluid rounded-circle'
                            />
                          </div>
                          <div className='col-md-12 text-center'>
                            <div className='pt-2'>
                              <h5 className='mt-4 font-weight-medium mb-0'>
                                Michael Doe
                              </h5>
                              <h6 className='subtitle mb-3'>
                                Property Specialist
                              </h6>
                              <p>
                                You can relay on our amazing features list and
                                also our customer services will be great
                                experience.
                              </p>
                              <ul className='list-inline'>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-facebook' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-twitter' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-instagram' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-behance' />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* Row */}
                      </div>
                      {/* column  */}
                      {/* column  */}
                      <div className='col-lg-3 mb-4'>
                        {/* Row */}
                        <div className='row'>
                          <div className='col-md-12'>
                            <img
                              src='https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t3.jpg'
                              alt='wrapkit'
                              className='img-fluid rounded-circle'
                            />
                          </div>
                          <div className='col-md-12 text-center'>
                            <div className='pt-2'>
                              <h5 className='mt-4 font-weight-medium mb-0'>
                                Michael Doe
                              </h5>
                              <h6 className='subtitle mb-3'>
                                Property Specialist
                              </h6>
                              <p>
                                You can relay on our amazing features list and
                                also our customer services will be great
                                experience.
                              </p>
                              <ul className='list-inline'>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-facebook' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-twitter' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-instagram' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-behance' />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* Row */}
                      </div>
                      {/* column  */}
                      {/* column  */}
                      <div className='col-lg-3 mb-4'>
                        {/* Row */}
                        <div className='row'>
                          <div className='col-md-12'>
                            <img
                              src='https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t4.jpg'
                              alt='wrapkit'
                              className='img-fluid rounded-circle'
                            />
                          </div>
                          <div className='col-md-12 text-center'>
                            <div className='pt-2'>
                              <h5 className='mt-4 font-weight-medium mb-0'>
                                Michael Doe
                              </h5>
                              <h6 className='subtitle mb-3'>
                                Property Specialist
                              </h6>
                              <p>
                                You can relay on our amazing features list and
                                also our customer services will be great
                                experience.
                              </p>
                              <ul className='list-inline'>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-facebook' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-twitter' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-instagram' />
                                  </a>
                                </li>
                                <li className='list-inline-item'>
                                  <a
                                    href='#'
                                    className='text-decoration-none d-block px-1'
                                  >
                                    <i className='icon-social-behance' />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* Row */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
