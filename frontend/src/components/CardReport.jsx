import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

function CardReport({ image, title, description, onClick }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          onClick={onClick}
          style={{ cursor: "pointer" }}
        />
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            color="#2e7d32"
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Typography variant="body2" textAlign="center">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardReport;
