/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

import nodemailer from "nodemailer";

export default async function sendEMail(req, res) {
  try {
    const TO = req.body.TO;
    const SUBJECT = "Event Created by Admin";
    const eventId = req.body.eventId;

    // const random = makeid(30);

    const link = `https://dasthavej-main.vercel.app/?eventId=${eventId}`;

    let transporter = nodemailer.createTransport({
      service: "Yandex",
      auth: {
        user: "",
        pass: "",
      },
    });

    let mailOptions = {
      //   name: "Harsha Netha | Dasthavej",
      from: "harsha@turntbloke.me",
      to: TO,
      subject: SUBJECT,
      //   text: 'That was easy!',
      html: `<!DOCTYPE html lang="en">
  
  <head>
    <link rel="stylesheet" type="text/css" hs-webfonts="true" href="https://fonts.googleapis.com/css?family=Josefin Sans|Josefin Sans:i,b,bi">
    <link rel="stylesheet" type="text/css" hs-webfonts="true" href="https://fonts.googleapis.com/css?family=DM Sans|DM Sans:i,b,bi">
    
    <title>Email template</title>
    <meta property="og:title" content="Email template">
    
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <style type="text/css">
   
      a{ 
        text-decoration: underline;
        /* color: inherit; */
        font-weight: bold;
        color: #443266;
      }
      
      h1 {
        font-size: 56px;
      }
      
        h2{
        font-size: 28px;
        font-weight: 900; 
      }
      
      p {
        font-weight: 100;
        font-family: DM Sans;
        color: #454545;
      }
      
      td {
    vertical-align: top;
      }
      
      #email {
        margin: auto;
        width: 80vw;
        background-color: white;
      }
      
      button{
        font: inherit;
        background-color: #443266;
        border: none;
        /* padding: 10px; */
        /* text-transform: uppercase; */
        letter-spacing: 1px;
        font-weight: 400;
         line-height: 16px;
         /* border-bottom: -5px; */
         padding:10px 10px 8px 10px ;
         font-family: Josefin Sans;
        color: white;
        border-radius: 5px; 
        /* box-shadow: 3px 3px #d94c53; */
      }
      
      .subtle-link {
        font-size: 9px; 
        text-transform:uppercase; 
        letter-spacing: 1px;
        color: #CBD6E2;
      }
      
    </style>
    
  </head>
    
    <body bgcolor="#F5F8FA" style="width: 100%; margin: auto 0; padding:0; font-family:Lato, sans-serif; font-size:18px; color:#443266; word-break:break-word">
  
 <! View in Browser Link --> 
      
<div id="email">
     
  
  
  <! Banner --> 
         <table role="presentation" width="100%">
            <tr>
         
              <td bgcolor="#F1F0FF" align="center" style="color: white;">
            
             <img  style="padding:2rem" src="cid:logo1" width="150px" align="middle" alt="LogoDasthavej" />
                
                <h1></h1>
                
              </td>
        </table>
  
  
  
  
    <! First Row --> 
  
  <table role="presentation" border="0" cellpadding="0" cellspacing="10px" style="padding: 30px 30px 30px 60px;">
     <tr>
       <td>
        <h3 style="font-family: Josefin Sans;">Event Created</h3>
        <h2 style="font-family: Josefin Sans;">${eventId}</h2>
        
            <p>
                Your requested event has been created.
            </p> <p>
Please find the Event from the below link.
            </p>
            <a href="${link}"><button>Click Here To View</button></a>
            
          </td> 
          </tr>
                 </table>
  
  <table role="presentation" bgcolor="#F1F0FF" width="100%" style="margin-top: 50px;" >
      <tr>
          <td align="center" style="padding: 30px 30px;">
            
            <p style="font-style: italic;" >
                Note: Thank you for using Dasthavej</p>
              <a href="https://dasthavej-main.vercel.app/support">Ask us a question</a>  
          </td>
          </tr>
      </table>
      </div>
    </body>
      </html>`,
      attachments: [
        {
          filename: "logo.png",
          href: "https://github.com/HarshavardhanNetha/HarshavardhanNetha.github.io/blob/main/logo_dasthavej.png",
          cid: "logo1", //same cid value as in the html img src
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).json({ error: error });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: info.response });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
