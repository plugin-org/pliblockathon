const fastcsv = require("fast-csv");
const fs = require("fs");
import { firebaseAdmin } from "../../firebase-admin";

export default async function downloadCSV(req, res) {
  try {
    const admin_uid = req.body.admin_uid;
    // const jsonData = req.body.json
    const ws = fs.createWriteStream(`public/report_${admin_uid}.csv`);
    const jsonData = [];
    //created_at, status, crated_by, event_id, tracking_link, event_type
    console.log(admin_uid);
    (
      await firebaseAdmin
        .firestore()
        .collection("events")
        .where("adminUID", "==", admin_uid)
        .get()
    ).docs.forEach((doc) => {
      const d = doc.data();
      const data = {};
      data.createdAt = d.created_date;
      data.status = d.status;
      data.createdBy = d.raisedBy;
      data.event_id = d.id;
      (data.tracking_link = `https://dasthavej-main.vercel.app/?eventId=${d.id}`),
        (data.event_type = d.type);
      jsonData.push(data);
    });

    console.log(jsonData);

    // const jsonData = [
    //   {
    //     id: 1,
    //     name: "Node.js",
    //     description: "JS web applications",
    //     created_at: "2021-09-02",
    //   },
    //   {
    //     id: 2,
    //     name: "Vue.js",
    //     description: "for building UI",
    //     created_at: "2021-09-05",
    //   },
    //   {
    //     id: 3,
    //     name: "Angular.js",
    //     description: "for building mobile & desktop web app",
    //     created_at: "2021-09-08",
    //   },
    // ];

    // admin created events
    // slNo,

    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function () {
        console.log("Write to CSV successfully!");
      })
      .pipe(ws);
    // console.log(`${req.protocol}://${req.get('host')}`);
    res.status(200).json({ link: `http://localhost/report_${admin_uid}.csv` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
