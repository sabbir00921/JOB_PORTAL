import fs from "fs";
import path from "path";

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Please provide a module name. Example: npm run makemodule job");
  process.exit(1);
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const Module = capitalize(moduleName);
const lowerModule = moduleName.toLowerCase();

// Base path
const basePath = path.join(process.cwd(), "src", "modules", moduleName);
if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

const files = [
  {
    name: `${lowerModule}.interface.ts`,
    content: `export interface I${Module} {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Create${Module}Payload {
  // TODO: Add fields
}

export interface Update${Module}Payload {
  // TODO: Add fields
}
`
  },
  {
    name: `${lowerModule}.validation.ts`,
    content: `import { z } from "zod";

export const create${Module}Schema = z.object({
  body: z.object({
    // TODO: Add validation
  }),
});

export const update${Module}Schema = z.object({
  body: z.object({
    // TODO: Add validation
  }),
});

export type Create${Module}Payload = z.infer<typeof create${Module}Schema>["body"];
export type Update${Module}Payload = z.infer<typeof update${Module}Schema>["body"];
`
  },
  {
    name: `${lowerModule}.repository.ts`,
    content: `import { prisma } from "../../database/prisma";
import { ${Module} } from "@prisma/client";

// Add specific helper functions here if needed
export const ${lowerModule}Repository = {
  // Example helper
  async findDetail(id: string) {
    return prisma.${lowerModule}.findUnique({ where: { id } });
  }
};
`
  },
  {
    name: `${lowerModule}.service.ts`,
    content: `import { prisma } from "../../database/prisma";
import CustomError from "../../helpers/CustomError";
import { paginationHelper } from "../../utils/pagination";
import { Create${Module}Payload, Update${Module}Payload } from "./${lowerModule}.validation";

export const ${lowerModule}Service = {
  async create${Module}(payload: Create${Module}Payload) {
    const result = await prisma.${lowerModule}.create({
      data: payload as any,
    });
    return result;
  },

  async getAll${Module}s(query: any) {
    const { page, limit, skip } = paginationHelper(query.page, query.limit);

    const [items, total] = await Promise.all([
      prisma.${lowerModule}.findMany({
        skip,
        take: limit,
      }),
      prisma.${lowerModule}.count(),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total,
      },
    };
  },

  async get${Module}(id: string) {
    const item = await prisma.${lowerModule}.findUnique({
      where: { id },
    });
    if (!item) throw new CustomError(404, "${Module} not found");
    return item;
  },

  async update${Module}(id: string, payload: Update${Module}Payload) {
    const item = await prisma.${lowerModule}.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "${Module} not found");

    return prisma.${lowerModule}.update({
      where: { id },
      data: payload as any,
    });
  },

  async delete${Module}(id: string) {
    const item = await prisma.${lowerModule}.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "${Module} not found");

    return prisma.${lowerModule}.delete({
      where: { id },
    });
  },
};
`
  },
  {
    name: `${lowerModule}.controller.ts`,
    content: `import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { ${lowerModule}Service } from "./${lowerModule}.service";

export const create${Module} = asyncHandler(async (req, res) => {
  const result = await ${lowerModule}Service.create${Module}(req.body);
  ApiResponse.sendSuccess(res, 201, "${Module} created successfully", result);
});

export const getAll${Module}s = asyncHandler(async (req, res) => {
  const { items, meta } = await ${lowerModule}Service.getAll${Module}s(req.query);
  ApiResponse.sendSuccess(res, 200, "${Module}s fetched successfully", items, meta);
});

export const getSingle${Module} = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await ${lowerModule}Service.get${Module}(id);
  ApiResponse.sendSuccess(res, 200, "${Module} fetched successfully", result);
});

export const update${Module} = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await ${lowerModule}Service.update${Module}(id, req.body);
  ApiResponse.sendSuccess(res, 200, "${Module} updated successfully", result);
});

export const delete${Module} = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await ${lowerModule}Service.delete${Module}(id);
  ApiResponse.sendSuccess(res, 200, "${Module} deleted successfully");
});
`
  },
  {
    name: `${lowerModule}.route.ts`,
    content: `import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { create${Module}Schema, update${Module}Schema } from "./${lowerModule}.validation";
import * as ${Module}Controller from "./${lowerModule}.controller";

const router = express.Router();

router.get("/", ${Module}Controller.getAll${Module}s);
router.get("/:id", ${Module}Controller.getSingle${Module});

router.post(
  "/",
  validateRequest(create${Module}Schema),
  ${Module}Controller.create${Module}
);

router.patch(
  "/:id",
  validateRequest(update${Module}Schema),
  ${Module}Controller.update${Module}
);

router.delete("/:id", ${Module}Controller.delete${Module});

export default router;
`
  }
];

files.forEach(file => {
  const filePath = path.join(basePath, file.name);
  fs.writeFileSync(filePath, file.content);
  console.log(`Created: ${filePath}`);
});

console.log(`\nModule ${Module} generated successfully!`);
console.log(`Don't forget to register it in src/routes/index.api.ts`);
