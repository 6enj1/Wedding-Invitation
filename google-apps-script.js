const SPREADSHEET_ID = '132SrQiTyk0M-DEr6AxgMnzb1cL2vanb94nZ0g71KqD0';
const SHEET_NAME     = 'RSVPs';
const ADMIN_KEY      = 'dorcas-samuel-2026';

/* ---------- Receive RSVP form submissions ---------- */
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    const data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
      data.name         || '',
      data.email        || '',
      data.attendance === 'yes' ? 'Attending' : 'Not Attending',
      data.attendance === 'yes' ? Number(data.guests || 1) : 0,
      Array.isArray(data.allergies) ? data.allergies.join(', ') : (data.allergies || ''),
      data.other_allergy || '',
      data.message      || '',
    ]);

    return ok({ success: true });
  } catch (err) {
    return ok({ success: false, error: err.message });
  }
}

/* ---------- Serve RSVP data to the admin page (JSONP) ---------- */
function doGet(e) {
  const callback = e.parameter.callback || null;

  if (!e.parameter.key || e.parameter.key !== ADMIN_KEY) {
    return respond({ success: false, error: 'Unauthorized' }, callback);
  }

  const sheet = getOrCreateSheet();

  // Delete a row by sheet row number
  if (e.parameter.action === 'delete') {
    const rowNum = parseInt(e.parameter.row);
    if (!rowNum || rowNum < 2) {
      return respond({ success: false, error: 'Invalid row' }, callback);
    }
    sheet.deleteRow(rowNum);
    return respond({ success: true }, callback);
  }

  const rows = sheet.getDataRange().getValues();
  return respond({ success: true, data: rows }, callback);
}

/* ---------- Helpers ---------- */
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Attending',
      'Guest Count', 'Dietary Requirements', 'Other Restrictions', 'Message',
    ]);
    sheet.setFrozenRows(1);

    // Style header row
    const header = sheet.getRange(1, 1, 1, 8);
    header.setBackground('#1A1A2E');
    header.setFontColor('#C9A84C');
    header.setFontWeight('bold');
    sheet.setColumnWidths(1, 8, 180);
  }

  return sheet;
}

function respond(payload, callback) {
  const json = JSON.stringify(payload);
  if (callback) {
    // JSONP — bypasses CORS entirely
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function ok(payload) {
  return respond(payload, null);
}
