import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: "auto",
    maxWidth: 500
  }
}));

export default function MatchCard(props) {
  const {
    outcome,
    gameDuration,
    championLevel,
    championName,
    deaths,
    kills,
    totalCreepScore,
    items,
    assists,
    perkPrimaryStyle,
    perkSubStyle,
    spells,
    gameMode
  } = props.data;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="space-around">
          <Grid item>
            <h5>{gameMode}</h5>
            <h5>{}</h5>
            <h5>{outcome ? "Win" : "Lose"}</h5>
            <h5>{gameDuration}</h5>
          </Grid>
          <Grid item>
            <img
              width={20}
              src={require(`../img/champion/tiles/${championName}_0.jpg`)}
            />
            <h5>{championName}</h5>
            <img width={20} src={require(`../img/spell/${spells[0]}.png`)} />
            <img width={20} src={require(`../img/spell/${spells[1]}.png`)} />
          </Grid>
          <Grid item>
            <h5>
              {kills}/{deaths}/{assists}
            </h5>
            <h5>{((kills + assists) / deaths).toFixed(2)} KDA</h5>
          </Grid>
          <Grid item>
            <h5>{championLevel}</h5>
            <h5>{totalCreepScore}</h5>
          </Grid>
          <Grid item>
            {items &&
              items.map(item => {
                return <h5>{item}</h5>;
              })}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
