# MMA GraphQL API Documentation

## Overview
This document provides comprehensive documentation for the MMA GraphQL API, which allows you to manage fighters, events, fights, and rankings in a mixed martial arts database. The API is built using NestJS with `@nestjs/graphql` and connects to a PostgreSQL database (`mma-db`) running in a Docker container.

## Table of Contents
1. [Authentication](#authentication)
2. [GraphQL Endpoint](#graphql-endpoint)
3. [Fighters](#fighters)
4. [Events](#events)
5. [Fights](#fights)
6. [Rankings](#rankings)
7. [Error Handling](#error-handling)
8. [Models](#models)
9. [Database Setup](#database-setup)

## Authentication
Currently, the API does not require authentication.

## GraphQL Endpoint
All API requests are made to the GraphQL endpoint:
```
POST http://localhost:3000/graphql
```
- Access the GraphQL Playground at `http://localhost:3000/graphql` to test queries and mutations.

## Fighters

### Queries
#### Get All Fighters
Retrieves a list of all fighters in the database.
```graphql
query {
  fighters {
    id
    name
    weightClass
    stats {
      wins
      losses
      draws
      knockouts
      submissions
    }
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "fighters": [
        {
          "id": 1,
          "name": "Conor McGregor",
          "weightClass": "Lightweight",
          "stats": {
            "wins": 22,
            "losses": 6,
            "draws": 0,
            "knockouts": 19,
            "submissions": 4
          }
        }
      ]
    }
  }
  ```

#### Get Fighter by ID
Retrieves a specific fighter by their ID.
```graphql
query {
  fighter(id: 1) {
    id
    name
    weightClass
    stats {
      wins
      losses
      draws
      knockouts
      submissions
    }
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "fighter": {
        "id": 1,
        "name": "Conor McGregor",
        "weightClass": "Lightweight",
        "stats": {
          "wins": 22,
          "losses": 6,
          "draws": 0,
          "knockouts": 19,
          "submissions": 4
        }
      }
    }
  }
  ```
- **Error**: `404` if fighter not found.

#### Get Fighters by Weight Class
Retrieves all fighters in a specified weight class.
```graphql
query {
  fightersByWeightClass(weightClass: "Lightweight") {
    id
    name
    stats {
      wins
      losses
      draws
      knockouts
      submissions
    }
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "fightersByWeightClass": [
        {
          "id": 1,
          "name": "Conor McGregor",
          "stats": {
            "wins": 22,
            "losses": 6,
            "draws": 0,
            "knockouts": 19,
            "submissions": 4
          }
        }
      ]
    }
  }
  ```

#### Get Fighter Statistics
Retrieves a fighter's statistics.
```graphql
query {
  fighterStats(id: 1) {
    id
    name
    stats {
      wins
      losses
      draws
      knockouts
      submissions
    }
  }
}
```
- **Response**: Same as `Get Fighter by ID`.

#### Get Fighter Fight History
Retrieves a fighter's fight history.
```graphql
query {
  fighterHistory(id: 1) {
    id
    event {
      id
      location
    }
    fighter1 {
      name
    }
    fighter2 {
      name
    }
    winner {
      name
    }
    resultMethod
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "fighterHistory": [
        {
          "id": 1,
          "event": {
            "id": 1,
            "location": "Las Vegas"
          },
          "fighter1": {
            "name": "Conor McGregor"
          },
          "fighter2": {
            "name": "Khabib Nurmagomedov"
          },
          "winner": {
            "name": "Khabib Nurmagomedov"
          },
          "resultMethod": "SUBMISSION"
        }
      ]
    }
  }
  ```

### Mutations
#### Create Fighter
Creates a new fighter in the database.
```graphql
mutation {
  createFighter(input: {
    name: "John Doe",
    weightClass: "Middleweight",
    stats: {
      wins: 10,
      losses: 2,
      draws: 1,
      knockouts: 5,
      submissions: 3
    }
  }) {
    id
    name
    weightClass
    stats {
      wins
      losses
      draws
      knockouts
      submissions
    }
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "createFighter": {
        "id": 3,
        "name": "John Doe",
        "weightClass": "Middleweight",
        "stats": {
          "wins": 10,
          "losses": 2,
          "draws": 1,
          "knockouts": 5,
          "submissions": 3
        }
      }
    }
  }
  ```

#### Update Fighter
Updates an existing fighter's information.
```graphql
mutation {
  updateFighter(id: 1, input: {
    name: "Updated Name",
    weightClass: "Welterweight",
    stats: {
      wins: 11,
      losses: 2,
      draws: 0,
      knockouts: 6,
      submissions: 3
    }
  }) {
    id
    name
    weightClass
    stats {
      wins
      losses
      draws
      knockouts
      submissions
    }
  }
}
```
- **Response**: Same as `Create Fighter`.

#### Delete Fighter
Deletes a fighter from the database.
```graphql
mutation {
  deleteFighter(id: 1)
}
```
- **Response**:
  ```json
  {
    "data": {
      "deleteFighter": true
    }
  }
  ```
- **Error**: `404` if fighter not found.

## Events

### Queries
#### Get All Events
Retrieves a list of all events in the database.
```graphql
query {
  events {
    id
    location
    eventDate
    fights {
      id
      resultMethod
    }
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "events": [
        {
          "id": 1,
          "location": "Las Vegas, NV",
          "eventDate": "2025-05-15",
          "fights": [
            {
              "id": 1,
              "resultMethod": "KO"
            }
          ]
        }
      ]
    }
  }
  ```

#### Get Event by ID
Retrieves a specific event by its ID.
```graphql
query {
  event(id: 1) {
    id
    location
    eventDate
    fights {
      id
      resultMethod
    }
  }
}
```
- **Response**: Same as `Get All Events`.

#### Get Upcoming Events
Retrieves all upcoming events (events with a date in the future).
```graphql
query {
  upcomingEvents {
    id
    location
    eventDate
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "upcomingEvents": [
        {
          "id": 1,
          "location": "Las Vegas, NV",
          "eventDate": "2025-05-15"
        }
      ]
    }
  }
  ```

#### Get Event Fight Card
Retrieves all fights scheduled for a specific event.
```graphql
query {
  eventFightCard(id: 1) {
    id
    fighter1 {
      name
    }
    fighter2 {
      name
    }
    winner {
      name
    }
    resultMethod
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "eventFightCard": [
        {
          "id": 1,
          "fighter1": {
            "name": "Conor McGregor"
          },
          "fighter2": {
            "name": "Khabib Nurmagomedov"
          },
          "winner": {
            "name": "Khabib Nurmagomedov"
          },
          "resultMethod": "SUBMISSION"
        }
      ]
    }
  }
  ```

### Mutations
#### Create Event
Creates a new event in the database.
```graphql
mutation {
  createEvent(input: {
    location: "New York, NY",
    eventDate: "2025-06-01"
  }) {
    id
    location
    eventDate
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "createEvent": {
        "id": 2,
        "location": "New York, NY",
        "eventDate": "2025-06-01"
      }
    }
  }
  ```

#### Update Event
Updates an existing event's information.
```graphql
mutation {
  updateEvent(id: 1, input: {
    location: "Los Angeles, CA",
    eventDate: "2025-05-20"
  }) {
    id
    location
    eventDate
  }
}
```
- **Response**: Same as `Create Event`.

#### Delete Event
Deletes an event from the database.
```graphql
mutation {
  deleteEvent(id: 1)
}
```
- **Response**:
  ```json
  {
    "data": {
      "deleteEvent": true
    }
  }
  ```
- **Error**: `404` if event not found.

## Fights

### Queries
#### Get All Fights
Retrieves a list of all fights in the database.
```graphql
query {
  fights {
    id
    event {
      location
    }
    fighter1 {
      name
    }
    fighter2 {
      name
    }
    winner {
      name
    }
    resultMethod
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "fights": [
        {
          "id": 1,
          "event": {
            "location": "Las Vegas"
          },
          "fighter1": {
            "name": "Conor McGregor"
          },
          "fighter2": {
            "name": "Khabib Nurmagomedov"
          },
          "winner": {
            "name": "Khabib Nurmagomedov"
          },
          "resultMethod": "SUBMISSION"
        }
      ]
    }
  }
  ```

#### Get Fight by ID
Retrieves a specific fight by its ID.
```graphql
query {
  fight(id: 1) {
    id
    event {
      location
    }
    fighter1 {
      name
    }
    fighter2 {
      name
    }
    winner {
      name
    }
    resultMethod
  }
}
```
- **Response**: Same as `Get All Fights`.

### Mutations
#### Create Fight
Creates a new fight in the database.
```graphql
mutation {
  createFight(input: {
    eventId: 1,
    fighter1Id: 1,
    fighter2Id: 2,
    winnerId: 2,
    resultMethod: "KO"
  }) {
    id
    event {
      location
    }
    fighter1 {
      name
    }
    fighter2 {
      name
    }
    winner {
      name
    }
    resultMethod
  }
}
```
- **Response**: Same as `Get Fight by ID`.

#### Update Fight
Updates an existing fight's information.
```graphql
mutation {
  updateFight(id: 1, input: {
    winnerId: 1,
    resultMethod: "DECISION"
  }) {
    id
    event {
      location
    }
    fighter1 {
      name
    }
    fighter2 {
      name
    }
    winner {
      name
    }
    resultMethod
  }
}
```
- **Response**: Same as `Create Fight`.

#### Delete Fight
Deletes a fight from the database.
```graphql
mutation {
  deleteFight(id: 1)
}
```
- **Response**:
  ```json
  {
    "data": {
      "deleteFight": true
    }
  }
  ```
- **Error**: `404` if fight not found.

## Rankings

### Queries
#### Get All Rankings
Retrieves a list of all fighter rankings in the database.
```graphql
query {
  rankings {
    id
    fighter {
      name
    }
    weightClass
    points
  }
}
```
- **Response**:
  ```json
  {
    "data": {
      "rankings": [
        {
          "id": 1,
          "fighter": {
            "name": "Khabib Nurmagomedov"
          },
          "weightClass": "Lightweight",
          "points": 1000
        }
      ]
    }
  }
  ```

#### Get Rankings by Weight Class
Retrieves all rankings for a specific weight class.
```graphql
query {
  rankingsByWeightClass(weightClass: "Lightweight") {
    id
    fighter {
      name
    }
    points
  }
}
```
- **Response**: Same as `Get All Rankings`.

### Mutations
#### Update Rankings
Updates all rankings based on fight results.
```graphql
mutation {
  updateRankings
}
```
- **Response**:
  ```json
  {
    "data": {
      "updateRankings": true
    }
  }
  ```
- **Note**: This mutation recalculates points based on recent fight outcomes.

## Error Handling
The API returns standard GraphQL errors with the following structure:
```json
{
  "errors": [
    {
      "message": "Error message description",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["path", "to", "field"]
    }
  ]
}
```
- **Common Error Scenarios**:
  - `404 Not Found`: Entity not found (e.g., fighter, event, fight).
  - `400 Bad Request`: Invalid input data.
  - `500 Internal Server Error`: Server-side error.

## Models

### Fighter
- `id`: Int! - Unique identifier
- `name`: String! - Fighter's name
- `weightClass`: String! - Fighter's weight class
- `stats`: FighterStats! - Fighter's statistics

### FighterStats
- `wins`: Int! - Total wins
- `losses`: Int! - Total losses
- `draws`: Int! - Total draws
- `knockouts`: Int! - Total knockout wins
- `submissions`: Int! - Total submission wins

### Event
- `id`: Int! - Unique identifier
- `location`: String! - Event location
- `eventDate`: String! - Event date (ISO format)
- `fights`: [Fight!]! - List of fights in the event

### Fight
- `id`: Int! - Unique identifier
- `event`: Event! - Associated event
- `fighter1`: Fighter! - First fighter
- `fighter2`: Fighter! - Second fighter
- `winner`: Fighter - Winner (nullable for draws)
- `resultMethod`: String! - Method of victory (e.g., KO, SUBMISSION, DECISION)

### Ranking
- `id`: Int! - Unique identifier
- `fighter`: Fighter! - Associated fighter
- `weightClass`: String! - Weight class
- `points`: Int! - Ranking points

### Input Types
#### CreateFighterInput
- `name`: String! - Fighter's name
- `weightClass`: String! - Fighter's weight class
- `stats`: FighterStatsInput (optional)

#### UpdateFighterInput
- `name`: String (optional)
- `weightClass`: String (optional)
- `stats`: FighterStatsInput (optional)

#### FighterStatsInput
- `wins`: Int (optional)
- `losses`: Int (optional)
- `draws`: Int (optional)
- `knockouts`: Int (optional)
- `submissions`: Int (optional)

#### CreateEventInput
- `location`: String! - Event location
- `eventDate`: String! - Event date (ISO format)

#### UpdateEventInput
- `location`: String (optional)
- `eventDate`: String (optional)

#### CreateFightInput
- `eventId`: Int! - Associated event ID
- `fighter1Id`: Int! - First fighter ID
- `fighter2Id`: Int! - Second fighter ID
- `winnerId`: Int (optional) - Winner fighter ID
- `resultMethod`: String! - Method of victory

#### UpdateFightInput
- `eventId`: Int (optional)
- `fighter1Id`: Int (optional)
- `fighter2Id`: Int (optional)
- `winnerId`: Int (optional)
- `resultMethod`: String (optional)

#### CreateRankingInput
- `fighterId`: Int! - Associated fighter ID
- `weightClass`: String! - Weight class
- `points`: Int (optional)

#### UpdateRankingInput
- `fighterId`: Int (optional)
- `weightClass`: String (optional)
- `points`: Int (optional)

## Database Setup
The API connects to a PostgreSQL database running in a Docker container:
- **Host**: `localhost`
- **Port**: `5432`
- **User**: `admin`
- **Password**: `admin`
- **Database**: `mma-db` (target), currently `mma` (default from `POSTGRES_DB`)

### Current Configuration
- The Docker container (`mma-db`) was started with:
  - `POSTGRES_USER=admin`
  - `POSTGRES_PASSWORD=admin`
  - `POSTGRES_DB=mma`
- This created a database named `mma`.

### Steps to Use `mma-db`
1. Connect to the container:
   ```bash
   docker exec -it mma-db psql -U admin -d mma
   ```
2. Create the desired database:
   ```sql
   CREATE DATABASE "mma-db";
   GRANT ALL PRIVILEGES ON DATABASE "mma-db" TO admin;
   ```
3. Update `AppModule` to use `mma-db`:
   ```typescript
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { FighterModule } from './modules/fighter/fighter.module';
   import { EventModule } from './modules/event/event.module';
   import { FightModule } from './modules/fight/fight.module';
   import { RankingModule } from './modules/ranking/ranking.module';

   @Module({
     imports: [
       TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'admin',
         password: 'admin',
         database: 'mma-db',
         entities: [__dirname + '/entities/*.entity{.ts,.js}'],
         synchronize: true,
         logging: true,
       }),
       FighterModule,
       EventModule,
       FightModule,
       RankingModule,
     ],
   })
   export class AppModule {}
   ```
4. Rebuild and restart the application:
   ```bash
   npm run build
   npm run start:dev
   ```

### Notes
- `synchronize: true` will create tables (`fighters`, `events`, `fights`, `rankings`) based on your TypeORM entities.
- For production, disable `synchronize` and use migrations.