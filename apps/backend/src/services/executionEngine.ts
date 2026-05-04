import { ActionStatus, ResourceType } from '@universal-workspace/shared-types';
import prisma from '../lib/prisma';

export interface ActionRequest {
  capability_id: string;
  user_id: string;
  input_resource_ids: string[];
  parameters: any;
}

/**
 * The ExecutionEngine is the heart of the Universal Action Workspace.
 * It handles the orchestration of "Actions" – which are specific tasks 
 * performed by "Capabilities" (tools) provided by "Modules".
 */
export class ExecutionEngine {
  /**
   * Triggers a new action. This is the entry point when a user clicks "Execute" in the UI.
   * 
   * @param request - Contains the capability to run, the user running it, and the input files.
   * @returns The created Action record (initially in PENDING state).
   */
  static async triggerAction(request: ActionRequest) {
    // 1. Validation Phase
    // We check if the requested tool (capability) actually exists in our database.
    const capability = await prisma.capability.findUnique({
      where: { id: request.capability_id },
      include: { module: true }, // We include the module info to know which service provides this tool
    });

    if (!capability) throw new Error('Capability not found');

    // 2. Action Logging Phase
    // We record the intent to execute in the database. This allows us to track history,
    // show progress bars, and handle long-running tasks asynchronously.
    const action = await prisma.action.create({
      data: {
        capability_id: request.capability_id,
        user_id: request.user_id,
        status: 'PENDING',
        // We link the action to the specific resources (files/videos) used as input
        input_resources: {
          connect: request.input_resource_ids.map(id => ({ id })),
        },
      },
    });

    // 3. Dispatch Phase
    // We start the actual processing in the background (fire-and-forget).
    // In a production environment, this might push a job to a queue like BullMQ.
    this.processAction(action.id, capability, request.parameters);

    // We return the action object immediately so the UI can show a "Started" state.
    return action;
  }

  /**
   * Internal method that simulates the actual work being done.
   * In the future, this will call external APIs or run local shell commands (like FFmpeg).
   */
  private static async processAction(actionId: string, capability: any, parameters: any) {
    console.log(`[Execution Engine] Processing action ${actionId} for capability ${capability.name}`);
    
    try {
      // Update state to PROCESSING so the user knows work has begun
      await prisma.action.update({
        where: { id: actionId },
        data: { status: 'PROCESSING' },
      });

      // --- SIMULATION OF WORK ---
      // This represents where the actual "Action" logic happens (e.g., calling an AI model or a script)
      await new Promise(resolve => setTimeout(resolve, 2000));
      // --------------------------

      // Finalize the action as COMPLETED
      await prisma.action.update({
        where: { id: actionId },
        data: { 
          status: 'COMPLETED',
          execution_log: { message: 'Action executed successfully (mock simulation)' }
        },
      });
      
      console.log(`[Execution Engine] Action ${actionId} completed.`);
    } catch (error: any) {
      // If anything fails, we log the error to the database so the user can see why it failed
      console.error(`[Execution Engine] Action ${actionId} failed:`, error);
      await prisma.action.update({
        where: { id: actionId },
        data: { 
          status: 'FAILED',
          execution_log: { error: error.message }
        },
      });
    }
  }
}
