import {Router} from 'express'
import otherModel from '../models/other.js'
const other = Router()

other.post("/model", async (req,res) => {

    const result = await otherModel.createModel(req.body)
    return res.json(result)
})
other.post("/insurer", async (req,res) => {

    const result = await otherModel.createInsurer(req.body)
    return res.json(result)
})
other.post("/policy", async (req,res) => {

    const result = await otherModel.createPolicy(req.body)
    return res.json(result)
})

other.post("/addAmount", async (req,res) => {

    const result = await otherModel.addAmount(req.body)
    return res.json(result)
})
other.post("/getAmount", async (req,res) => {

    const result = await otherModel.getAmount(req.body)
    return res.json(result)
})

export default other