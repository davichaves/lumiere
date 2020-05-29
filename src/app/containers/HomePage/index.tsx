import React from 'react';
import { Helmet } from 'react-helmet-async';
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
import Link from '@material-ui/core/Link';

import { Navigation } from '../../components/Navigation';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Lumiere
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroImage: {
    backgroundImage: `url('http://www.impawards.com/intl/brazil/2019/posters/bacurau_ver3.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
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

const cards = [
  {
    id: 1,
    name: 'Parasite',
    image: 'https://i.ytimg.com/vi/isOGD_7hNIY/maxresdefault.jpg',
    plot:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
  },
  {
    id: 2,
    name: 'Les Miserables',
    image:
      'https://upload.wikimedia.org/wikipedia/en/0/05/Les_Mis%C3%A9rables_2019_film_poster.jpg',
    plot:
      'Stéphane joined the Anti-Crime Brigade of Montfermeil. He meets his new teammates, Chris and Gwada, and discovers the tensions between the different groups of the district.',
  },
  {
    id: 3,
    name: 'Pain and Glory',
    image:
      'https://m.media-amazon.com/images/M/MV5BNWU4MTM2YTgtYTRlZC00ZmRhLTlkYTMtZDkyYzNjZDU1NmI0XkEyXkFqcGdeQXVyOTgxNDIzMTY@._V1_.jpg',
    plot: `A film director reflects on the choices he's made in life as the past and present come crashing down around him.`,
  },
  {
    id: 4,
    name: 'Capernaum',
    image:
      'https://www.gstatic.com/tv/thumb/v22vodart/15563797/p15563797_v_v8_ab.jpg',
    plot:
      'After running away from his negligent parents, committing a violent crime and being sentenced to five years in jail, a hardened, streetwise 12-year-old Lebanese boy sues his parents in protest of the life they have given him.',
  },
  {
    id: 5,
    name: 'Never Look Away',
    image:
      'https://www.gstatic.com/tv/thumb/v22vodart/16245548/p16245548_v_v8_ac.jpg',
    plot: `When two German art students fall in love, the girl's father, who has a devastating secret, vows to end their relationship.`,
  },
  {
    id: 6,
    name: 'Honeyland',
    image:
      'https://www.gstatic.com/tv/thumb/v22vodart/16711163/p16711163_v_v8_aa.jpg',
    plot:
      'A woman utilises ancient beekeeping traditions to cultivate honey in the mountains of North Macedonia. When a neighbouring family tries to do the same, it becomes a source of tension as they disregard her wisdom and advice.',
  },
];

export function HomePage() {
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
      <Navigation />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={3} className={classes.heroImage}></Grid>
            <Grid item xs={4}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Bacurau
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                A filmmaker decides to travel to a village in the interior of
                Brazil to make a documentary. As days go by, he begins to
                discover that the locals are not exactly what they appear to be
                and hide dangerous secrets.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Rent ($5.99)
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Buy ($9.99)
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{card.plot}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Rent
                    </Button>
                    <Button size="small" color="primary">
                      Buy
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
}
