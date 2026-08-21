import type { NextFunction, Request, Response } from "express";
import type { FilterQuery, Model } from "mongoose";
import type { ApiResponse } from "../types/apiResponse.types";

interface CrudControllerOptions {
  sort: Record<string, 1 | -1>;
  notFoundMessage: string;
}

export interface CrudController {
  getActive: (req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) => Promise<void>;
  getAllForAdmin: (req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) => Promise<void>;
  getById: (req: Request<{ id: string }>, res: Response<ApiResponse<unknown>>, next: NextFunction) => Promise<void>;
  create: (req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) => Promise<void>;
  update: (req: Request<{ id: string }>, res: Response<ApiResponse<unknown>>, next: NextFunction) => Promise<void>;
  remove: (req: Request<{ id: string }>, res: Response<ApiResponse<never>>, next: NextFunction) => Promise<void>;
}

/**
 * Every hospital-site resource (announcements, staff, careers, services) exposes the same
 * find-active / find-all-for-admin / findById / create / update / delete shape, differing only
 * in the model, sort order, and not-found message. This factory is that shape, built once.
 */
export function createCrudController<T extends { isActive: boolean }>(
  model: Model<T>,
  { sort, notFoundMessage }: CrudControllerOptions
): CrudController {
  return {
    async getActive(_req, res, next) {
      try {
        const items = await model.find({ isActive: true } as FilterQuery<T>).sort(sort);
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        next(error);
      }
    },

    async getAllForAdmin(_req, res, next) {
      try {
        const items = await model.find().sort(sort);
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        next(error);
      }
    },

    async getById(req, res, next) {
      try {
        const item = await model.findOne({ _id: req.params.id, isActive: true } as FilterQuery<T>);
        if (!item) {
          res.status(404).json({ success: false, error: notFoundMessage });
          return;
        }
        res.status(200).json({ success: true, data: item });
      } catch (error) {
        next(error);
      }
    },

    async create(req, res, next) {
      try {
        const item = await model.create(req.body);
        res.status(201).json({ success: true, data: item });
      } catch (error) {
        next(error);
      }
    },

    async update(req, res, next) {
      try {
        const item = await model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) {
          res.status(404).json({ success: false, error: notFoundMessage });
          return;
        }
        res.status(200).json({ success: true, data: item });
      } catch (error) {
        next(error);
      }
    },

    async remove(req, res, next) {
      try {
        const item = await model.findByIdAndDelete(req.params.id);
        if (!item) {
          res.status(404).json({ success: false, error: notFoundMessage });
          return;
        }
        res.status(200).json({ success: true });
      } catch (error) {
        next(error);
      }
    },
  };
}
