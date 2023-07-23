import React, { useCallback, useEffect } from "react";

import Lentil from "../../assets/images/Lentil-Soup.jpg";
import {
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdThumbUpAlt,
} from "react-icons/md";

// import "./recipeCard.css";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CommentIcon from "@mui/icons-material/Comment";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { Recipe } from "../../interfaces/RecipeInterface";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDate, subStringFunc } from "../../utils";
import { Grid, Tooltip } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={recipe?.owner?.image} />}
        title={recipe?.name}
        action={
          <IconButton aria-label='settings'>
            <TurnedInNotIcon />
          </IconButton>
        }
        subheader={formatDate(recipe?.createdAt)}
      />
      <CardMedia
        component='img'
        height='194'
        image={recipe?.image}
        alt={recipe?.owner?.name}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          <span
            dangerouslySetInnerHTML={{
              __html: subStringFunc(recipe?.instructions, 50),
            }}
          />
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2} className='text-center'>
          <Grid item xs={3}>
            <Tooltip title='like' placement='top'>
              <IconButton aria-label='add to favorites'>
                <MdThumbUpAlt />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip title='views' placement='top'>
              <IconButton aria-label='add to favorites'>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip title='comment' placement='top'>
              <IconButton aria-label='add to favorites'>
                <CommentIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip title='stars' placement='top'>
              <IconButton aria-label='add to favorites'>
                <StarBorderIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
