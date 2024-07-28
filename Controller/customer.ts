import { Request, Response } from "express"
import { Customer } from "../db/entities/Customer.js"
import { AppError } from "../errors/AppError.js";

const getAllCustomer = async (req: Request, res: Response) => {
    const customers = await Customer.find()
    res.status(200).json({
        message: "Getting all Customers successfully",
        customer: customers
    })
}

const deleteCustomer = async (id: number) => {
    const customer = await Customer.findOne({ where: { id: id } })
    if (!customer) {
        throw new AppError("Customer Not Found to delete", 404, true)
    }
    return customer.remove()
}

const updateCustomer = async (payLoad: Customer, id: number) => {
    const customer = await Customer.findOne({ where: { id: id } })
    if (!customer) {
        throw new AppError("Customer Not Found to update", 404, true)
    }
    if (payLoad.customerName) {
        customer.customerName = payLoad.customerName
    }
    if (payLoad.mobilePhone) {
        customer.mobilePhone = payLoad.mobilePhone
    }
    if (payLoad.customerBalance) {
        customer.customerBalance = payLoad.customerBalance
    }

    return customer.save()
}

const createCustomer = async (payLoad: Customer) => {
    const customer = await Customer.findOne({
        where: {
            mobilePhone: payLoad.mobilePhone
        }
    })
    if (customer) {
        throw new AppError("Customer already exist", 409, true)
    }
    const newCustomer = Customer.create(payLoad)
    return newCustomer.save()
}

const getSingleCustomer = async (id: number) => {
    const customer = await Customer.findOne({ where: { id: id } })
    if (!customer) {
        throw new AppError("Customer not found to returned", 404, true)
    }
    return customer
}


export { getAllCustomer, deleteCustomer, updateCustomer, createCustomer, getSingleCustomer }