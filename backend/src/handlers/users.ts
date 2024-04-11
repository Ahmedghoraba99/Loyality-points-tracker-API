import express, { Request, Response } from 'express';
import UsersFunctions, { User } from '../models/users';

const usersFunction = new UsersFunctions();
// CREATE
const createUser = async (req: Request, res: Response) => {
    try {
        const user: User = {
            Name: req.body.name as string,
            Phone: req.body.phone as string,
            Vip: req.body.vip || false,
            Points: req.body.points || 0,
        };

        const newUser = await usersFunction.create(user);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({
            error: `Error creating user: ${(error as Error).message}`,
        });
    }
};

// READ
const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const allUsers = await usersFunction.index();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({
            error: `Error getting all users: ${(error as Error).message}`,
        });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const idOrPhone = req.params.idOrPhone;
        const user = await usersFunction.show(idOrPhone);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({
            error: `Error getting user: ${(error as Error).message}`,
        });
    }
};

// UPDATE
const updateUserID = async (req: Request, res: Response) => {
    try {
        const user: User = {
            ID: req.body.id as unknown as number,
            Name: req.body.name as string,
            Phone: req.body.phone as string,
            Vip: req.body.vip,
            Points: req.body.points || 0,
        };

        const updatedUser = await usersFunction.updateID(user);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({
            error: `Error updating user: ${(error as Error).message}`,
        });
    }
};
const updateUserPhone = async (req: Request, res: Response) => {
    try {
        const user: User = {
            Name: req.body.name as string,
            Phone: req.body.phone as string,
            Vip: req.body.vip || false,
            Points: req.body.points as unknown as number,
        };

        const updatedUser = await usersFunction.updatePhone(user);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({
            error: `Error updating user: ${(error as Error).message}`,
        });
    }
};
const addPoints = async (req: Request, res: Response) => {
    try {
        const idOrPhone = req.body.idOrPhone;
        const points = req.body.points as unknown as number;
        console.log('Points: ' + points + 'ID/Phone' + idOrPhone);
        const user = await usersFunction.addPoints(idOrPhone, points);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({
            error: `Error Adding points: ${(error as Error).message}`,
        });
    }
};
const deductPoints = async (req: Request, res: Response) => {
    try {
        const idOrPhone = req.body.idOrPhone;
        const points = req.body.points as unknown as number;
        //console.log('Points: ' + points + 'ID/Phone' + idOrPhone);
        const user = await usersFunction.deductPoints(idOrPhone, points);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({
            error: `Error Adding points: ${(error as Error).message}`,
        });
    }
};
// DELETE
const deleteUser = async (req: Request, res: Response) => {
    try {
        const idOrPhone = req.params.idOrPhone as string;
        const deletedUser = await usersFunction.delete(idOrPhone);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({
            error: `Error deleting user: ${(error as Error).message}`,
        });
    }
};

// Defining routes
const usersRoutes = (app: express.Application) => {
    app.post('/api/users', createUser);
    app.get('/api/users', getAllUsers);
    app.get('/api/users/:idOrPhone', getUser);
    app.put('/api/usersid/', updateUserID);
    app.put('/api/usersphone/', updateUserPhone);
    app.put('/api/addPoints/', addPoints);
    app.put('/api/deductPoints/', deductPoints);
    app.delete('/api/users/:idOrPhone', deleteUser);
};

export default usersRoutes;
