# AI-driven Agents with Mastra.ai

A small utility application demonstrating core functionality of the Mastra.ai TypeScript framework working with OpenAI.

The only model provider supported at this time is OpenAI.

<!-- no toc -->
  - [Getting started with the server](#getting-started-with-the-server)
  - [Using the Todo item Agent](#using-the-todo-item-agent)
  - [Using the GitHub Agent with MCP Server](#using-the-github-agent-with-mcp-server)
  - [The client](#the-client)


## Getting started with the server

1. Clone repo and cd into the `server` directory
2. Run `npm install`
3. Create a `.env` file in the `server` directory as per [the below example](#environmental-variables) and add the environmental variables.
4. Use [the below script](#todo-table-creation-script) to create a table in PostgresQL to store your todo items.
5. Run `npm run dev`
   
### Environmental variables

```bash
  # Azure Cosmos DB settings - Cosmos deployed as MongoDB
  # DEPRECATED - MOVED TO POSTGRESQL
  # MONGODB_DB_CS=YOUR_CONNECTION_STRING
  # MONGODB_DB_DATABASE=YOUR_DATABASE_NAME # 
  # MONGODB_DB_COLLECTION=YOUR_COLLECTION_NAME

  # Open AI settings
  OPENAI_API_KEY=YOUR_OPENAI_KEY
  OPENAI_MODEL=THE_OPENAI_MODEL_NAME

  # GitHub token to use the GitHub MCP server
  GITHUB_TOKEN=YOUR_GITHUB_TOKEN

  # Postgres settings
  # Needed because we are using the postgres adapter for the working memory
  # and mastra does not yet support MongoDB as a vector database
  # This is a temporary solution until we have a MongoDB adapter for the working memory
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_USER=YOUR_USER_NAME
  POSTGRES_PASSWORD=postgres
  POSTGRES_DB=YOUR_TODO_DB_NAME
```

### Todo table creation script

```sql
CREATE TABLE todo_items (
    id UUID PRIMARY KEY,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
``` 

## Using the Todo item Agent

This application enables CRUD operations on a todo list held in a MongoDB and surfaced through AI agents, tools, and workflows. The DB used today is a Cosmos DB on Azure using the Mongo configuration.

The todo items connection should work with a standard Mongo DB server, but this hasn't been tested.

> **Note:** To enable the memory capability of the To Do agent, you must have the role `postgres` added to your table that stores chat memory. The schema will be created for you.

## Using the GitHub Agent with MCP Server

The GitHub Agent uses the GitHub MCP server which runs in a docker container. To enable this agent, you must have docker installed and the daemon must be running.

> **Note:** The `GITHUB_TOKEN` value is the key from a token you may [create on GitHub here](https://github.com/settings/personal-access-tokens/new).

More information available at the [GitHub MCP Server repo](https://github.com/github/github-mcp-server).

## The client

The client application is under development and you can just ignore it for now.