/* global chrome */

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const App = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [usageData, setUsageData] = useState({});

  // Fetch stored data from Chrome storage
  useEffect(() => {
    chrome.storage.sync.get(["goals", "usageData"], (data) => {
      setGoals(data.goals || []);
      setUsageData(data.usageData || {});
    });
  }, []);

  // Add a new goal
  const addGoal = () => {
    if (newGoal) {
      const updatedGoals = [...goals, newGoal];
      setGoals(updatedGoals);
      chrome.storage.sync.set({ goals: updatedGoals });
      setNewGoal("");
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Productivity Tracker
      </Typography>

      {/* Goals Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Set Daily Goals
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="New Goal"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addGoal}
              sx={{ whiteSpace: "nowrap" }}
            >
              Add Goal
            </Button>
          </Box>
          <List>
            {goals.map((goal, index) => (
              <ListItem key={index}>
                <ListItemText primary={goal} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Usage Stats Section */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Usage Stats
          </Typography>
          {Object.keys(usageData).length === 0 ? (
            <Typography>No data available</Typography>
          ) : (
            Object.keys(usageData).map((date) => (
              <Box key={date} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  {date}
                </Typography>
                <Divider />
                <List>
                  {Object.entries(usageData[date]).map(([domain, time]) => (
                    <ListItem key={domain}>
                      <ListItemText
                        primary={domain}
                        secondary={`Time: ${time} seconds`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default App;
