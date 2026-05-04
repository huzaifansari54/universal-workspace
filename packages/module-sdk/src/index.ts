import { ResourceType, ActionStatus } from '@universal-workspace/shared-types';

/**
 * This SDK provides the building blocks for creating external Modules.
 * Any developer wanting to add a new tool to the workspace should extend these classes.
 */

/**
 * Defines a specific tool (Capability) within a module.
 */
export interface CapabilityDefinition {
  name: string; // The user-friendly name of the tool (e.g. "Compress Video")
  inputTypes: ResourceType[]; // The types of files this tool can handle
  parametersSchema: any; // A JSON Schema defining the settings/inputs this tool needs from the UI
  // The actual function that will be called to perform the work
  execute: (inputs: any[], params: any) => Promise<ExecutionResult>;
}

/**
 * The structure of the result returned after an action is executed.
 */
export interface ExecutionResult {
  status: ActionStatus; // Whether it succeeded or failed
  outputResources?: any[]; // Any new files created by the action
  log?: string; // Descriptive logs of what happened
  error?: string; // Error message if it failed
}

/**
 * The Base Class for all modules. 
 * By extending this, a module gets a standardized way to describe itself to the Core Engine.
 */
export abstract class BaseModule {
  abstract id: string; // A unique identifier for the module
  abstract name: string; // The display name of the module
  abstract capabilities: CapabilityDefinition[]; // The list of tools this module provides

  /**
   * Called when the module is first loaded.
   */
  async initialize(): Promise<void> {
    console.log(`[SDK] Initializing module: ${this.name} (${this.id})`);
  }

  /**
   * Generates a "Manifest" – a JSON object that describes the module's 
   * identity and tools. This is what gets sent to the Core Engine's /register endpoint.
   */
  getManifest() {
    return {
      id: this.id,
      name: this.name,
      capabilities: this.capabilities.map(c => ({
        name: c.name,
        inputTypes: c.inputTypes,
        parametersSchema: c.parametersSchema,
      })),
    };
  }
}
