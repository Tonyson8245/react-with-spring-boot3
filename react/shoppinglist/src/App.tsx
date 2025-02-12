import Container from "@mui/material/Container";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import "./App.css";
import AddItem from "./AddItem";
export type Item = {
  product: string;
  amount: string;
};

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Shopping List</Typography>
          </Toolbar>
        </AppBar>
        <AddItem addItem={addItem} />
        <List>
          {items.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={item.product} secondary={item.amount} />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
