/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectHomePage } from './selectors';
import { homePageSaga } from './saga';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Navigation } from '../../components/Navigation';
import { Copyright } from '../../components/Copyright/index';
import { BASE_URL, API_KEY } from '../../constants';

interface Props {}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    flexGrow: 1,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroImage: {
    maxHeight: '400px',
  },
  featuredImage: {
    maxHeight: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  useEffect(() => {
    if (Object.keys(homePage.current_user).length === 0) {
      fetch(`${BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'api-key': API_KEY,
          Authorization: String(Cookies.get('token')),
        },
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.error) {
            console.log(data.error);
            // Here you should have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
          } else {
            // setUser(data);
            dispatch(actions.setCurrentUser(data));
          }
        });
    }
    if (Object.keys(homePage.movies).length === 0) {
      fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
          'api-key': API_KEY,
        },
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.error) {
            console.log(data.error);
            // Here you should have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
          } else {
            var movies = data;
            let featuredMovie = movies.pop();
            dispatch(actions.setFeaturedMovie(featuredMovie));
            dispatch(actions.setMovies(movies));
          }
        });
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const homePage = useSelector(selectHomePage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Lumiere is a web platform to view international movies in the US."
        />
      </Helmet>
      <CssBaseline />
      <Navigation user={homePage.current_user} />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item xs={undefined} sm={1} md={2} lg={3}></Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={3}
              className={classes.heroImage}
            >
              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <img
                    src={homePage.featured_movie.poster_url}
                    className={classes.featuredImage}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {homePage.featured_movie.title}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                {homePage.featured_movie.description}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Watch Now
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={undefined} sm={1} md={2} lg={3}></Grid>
          </Grid>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {homePage.movies.map(movie => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={movie.poster_url}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {movie.title}
                    </Typography>
                    <Typography>{movie.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Watch Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Lumiere
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          proudly supporting international filmmakers!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
});
