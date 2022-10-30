import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ProductCard.css";

export default function ProductCard(props) {
  return (
    <Card sx={{ maxWidth: 250, margin: "2%" }}>
      <CardMedia
        component="img"
        height="200"
        image={props.image}
        alt={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" id="cardTitle">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" id="cardDetail">
          {props.detail}
        </Typography>

        <div className={props.show}>
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            type="number"
          />
          <Button variant="outlined" id="addToCart">
            <AddShoppingCartIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
