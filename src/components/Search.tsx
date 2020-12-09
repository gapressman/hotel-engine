import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import React from "react";

export const Search = () => (
  <Box textAlign="center" marginTop={10}>
    <Grid container justify="center">
      <Grid item xs={10} md={6}>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search Github"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select variant="outlined" fullWidth>
              <MenuItem>Best Match</MenuItem>
              <MenuItem>Stars</MenuItem>
            </Select>
            <FormHelperText>Sort Repos</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Button style={{ height: "100%" }} fullWidth variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);
