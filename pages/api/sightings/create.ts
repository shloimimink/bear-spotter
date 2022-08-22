import {NextApiRequest, NextApiResponse} from "next";
import {connect} from "utils/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const {db} = await connect()
    const {sighting: {latitude, longitude}} = req.body

    const result = await db.collection("sightings").insertOne({
        location: {
            type: "Point",
            coordinates: [longitude, latitude]
        },
        createdAt: new Date()
    })

    res.json({sighting: result.ops[0]})
}
