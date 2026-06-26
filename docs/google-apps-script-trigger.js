/**
 * Google Apps Script — Coach Profile Form Submission Trigger
 *
 * HOW TO INSTALL:
 * 1. Open the Google Spreadsheet linked to your Coach Profile Form
 * 2. Click Extensions → Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Update the CONFIG values below
 * 5. Click Save (💾)
 * 6. Click Run → onFormSubmit once (to grant permissions — you'll get an auth dialog)
 * 7. Click Triggers (clock icon) → Add Trigger:
 *      Choose function: onFormSubmit
 *      Event source:    From spreadsheet
 *      Event type:      On form submit
 * 8. Save the trigger
 *
 * That's it! Every new form submission will automatically POST to your webhook.
 */

// ─── Configuration — UPDATE THESE ───────────────────────────────────────────
var CONFIG = {
  // Your Next.js app URL (production) — no trailing slash
  WEBHOOK_URL: 'https://your-app.vercel.app/api/webhooks/google-forms',

  // Must match WEBHOOK_SECRET in your .env.local
  WEBHOOK_SECRET: 'change-me-to-a-long-random-secret-string',

  // Column header names in your Google Sheet (must match exactly)
  // Edit these to match the question titles in your Google Form
  COLUMN_MAP: {
    timestamp:           'Timestamp',
    fullName:            'Full Name',
    email:               'Email Address',
    phone:               'Phone Number',
    location:            'Location',
    title:               'Title / Designation',
    headline:            'One-Line Tagline',
    bio:                 'Short Bio',
    coachingPhilosophy:  'Coaching Philosophy',
    fideRating:          'FIDE Classical Rating',
    rapidRating:         'Rapid Rating',
    blitzRating:         'Blitz Rating',
    peakRating:          'Peak Rating',
    fideId:              'FIDE ID',
    lichessUsername:     'Lichess Username',
    chessComUsername:    'Chess.com Username',
    yearsCoaching:       'Years of Coaching Experience',
    yearsPlaying:        'Years Playing Chess',
    specializations:     'Specializations',
    languages:           'Languages Spoken',
    teachingFormats:     'Teaching Formats',
    certifications:      'Certifications',
    tournaments:         'Notable Tournaments / Results',
    achievements:        'Key Achievements',
    photo:               'Profile Photo',
  }
};

// ─── Main trigger function ────────────────────────────────────────────────────
function onFormSubmit(e) {
  try {
    var sheet     = e.range.getSheet();
    var rowIndex  = e.range.getRow();
    var headers   = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowValues = e.range.getValues()[0];

    // Build a key→value map of the submitted row
    var rowData = {};
    headers.forEach(function(header, i) {
      rowData[header.toString().trim()] = rowValues[i] ? rowValues[i].toString().trim() : '';
    });

    // Map to our expected field names
    var formData = mapColumns(rowData, rowIndex);

    // Build webhook payload
    var payload = {
      secret: CONFIG.WEBHOOK_SECRET,
      event:  'form_submission',
      data:   formData,
      spreadsheet_id: e.source.getId(),
      row_number:     rowIndex
    };

    // POST to Next.js webhook
    var options = {
      method:      'post',
      contentType: 'application/json',
      payload:     JSON.stringify(payload),
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
    var code     = response.getResponseCode();
    var body     = response.getContentText();

    if (code >= 200 && code < 300) {
      Logger.log('✅ Webhook success: ' + body);
    } else {
      Logger.log('❌ Webhook failed (' + code + '): ' + body);
      // Write error to the sheet for visibility
      appendErrorToSheet(sheet, rowIndex, 'Webhook error ' + code + ': ' + body);
    }
  } catch (err) {
    Logger.log('❌ Script error: ' + err.toString());
  }
}

// ─── Column mapping ───────────────────────────────────────────────────────────
function mapColumns(rowData, rowIndex) {
  var cm = CONFIG.COLUMN_MAP;
  var spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();

  // Extract Drive file ID from a Google Drive URL
  function extractDriveId(urlOrId) {
    if (!urlOrId) return undefined;
    if (urlOrId.indexOf('/') === -1) return urlOrId;
    var openMatch = urlOrId.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openMatch) return openMatch[1];
    var fileMatch = urlOrId.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) return fileMatch[1];
    return undefined;
  }

  var photoUrl  = rowData[cm.photo] || '';
  var photoId   = extractDriveId(photoUrl);

  return {
    submissionId:        spreadsheetId + '_row_' + rowIndex,
    timestamp:           rowData[cm.timestamp]          || new Date().toISOString(),
    fullName:            rowData[cm.fullName]            || '',
    email:               rowData[cm.email]               || '',
    phone:               rowData[cm.phone]               || undefined,
    location:            rowData[cm.location]            || undefined,
    title:               rowData[cm.title]               || undefined,
    headline:            rowData[cm.headline]            || undefined,
    bio:                 rowData[cm.bio]                 || undefined,
    coachingPhilosophy:  rowData[cm.coachingPhilosophy]  || undefined,
    fideRating:          rowData[cm.fideRating]          || undefined,
    rapidRating:         rowData[cm.rapidRating]         || undefined,
    blitzRating:         rowData[cm.blitzRating]         || undefined,
    peakRating:          rowData[cm.peakRating]          || undefined,
    fideId:              rowData[cm.fideId]              || undefined,
    lichessUsername:     rowData[cm.lichessUsername]     || undefined,
    chessComUsername:    rowData[cm.chessComUsername]    || undefined,
    yearsCoaching:       rowData[cm.yearsCoaching]       || undefined,
    yearsPlaying:        rowData[cm.yearsPlaying]        || undefined,
    specializations:     rowData[cm.specializations]     || undefined,
    languages:           rowData[cm.languages]           || undefined,
    teachingFormats:     rowData[cm.teachingFormats]     || undefined,
    certifications:      rowData[cm.certifications]      || undefined,
    tournaments:         rowData[cm.tournaments]         || undefined,
    achievements:        rowData[cm.achievements]        || undefined,
    photoDriveId:        photoId,
    photoDriveUrl:       photoUrl || undefined
  };
}

// ─── Write error status back to sheet ────────────────────────────────────────
function appendErrorToSheet(sheet, rowIndex, message) {
  try {
    // Find or create a "Webhook Status" column at the end
    var lastCol  = sheet.getLastColumn() + 1;
    var headers  = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var statusCol = headers.indexOf('Webhook Status') + 1;
    if (statusCol === 0) {
      statusCol = lastCol;
      sheet.getRange(1, statusCol).setValue('Webhook Status');
    }
    sheet.getRange(rowIndex, statusCol).setValue(message);
  } catch (err) {
    // Ignore sheet write errors
  }
}

// ─── Manual test — run this once to verify connectivity ──────────────────────
function testWebhook() {
  var testPayload = {
    secret: CONFIG.WEBHOOK_SECRET,
    event:  'form_submission',
    data: {
      submissionId:  'test_' + Date.now(),
      timestamp:     new Date().toISOString(),
      fullName:      'Test Coach',
      email:         'test@example.com',
      fideRating:    '2100',
      yearsCoaching: '5',
      specializations: 'Opening Theory, Endgames',
      languages:     'English'
    }
  };

  var options = {
    method:      'post',
    contentType: 'application/json',
    payload:     JSON.stringify(testPayload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
  Logger.log('Status: ' + response.getResponseCode());
  Logger.log('Body: '   + response.getContentText());
}
