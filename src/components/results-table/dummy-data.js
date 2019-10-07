const state = {
    "matches": [
      { "id": 1,
        "team_1": "Brasil",
        "team_2": "England",
        "kickoff": "Friday 9 18:30",
        "score": [1,2]            
      },
      { "id": 2,
        "team_1": "France",
        "team_2": "Italy",
        "kickoff": "Friday 9 18:30",
        "score": [1,2]            
      },
      {
        "id": 3,
        "team_1": "Russia",
        "team_2": "Wales",
        "kickoff": "Friday 9 18:30",
        "score": [1,2]            
      }
    ],
    "users": [{
        "id": 1,
        "name": "Ben Newman",
        "points": 20,
        "predictions": [{
            "game_id": 1, 
            "prediction": [1, 0]
        },
        {
            "game_id": 2, 
            "prediction": [2, 0]
        },
        {
            "game_id": 3, 
            "prediction": [1, 5]
        }
        ]
    },
    {   "id": 2,
        "name": "John",
        "points": 5,
        "predictions": [{
            "game_id": 1, 
            "prediction": [1, 0]
        },
        {
            "game_id": 2, 
            "prediction": [2, 0]
        },
        {
            "game_id": 3, 
            "prediction": [1, 5]
        }
        ]
    },
    {   "id": 2,
        "name": "Ersin",
        "points": 10,
        "predictions": [{
            "game_id": 1, 
            "prediction": [3, 0]
        },
        {
            "game_id": 2, 
            "prediction": [2, 4]
        },
        {
            "game_id": 3, 
            "prediction": [2, 5]
        }
        ]
    }

    ]
  }
  export default state