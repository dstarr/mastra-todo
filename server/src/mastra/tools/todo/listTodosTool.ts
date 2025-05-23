import { z } from "zod";
import { createTool } from '@mastra/core/tools';
import { todoItemSchema } from "../../../todo/schema";
import config from "../../../config";
import TodoItemPostgreRepository from "../../../todo/TodoItemPostgreRepository";

/**
 * This schema defines the structure of the input for the listTodosTool.
 * It is an empty object since no input is required to list todos.
 */
const listOutputSchema = z.array(todoItemSchema);

/**
 * Tool to list all todo items.
 * It retrieves all todo items from the repository and returns them as an array.
 *
 * @constant
 * @type {Tool}
 * @property {string} id - The unique identifier for the tool (`list-todos`).
 * @property {string} description - A brief description of the tool (`List all todo items`).
 * @property {z.ZodObject} inputSchema - The schema for the input, which is an empty object in this case.
 * @property {z.ZodArray} outputSchema - The schema for the output, which is an array of todo items.
 * @property {Function} execute - The function that performs the tool's operation.
 * 
 * @throws {Error} Throws an error if the todo items cannot be retrieved or if there is a failure during execution.
 */
export const listTodosTool = createTool({
  id: 'list-todos',
  description: 'List all todo items',
  inputSchema: z.object({}),
  outputSchema: listOutputSchema,
  execute: async () => {

    console.log("🛠️ LIST TODO TOOL");

    let result: z.infer<typeof listOutputSchema> | null = null;
    
    const repository = new TodoItemPostgreRepository({
      dbConfig: config.Postgres,
    });

    try {
      
      result = await repository.getAll();
      if (!result) {
        throw new Error('Failed to retrieve todo items');
      }

    } catch (error) {
      console.error('❌ Error retrieving todo items:', error);
      throw new Error('Failed to list todo items');
    } finally {
      await repository.disconnect();
    }

    return result;
  }
});

