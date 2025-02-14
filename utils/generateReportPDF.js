export const generateReportPDF = (data) => `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RemindeRx: Health and Medication Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        color: #333;
      }
      .header {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .date-range {
        text-align: center;
        font-size: 14px;
        margin-bottom: 50px;
        margin-top: -10px;
      }
      .disclaimer,
      .patient-info,
      .vital-stats,
      .medication-tracking,
      .missed-medication,
      .recommendations {
        margin-top: 20px;
      }
      .section-title {
        color: #f84d4d;
      }
      .section-content {
        margin-left: 0px;
      }
      .details {
        margin-left: 20px;
      }
      .color_red {
        color: #f84d4d;
      }

      .rx {
        color: #6755d2;
      }

      .reminder {
        margin-top: 50px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1 class="header">RemindeRx: Health and Medication Report</h1>
    <div class="date-range">Date Range: ${data.startDate} - ${
  data.endDate
}</div>

    <div class="disclaimer">
      <p>
        <strong class="color_red">DISCLAIMER</strong><br />
        This service is meant to provide helpful information, but it is not a
        replacement for professional medical advice from a doctor. Always
        consult a healthcare professional for medical concerns.
      </p>
    </div>

    <div class="patient-info">
      <p>
        <strong class="section-title">PATIENT INFORMATION</strong><br />
        <strong>Name:</strong> ${data.name}<br />
        <strong>Email:</strong>
        <a href="mailto:${data.email}">${data.email}</a>
      </p>
    </div>

    <hr />

    <div class="vital-stats">
      <p><strong class="section-title">VITAL STATISTICS</strong></p>
      <p class="section-content">
        <strong>Average Heart Rate: </strong> ${data.avgPulseRate}bpm<br />
        (Normal: 60 - 100 bpm)
      </p>
      <p class="section-content">
        <strong>Average Oxygen Levels:</strong> ${data.avgOxygen}%<br />
        (Normal: 95 - 100 %)
      </p>
    </div>

    <div class="medication-tracking">
      <p><strong class="section-title">MEDICATION TRACKING</strong></p>
      <p class="section-content">
        <strong>Pill(s) Taken:</strong> ${data.totalTaken} pill(s)<br />
        <strong>Pill(s) Missed:</strong> ${data.totalSkipped} pill(s)<br />
        <strong> Missed Dates:</strong> ${data.skippedDates}
      </p>
    </div>

    <div class="missed-medication">
      <p><strong class="section-title">DETAILS OF MISSED MEDICATION</strong></p>
   <ul class="details">
   ${data.skippedSummaries
     .map((summary) => `<li><p>${summary}</p></li>`)
     .join("")}
 </ul>
    </div>


    <hr />

    <p class="reminder">
      Thank you for using Reminde<span class="rx">Rx!</span> <br />
      reminderx@gmail.com <br />
      [123-456-789]
    </p>
  </body>
</html>

`;
