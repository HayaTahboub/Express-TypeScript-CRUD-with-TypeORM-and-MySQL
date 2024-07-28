import { Router, Request, Response, NextFunction } from "express"
import { createCustomer, deleteCustomer, getAllCustomer, getSingleCustomer, updateCustomer } from "../controller/customer.js"

const router = Router()

router.get("/", getAllCustomer)

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        const customer = await getSingleCustomer(id)
        res.json({
            message: "Customer returned successfully",
            customer: customer
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    try {
        const customer = await deleteCustomer(id)
        res.json({
            message: "Customer deleted successfully"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    try {
        const customer = await updateCustomer(req.body, id)
        res.json({
            message: "Customer edit successfully",
            customer: customer
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.customerName || !req.body.mobilePhone || !req.body.customerBalance) {
            return res.status(400).json({
                message: "some fields are missing",
                success: false
            })
        }
        const customer = await createCustomer(req.body)
        res.json({
            message: "Customer created successfully",
            customer: customer
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
})

export default router