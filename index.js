import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import authMiddle from "./auth-middle.js"

const prisma = new PrismaClient()

const app = express()

app.use(cors())

app.use(express.json())

// app.get("/bolcher", async function (_, res) {
//     let bolcheCount = await prisma.bolche.count()
//     let apiUrl = `${req.protocol}://${req.hostname}${req.hostname === "localhost" ? ":4000" : ""}`
//     let apiPath = `${apiUrl}${req.path}`
//     let offset = parseInt(req.query.offset) || 0
//     let bolcherMany = await prisma.bolche.findMany({
//         skip: parseInt(req.query.offset) || 0,
//         take: parseInt(req.query.limit) || 3
//     })
//     let bolcher = await prisma.bolche.findMany()
//     res.json(bolcher)
// })

app.get("/bolcher", async function (_, res) {
  
    let bolcher = await prisma.bolche.findMany()
    res.json(bolcher)
})

app.get("/bolcher/:id", async function (req, res) {
    let params = req.params
    let bolche = await prisma.bolche.findUnique({
        where: { id: parseInt(params.id) }
    })
    res.json(bolche)
})

 app.post("/bolcher", async function (req, res) {
     let body = req.body

     let bolche = await prisma.bolche.create({
         data: {
             navn: body.navn,
             farve: body.farve,
             vaegt: parseInt(body.vaegt),
             surhed: body.surhed,

             smag: body.smag,
             pris: parseInt(body.pris)

         }
     })
     res.json(bolche)
 })

app.delete("/bolcher/:id", authMiddle, async function (req, res) {
    let params = req.params
    console.log(params)
     let bolche = await prisma.bolche.findUnique({
         where: { id: parseInt(params.id) }
     })
     console.log(bolche)
     if (!bolche) {
        
         return res.status(404).json({ message: "Findes ikke" })
     }

    await prisma.bolche.delete({
        where: { id: parseInt(params.id) }
    })

    return res.status(204).end()

})

app.patch("/bolcher", async function (req, res) {
    let body = req.body

    const update = await prisma.bolche.update(
        {
            where: { id: body.id },
            data: body
        }
    )
    return res.status(204).end()
})

app.put("/bolcher/:id", authMiddle, async function (req, res) {
    let params = req.params
    let body = req.body
    let bolche = await prisma.bolche.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!bolche) return res.status(404).json({ message: "Ikke findes" })

    let updatedBolsche = await prisma.bolche.update({
        where: { id: parseInt(params.id) },
        data: {
            navn: body.navn,
            farve: body.farve,
            vaegt: parseInt(body.vaegt),
            surhed: body.surhed,

            smag: body.smag,
            pris: parseInt(body.pris)

        }
    });
    return res.status(200).json(updatedBolsche)
})

app.listen(4000, function () {
    console.log("Listening")
})
