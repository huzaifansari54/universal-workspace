import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * This controller handles the registration of external "Modules" into the workspace.
 * A module is a set of tools (Capabilities) that the workspace can use.
 * 
 * Example: A "Video Processing Module" might provide capabilities like "Compress" or "Transcode".
 */
export const registerModule = async (req: Request, res: Response) => {
  // We extract the module's name, its tools (capabilities), and any config (API keys, etc.) from the request body.
  const { name, capabilities, config } = req.body;

  try {
    // 1. Create or Update the Module record.
    // "upsert" means: If a module with this name exists, update it. If not, create a new one.
    const module = await prisma.module.upsert({
      where: { name },
      update: { config },
      create: { name, config, status: 'ACTIVE' },
    });

    // 2. Register or Update the specific tools (Capabilities) this module provides.
    // We loop through each capability provided in the manifest.
    for (const cap of capabilities) {
      await prisma.capability.upsert({
        where: {
          // We use a unique constraint combining the module ID and the tool name
          // so we don't duplicate tools on every registration.
          module_id_name: {
            module_id: module.id,
            name: cap.name,
          },
        },
        update: {
          input_types: cap.input_types, // Update what kind of files it accepts (e.g. VIDEO)
          parameters_schema: cap.parameters_schema, // Update what settings it needs from the user
        },
        create: {
          module_id: module.id,
          name: cap.name,
          input_types: cap.input_types,
          parameters_schema: cap.parameters_schema,
        },
      });
    }

    console.log(`[Core] Module registered successfully: ${name}`);
    res.json({ status: 'success', moduleId: module.id });
  } catch (error: any) {
    // If anything goes wrong (e.g. database error), we log it and return a 500 error.
    console.error(`[Core] Registration error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
